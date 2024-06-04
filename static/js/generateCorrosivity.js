const decisionTree = {
    chemicalComposition: {
        question: "What are the main chemicals involved in your reaction?",
        options: [
            "Acids",
            "Bases",
            "Salts",
            "Organic solvents",
            "Others"
        ]
    },
    corrosiveNature: {
        question: "Are any of the chemicals in your reaction known to be corrosive?",
        options: [
            "Yes, highly corrosive",
            "Yes, moderately corrosive",
            "Yes, slightly corrosive",
            "No"
        ]
    },
    corrosivityClassification: {
        question: "How would you classify the corrosivity of the chemicals involved?",
        options: [
            "Strong acids/bases",
            "Weak acids/bases",
            "Oxidizing agents",
            "Reducing agents",
            "Others"
        ]
    },
    materialCompatibility: {
        question: "Are the materials of your reaction vessel and mixing equipment compatible with the chemicals used?",
        options: [
            "Yes, fully compatible",
            "Mostly compatible",
            "Somewhat compatible",
            "Not compatible"
        ]
    },
    corrosionInhibitors: {
        question: "Do you use any corrosion inhibitors in your reaction?",
        options: [
            "Yes, always",
            "Yes, sometimes",
            "Rarely",
            "Never"
        ]
    },
    reactionEnvironment: {
        question: "What is the pH range of your reaction mixture?",
        options: [
            "Highly acidic (pH < 3)",
            "Mildly acidic (pH 3-6)",
            "Neutral (pH 6-8)",
            "Mildly basic (pH 8-11)",
            "Highly basic (pH > 11)"
        ]
    },
    temperatureEffects: {
        question: "Does temperature influence the corrosivity of your reaction mixture?",
        options: [
            "Yes, significantly",
            "Yes, moderately",
            "Yes, slightly",
            "No"
        ]
    },
    pressureEffects: {
        question: "Does pressure influence the corrosivity of your reaction mixture?",
        options: [
            "Yes, significantly",
            "Yes, moderately",
            "Yes, slightly",
            "No"
        ]
    },
    exposureDuration: {
        question: "What is the typical duration of exposure to corrosive substances in your reaction?",
        options: [
            "Less than 1 hour",
            "1-4 hours",
            "4-8 hours",
            "More than 8 hours"
        ]
    },
    corrosionMonitoring: {
        question: "How do you monitor corrosion during your reaction?",
        options: [
            "Visual inspection",
            "Corrosion sensors",
            "Regular sampling and analysis",
            "Do not monitor"
        ]
    },
    corrosionRate: {
        question: "Have you measured the corrosion rate of your reaction mixture?",
        options: [
            "Yes, frequently",
            "Yes, occasionally",
            "No, but estimated",
            "No"
        ]
    },
    corrosiveByproducts: {
        question: "Are there any corrosive byproducts formed during your reaction?",
        options: [
            "Yes, highly corrosive byproducts",
            "Yes, moderately corrosive byproducts",
            "Yes, slightly corrosive byproducts",
            "No"
        ]
    },
    surfaceAreaExposure: {
        question: "What is the surface area exposure of materials to the corrosive chemicals?",
        options: [
            "Large surface area",
            "Moderate surface area",
            "Small surface area",
            "Minimal surface area"
        ]
    },
    protectiveCoatings: {
        question: "Do you use protective coatings on your equipment to prevent corrosion?",
        options: [
            "Yes, always",
            "Yes, sometimes",
            "Rarely",
            "Never"
        ]
    },
    materialDegradation: {
        question: "Have you observed any material degradation over time due to corrosion?",
        options: [
            "Yes, significant degradation",
            "Yes, moderate degradation",
            "Yes, slight degradation",
            "No"
        ]
    },
    maintenanceFrequency: {
        question: "How frequently do you perform maintenance to address corrosion-related issues?",
        options: [
            "Very frequently",
            "Frequently",
            "Occasionally",
            "Rarely"
        ]
    },
    safetyPrecautions: {
        question: "What safety precautions do you take to handle corrosive substances?",
        options: [
            "Use of PPE (Personal Protective Equipment)",
            "Specialized equipment and containment",
            "Engineering controls (e.g., ventilation)",
            "None"
        ]
    },
    disposalMethods: {
        question: "How do you dispose of corrosive waste materials?",
        options: [
            "Neutralization before disposal",
            "Special hazardous waste protocols",
            "Regular waste disposal",
            "Other methods"
        ]
    },
    regulatoryCompliance: {
        question: "Are there specific regulations you must follow for handling and disposing of corrosive substances?",
        options: [
            "Yes, strict regulations",
            "Yes, moderate regulations",
            "Yes, minimal regulations",
            "No regulations"
        ]
    },
    trainingAndProcedures: {
        question: "Do you have specific training and procedures for working with corrosive chemicals?",
        options: [
            "Yes, comprehensive training",
            "Yes, basic training",
            "Minimal training",
            "No training"
        ]
    },
    historicalIncidents: {
        question: "Have there been any incidents or near-misses related to corrosivity in your lab?",
        options: [
            "Yes, several incidents",
            "Yes, a few incidents",
            "No incidents, but near-misses",
            "No incidents"
        ]
    },
    corrosionImpactOnYield: {
        question: "How does corrosion affect the yield and purity of your reaction products?",
        options: [
            "Significantly reduces yield/purity",
            "Moderately reduces yield/purity",
            "Slightly reduces yield/purity",
            "No impact"
        ]
    },
    reactionVesselMaterial: {
        question: "What material is your reaction vessel made of?",
        options: [
            "Glass",
            "Stainless steel",
            "Teflon",
            "Other"
        ]
    },
    impactOfCleaningProcedures: {
        question: "How do your cleaning procedures impact the integrity of your equipment with respect to corrosion?",
        options: [
            "Significantly impacts",
            "Moderately impacts",
            "Slightly impacts",
            "No impact"
        ]
    },
    useOfPassivation: {
        question: "Do you use passivation techniques to mitigate corrosion?",
        options: [
            "Yes, regularly",
            "Yes, occasionally",
            "Rarely",
            "Never"
        ]
    }
};
