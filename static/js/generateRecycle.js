const userInputs = {};
const questionAnswerPairs = {};

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
        "Economic Feasibility": 0,
        "Technical Feasibility": 0,
        "Safety and Environmental Impact": 0,
        "Process Performance": 0,
        "Scale-Up Considerations": 0,
        "Additional Considerations": 0
    };
    
    const impactMatrix = {
        // Cost Considerations
        "costConsiderations_Yes, they are very expensive.": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "costConsiderations_Moderately expensive.": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "costConsiderations_Not very expensive.": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "costConsiderations_No, they are cheap.": {
            "Economic Feasibility": -1,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Process Duration
        "processDuration_Long-term (years)": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 0,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "processDuration_Medium-term (months)": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "processDuration_Short-term (weeks)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "processDuration_One-time process": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": 0,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
    
        // Chemical and Reaction Analysis 1
        "chemicalAndReactionAnalysis1_Yes, significant impurities.": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "chemicalAndReactionAnalysis1_Yes, but minor impurities.": {
            "Economic Feasibility": 0,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "chemicalAndReactionAnalysis1_No known impurities.": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "chemicalAndReactionAnalysis1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Chemical and Reaction Analysis 2
        "chemicalAndReactionAnalysis2_Yes, significantly.": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "chemicalAndReactionAnalysis2_Yes, but only slightly.": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "chemicalAndReactionAnalysis2_No, they don't affect it.": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "chemicalAndReactionAnalysis2_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Chemical and Reaction Analysis 3
        "chemicalAndReactionAnalysis3_Yes, likely.": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "chemicalAndReactionAnalysis3_Possibly.": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "chemicalAndReactionAnalysis3_Unlikely.": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "chemicalAndReactionAnalysis3_No": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
    
        // Separation and Purification Needs 1
        "separationAndPurificationNeeds1_Distillation": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "separationAndPurificationNeeds1_Filtration": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "separationAndPurificationNeeds1_Crystallization": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "separationAndPurificationNeeds1_Other (specify)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "separationAndPurificationNeeds1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Separation and Purification Needs 2
        "separationAndPurificationNeeds2_Very effective": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "separationAndPurificationNeeds2_Moderately effective": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "separationAndPurificationNeeds2_Slightly effective": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "separationAndPurificationNeeds2_Ineffective": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
    
        // Material Compatibility 1
        "materialCompatibility1_Yes, fully resistant": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "materialCompatibility1_Partially resistant": {
            "Economic Feasibility": 0,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "materialCompatibility1_Not resistant": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "materialCompatibility1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Material Compatibility 2
        "materialCompatibility2_Yes, very likely": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "materialCompatibility2_Possibly": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "materialCompatibility2_Unlikely": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "materialCompatibility2_No": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
    
        // Safety Risks 1
        "safetyRisks1_Yes, high risks": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "safetyRisks1_Moderate risks": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "safetyRisks1_Low risks": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "safetyRisks1_No risks": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
    
        // Safety Risks 2
        "safetyRisks2_Inert atmospheres": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 1,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "safetyRisks2_Regular cleaning": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "safetyRisks2_Safety protocols": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 1,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "safetyRisks2_Other (specify)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "safetyRisks2_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Waste Management 1
        "wasteManagement1_Hazardous waste disposal service": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "wasteManagement1_Neutralization and safe disposal": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "wasteManagement1_Incineration": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "wasteManagement1_Other (specify)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "wasteManagement1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Waste Management 2
        "wasteManagement2_Yes, strict regulations": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "wasteManagement2_Some guidelines": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "wasteManagement2_Minimal guidelines": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "wasteManagement2_No regulations": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
    
        // Process Performance 1
        "reactionEfficiency1_Improves yield and purity": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "reactionEfficiency1_No significant effect": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "reactionEfficiency1_Slightly decreases yield/purity": {
            "Economic Feasibility": -0.5,
            "Technical Feasibility": -0.5,
            "Safety and Environmental Impact": -0.5,
            "Process Performance": -0.5,
            "Scale-Up Considerations": -0.5,
            "Additional Considerations": 0
        },
        "reactionEfficiency1_Significantly decreases yield/purity": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "reactionEfficiency1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Process Performance 2
        "reactionEfficiency2_Increases reaction rate": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "reactionEfficiency2_No significant change": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "reactionEfficiency2_Decreases reaction rate": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "reactionEfficiency2_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Catalyst and Reagent Stability 1
        "catalystAndReagentStability1_Very stable": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "catalystAndReagentStability1_Moderately stable": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "catalystAndReagentStability1_Slightly stable": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "catalystAndReagentStability1_Unstable": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "catalystAndReagentStability1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Catalyst and Reagent Stability 2
        "catalystAndReagentStability2_Yes, every cycle": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "catalystAndReagentStability2_After several cycles": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "catalystAndReagentStability2_Rarely": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "catalystAndReagentStability2_Never": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "catalystAndReagentStability2_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Pilot Testing 1
        "pilotTesting1_Yes, with successful results": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "pilotTesting1_Yes, with mixed results": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "pilotTesting1_No, not tested": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "pilotTesting1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Pilot Testing 2
        "pilotTesting2_Positive, promising": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "pilotTesting2_Neutral, needs improvement": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "pilotTesting2_Negative, not feasible": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "pilotTesting2_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // System Integration 1
        "systemIntegration1_Easily integrates": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "systemIntegration1_Requires some modifications": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "systemIntegration1_Requires significant modifications": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "systemIntegration1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // System Integration 2
        "systemIntegration2_Yes, major equipment": {
            "Economic Feasibility": -1,
            "Technical Feasibility": -1,
            "Safety and Environmental Impact": -1,
            "Process Performance": -1,
            "Scale-Up Considerations": -1,
            "Additional Considerations": 0
        },
        "systemIntegration2_Yes, minor equipment": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "systemIntegration2_No additional equipment": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "systemIntegration2_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Data and Monitoring 1
        "dataAndMonitoring1_Regular chemical analysis": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "dataAndMonitoring1_Automated sensors": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "dataAndMonitoring1_Periodic testing": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "dataAndMonitoring1_Other (specify)": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "dataAndMonitoring1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Data and Monitoring 2
        "dataAndMonitoring2_Impurity levels": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "dataAndMonitoring2_Reaction yield and purity": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "dataAndMonitoring2_Equipment performance": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "dataAndMonitoring2_All of the above": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "dataAndMonitoring2_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Documentation and Reporting 1
        "documentationAndReporting1_Detailed logs": {
            "Economic Feasibility": 0.5,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "documentationAndReporting1_Regular reports": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "documentationAndReporting1_Minimal documentation": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
        "documentationAndReporting1_Unsure": {
            "Economic Feasibility": 0,
            "Technical Feasibility": 0,
            "Safety and Environmental Impact": 0,
            "Process Performance": 0,
            "Scale-Up Considerations": 0,
            "Additional Considerations": 0
        },
    
        // Documentation and Reporting 2
        "documentationAndReporting2_Performance metrics": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "documentationAndReporting2_Cost analysis": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 0.5,
            "Safety and Environmental Impact": 0.5,
            "Process Performance": 0.5,
            "Scale-Up Considerations": 0.5,
            "Additional Considerations": 0
        },
        "documentationAndReporting2_Safety observations": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "documentationAndReporting2_All of the above": {
            "Economic Feasibility": 1,
            "Technical Feasibility": 1,
            "Safety and Environmental Impact": 1,
            "Process Performance": 1,
            "Scale-Up Considerations": 1,
            "Additional Considerations": 0
        },
        "documentationAndReporting2_Unsure": {
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
        const combinedKey = `${questionKey}_${answerKey}`;

        console.log(`Question: ${questionKey}, Answer: ${answerKey}`);

        if (impactMatrix[combinedKey]) {
            const impacts = impactMatrix[combinedKey];
            console.log(`Impacts for ${combinedKey}: `, impacts);
            for (let category in impacts) {
                scores[category] += impacts[category];
                console.log(`Updated score for ${category}: `, scores[category]);
            }
        } else {
            console.warn(`No impacts found for ${combinedKey}`);
        }
    }

    // Normalize scores to a maximum of 5 and minimum of 0
    for (let key in scores) {
        if (scores[key] > 5) {
            scores[key] = 5;
        }
        if (scores[key] < 0) {
            scores[key] = 0;
        }
    }

    console.log("Final Scores: ", scores);
    console.log("Question-Answer Pairs: ", questionAnswerPairs);

    return { scores, questionAnswerPairs };
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
            questionAnswerPairs[question.question] = option;
            const nextQuestionKey = Object.keys(decisionTree)[Object.keys(decisionTree).indexOf(questionKey) + 1];
            if (nextQuestionKey) {
                askQuestionRecycle(nextQuestionKey);
            } else {
                const result = evaluateSafety();
                renderRadarPlot(result.scores); // Pass only the scores to the radar plot function
                console.log(result.questionAnswerPairs); // Use or display question-answer pairs as needed
                
                const analyzeButton = document.createElement('button');
                analyzeButton.textContent = 'Analyse LCA and scale up of recycle Decisions';
                analyzeButton.addEventListener('click', () => {
                    analyzeRecycleDecisions(result.questionAnswerPairs);
                });
                document.getElementById('recycleScorePlotContainer').appendChild(analyzeButton);
                
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

async function analyzeRecycleDecisions(questionAnswerPairs) {
    const analysisContainer = document.createElement('div');
    analysisContainer.innerHTML = '<h3>Life Cycle Assessment and Scale-Up Effects:</h3>';

    for (const [question, answer] of Object.entries(questionAnswerPairs)) {
        try {
            const prompt = `Determine the life cycle impacts and scale-up effects of the following recycle decision:
            - ${question}: ${answer}`;

            const response = await fetch('/api/analyze-recycle-decision', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (response.ok) {
                const data = await response.json();
                const analysis = `<p><strong>${question}</strong><br>${data.text}</p>`;
                analysisContainer.innerHTML += analysis;
            } else {
                console.error('Error analyzing recycle decision:', response.statusText);
            }
        } catch (error) {
            console.error('Error analyzing recycle decision:', error);
        }
    }

    document.getElementById('recycleScorePlotContainer').appendChild(analysisContainer);
}