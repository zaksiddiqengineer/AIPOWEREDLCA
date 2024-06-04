const userInputs = {};

const decisionTree = {
    gasProduction: {
        question: "Does your reaction produce any gases?",
        options: [
            "Yes, significant gas production",
            "Yes, moderate gas production",
            "Yes, minor gas production",
            "No, no gas production"
        ]
    },
    gasType: {
        question: "What type of gases are produced in your reaction?",
        options: [
            "Flammable gases (e.g., hydrogen, methane)",
            "Toxic gases (e.g., carbon monoxide, chlorine)",
            "Inert gases (e.g., nitrogen, argon)",
            "Other"
        ]
    },
    gasEvolutionStage: {
        question: "At what stage of the reaction does gas evolution occur?",
        options: [
            "Initiation",
            "Intermediate stages",
            "Final stages",
            "Throughout the reaction"
        ]
    },
    gasMonitoring: {
        question: "How do you monitor gas evolution during the reaction?",
        options: [
            "Gas flow meters",
            "Pressure sensors",
            "Visual observation",
            "Do not monitor"
        ]
    },
    gasEvolutionRate: {
        question: "What is the rate of gas evolution in your reaction?",
        options: [
            "Rapid",
            "Moderate",
            "Slow",
            "Not applicable"
        ]
    },
    pressureManagement: {
        question: "How do you manage the pressure build-up from gas evolution?",
        options: [
            "Pressure relief valves",
            "Venting systems",
            "Continuous monitoring and manual release",
            "No specific measures"
        ]
    },
    reactionRateImpact: {
        question: "How does gas evolution impact the overall reaction rate?",
        options: [
            "Significantly accelerates the reaction",
            "Moderately accelerates the reaction",
            "No significant impact",
            "Slows down the reaction"
        ]
    },
    gasCaptureMechanisms: {
        question: "Do you have any mechanisms in place to capture or scrub evolved gases?",
        options: [
            "Yes, scrubbers",
            "Yes, condensers",
            "Yes, absorbers",
            "No mechanisms"
        ]
    },
    mixingImpact: {
        question: "How does gas evolution affect the mixing process in your reaction?",
        options: [
            "Enhances mixing",
            "No significant effect",
            "Hinders mixing",
            "Not applicable"
        ]
    },
    safetyCriticality: {
        question: "How critical is the control of gas evolution for the safety of your reaction?",
        options: [
            "Very critical",
            "Moderately critical",
            "Slightly critical",
            "Not critical"
        ]
    },
    temperatureEffect: {
        question: "How does temperature affect gas evolution in your reaction?",
        options: [
            "Significantly increases gas evolution",
            "Moderately increases gas evolution",
            "Slightly increases gas evolution",
            "No effect"
        ]
    },
    riskMitigation: {
        question: "What measures do you take to mitigate the risks associated with gas evolution?",
        options: [
            "Use of inhibitors or stabilizers",
            "Temperature control",
            "Pressure control",
            "No specific measures"
        ]
    },
    gasVolumeDetermination: {
        question: "How do you determine the volume of gas evolved during the reaction?",
        options: [
            "Calculations based on stoichiometry",
            "Experimental measurements",
            "Estimations based on similar reactions",
            "Do not determine"
        ]
    },
    maxPressureTolerance: {
        question: "What is the maximum pressure tolerated by your reaction setup due to gas evolution?",
        options: [
            "Less than 1 atm",
            "1-5 atm",
            "5-10 atm",
            "More than 10 atm"
        ]
    },
    safeVenting: {
        question: "How do you ensure the safe venting of gases during the reaction?",
        options: [
            "Dedicated venting systems",
            "Use of fume hoods",
            "Regular manual venting",
            "No specific measures"
        ]
    },
    additivesUsage: {
        question: "Do you use any additives to control gas evolution in your reaction?",
        options: [
            "Yes, consistently",
            "Yes, occasionally",
            "Rarely",
            "No"
        ]
    },
    scaleUpComparison: {
        question: "How do gas evolution rates compare between lab-scale and potential scale-up conditions?",
        options: [
            "Significantly different",
            "Moderately different",
            "Slightly different",
            "No difference"
        ]
    },
    gasDisposal: {
        question: "How do you manage the collection and disposal of evolved gases?",
        options: [
            "On-site neutralization or treatment",
            "Collection in gas cylinders",
            "Direct venting to atmosphere with safety measures",
            "No specific management"
        ]
    },
    downstreamImpact: {
        question: "How does gas evolution affect downstream processes (e.g., purification, separation)?",
        options: [
            "Significantly impacts downstream processes",
            "Moderately impacts downstream processes",
            "Slightly impacts downstream processes",
            "No impact"
        ]
    },
    captureSystemValidation: {
        question: "How do you validate the efficiency of gas capture and scrubbing systems?",
        options: [
            "Regular testing and calibration",
            "Occasional checks",
            "Visual inspection",
            "Do not validate"
        ]
    },
    reactionSelectivityImpact: {
        question: "What is the impact of gas evolution on reaction selectivity?",
        options: [
            "Significantly affects selectivity",
            "Moderately affects selectivity",
            "Slightly affects selectivity",
            "No effect"
        ]
    },
    homogeneityEnsuring: {
        question: "How do you ensure the homogeneity of the reaction mixture during gas evolution?",
        options: [
            "Continuous stirring",
            "Use of baffles or deflectors",
            "Periodic agitation",
            "No specific measures"
        ]
    },
    gasConcentrationMeasurement: {
        question: "How do you measure the concentration of gases evolved during the reaction?",
        options: [
            "Gas chromatography",
            "Mass spectrometry",
            "Chemical absorption",
            "Do not measure"
        ]
    },
    unexpectedIncreasesHandling: {
        question: "How do you deal with unexpected increases in gas evolution during the reaction?",
        options: [
            "Adjust reaction parameters",
            "Emergency venting procedures",
            "Temporary halt of the reaction",
            "No specific procedures"
        ]
    },
    scaleUpDataIncorporation: {
        question: "How do you incorporate the data from gas evolution studies into your scale-up plans?",
        options: [
            "Detailed simulations and modeling",
            "Empirical adjustments based on lab data",
            "Use of standard scale-up factors",
            "Do not incorporate"
        ]
    }
};