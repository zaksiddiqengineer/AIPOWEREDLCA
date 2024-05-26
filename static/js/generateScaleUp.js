// generateScaleUp.js

async function generateScaleUpAnalysis() {
    console.log("Generating scale-up analysis...");
  
    const reactionType = await askQuestion("Is the lab reaction batch or continuous?", ["Batch", "Continuous"]);
    console.log("Reaction Type:", reactionType);
  
    if (reactionType === "Batch") {
      const batchKinetics = await askQuestion("What are the reaction kinetics?", ["Simple first-order", "Complex"]);
      console.log("Batch Kinetics:", batchKinetics);
  
      if (batchKinetics === "Simple first-order") {
        const batchHeatType = await askQuestion("Is the reaction exothermic or endothermic?", ["Exothermic", "Endothermic"]);
        console.log("Batch Heat Type:", batchHeatType);
  
        if (batchHeatType === "Exothermic" || batchHeatType === "Endothermic") {
          const batchMixingReq = await askQuestion("What are the mixing requirements?", ["Mild mixing", "Intense mixing"]);
          console.log("Batch Mixing Requirements:", batchMixingReq);
  
          if (batchHeatType === "Exothermic") {
            if (batchMixingReq === "Mild mixing") {
              displayRecommendation("Consider a jacketed batch reactor");
            } else if (batchMixingReq === "Intense mixing") {
              displayRecommendation("If the production rate is high, consider a CSTR with an external heat exchanger. If the production rate is low, a jacketed CSTR may suffice.");
            }
          } else if (batchHeatType === "Endothermic") {
            if (batchMixingReq === "Mild mixing") {
              displayRecommendation("Consider a jacketed batch reactor");
            } else if (batchMixingReq === "Intense mixing") {
              displayRecommendation("Consider a CSTR with a heating jacket. If the production rate is high, an external heat exchanger may also be needed.");
            }
          }
        }
      } else if (batchKinetics === "Complex") {
        displayRecommendation("Consider a batch reactor for the initial scale-up, then re-evaluate for continuous options based on pilot plant data.");
      }
    } else if (reactionType === "Continuous") {
      const continuousKinetics = await askQuestion("What are the reaction kinetics?", ["Simple first-order", "Complex"]);
      console.log("Continuous Kinetics:", continuousKinetics);
  
      if (continuousKinetics === "Simple first-order") {
        const continuousHeatType = await askQuestion("Is the reaction exothermic or endothermic?", ["Exothermic", "Endothermic"]);
        console.log("Continuous Heat Type:", continuousHeatType);
  
        if (continuousHeatType === "Exothermic" || continuousHeatType === "Endothermic") {
          const continuousMixingReq = await askQuestion("What are the mixing requirements and physical properties?", ["Mild mixing (single phase, low viscosity)", "Intense mixing (multi-phase, high viscosity)"]);
          console.log("Continuous Mixing Requirements:", continuousMixingReq);
  
          if (continuousHeatType === "Exothermic") {
            if (continuousMixingReq === "Mild mixing (single phase, low viscosity)") {
              displayRecommendation("Consider a jacketed tubular reactor or a shell and tube reactor");
            } else if (continuousMixingReq === "Intense mixing (multi-phase, high viscosity)") {
              displayRecommendation("Consider a CSTR with a cooling jacket and potentially an external heat exchanger. If the production rate is high, multiple CSTRs in series might be necessary.");
            }
          } else if (continuousHeatType === "Endothermic") {
            if (continuousMixingReq === "Mild mixing (single phase, low viscosity)") {
              displayRecommendation("Consider a jacketed tubular reactor or a shell and tube reactor with heating elements");
            } else if (continuousMixingReq === "Intense mixing (multi-phase, high viscosity)") {
              displayRecommendation("Consider a CSTR with a heating jacket and potentially an external heat exchanger. If the production rate is high, multiple CSTRs in series might be necessary.");
            }
          }
        }
      } else if (continuousKinetics === "Complex") {
        displayRecommendation("Consider a tubular reactor with multiple injection points for better control. If the viscosity is high, a CSTR might be more suitable.");
      }
    }
  }
  
// Function to display a question in the step-by-step wizard
function askQuestion(question, options) {
    return new Promise((resolve) => {
      const stepNumber = document.querySelectorAll("#wizardSteps .step").length + 1;
      const stepElement = document.createElement("div");
      stepElement.id = `step${stepNumber}`;
      stepElement.classList.add("step");
      stepElement.innerHTML = `
        <h3>Question ${stepNumber}</h3>
        <p>${question}</p>
        ${options.map((option) => `<button data-answer="${option}">${option}</button>`).join("")}
      `;
      document.getElementById("wizardSteps").appendChild(stepElement);
  
      const buttons = stepElement.querySelectorAll("button");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const answer = button.dataset.answer;
          resolve(answer);
        });
      });
  
      showStep(stepNumber);
    });
  }
  
  // Function to handle navigation between steps
  function showStep(stepNumber) {
    const steps = document.querySelectorAll("#wizardSteps .step");
    steps.forEach((step) => {
      step.style.display = "none";
    });
    document.getElementById(`step${stepNumber}`).style.display = "block";
    document.getElementById("prevBtn").disabled = stepNumber === 1;
    document.getElementById("nextBtn").disabled = stepNumber === steps.length;
  }

  // Function to hide the scale-up wizard
  function hideScaleUpWizard() {
    document.getElementById('scaleUpWizard').style.display = 'none';
  }

// Function to display the recommendation
function displayRecommendation(recommendation) {
    console.log(recommendation);

    const reactorScores = {
        "Jacketed Batch Reactor": {
            "Waste Generation": 3,
            "Energy Consumption": 4,
            "Emissions Potential": 3,
            "Equipment Cost": 3,
            "Installation Cost": 3,
            "Materials of Construction": 3,
            "Operational Energy Consumption": 4,
            "Maintenance": 4,
            "Labor": 3
        },
        "CSTR with External Heat Exchanger": {
            "Waste Generation": 2,
            "Energy Consumption": 3,
            "Emissions Potential": 2,
            "Equipment Cost": 4,
            "Installation Cost": 4,
            "Materials of Construction": 4,
            "Operational Energy Consumption": 3,
            "Maintenance": 3,
            "Labor": 4
        },
        "CSTR with Heating Jacket": {
            "Waste Generation": 2,
            "Energy Consumption": 4,
            "Emissions Potential": 2,
            "Equipment Cost": 4,
            "Installation Cost": 4,
            "Materials of Construction": 4,
            "Operational Energy Consumption": 4,
            "Maintenance": 3,
            "Labor": 4
        },
        "Jacketed Tubular Reactor": {
            "Waste Generation": 3,
            "Energy Consumption": 2,
            "Emissions Potential": 3,
            "Equipment Cost": 3,
            "Installation Cost": 3,
            "Materials of Construction": 3,
            "Operational Energy Consumption": 2,
            "Maintenance": 3,
            "Labor": 3
        },
        "Shell and Tube Reactor": {
            "Waste Generation": 3,
            "Energy Consumption": 2,
            "Emissions Potential": 3,
            "Equipment Cost": 4,
            "Installation Cost": 4,
            "Materials of Construction": 4,
            "Operational Energy Consumption": 2,
            "Maintenance": 3,
            "Labor": 3
        }
    };

    // Map longer recommendation strings to keys in reactorScores
    const recommendationMap = {
        "Consider a jacketed batch reactor": "Jacketed Batch Reactor",
        "If the production rate is high, consider a CSTR with an external heat exchanger. If the production rate is low, a jacketed CSTR may suffice.": "CSTR with External Heat Exchanger",
        "Consider a CSTR with a heating jacket. If the production rate is high, an external heat exchanger may also be needed.": "CSTR with Heating Jacket",
        "Consider a batch reactor for the initial scale-up, then re-evaluate for continuous options based on pilot plant data.": "Jacketed Batch Reactor",
        "Consider a jacketed tubular reactor or a shell and tube reactor": "Jacketed Tubular Reactor",
        "Consider a jacketed tubular reactor or a shell and tube reactor with heating elements": "Shell and Tube Reactor",
        "Consider a CSTR with a cooling jacket and potentially an external heat exchanger. If the production rate is high, multiple CSTRs in series might be necessary.": "CSTR with External Heat Exchanger",
        "Consider a CSTR with a heating jacket and potentially an external heat exchanger. If the production rate is high, multiple CSTRs in series might be necessary.": "CSTR with Heating Jacket",
        "Consider a tubular reactor with multiple injection points for better control. If the viscosity is high, a CSTR might be more suitable.": "Jacketed Tubular Reactor"
    };

    // Extract the key from the recommendation string
    let recommendedReactor = null;
    for (const key in recommendationMap) {
        if (recommendation.includes(key)) {
            recommendedReactor = recommendationMap[key];
            break;
        }
    }

    if (recommendedReactor && reactorScores[recommendedReactor]) {
        const scores = reactorScores[recommendedReactor];
        const labels = Object.keys(scores);
        const values = Object.values(scores);

        const chartId = "reactorScoreChart";
        const existingChart = Chart.getChart(chartId);
        if (existingChart) {
            existingChart.destroy();
        }

        const ctx = document.createElement("canvas");
        ctx.id = chartId;
        document.getElementById("recommendationContainer").innerHTML = "";
        document.getElementById("recommendationContainer").appendChild(ctx);

        new Chart(ctx, {
            type: "radar",
            data: {
                labels: labels,
                datasets: [{
                    label: recommendedReactor,
                    data: values,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: 0,
                        suggestedMax: 5
                    }
                }
            }
        });

        // Display original recommendation and button
        document.getElementById("originalRecommendation").textContent = `Original Recommendation: ${recommendation} - Proceed to the next part of the analysis.`;
        document.getElementById("flowDiagramContainer").style.display = "block";
        
    } else {
        console.error('No matching reactor scores found for the recommendation:', recommendation);
    }

    hideScaleUpWizard();
}

 
  
  // Export the function to make it accessible from other files
  export { generateScaleUpAnalysis };