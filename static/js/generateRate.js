const userInputs = {};

const decisionTree = {
    impactOnYield: {
        question: "How does the rate of your reaction impact the overall yield?",
        options: [
            "Significantly increases yield",
            "Moderately increases yield",
            "Slightly increases yield",
            "No impact on yield"
        ]
    },
    impactOnSelectivity: {
        question: "How does the rate of reaction affect the selectivity of your reaction?",
        options: [
            "Significantly affects selectivity",
            "Moderately affects selectivity",
            "Slightly affects selectivity",
            "No impact on selectivity"
        ]
    },
    optimalRate: {
        question: "What is the optimal reaction rate for your process?",
        options: [
            "Fast",
            "Moderate",
            "Slow",
            "Variable"
        ]
    },
    measureAndControl: {
        question: "How do you measure and control the rate of your reaction?",
        options: [
            "Monitoring concentration changes",
            "Temperature control",
            "Catalyst addition",
            "Other methods"
        ]
    },
    sensitivityToChanges: {
        question: "How sensitive is your reaction to changes in reaction rate?",
        options: [
            "Highly sensitive",
            "Moderately sensitive",
            "Slightly sensitive",
            "Not sensitive"
        ]
    },
    influenceOfReactantAddition: {
        question: "How does the rate of addition of reactants influence your reaction?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    temperatureImpact: {
        question: "How does temperature impact the rate of your reaction?",
        options: [
            "Significantly increases rate",
            "Moderately increases rate",
            "Slightly increases rate",
            "No impact on rate"
        ]
    },
    concentrationImpact: {
        question: "How does the concentration of reactants impact the rate of your reaction?",
        options: [
            "Significantly increases rate",
            "Moderately increases rate",
            "Slightly increases rate",
            "No impact on rate"
        ]
    },
    pressureImpact: {
        question: "How do pressure changes affect the rate of your reaction?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    ensureConsistency: {
        question: "How do you ensure the reaction rate is consistent throughout the process?",
        options: [
            "Continuous monitoring and adjustment",
            "Pre-set reaction conditions",
            "Periodic sampling",
            "No specific measures"
        ]
    },
    roleOfCatalyst: {
        question: "What role does the catalyst play in controlling the reaction rate?",
        options: [
            "Major role",
            "Moderate role",
            "Minor role",
            "No role"
        ]
    },
    mixingInfluence: {
        question: "How does mixing influence the reaction rate in your process?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    determineOptimalRate: {
        question: "How do you determine the optimal rate for reagent addition?",
        options: [
            "Empirical testing",
            "Theoretical calculations",
            "Past experience",
            "No specific method"
        ]
    },
    byProductsFormation: {
        question: "How does the rate of reaction affect the formation of by-products?",
        options: [
            "Significantly increases by-products",
            "Moderately increases by-products",
            "Slightly increases by-products",
            "No impact on by-products"
        ]
    },
    safetyImpact: {
        question: "How do changes in reaction rate impact the safety of the process?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    energyRequirements: {
        question: "How does the rate of reaction influence the energy requirements of the process?",
        options: [
            "Significantly increases energy requirements",
            "Moderately increases energy requirements",
            "Slightly increases energy requirements",
            "No impact on energy requirements"
        ]
    },
    scalabilityImpact: {
        question: "How does the rate of reaction affect the scalability of the process?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    optimizeScaleUp: {
        question: "How do you optimize the rate of reaction during the scale-up process?",
        options: [
            "Pilot-scale testing",
            "Simulation and modeling",
            "Incremental scaling",
            "No specific optimization"
        ]
    },
    environmentalImpact: {
        question: "How does the rate of reaction affect the environmental impact of the process?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    impuritiesImpact: {
        question: "How do impurities in reactants influence the reaction rate?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    solventChoiceImpact: {
        question: "How does solvent choice impact the reaction rate?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    productQualityImpact: {
        question: "How does the rate of reaction influence the quality of the final product?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    reproducibilityImpact: {
        question: "How does the rate of reaction affect the reproducibility of the process?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    externalFactorsImpact: {
        question: "How do external factors (e.g., ambient conditions) impact the reaction rate?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    downstreamProcessingImpact: {
        question: "How does the rate of reaction influence the downstream processing steps?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    controlStrategyImpact: {
        question: "How does reaction rate variability affect process control strategies?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    monitorChanges: {
        question: "How do you monitor changes in reaction rate during the process?",
        options: [
            "Continuous real-time monitoring",
            "Periodic sampling",
            "End-point analysis",
            "Do not monitor"
        ]
    },
    crystallizationImpact: {
        question: "How does the rate of reaction affect the crystallization process?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    filtrationImpact: {
        question: "How does the reaction rate impact the filtration or separation steps?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    },
    equipmentScaleImpact: {
        question: "How does the rate of reaction influence the scale of equipment required?",
        options: [
            "Significantly",
            "Moderately",
            "Slightly",
            "Not at all"
        ]
    }
};

function evaluateSafety() {

    const scores = {
        "Reaction Yield": 1,
        "Selectivity": 1,
        "Rate Control": 1,
        "Sensitivity to Rate Changes": 1,
        "Addition Rate of Reactants": 1,
        "Temperature Influence": 1,
        "Concentration Influence": 1,
        "Pressure Influence": 1,
        "Catalyst Influence": 1,
        "Mixing Influence": 1,
        "By-Product Formation": 1,
        "Safety Impact": 1,
        "Energy Requirements": 1,
        "Scalability": 1,
        "Environmental Impact": 1,
        "Impurities Influence": 1,
        "Solvent Influence": 1,
        "Product Quality": 1,
        "Process Reproducibility": 1,
        "External Factors Influence": 1,
        "Downstream Processing Impact": 1,
        "Process Control Strategies": 1,
        "Monitoring Changes": 1,
        "Crystallization Impact": 1,
        "Filtration/Separation Impact": 1,
        "Equipment Scale Requirements": 1
    };

    const impactMatrix = {
        // question 1: How does the rate of your reaction impact the overall yield?
        "reactionYield_Significantly increases yield": {
            "Reaction Yield": 1,
            "Selectivity": 0,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "reactionYield_Moderately increases yield": {
            "Reaction Yield": 0.5,
            "Selectivity": 0,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "reactionYield_Slightly increases yield": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "reactionYield_No impact on yield": {
            "Reaction Yield": -1,
            "Selectivity": 0,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        // question 2: How does the rate of reaction affect the selectivity of your reaction?
        "reactionSelectivity_Significantly affects selectivity": {
            "Reaction Yield": 0,
            "Selectivity": 1,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "reactionSelectivity_Moderately affects selectivity": {
            "Reaction Yield": 0,
            "Selectivity": 0.5,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "reactionSelectivity_Slightly affects selectivity": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "reactionSelectivity_No impact on selectivity": {
            "Reaction Yield": 0,
            "Selectivity": -1,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        // question 3: What is the optimal reaction rate for your process?
        "optimalRate_Fast": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 1,
            "Sensitivity to Rate Changes": 1,
            "Addition Rate of Reactants": 1,
            "Temperature Influence": 1,
            "Concentration Influence": 1,
            "Pressure Influence": 1,
            "Catalyst Influence": 1,
            "Mixing Influence": 1,
            "By-Product Formation": 0,
            "Safety Impact": 0.5,
            "Energy Requirements": 0.5,
            "Scalability": 0.5,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "optimalRate_Moderate": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 0.5,
            "Sensitivity to Rate Changes": 0.5,
            "Addition Rate of Reactants": 0.5,
            "Temperature Influence": 0.5,
            "Concentration Influence": 0.5,
            "Pressure Influence": 0.5,
            "Catalyst Influence": 0.5,
            "Mixing Influence": 0.5,
            "By-Product Formation": 0,
            "Safety Impact": 0.5,
            "Energy Requirements": 0.5,
            "Scalability": 0.5,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "optimalRate_Slow": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": -1,
            "Sensitivity to Rate Changes": 1,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0.5,
            "Concentration Influence": 0.5,
            "Pressure Influence": 0.5,
            "Catalyst Influence": 0.5,
            "Mixing Influence": 0.5,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "optimalRate_Variable": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        // question 4: How do you measure and control the rate of your reaction?
        "rateMeasurement_Monitoring concentration changes": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 1,
            "Sensitivity to Rate Changes": 0,
            "Addition Rate of Reactants": 0.5,
            "Temperature Influence": 0,
            "Concentration Influence": 1,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0.5,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 1,
            "Monitoring Changes": 1,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "rateMeasurement_Temperature control": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 1,
            "Sensitivity to Rate Changes": 0.5,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 1,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0.5,
            "Energy Requirements": 1,
            "Scalability": 0.5,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0.5,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 1,
            "Monitoring Changes": 1,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "rateMeasurement_Catalyst addition": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 1,
            "Sensitivity to Rate Changes": 0.5,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 1,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0.5,
            "Energy Requirements": 0,
            "Scalability": 0.5,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 1,
            "Monitoring Changes": 1,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "rateMeasurement_Other methods": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 1,
            "Sensitivity to Rate Changes": 0.5,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0.5,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 1,
            "Monitoring Changes": 1,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        // question 5: How sensitive is your reaction to changes in reaction rate?
        "sensitivityRate_Highly sensitive": {
            "Reaction Yield": 0,
            "Selectivity": 0.5,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 1,
            "Addition Rate of Reactants": 1,
            "Temperature Influence": 0.5,
            "Concentration Influence": 0.5,
            "Pressure Influence": 0,
            "Catalyst Influence": 0.5,
            "Mixing Influence": 0.5,
            "By-Product Formation": 0.5,
            "Safety Impact": 0.5,
            "Energy Requirements": 0.5,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0.5,
            "Process Reproducibility": 0.5,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 1,
            "Monitoring Changes": 1,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "sensitivityRate_Moderately sensitive": {
            "Reaction Yield": 0,
            "Selectivity": 0.5,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0.5,
            "Addition Rate of Reactants": 0.5,
            "Temperature Influence": 0.5,
            "Concentration Influence": 0.5,
            "Pressure Influence": 0,
            "Catalyst Influence": 0.5,
            "Mixing Influence": 0.5,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0.5,
            "Process Reproducibility": 0.5,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 1,
            "Monitoring Changes": 1,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "sensitivityRate_Slightly sensitive": {
            "Reaction Yield": 0,
            "Selectivity": 0.5,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": 0.5,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0.5,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0.5,
            "Process Reproducibility": 0.5,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        },
        "sensitivityRate_Not sensitive": {
            "Reaction Yield": 0,
            "Selectivity": 0,
            "Rate Control": 0,
            "Sensitivity to Rate Changes": -1,
            "Addition Rate of Reactants": 0,
            "Temperature Influence": 0,
            "Concentration Influence": 0,
            "Pressure Influence": 0,
            "Catalyst Influence": 0,
            "Mixing Influence": 0,
            "By-Product Formation": 0,
            "Safety Impact": 0,
            "Energy Requirements": 0,
            "Scalability": 0,
            "Environmental Impact": 0,
            "Impurities Influence": 0,
            "Solvent Influence": 0,
            "Product Quality": 0,
            "Process Reproducibility": 0,
            "External Factors Influence": 0,
            "Downstream Processing Impact": 0,
            "Process Control Strategies": 0,
            "Monitoring Changes": 0,
            "Crystallization Impact": 0,
            "Filtration/Separation Impact": 0,
            "Equipment Scale Requirements": 0
        }
    };



    }


