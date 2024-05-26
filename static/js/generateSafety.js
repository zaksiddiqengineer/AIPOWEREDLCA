const userInputs = {};

const decisionTree = {
    newChemicalUsage: {
        question: "Are any new chemicals being introduced in this process that have not been used in this facility before?",
        options: [
            "No new chemicals",
            "Some new chemicals, all assessed",
            "New chemicals, not fully assessed"
        ]
    },
    chemicalHandlingConditions: {
        question: "Are any familiar chemicals being used under different operating conditions (e.g., temperature, pressure, concentration) than in the laboratory?",
        options: [
            "No changes",
            "Minor changes, tested",
            "Major changes, not fully tested"
        ]
    },
    chemicalDeliveryPurity: {
        question: "Will the mode of delivery for any chemicals change in the scale-up process (e.g., from manual addition to automated systems)?",
        options: [
            "No changes",
            "Minor changes, risks assessed",
            "Major changes, risks not fully assessed"
        ]
    },
    hazardousMaterialStorageShipping: {
        question: "Will the scale-up process involve storing larger quantities of hazardous materials?",
        options: [
            "No larger quantities",
            "Larger quantities, requirements met",
            "Larger quantities, requirements not fully met"
        ]
    },
    chemicalLoadingUnloading: {
        question: "Will the scale-up process involve changes in the way chemicals are loaded or unloaded (e.g., bulk handling vs. small-scale transfers)?",
        options: [
            "No changes",
            "Minor changes, risks assessed",
            "Major changes, risks not fully assessed"
        ]
    },
    sharedFacilitiesImpact: {
        question: "Will the new process or modifications impact shared facilities such as utility systems, effluent treatment systems, or safety release systems?",
        options: [
            "No impact",
            "Minor impact, risks assessed",
            "Major impact, risks not fully assessed"
        ]
    },
    byProductsDisposal: {
        question: "Are there any reaction by-products that might be produced in larger quantities in the scaled-up process?",
        options: [
            "No new by-products",
            "Minor increase, disposal methods assessed",
            "Major increase, disposal methods not fully assessed"
        ]
    },
    vacuumOxygenUsage: {
        question: "Does the scaled-up process involve the use of vacuum?",
        options: [
            "No vacuum used",
            "Vacuum used, risks managed",
            "Vacuum used, risks not fully managed"
        ]
    },
    designProceduralChanges: {
        question: "Are there any 'step-out' designs in the scaled-up process that might introduce new hazards?",
        options: [
            "No new designs",
            "Minor new designs, risks assessed",
            "Major new designs, risks not fully assessed"
        ]
    },
    thermalHazards: {
        question: "Are there any potential exothermic reactions that could become more hazardous when scaled up?",
        options: [
            "No exothermic reactions",
            "Minor exothermic reactions, controlled",
            "Major exothermic reactions, not fully controlled"
        ]
    },
    reactionKinetics: {
        question: "How do the kinetics of the reaction change with scale?",
        options: [
            "No significant change",
            "Minor change, managed",
            "Major change, not fully managed"
        ]
    },
    mixingHomogeneity: {
        question: "Will the mixing efficiency change with scale?",
        options: [
            "No change",
            "Minor change, assessed",
            "Major change, not fully assessed"
        ]
    },
    wasteManagement: {
        question: "How will the waste generated at a larger scale be managed?",
        options: [
            "No additional waste",
            "Additional waste, regulations met",
            "Additional waste, regulations not fully met"
        ]
    },
    chemicalStability: {
        question: "Are there any chemicals that are stable at lab scale but may become unstable at larger quantities or different conditions?",
        options: [
            "No instability issues",
            "Minor instability, managed",
            "Major instability, not fully managed"
        ]
    },
    disposalMethods: {
        question: "Are the disposal methods for chemicals used in the lab scalable to industrial quantities?",
        options: [
            "No changes needed",
            "Minor changes needed, assessed",
            "Major changes needed, not fully assessed"
        ]
    },
    safetyTrainingCommunication: {
        question: "Have all personnel involved in the scale-up process received adequate safety training?",
        options: [
            "Yes, fully trained",
            "Some training needed, plan in place",
            "Major training needed, no plan in place"
        ]
    }
};

function evaluateSafety() {
    const scores = {
        "Risk of Chemical Exposure": 1,
        "Training Requirements": 1,
        "Regulatory Compliance": 1,
        "Emergency Preparedness": 1,
        "Process Stability": 1,
        "Equipment Safety": 1,
        "Environmental Impact": 1,
        "Waste Management": 1,
        "Operational Efficiency": 1,
        "Communication and Coordination": 1
    };

    const impactMatrix = {
        "No new chemicals": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Some new chemicals, all assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "New chemicals, not fully assessed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No changes": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": -1,
            "Equipment Safety": -1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor changes, tested": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major changes, not fully tested": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No changes": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": -1,
            "Equipment Safety": -1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor changes, risks assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major changes, risks not fully assessed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No larger quantities": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Larger quantities, requirements met": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Larger quantities, requirements not fully met": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No impact": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": -1,
            "Equipment Safety": -1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor impact, risks assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major impact, risks not fully assessed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No new by-products": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor increase, disposal methods assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0.5,
            "Waste Management": 0.5,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major increase, disposal methods not fully assessed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 1,
            "Waste Management": 1,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No vacuum used": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": -1,
            "Equipment Safety": -1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Vacuum used, risks managed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Vacuum used, risks not fully managed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No new designs": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor new designs, risks assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major new designs, risks not fully assessed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No exothermic reactions": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": -1,
            "Equipment Safety": -1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor exothermic reactions, controlled": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major exothermic reactions, not fully controlled": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No significant change": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": -1,
            "Equipment Safety": -1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor change, managed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major change, not fully managed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No change": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": -1,
            "Equipment Safety": -1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor change, assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major change, not fully assessed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No additional waste": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": -1,
            "Waste Management": -1,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Additional waste, regulations met": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0.5,
            "Waste Management": 0.5,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Additional waste, regulations not fully met": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 1,
            "Waste Management": 1,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No instability issues": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": -1,
            "Equipment Safety": -1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor instability, managed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major instability, not fully managed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "No changes needed": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": -1,
            "Waste Management": -1,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Minor changes needed, assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0.5,
            "Waste Management": 0.5,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major changes needed, not fully assessed": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 1,
            "Waste Management": 1,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Yes, fully trained": {
            "Risk of Chemical Exposure": -1,
            "Training Requirements": -1,
            "Regulatory Compliance": -1,
            "Emergency Preparedness": -1,
            "Process Stability": -1,
            "Equipment Safety": -1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Some training needed, plan in place": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "Major training needed, no plan in place": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        }
    };

    console.log("User Inputs: ", userInputs);

    // Apply the impacts based on the user's answers
    for (let questionKey in userInputs) {
        const answerIndex = userInputs[questionKey];
        const answerKey = decisionTree[questionKey].options[answerIndex];

        console.log(`Question: ${questionKey}, Answer: ${answerKey}`);

        if (impactMatrix[answerKey]) {
            const impacts = impactMatrix[answerKey];
            console.log(`Impacts for ${questionKey} - ${answerKey}: `, impacts)
            for (let category in impacts) {
                scores[category] += impacts[category];
                console.log(`Updated score for ${category}: `, scores[category]);
            }
        } else {
            console.warn(`No impacts found for ${questionKey} - ${answerKey}`);
        }
    }

    // Normalize scores to a maximum of 5 and minimum of 1
    for (let key in scores) {
        if (scores[key] > 5) {
            scores[key] = 5;
        }
        if (scores[key] < 1) {
            scores[key] = 1;
        }
    }

    console.log("Final Scores: ", scores);

    return scores;
}

export function askQuestion(questionKey) {
    const question = decisionTree[questionKey];
    const questionDiv = document.getElementById('safetyQuestion');
    const answersDiv = document.getElementById('safetyAnswers');

    questionDiv.textContent = question.question;
    answersDiv.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            userInputs[questionKey] = index;
            const nextQuestionKey = Object.keys(decisionTree)[Object.keys(decisionTree).indexOf(questionKey) + 1];
            if (nextQuestionKey) {
                askQuestion(nextQuestionKey);
            } else {
                const scores = evaluateSafety();
                renderRadarPlot(scores);

                const recycleContainer = document.getElementById('recycleContainer');
                recycleContainer.style.display = 'block';
            }
        });
        answersDiv.appendChild(button);
    });
}

export function renderRadarPlot(scores) {
    const ctx = document.getElementById('safetyScorePlots').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(scores),
            datasets: [{
                label: 'Safety Scores',
                data: Object.values(scores),
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
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
}
