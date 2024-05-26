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
            button.onclick = () => {
                handleAnswer(questionId, option);
                resolve();
            };
            answerContainer.appendChild(button);
        });
    });
}

function handleAnswer(questionId, answer) {
    userInputs[questionId] = answer;
    const nextQuestionId = decisionTree[questionId].options[answer.toLowerCase()];
    if (nextQuestionId) {
        if (nextQuestionId === "multipleReactorsFinal" || nextQuestionId === "singleReactorFinal") {
            generateResult(nextQuestionId);
        } else {
            askQuestion(nextQuestionId);
        }
    } else {
        generateResult(questionId);
    }
}

function generateResult(finalQuestionId) {
    let result = "Process Flow Diagram:<br>";
    if (finalQuestionId === "multipleReactorsFinal") {
        result += "The commercial process will likely use multiple reactors in series.<br>";
    } else if (finalQuestionId === "singleReactorFinal") {
        result += "The commercial process will likely use a single reactor.<br>";
    }

    // Add detailed logic based on userInputs to compile the process flow diagram
    result += "<br>Details:<br>";
    result += `Number of reactions: ${userInputs.question1 === "one" ? "One" : "More than one"}<br>`;
    result += `Reaction completion: ${userInputs.question2 === "yes" ? "Yes" : "No"}<br>`;
    result += `Byproducts: ${userInputs.question5 === "yes" ? "Yes" : "No"}<br>`;
    result += `Purification: ${userInputs.question6 === "yes" ? "Yes" : "No"}<br>`;
    result += `Temperature constraints: ${userInputs.question7 === "yes" ? "Yes" : "No"}<br>`;
    result += `Exothermic: ${userInputs.question8 === "yes" ? "Yes" : "No"}<br>`;
    result += `Gaseous byproducts: ${userInputs.question9 === "yes" ? "Yes" : "No"}<br>`;
    result += `Specific mixing: ${userInputs.question10 === "yes" ? "Yes" : "No"}<br>`;
    result += `pH constraints: ${userInputs.question11 === "yes" ? "Yes" : "No"}<br>`;
    result += `Solvent recovery: ${userInputs.question12 === "yes" ? "Yes" : "No"}<br>`;
    result += `Time-sensitive: ${userInputs.question13 === "yes" ? "Yes" : "No"}<br>`;

    document.getElementById('flowDiagramOutput').innerHTML = result;
}

async function startDecisionTree() {
    askQuestion("question1");
}

export { startDecisionTree };

  



  