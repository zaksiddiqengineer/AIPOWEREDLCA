const userInputs = {};
const userQA = {};  // Dictionary to store question:answer pairs

const decisionTree = {
    reactantAddition: {
        question: "How are reactants typically added to your reaction mixture?",
        options: [
            "All at once",
            "Gradually",
            "In stages"
        ]
    },
    orderOfAddition: {
        question: "What is the order of addition of reactants?",
        options: [
            "Fixed order",
            "Varies based on reaction conditions",
            "No specific order"
        ]
    },
    criticalSequence: {
        question: "How critical is the sequence of adding reactants to the success of your reaction?",
        options: [
            "Very critical",
            "Moderately critical",
            "Slightly critical",
            "Not critical"
        ]
    },
    methodAddition: {
        question: "What method do you use to add reactants to the reaction vessel?",
        options: [
            "Manual addition",
            "Automated addition (e.g., pump, syringe)",
            "Gravity feed",
            "Other"
        ]
    },
    controlRate: {
        question: "How do you control the rate of reactant addition?",
        options: [
            "By hand",
            "Using automated equipment",
            "By timing intervals",
            "No control"
        ]
    },
    outcomeDifference: {
        question: "Have you observed any differences in reaction outcomes based on the rate of addition of reactants?",
        options: [
            "Significant differences",
            "Moderate differences",
            "Slight differences",
            "No differences"
        ]
    },
    monitorAddition: {
        question: "How do you monitor the addition of reactants during the reaction?",
        options: [
            "Visual observation",
            "Using sensors or probes",
            "Recording the addition time",
            "Do not monitor"
        ]
    },
    adjustSequence: {
        question: "Do you adjust the sequence of reactant addition based on real-time reaction data?",
        options: [
            "Yes, frequently",
            "Yes, occasionally",
            "No, rarely",
            "No, never"
        ]
    },
    selectivityImpact: {
        question: "How do changes in the sequence of addition affect the selectivity of your reaction?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    modeImpact: {
        question: "What impact does the mode of addition (continuous vs. batch) have on your reaction?",
        options: [
            "Significant impact",
            "Moderate impact",
            "Slight impact",
            "No impact"
        ]
    },
    typicalMode: {
        question: "Which mode of addition do you typically use?",
        options: [
            "Continuous addition",
            "Batch addition",
            "Semi-batch addition"
        ]
    },
    determineOptimalMode: {
        question: "How do you determine the optimal mode of addition for your reaction?",
        options: [
            "Based on literature and previous studies",
            "Through experimental trials",
            "Based on theoretical calculations",
            "No specific method"
        ]
    },
    modeEffectYield: {
        question: "How does the mode of addition affect the yield of your reaction?",
        options: [
            "Increases yield",
            "Decreases yield",
            "No effect on yield",
            "Variable effect"
        ]
    },
    challengesMode: {
        question: "What challenges have you encountered with the mode of reactant addition?",
        options: [
            "Controlling addition rate",
            "Ensuring uniform mixing",
            "Preventing side reactions",
            "No significant challenges"
        ]
    },
    reproducibility: {
        question: "How do you ensure the reproducibility of reactant addition?",
        options: [
            "Using automated systems",
            "Following strict protocols",
            "Frequent calibration and monitoring",
            "No specific measures"
        ]
    },
    handleDeviations: {
        question: "How do you handle deviations from the planned sequence or mode of addition?",
        options: [
            "Adjust parameters in real-time",
            "Stop the reaction and restart",
            "Continue with adjusted protocol",
            "No specific measures"
        ]
    },
    sequenceInfluenceRate: {
        question: "How does the sequence of addition influence the reaction rate?",
        options: [
            "Significantly accelerates",
            "Moderately accelerates",
            "Slightly accelerates",
            "No influence"
        ]
    },
    modeByProducts: {
        question: "How does the mode of addition affect the formation of by-products?",
        options: [
            "Increases by-product formation",
            "Decreases by-product formation",
            "No effect on by-product formation",
            "Variable effect"
        ]
    },
    simulationsOptimization: {
        question: "Do you perform simulations or theoretical calculations to optimize the sequence and mode of addition?",
        options: [
            "Yes, frequently",
            "Yes, occasionally",
            "No, rarely",
            "No, never"
        ]
    },
    validateExperimentally: {
        question: "How do you validate the optimal sequence and mode of addition experimentally?",
        options: [
            "Through controlled lab experiments",
            "Using pilot-scale trials",
            "Based on historical data",
            "Do not validate"
        ]
    },
    timingCriticality: {
        question: "How critical is the timing between additions of different reactants?",
        options: [
            "Very critical",
            "Moderately critical",
            "Slightly critical",
            "Not critical"
        ]
    },
    manageHeat: {
        question: "How do you manage the heat released or absorbed during reactant addition?",
        options: [
            "Using cooling/heating systems",
            "Controlling the rate of addition",
            "Both A and B",
            "No specific measures"
        ]
    },
    sequenceSafety: {
        question: "What impact does the sequence of addition have on reaction safety?",
        options: [
            "Significant impact",
            "Moderate impact",
            "Slight impact",
            "No impact"
        ]
    },
    minimizeSafetyRisks: {
        question: "How do you ensure the addition sequence minimizes safety risks?",
        options: [
            "Following safety protocols",
            "Using safety equipment",
            "Both A and B",
            "No specific measures"
        ]
    },
    documentation: {
        question: "How do you document the sequence and mode of addition for reproducibility and scale-up purposes?",
        options: [
            "Detailed lab notes",
            "Electronic lab records",
            "Standard operating procedures (SOPs)",
            "No specific documentation"
        ]
    },
    scaleUp: {
        question: "How do you scale up the sequence and mode of addition from lab-scale to industrial-scale?",
        options: [
            "Direct scale-up",
            "Pilot-scale trials",
            "Theoretical calculations and adjustments",
            "Combination of the above"
        ]
    },
    modeImpactProduct: {
        question: "What impact does the mode of addition have on the physical properties of the final product?",
        options: [
            "Significant impact",
            "Moderate impact",
            "Slight impact",
            "No impact"
        ]
    },
    optimizeProductQuality: {
        question: "How do you optimize the sequence and mode of addition to enhance product quality?",
        options: [
            "Experimental optimization",
            "Theoretical modeling",
            "Combination of both",
            "No optimization"
        ]
    },
    uniformDistribution: {
        question: "What methods do you use to ensure uniform distribution of reactants during addition?",
        options: [
            "Stirring/agitation",
            "Use of baffles",
            "Controlled addition rate",
            "All of the above"
        ]
    },
    concentrationEffect: {
        question: "How does the concentration of reactants affect the sequence and mode of addition?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    }
};
