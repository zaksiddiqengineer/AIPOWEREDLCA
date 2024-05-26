const userInputs = {};

const decisionTree = {
    costConsiderations: {
        question: "Are the chemicals (solvents and unreacted feeds) expensive enough to justify recycling them?",
        options: [
            "Yes, they are very expensive.",
            "Moderately expensive.",
            "Not very expensive.",
            "No, they are cheap."
        ]
    },
    processDuration: {
        question: "How long is the process expected to run?",
        options: [
            "Long-term (years)",
            "Medium-term (months)",
            "Short-term (weeks)",
            "One-time process"
        ]
    },
    chemicalAndReactionAnalysis1: {
        question: "Are there any impurities or byproducts known to form during the reaction?",
        options: [
            "Yes, significant impurities.",
            "Yes, but minor impurities.",
            "No known impurities.",
            "Unsure"
        ]
    },
    chemicalAndReactionAnalysis2: {
        question: "Do these impurities affect the reaction yield or product quality?",
        options: [
            "Yes, significantly.",
            "Yes, but only slightly.",
            "No, they don't affect it.",
            "Unsure"
        ]
    },
    chemicalAndReactionAnalysis3: {
        question: "Could there be unknown impurities that might impact the reaction?",
        options: [
            "Yes, likely.",
            "Possibly.",
            "Unlikely.",
            "No"
        ]
    },
    separationAndPurificationNeeds1: {
        question: "What methods can be used to separate impurities from the desired chemicals (e.g., filtration, distillation)?",
        options: [
            "Distillation",
            "Filtration",
            "Crystallization",
            "Other (specify)",
            "Unsure"
        ]
    },
    separationAndPurificationNeeds2: {
        question: "How effective are these methods in removing impurities?",
        options: [
            "Very effective",
            "Moderately effective",
            "Slightly effective",
            "Ineffective"
        ]
    },
    materialCompatibility1: {
        question: "Are the materials of your equipment resistant to the chemicals used in the process?",
        options: [
            "Yes, fully resistant",
            "Partially resistant",
            "Not resistant",
            "Unsure"
        ]
    },
    materialCompatibility2: {
        question: "Could the buildup of impurities cause corrosion or damage to the equipment?",
        options: [
            "Yes, very likely",
            "Possibly",
            "Unlikely",
            "No"
        ]
    },
    safetyRisks1: {
        question: "Are there any safety risks associated with the chemicals if they accumulate in the system (e.g., flammability, toxicity)?",
        options: [
            "Yes, high risks",
            "Moderate risks",
            "Low risks",
            "No risks"
        ]
    },
    safetyRisks2: {
        question: "How can you minimize these risks (e.g., using inert atmospheres, regular cleaning)?",
        options: [
            "Inert atmospheres",
            "Regular cleaning",
            "Safety protocols",
            "Other (specify)",
            "Unsure"
        ]
    },
    wasteManagement1: {
        question: "If you do not recycle, how will you dispose of the chemicals and unreacted materials?",
        options: [
            "Hazardous waste disposal service",
            "Neutralization and safe disposal",
            "Incineration",
            "Other (specify)",
            "Unsure"
        ]
    },
    wasteManagement2: {
        question: "Are there regulations or guidelines for disposing of these chemicals safely?",
        options: [
            "Yes, strict regulations",
            "Some guidelines",
            "Minimal guidelines",
            "No regulations"
        ]
    },
    reactionEfficiency1: {
        question: "How does recycling affect the reaction yield and product purity?",
        options: [
            "Improves yield and purity",
            "No significant effect",
            "Slightly decreases yield/purity",
            "Significantly decreases yield/purity",
            "Unsure"
        ]
    },
    reactionEfficiency2: {
        question: "Are there any changes in reaction rate when recycled materials are used?",
        options: [
            "Increases reaction rate",
            "No significant change",
            "Decreases reaction rate",
            "Unsure"
        ]
    },
    catalystAndReagentStability1: {
        question: "How stable are your catalysts and reagents after repeated use and recycling?",
        options: [
            "Very stable",
            "Moderately stable",
            "Slightly stable",
            "Unstable",
            "Unsure"
        ]
    },
    catalystAndReagentStability2: {
        question: "Do you need to regenerate or replace the catalyst after each cycle?",
        options: [
            "Yes, every cycle",
            "After several cycles",
            "Rarely",
            "Never",
            "Unsure"
        ]
    },
    pilotTesting1: {
        question: "Have you tested the recycling process on a small scale in the lab?",
        options: [
            "Yes, with successful results",
            "Yes, with mixed results",
            "No, not tested",
            "Unsure"
        ]
    },
    pilotTesting2: {
        question: "What were the results of these tests?",
        options: [
            "Positive, promising",
            "Neutral, needs improvement",
            "Negative, not feasible",
            "Unsure"
        ]
    },
    systemIntegration1: {
        question: "How will the recycling system fit into your current lab setup?",
        options: [
            "Easily integrates",
            "Requires some modifications",
            "Requires significant modifications",
            "Unsure"
        ]
    },
    systemIntegration2: {
        question: "Do you need any additional equipment or modifications to implement the recycle system?",
        options: [
            "Yes, major equipment",
            "Yes, minor equipment",
            "No additional equipment",
            "Unsure"
        ]
    },
    dataAndMonitoring1: {
        question: "How will you monitor the levels of impurities in the recycled materials?",
        options: [
            "Regular chemical analysis",
            "Automated sensors",
            "Periodic testing",
            "Other (specify)",
            "Unsure"
        ]
    },
    dataAndMonitoring2: {
        question: "What data will you collect to assess the performance of the recycle system?",
        options: [
            "Impurity levels",
            "Reaction yield and purity",
            "Equipment performance",
            "All of the above",
            "Unsure"
        ]
    },
    documentationAndReporting1: {
        question: "How will you document the performance and any issues with the recycle system?",
        options: [
            "Detailed logs",
            "Regular reports",
            "Minimal documentation",
            "Unsure"
        ]
    },
    documentationAndReporting2: {
        question: "What information will be important to report for further scale-up decisions?",
        options: [
            "Performance metrics",
            "Cost analysis",
            "Safety observations",
            "All of the above",
            "Unsure"
        ]
    }
};

function evaluateSafety() {
    const scores = {
        "Economic Feasibility": 1,
        "Technical Feasibility": 1,
        "Safety and Environmental Impact": 1,
        "Process Performance": 1,
        "Scale-Up Considerations": 1,
        "Additional Considerations": 1
    };
    
    const impactMatrix = {
        // Cost Considerations
        "Yes, they are very expensive.": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },

        "Moderately expensive.": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Not very expensive.": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "No, they are cheap.": {
            "Economic Feasibility": -1,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Process Duration
        "Long-term (years)": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 0,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Medium-term (months)": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Short-term (weeks)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "One-time process": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": 0,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
    
        // Chemical and Reaction Analysis
        "Yes, significant impurities.": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Yes, but minor impurities.": {
            "Economic Feasibility": 0,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "No known impurities.": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Yes, significantly.": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Yes, but only slightly.": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "No, they don't affect it.": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Yes, likely.": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Possibly.": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "Unlikely.": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "No": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
    
        // Separation and Purification Needs
        "Distillation": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Filtration": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Crystallization": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Other (specify)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Very effective": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Moderately effective": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Slightly effective": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Ineffective": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
    
        // Material Compatibility
        "Yes, fully resistant": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Partially resistant": {
            "Economic Feasibility": 0,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "Not resistant": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Yes, very likely": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Possibly": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "Unlikely": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "No": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
    
        // Safety Risks
        "Yes, high risks": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Moderate risks": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "Low risks": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "No risks": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Inert atmospheres": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 1,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Regular cleaning": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Safety protocols": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 1,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Other (specify)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Waste Management
        "Hazardous waste disposal service": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Neutralization and safe disposal": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Incineration": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "Other (specify)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Yes, strict regulations": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Some guidelines": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Minimal guidelines": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "No regulations": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
    
        // Process Performance
        "Improves yield and purity": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "No significant effect": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Slightly decreases yield/purity": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "Significantly decreases yield/purity": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Increases reaction rate": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "No significant change": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Decreases reaction rate": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Catalyst and Reagent Stability
        "Very stable": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Moderately stable": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Slightly stable": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Unstable": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Yes, every cycle": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "After several cycles": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Rarely": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Never": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Pilot Testing
        "Yes, with successful results": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Yes, with mixed results": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "No, not tested": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Positive, promising": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Neutral, needs improvement": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Negative, not feasible": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // System Integration
        "Easily integrates": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Requires some modifications": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Requires significant modifications": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Yes, major equipment": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "Yes, minor equipment": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "No additional equipment": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Data and Monitoring
        "Regular chemical analysis": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Automated sensors": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Periodic testing": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Other (specify)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Impurity levels": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Reaction yield and purity": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Equipment performance": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "All of the above": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Documentation and Reporting
        "Detailed logs": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Regular reports": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Minimal documentation": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "Performance metrics": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Cost analysis": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "Safety observations": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "All of the above": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
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

export function askQuestionRecycle(questionKey) {
    const question = decisionTree[questionKey];
    const questionDiv = document.getElementById('recycleQuestion');
    const answersDiv = document.getElementById('recycleAnswers');

    questionDiv.textContent = question.question;
    answersDiv.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            userInputs[questionKey] = index;
            const nextQuestionKey = Object.keys(decisionTree)[Object.keys(decisionTree).indexOf(questionKey) + 1];
            if (nextQuestionKey) {
                askQuestionRecycle(nextQuestionKey);
            } else {
                const scores = evaluateSafety();
                renderRadarPlot(scores);

                const reactionKineticsContainer = document.getElementById('reactionKineticsContainer');
                reactionKineticsContainer.style.display = 'block';
            }
        });
        answersDiv.appendChild(button);
    });
}

export function renderRadarPlot(scores) {
    const ctx = document.getElementById('recycleScorePlots').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(scores),
            datasets: [{
                label: 'Recycle Scores',
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