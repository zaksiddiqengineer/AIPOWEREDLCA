// Define the structure of the decision tree
const decisionTree = {
    question1: {
        text: "How many reactions are involved in the process?",
        options: {
            one: "question2",
            moreThanOne: "question3"
        }
    },
    question2: {
        text: "Does the reaction go to completion, and are the exact stoichiometric amounts of reactants used?",
        options: {
            yes: "question6",
            no: "question3"
        }
    },
    question3: {
        text: "Are there intermediate wash steps or purification stages between reactions?",
        options: {
            yes: "question4",
            no: "question5"
        }
    },
    question4: {
        text: "Do any residual reactants from the previous reaction(s) negatively impact subsequent reactions?",
        options: {
            yes: "separationSteps",
            no: "question5"
        }
    },
    question5: {
        text: "Does the process involve the formation of any solid or liquid byproducts?",
        options: {
            yes: "solidLiquidSeparation",
            no: "question6"
        }
    },
    question6: {
        text: "Does the final product require purification to remove unreacted reactants or byproducts?",
        options: {
            yes: "purificationSteps",
            no: "question7"
        }
    },
    question7: {
        text: "Are there any temperature constraints or sensitivities for any of the reactions?",
        options: {
            yes: "temperatureControl",
            no: "question8"
        }
    },
    question8: {
        text: "Is the reaction highly exothermic?",
        options: {
            yes: "multipleReactors",
            no: "question9"
        }
    },
    question9: {
        text: "Does the reaction produce gaseous byproducts that need to be managed?",
        options: {
            yes: "gasLiquidSeparation",
            no: "question10"
        }
    },
    question10: {
        text: "Does the reaction require specific agitation or mixing regimes to ensure uniformity?",
        options: {
            yes: "specializedMixing",
            no: "question11"
        }
    },
    question11: {
        text: "Are there any pH constraints or requirements for any of the reactions?",
        options: {
            yes: "pHControl",
            no: "question12"
        }
    },
    question12: {
        text: "Are there any solvent recovery or recycling steps required?",
        options: {
            yes: "solventRecovery",
            no: "question13"
        }
    },
    question13: {
        text: "Is the reaction time-sensitive, requiring precise control over reaction duration?",
        options: {
            yes: "preciseControl",
            no: "question14"
        }
    },
    question14: {
        text: "Based on your previous reactor selection, would multiple reactors be beneficial for yield, selectivity, or heat management?",
        options: {
            yes: "multipleReactorsFinal",
            no: "singleReactorFinal"
        }
    },
    separationSteps: {
        text: "The commercial process will likely require separation steps (e.g., distillation, filtration) to remove excess reactants before each subsequent reaction. Proceed to Question 8.",
        options: {
            next: "question8"
        }
    },
    solidLiquidSeparation: {
        text: "The commercial process will likely require solid-liquid separation equipment (e.g., filters, centrifuges). Proceed to Question 6.",
        options: {
            next: "question6"
        }
    },
    purificationSteps: {
        text: "The commercial process will likely include additional purification steps (e.g., distillation, extraction). Proceed to Question 8.",
        options: {
            next: "question8"
        }
    },
    temperatureControl: {
        text: "The commercial process will likely need heating or cooling equipment to maintain optimal reaction temperatures. Consider the potential for reactor fouling or side reactions due to temperature fluctuations. Proceed to Question 8.",
        options: {
            next: "question8"
        }
    },
    multipleReactors: {
        text: "Consider using multiple reactors in series to better manage heat removal and potentially improve yield/selectivity. Proceed to Question 9.",
        options: {
            next: "question9"
        }
    },
    gasLiquidSeparation: {
        text: "The commercial process will likely need gas-liquid separation equipment and possibly scrubbers or condensers. Proceed to Question 10.",
        options: {
            next: "question10"
        }
    },
    specializedMixing: {
        text: "The commercial process will likely need specialized mixing equipment (e.g., agitators, stirrers). Proceed to Question 11.",
        options: {
            next: "question11"
        }
    },
    pHControl: {
        text: "The commercial process will likely need pH control systems (e.g., acid/base addition). Proceed to Question 12.",
        options: {
            next: "question12"
        }
    },
    solventRecovery: {
        text: "The commercial process will include solvent recovery systems (e.g., distillation columns, evaporators). Proceed to Question 13.",
        options: {
            next: "question13"
        }
    },
    preciseControl: {
        text: "The commercial process will need precise timing and control systems. Proceed to Question 14.",
        options: {
            next: "question14"
        }
    },
    multipleReactorsFinal: {
        text: "The commercial process will likely use multiple reactors in series.",
        options: {}
    },
    singleReactorFinal: {
        text: "The commercial process will likely use a single reactor.",
        options: {}
    }
};

const userInputs = {};

async function askQuestion(questionId) {
    return new Promise((resolve) => {
        const questionContainer = document.getElementById('flowDiagramQuestion');
        questionContainer.innerHTML = '';
        const question = decisionTree[questionId];
        const questionText = document.createElement('p');
        questionText.innerText = question.text;
        questionContainer.appendChild(questionText);

        const answerContainer = document.getElementById('flowDiagramAnswers');
        answerContainer.innerHTML = '';

        Object.keys(question.options).forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = async () => {
                await handleAnswer(questionId, option);
                resolve();
            };
            answerContainer.appendChild(button);
        });
    });
}

async function handleAnswer(questionId, answer) {
    userInputs[questionId] = answer;
    const nextQuestionId = decisionTree[questionId].options[answer]; // Removed .toLowerCase() transformation
    if (nextQuestionId) {
        if (nextQuestionId === "multipleReactorsFinal" || nextQuestionId === "singleReactorFinal") {
            generateResult(nextQuestionId);
        } else {
            await askQuestion(nextQuestionId);
        }
    } else {
        generateResult(questionId);
    }
}

function generateResult(finalQuestionId) {
    let result = "Process Flow Diagram:<br>";
    if (finalQuestionId === "multipleReactorsFinal") {
        result += "The commercial process will likely use multiple reactors in series. This setup helps in better managing heat and potentially improving yield/selectivity.<br>";
    } else if (finalQuestionId === "singleReactorFinal") {
        result += "The commercial process will likely use a single reactor. This approach can simplify the process but may have limitations in managing heat and yield.<br>";
    }

    // Add detailed logic based on userInputs to compile the process flow diagram
    result += "<br>Details:<br>";
    result += `Number of reactions: ${userInputs.question1 === "one" ? "The process involves a single reaction, simplifying the process flow." : "The process involves multiple reactions, necessitating a more complex process flow with potential intermediate steps."}<br>`;
    result += `Reaction completion: ${userInputs.question2 === "yes" ? "The reaction goes to completion with exact stoichiometric amounts of reactants, ensuring maximum conversion and minimal waste." : "The reaction does not go to completion or uses excess reactants, which may lead to inefficiencies and additional separation steps."}<br>`;
    result += `Byproducts: ${userInputs.question5 === "yes" ? "The process involves the formation of solid or liquid byproducts, requiring separation and waste management." : "The process does not involve the formation of solid or liquid byproducts, simplifying waste management."}<br>`;
    result += `Purification: ${userInputs.question6 === "yes" ? "The final product requires purification to remove unreacted reactants or byproducts, adding complexity to the process." : "The final product does not require purification, streamlining the process."}<br>`;
    result += `Temperature constraints: ${userInputs.question7 === "yes" ? "There are temperature constraints or sensitivities for the reactions, necessitating precise temperature control systems." : "There are no temperature constraints or sensitivities for the reactions, allowing for simpler equipment and control."}<br>`;
    result += `Exothermic: ${userInputs.question8 === "yes" ? "The reaction is highly exothermic, requiring effective heat management to ensure safety and efficiency." : "The reaction is not highly exothermic, reducing the need for extensive heat management systems."}<br>`;
    result += `Gaseous byproducts: ${userInputs.question9 === "yes" ? "The reaction produces gaseous byproducts that need to be managed, requiring gas-liquid separation systems." : "The reaction does not produce gaseous byproducts, simplifying the process."}<br>`;
    result += `Specific mixing: ${userInputs.question10 === "yes" ? "The reaction requires specific agitation or mixing regimes to ensure uniformity, demanding specialized equipment." : "The reaction does not require specific agitation or mixing regimes, reducing equipment complexity."}<br>`;
    result += `pH constraints: ${userInputs.question11 === "yes" ? "There are pH constraints or requirements for the reactions, necessitating pH control systems." : "There are no pH constraints or requirements for the reactions, simplifying process control."}<br>`;
    result += `Solvent recovery: ${userInputs.question12 === "yes" ? "The process requires solvent recovery or recycling steps, adding to the operational complexity and equipment needs." : "The process does not require solvent recovery or recycling steps, simplifying the operation."}<br>`;
    result += `Time-sensitive: ${userInputs.question13 === "yes" ? "The reaction is time-sensitive and requires precise control over reaction duration, increasing the need for sophisticated timing and control systems." : "The reaction is not time-sensitive and does not require precise control over reaction duration, reducing control system requirements."}<br>`;

    const outputContainer = document.getElementById('flowDiagramOutput');
    outputContainer.innerHTML = result;

    const scores = evaluateFlowDiagram(result);
    renderRadarPlots(scores);

    const flowDiagramOutput = result; // Assign the result to flowDiagramOutput
    const analyzeButton = document.createElement('button');
    analyzeButton.innerText = 'Analyze Flow Diagram Life Cycle Analysis';
    analyzeButton.onclick = async () => {
        await analyzeFlowDiagram(flowDiagramOutput);
    };
    outputContainer.appendChild(analyzeButton);

    const proceedButtonContainer = document.getElementById('safetyContainer');
    proceedButtonContainer.style.display = 'block';;
 
}


function evaluateFlowDiagram(flowDiagramOutput) {
    const scores = {
        "Waste Generation": 1,
        "Energy Consumption": 1,
        "Emissions Potential": 1,
        "Equipment Cost": 1,
        "Installation Cost": 1,
        "Materials of Construction": 1,
        "Operational Energy Consumption": 1,
        "Maintenance": 1,
        "Labor": 1
    };

    // Define impact of each question on each score category
    const impactMatrix = {
        question1: {
            one: {
                "Waste Generation": -0.5,
                "Energy Consumption": -0.5,
                "Emissions Potential": -0.5,
                "Equipment Cost": -0.5,
                "Installation Cost": -0.5,
                "Materials of Construction": -0.5,
                "Operational Energy Consumption": -0.5,
                "Maintenance": -0.5,
                "Labor": -0.5
            },
            moreThanOne: {
                "Waste Generation": 0.5,
                "Energy Consumption": 0.5,
                "Emissions Potential": 0.5,
                "Equipment Cost": 0.5,
                "Installation Cost": 0.5,
                "Materials of Construction": 0.5,
                "Operational Energy Consumption": 0.5,
                "Maintenance": 0.5,
                "Labor": 0.5
            }
        },
        question2: {
            yes: {
                "Waste Generation": -1,
                "Energy Consumption": 0.5,
                "Emissions Potential": -1,
                "Equipment Cost": 0.5,
                "Installation Cost": 0.5,
                "Materials of Construction": 0.5,
                "Operational Energy Consumption": 0.5,
                "Maintenance": 0.5,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": 1,
                "Energy Consumption": -0.5,
                "Emissions Potential": 1,
                "Equipment Cost": -0.5,
                "Installation Cost": -0.5,
                "Materials of Construction": -0.5,
                "Operational Energy Consumption": -0.5,
                "Maintenance": -0.5,
                "Labor": -0.5
            }
        },
        question3: {
            yes: {
                "Waste Generation": 0.5,
                "Energy Consumption": 0.5,
                "Emissions Potential": 0.5,
                "Equipment Cost": 1,
                "Installation Cost": 1,
                "Materials of Construction": 1,
                "Operational Energy Consumption": 0.5,
                "Maintenance": 1,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": -0.5,
                "Energy Consumption": -0.5,
                "Emissions Potential": -0.5,
                "Equipment Cost": -0.5,
                "Installation Cost": -0.5,
                "Materials of Construction": -0.5,
                "Operational Energy Consumption": -0.5,
                "Maintenance": -0.5,
                "Labor": -0.5
            }
        },
        question4: {
            yes: {
                "Waste Generation": 1,
                "Energy Consumption": 0.5,
                "Emissions Potential": 0.5,
                "Equipment Cost": 0.5,
                "Installation Cost": 0.5,
                "Materials of Construction": 0.5,
                "Operational Energy Consumption": 0.5,
                "Maintenance": 1,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": -0.5,
                "Energy Consumption": -0.5,
                "Emissions Potential": -0.5,
                "Equipment Cost": -0.5,
                "Installation Cost": -0.5,
                "Materials of Construction": -0.5,
                "Operational Energy Consumption": -0.5,
                "Maintenance": -0.5,
                "Labor": -0.5
            }
        },
        question5: {
            yes: {
                "Waste Generation": 1.5,
                "Energy Consumption": 0.5,
                "Emissions Potential": 1,
                "Equipment Cost": 1,
                "Installation Cost": 1,
                "Materials of Construction": 1,
                "Operational Energy Consumption": 1,
                "Maintenance": 1,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": -1.5,
                "Energy Consumption": -0.5,
                "Emissions Potential": -1,
                "Equipment Cost": -1,
                "Installation Cost": -1,
                "Materials of Construction": -1,
                "Operational Energy Consumption": -1,
                "Maintenance": -1,
                "Labor": -0.5
            }
        },
        question6: {
            yes: {
                "Waste Generation": 1,
                "Energy Consumption": 1,
                "Emissions Potential": 1,
                "Equipment Cost": 1.5,
                "Installation Cost": 1.5,
                "Materials of Construction": 1,
                "Operational Energy Consumption": 1,
                "Maintenance": 1.5,
                "Labor": 1
            },
            no: {
                "Waste Generation": -1,
                "Energy Consumption": -1,
                "Emissions Potential": -1,
                "Equipment Cost": -1.5,
                "Installation Cost": -1.5,
                "Materials of Construction": -1,
                "Operational Energy Consumption": -1,
                "Maintenance": -1.5,
                "Labor": -1
            }
        },
        question7: {
            yes: {
                "Waste Generation": 0.5,
                "Energy Consumption": 1,
                "Emissions Potential": 0.5,
                "Equipment Cost": 1,
                "Installation Cost": 1,
                "Materials of Construction": 1,
                "Operational Energy Consumption": 1,
                "Maintenance": 1,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": -0.5,
                "Energy Consumption": -1,
                "Emissions Potential": -0.5,
                "Equipment Cost": -1,
                "Installation Cost": -1,
                "Materials of Construction": -1,
                "Operational Energy Consumption": -1,
                "Maintenance": -1,
                "Labor": -0.5
            }
        },
        question8: {
            yes: {
                "Waste Generation": 0.5,
                "Energy Consumption": 1,
                "Emissions Potential": 0.5,
                "Equipment Cost": 1,
                "Installation Cost": 1,
                "Materials of Construction": 1,
                "Operational Energy Consumption": 1.5,
                "Maintenance": 1,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": -0.5,
                "Energy Consumption": -1,
                "Emissions Potential": -0.5,
                "Equipment Cost": -1,
                "Installation Cost": -1,
                "Materials of Construction": -1,
                "Operational Energy Consumption": -1.5,
                "Maintenance": -1,
                "Labor": -0.5
            }
        },
        question9: {
            yes: {
                "Waste Generation": 0.5,
                "Energy Consumption": 0.5,
                "Emissions Potential": 1.5,
                "Equipment Cost": 1,
                "Installation Cost": 1,
                "Materials of Construction": 0.5,
                "Operational Energy Consumption": 1,
                "Maintenance": 1,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": -0.5,
                "Energy Consumption": -0.5,
                "Emissions Potential": -1.5,
                "Equipment Cost": -1,
                "Installation Cost": -1,
                "Materials of Construction": -0.5,
                "Operational Energy Consumption": -1,
                "Maintenance": -1,
                "Labor": -0.5
            }
        },
        question10: {
            yes: {
                "Waste Generation": 0.5,
                "Energy Consumption": 0.5,
                "Emissions Potential": 0.5,
                "Equipment Cost": 1.5,
                "Installation Cost": 1.5,
                "Materials of Construction": 1,
                "Operational Energy Consumption": 1,
                "Maintenance": 1.5,
                "Labor": 1
            },
            no: {
                "Waste Generation": -0.5,
                "Energy Consumption": -0.5,
                "Emissions Potential": -0.5,
                "Equipment Cost": -1.5,
                "Installation Cost": -1.5,
                "Materials of Construction": -1,
                "Operational Energy Consumption": -1,
                "Maintenance": -1.5,
                "Labor": -1
            }
        },
        question11: {
            yes: {
                "Waste Generation": 0.5,
                "Energy Consumption": 0.5,
                "Emissions Potential": 0.5,
                "Equipment Cost": 1,
                "Installation Cost": 1,
                "Materials of Construction": 1,
                "Operational Energy Consumption": 1,
                "Maintenance": 1,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": -0.5,
                "Energy Consumption": -0.5,
                "Emissions Potential": -0.5,
                "Equipment Cost": -1,
                "Installation Cost": -1,
                "Materials of Construction": -1,
                "Operational Energy Consumption": -1,
                "Maintenance": -1,
                "Labor": -0.5
            }
        },
        question12: {
            yes: {
                "Waste Generation": 0.5,
                "Energy Consumption": 1,
                "Emissions Potential": 0.5,
                "Equipment Cost": 1,
                "Installation Cost": 1,
                "Materials of Construction": 1,
                "Operational Energy Consumption": 1.5,
                "Maintenance": 1,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": -0.5,
                "Energy Consumption": -1,
                "Emissions Potential": -0.5,
                "Equipment Cost": -1,
                "Installation Cost": -1,
                "Materials of Construction": -1,
                "Operational Energy Consumption": -1.5,
                "Maintenance": -1,
                "Labor": -0.5
            }
        },
        question13: {
            yes: {
                "Waste Generation": 0.5,
                "Energy Consumption": 0.5,
                "Emissions Potential": 0.5,
                "Equipment Cost": 1,
                "Installation Cost": 1,
                "Materials of Construction": 1,
                "Operational Energy Consumption": 1,
                "Maintenance": 1,
                "Labor": 0.5
            },
            no: {
                "Waste Generation": -0.5,
                "Energy Consumption": -0.5,
                "Emissions Potential": -0.5,
                "Equipment Cost": -1,
                "Installation Cost": -1,
                "Materials of Construction": -1,
                "Operational Energy Consumption": -1,
                "Maintenance": -1,
                "Labor": -0.5
            }
        }
    };

    // Apply the impacts based on the user's answers
    for (let questionId in userInputs) {
        let answer = userInputs[questionId];
        if (impactMatrix[questionId] && impactMatrix[questionId][answer]) {
            let impacts = impactMatrix[questionId][answer];
            for (let category in impacts) {
                scores[category] += impacts[category];
            }
        }
    }

    // Normalize scores to a maximum of 5 and minimum of 0
    for (let key in scores) {
        if (scores[key] > 5) {
            scores[key] = 5;
        }
        if (scores[key] < 1) {
            scores[key] = 1;
        }
    }

    return scores;
}


let flowDiagramChart = null;

function renderRadarPlots(scores) {
    const ctx = document.getElementById('FlowDiagramScorePlots').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (flowDiagramChart) {
        flowDiagramChart.destroy();
    }

    // Extract the labels and data from the scores object
    const labels = Object.keys(scores);
    const data = Object.values(scores);

    // Create the radar plot data object
    const radarData = {
        labels: labels,
        datasets: [{
            label: 'Flow Diagram Feasibility',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Create the radar plot configuration
    const radarConfig = {
        type: 'radar',
        data: radarData,
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 5,
                    stepSize: 0.5,
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 5,
                        stepSize: 0.5
                    }
                }
            }
        }
    };

    // Render the radar plot
    flowDiagramChart = new Chart(ctx, radarConfig);
}

async function analyzeFlowDiagram(flowDiagramOutput) {
    try {
        const response = await fetch('/api/analyze-flow-diagram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ flowDiagramOutput }),
        });

        if (response.ok) {
            const data = await response.json();
            displayFlowDiagramAnalysis(data.text);
        } else {
            console.error('Error analyzing flow diagram:', response.statusText);
        }
    } catch (error) {
        console.error('Error analyzing flow diagram:', error);
    }
}

function displayFlowDiagramAnalysis(analysis) {
    const analysisContainer = document.createElement('div');
    analysisContainer.innerHTML = `<h3>LCA Analysis:</h3><p>${analysis}</p>`;
    document.getElementById('flowDiagramOutput').appendChild(analysisContainer);
}


async function startDecisionTree() {
    askQuestion("question1");
}

export { startDecisionTree };

  



  