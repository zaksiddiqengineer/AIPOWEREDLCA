const userInputs = {};
const questionAnswerPairs = {};

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
    compatibilityWithOtherReagents: {
        question: "Is there compatibility of all reagents used in combination with the other reagents present?",
        options: [
            "Yes, all reagents are compatible",
            "No, some reagents are incompatible",
            "Compatibility not fully assessed"
        ]
    },
    compatibilityWithContaminants: {
        question: "Is there compatibility of the reagents with possible main contaminants in other reagents?",
        options: [
            "Yes, all reagents are compatible with contaminants",
            "No, some reagents are incompatible with contaminants",
            "Compatibility with contaminants not fully assessed"
        ]
    },
    compatibilityWithConstructionMaterials: {
        question: "Is there compatibility of the reagents with construction materials such as stainless steel (vessel wall), sealings (Kalrez, Teflon, etc.)?",
        options: [
            "Yes, all reagents are compatible with construction materials",
            "No, some reagents are incompatible with construction materials",
            "Compatibility with construction materials not fully assessed"
        ]
    },
    compatibilityWithEnvironmentalFactors: {
        question: "Is there compatibility of all products used with environmental factors such as light, oxygen, and water?",
        options: [
            "Yes, all products are compatible with environmental factors",
            "No, some products are incompatible with environmental factors",
            "Compatibility with environmental factors not fully assessed"
        ]
    },
    shockSensitivityTesting: {
        question: "Has the product undergone impact testing for shock sensitivity?",
        options: [
            "Yes, tested and stable",
            "Yes, tested and shock sensitive",
            "No, not tested"
        ]
    },
    decompositionEnergy: {
        question: "Does the product have a decomposition energy greater than 1000 J/g?",
        options: [
            "No",
            "Yes, high decomposition energy"
        ]
    },
    functionalGroups: {
        question: "Is the product a mixture of an oxidant and a reductant?",
        options: [
            "No",
            "Yes, mixture of oxidant and reductant"
        ]
    },
    transportationAndStorageRestrictions: {
        question: "Are there any restrictions for the transportation and storage of the product due to its shock sensitivity?",
        options: [
            "No restrictions",
            "Yes, restrictions in place"
        ]
    },
    formOfChemical: {
        question: "Is the shock-sensitive chemical used in its stable form (e.g., hydrate form instead of anhydrous)?",
        options: [
            "Not applicable",
            "Yes, stable form used",
            "No, unstable form used"
        ]
    },
    functionalGroupListReference: {
        question: "Does the product contain any of the following functional groups known to be shock sensitive (Acetylenes, Nitroso, Nitrites, Epoxides, N-Metal derivative, Nitro, Azo, Peroxyacid, Peroxide salts, Halo-aryl metals, N-O compounds, Diazo, Nitro, Nitrates, Fulminates, Dimericuryammonium, Salt, N-Nitro, Triazene, Peroxides, Azide, N-Halogen compounds, X-O compounds)?",
        options: [
            "No",
            "Yes, contains listed functional groups",
            "Needs further assessment"
        ]
    },
    massBalanceUnderstanding: {
        question: "Do you have a comprehensive understanding of the mass balance for your chemical process, including all by-products and any excess reagents?",
        options: [
            "Yes, fully understood",
            "Partially understood, needs more analysis",
            "No, not fully understood"
        ]
    },
    wasteStreamStorageConditions: {
        question: "Are the storage conditions for your waste streams clearly defined and monitored in your lab?",
        options: [
            "Yes, clearly defined and regularly monitored",
            "Partially defined, occasional monitoring",
            "No, not clearly defined or monitored"
        ]
    },
    temperatureVariabilityInWasteStorage: {
        question: "Do you consider temperature variations during the storage of your waste streams, such as seasonal changes in your lab environment?",
        options: [
            "Yes, temperature variations are accounted for",
            "Partially accounted for",
            "No, not considered"
        ]
    },
    mixingWasteStreams: {
        question: "When combining waste streams from different processes, do you assess the reactivity of all chemicals involved?",
        options: [
            "No mixing of waste streams",
            "Yes, reactivity is assessed before mixing",
            "No, reactivity is not assessed"
        ]
    },
    wasteTransferAndCompositionKnowledge: {
        question: "When sending waste streams off-site for disposal, do you ensure the receiving facility has a detailed composition of the waste?",
        options: [
            "Yes, detailed composition is provided",
            "Partially detailed composition provided",
            "No, limited information provided"
        ]
    },
    handlingWaterReactiveChemicals: {
        question: "Do you decompose water-reactive chemicals (e.g., thionyl chloride, oxalyl chloride) in a controlled manner before disposing of them?",
        options: [
            "No water-reactive chemicals used",
            "Yes, decomposed under controlled conditions",
            "No, not decomposed properly"
        ]
    },
    neutralizingStrongAcids: {
        question: "Are strong acids neutralized in your lab before adding them to waste streams or disposing of them separately?",
        options: [
            "No strong acids used",
            "Yes, neutralized before disposal",
            "No, not neutralized"
        ]
    },
    handlingNitricAcidWaste: {
        question: "Do you follow specific procedures for handling and disposing of nitric acid due to its high reactivity?",
        options: [
            "No nitric acid used",
            "Yes, specific procedures are followed",
            "No, specific procedures not followed"
        ]
    },
    neutralizingUnstableReagents: {
        question: "Do you neutralize intrinsically unstable reagents (e.g., hydrogen peroxide, hydroxylamines) before disposing of them in general waste streams?",
        options: [
            "No unstable reagents used",
            "Yes, neutralized before disposal",
            "No, not neutralized"
        ]
    },
    disposingOfSpentCatalysts: {
        question: "Do you take special precautions when disposing of spent catalysts, especially those that are pyrophoric or highly reactive?",
        options: [
            "No catalysts used",
            "Yes, special precautions taken",
            "No, precautions not taken"
        ]
    },
    managingGasGeneratingWaste: {
        question: "Are your gas-generating waste streams managed to prevent pressure buildup in storage containers?",
        options: [
            "No gas-generating waste",
            "Yes, managed to prevent pressure buildup",
            "No, not managed properly"
        ]
    },
    monitoringReactiveWasteShelfLife: {
        question: "Do you monitor the shelf life of reactive waste to prevent incidents like bulging drums or ruptures?",
        options: [
            "No reactive waste with shelf life concerns",
            "Yes, shelf life is monitored",
            "No, shelf life is not monitored"
        ]
    },
    flashPointKnowledge: {
        question: "Do you know the flash point of the solvents and liquid reagents you are using in your experiments?",
        options: [
            "Yes, flash point known",
            "No, flash point not known"
        ]
    },
    suitabilityOfEquipment: {
        question: "Are you using equipment that is rated for the hazardous area classification based on the flash points of your solvents?",
        options: [
            "Yes, appropriate equipment used",
            "No, equipment suitability not verified"
        ]
    },
    storageAndTransportationCompliance: {
        question: "Are the flash points of your solvents and liquid reagents documented for safe storage and transportation?",
        options: [
            "Yes, documented",
            "No, not documented"
        ]
    },
    dustExplosionPotential: {
        question: "Are any of the solids you use in your lab experiments prone to forming explosive dust clouds?",
        options: [
            "No, not prone",
            "Yes, prone to dust explosions"
        ]
    },
    formationOfDustClouds: {
        question: "Do your processes involve conditions where finely divided solids could form dust clouds (e.g., during drying, milling, or solid charging)?",
        options: [
            "No, such conditions do not exist",
            "Yes, such conditions exist and are managed",
            "Yes, such conditions exist but are not managed"
        ]
    },
    flammableAtmospherePresence: {
        question: "Could a flammable atmosphere be present in your lab during your experiments?",
        options: [
            "No, flammable atmosphere not present",
            "Yes, flammable atmosphere possible"
        ]
    },
    riskOfStaticElectricity: {
        question: "Are the organic solvents and solids you use in your experiments prone to accumulating static electricity?",
        options: [
            "No, not prone",
            "Yes, prone to static electricity"
        ]
    },
    groundingMeasures: {
        question: "Do you ensure proper grounding of your lab equipment to prevent static electricity discharges?",
        options: [
            "Yes, equipment is grounded",
            "No, equipment is not grounded"
        ]
    },
    handlingOfStaticProneMaterials: {
        question: "Do you take precautions when handling materials that are prone to static electricity (e.g., grounding yourself and using anti-static equipment)?",
        options: [
            "Yes, precautions taken",
            "No, precautions not taken"
        ]
    },
    testingForStaticElectricity: {
        question: "Have you conducted tests to measure the electrical conductivity and charge decay of your solvents and solids?",
        options: [
            "Yes, tests conducted",
            "No, tests not conducted"
        ]
    },
    reactivityWithIgnitionSources: {
        question: "Are any of your reactants or products highly flammable and capable of igniting from static discharges or other ignition sources?",
        options: [
            "No, not highly flammable",
            "Yes, highly flammable"
        ]
    },
    handlingOfReactiveByProducts: {
        question: "Are there any reactive by-products generated in your experiments that could pose a flammability or explosivity risk?",
        options: [
            "No reactive by-products",
            "Yes, reactive by-products generated"
        ]
    },
    solventAndReagentSafetyDataSheets: {
        question: "Do you refer to the safety data sheets (SDS) of all solvents and reagents to understand their flammability and explosivity risks?",
        options: [
            "Yes, always refer to SDS",
            "No, do not refer to SDS"
        ]
    },
    safetyTrainingCommunication: {
        question: "Have all personnel involved in the scale-up process received adequate safety training?",
        options: [
            "Yes, fully trained",
            "Some training needed, plan in place",
            "Major training needed, no plan in place"
        ]
    },
    
};

function evaluateSafety() {
    const scores = {
        "Risk of Chemical Exposure": 0,
        "Training Requirements": 0,
        "Regulatory Compliance": 0,
        "Emergency Preparedness": 0,
        "Process Stability": 0,
        "Equipment Safety": 0,
        "Environmental Impact": 0,
        "Waste Management": 0,
        "Operational Efficiency": 0,
        "Communication and Coordination": 0
    };

    const impactMatrix = {
        "newChemicalUsage_No new chemicals": {
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
        "newChemicalUsage_Some new chemicals, all assessed": {
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
        "newChemicalUsage_New chemicals, not fully assessed": {
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
        "chemicalHandlingConditions_No changes": {
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
        "chemicalHandlingConditions_Minor changes, tested": {
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
        "chemicalHandlingConditions_Major changes, not fully tested": {
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
        "chemicalDeliveryPurity_No changes": {
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
        "chemicalDeliveryPurity_Minor changes, risks assessed": {
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
        "chemicalDeliveryPurity_Major changes, risks not fully assessed": {
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
        "hazardousMaterialStorageShipping_No larger quantities": {
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
        "hazardousMaterialStorageShipping_Larger quantities, requirements met": {
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
        "hazardousMaterialStorageShipping_Larger quantities, requirements not fully met": {
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
        "chemicalLoadingUnloading_No changes": {
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
        "chemicalLoadingUnloading_Minor changes, risks assessed": {
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
        "chemicalLoadingUnloading_Major changes, risks not fully assessed": {
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
        "sharedFacilitiesImpact_No impact": {
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
        "sharedFacilitiesImpact_Minor impact, risks assessed": {
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
        "sharedFacilitiesImpact_Major impact, risks not fully assessed": {
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
        "byProductsDisposal_No new by-products": {
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
        "byProductsDisposal_Minor increase, disposal methods assessed": {
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
        "byProductsDisposal_Major increase, disposal methods not fully assessed": {
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
        "vacuumOxygenUsage_No vacuum used": {
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
        "vacuumOxygenUsage_Vacuum used, risks managed": {
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
        "vacuumOxygenUsage_Vacuum used, risks not fully managed": {
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
        "designProceduralChanges_No new designs": {
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
        "designProceduralChanges_Minor new designs, risks assessed": {
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
        "designProceduralChanges_Major new designs, risks not fully assessed": {
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
        "thermalHazards_No exothermic reactions": {
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
        "thermalHazards_Minor exothermic reactions, controlled": {
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
        "thermalHazards_Major exothermic reactions, not fully controlled": {
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
        "reactionKinetics_No significant change": {
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
        "reactionKinetics_Minor change, managed": {
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
        "reactionKinetics_Major change, not fully managed": {
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
        "mixingHomogeneity_No change": {
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
        "mixingHomogeneity_Minor change, assessed": {
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
        "mixingHomogeneity_Major change, not fully assessed": {
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
        "wasteManagement_No additional waste": {
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
        "wasteManagement_Additional waste, regulations met": {
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
        "wasteManagement_Additional waste, regulations not fully met": {
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
        "chemicalStability_No instability issues": {
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
        "chemicalStability_Minor instability, managed": {
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
        "chemicalStability_Major instability, not fully managed": {
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
        "disposalMethods_No changes needed": {
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
        "disposalMethods_Minor changes needed, assessed": {
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
        "disposalMethods_Major changes needed, not fully assessed": {
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
        "compatibilityWithOtherReagents_Yes, all reagents are compatible": {
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
        "compatibilityWithOtherReagents_No, some reagents are incompatible": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 2,
            "Equipment Safety": 2,
            "Environmental Impact": 2,
            "Waste Management": 2,
            "Operational Efficiency": 1,
            "Communication and Coordination": 1
        },
        "compatibilityWithOtherReagents_Compatibility not fully assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 1,
            "Waste Management": 1,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "compatibilityWithContaminants_Yes, all reagents are compatible with contaminants": {
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
        "compatibilityWithContaminants_No, some reagents are incompatible with contaminants": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 2,
            "Equipment Safety": 2,
            "Environmental Impact": 2,
            "Waste Management": 2,
            "Operational Efficiency": 1,
            "Communication and Coordination": 1
        },
        "compatibilityWithContaminants_Compatibility with contaminants not fully assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 1,
            "Waste Management": 1,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "compatibilityWithConstructionMaterials_Yes, all reagents are compatible with construction materials": {
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
        "compatibilityWithConstructionMaterials_No, some reagents are incompatible with construction materials": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 2,
            "Equipment Safety": 2,
            "Environmental Impact": 2,
            "Waste Management": 2,
            "Operational Efficiency": 1,
            "Communication and Coordination": 1
        },
        "compatibilityWithConstructionMaterials_Compatibility with construction materials not fully assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 1,
            "Waste Management": 1,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "compatibilityWithEnvironmentalFactors_Yes, all products are compatible with environmental factors": {
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
        "compatibilityWithEnvironmentalFactors_No, some products are incompatible with environmental factors": {
            "Risk of Chemical Exposure": 1,
            "Training Requirements": 1,
            "Regulatory Compliance": 1,
            "Emergency Preparedness": 1,
            "Process Stability": 2,
            "Equipment Safety": 2,
            "Environmental Impact": 2,
            "Waste Management": 2,
            "Operational Efficiency": 1,
            "Communication and Coordination": 1
        },
        "compatibilityWithEnvironmentalFactors_Compatibility with environmental factors not fully assessed": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 1,
            "Equipment Safety": 1,
            "Environmental Impact": 1,
            "Waste Management": 1,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "shockSensitivityTesting_Yes, tested and stable": {
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
        "shockSensitivityTesting_Yes, tested and shock sensitive": {
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
        },
        "shockSensitivityTesting_No, not tested": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0.5,
            "Waste Management": 0.5,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "decompositionEnergy_No": {
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
        "decompositionEnergy_Yes, high decomposition energy": {
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
        },
        "functionalGroups_No": {
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
        "functionalGroups_Yes, mixture of oxidant and reductant": {
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
        },
        "transportationAndStorageRestrictions_No restrictions": {
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
        "transportationAndStorageRestrictions_Yes, restrictions in place": {
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
        },
        "formOfChemical_Not applicable": {
            "Risk of Chemical Exposure": 0,
            "Training Requirements": 0,
            "Regulatory Compliance": 0,
            "Emergency Preparedness": 0,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "formOfChemical_Yes, stable form used": {
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
        "formOfChemical_No, unstable form used": {
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
        },
        "functionalGroupListReference_No": {
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
        "functionalGroupListReference_Yes, contains listed functional groups": {
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
        },
        "functionalGroupListReference_Needs further assessment": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0.5,
            "Waste Management": 0.5,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "massBalanceUnderstanding_Yes, fully understood": {
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
        "massBalanceUnderstanding_Partially understood, needs more analysis": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0.5,
            "Waste Management": 0.5,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "massBalanceUnderstanding_No, not fully understood": {
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
        },
        "wasteStreamStorageConditions_Yes, clearly defined and regularly monitored": {
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
        "wasteStreamStorageConditions_Partially defined, occasional monitoring": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0.5,
            "Waste Management": 0.5,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "wasteStreamStorageConditions_No, not clearly defined or monitored": {
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
        },
        "temperatureVariabilityInWasteStorage_Yes, temperature variations are accounted for": {
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
        "temperatureVariabilityInWasteStorage_Partially accounted for": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0.5,
            "Waste Management": 0.5,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "temperatureVariabilityInWasteStorage_No, not considered": {
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
        },
        "mixingWasteStreams_No mixing of waste streams": {
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
        "mixingWasteStreams_Yes, reactivity is assessed before mixing": {
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
        "mixingWasteStreams_No, reactivity is not assessed": {
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
        },
        "wasteTransferAndCompositionKnowledge_Yes, detailed composition is provided": {
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
        "wasteTransferAndCompositionKnowledge_Partially detailed composition provided": {
            "Risk of Chemical Exposure": 0.5,
            "Training Requirements": 0.5,
            "Regulatory Compliance": 0.5,
            "Emergency Preparedness": 0.5,
            "Process Stability": 0.5,
            "Equipment Safety": 0.5,
            "Environmental Impact": 0.5,
            "Waste Management": 0.5,
            "Operational Efficiency": 0.5,
            "Communication and Coordination": 0.5
        },
        "wasteTransferAndCompositionKnowledge_No, limited information provided": {
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
        },
        "handlingWaterReactiveChemicals_No water-reactive chemicals used": {
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
        "handlingWaterReactiveChemicals_Yes, decomposed under controlled conditions": {
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
        "handlingWaterReactiveChemicals_No, not decomposed properly": {
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
        },
        "neutralizingStrongAcids_No strong acids used": {
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
        "neutralizingStrongAcids_Yes, neutralized before disposal": {
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
        "neutralizingStrongAcids_No, not neutralized": {
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
        },
        "handlingNitricAcidWaste_No nitric acid used": {
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
        "handlingNitricAcidWaste_Yes, specific procedures are followed": {
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
        "handlingNitricAcidWaste_No, specific procedures not followed": {
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
        },
        "neutralizingUnstableReagents_No unstable reagents used": {
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
        "neutralizingUnstableReagents_Yes, neutralized before disposal": {
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
        "neutralizingUnstableReagents_No, not neutralized": {
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
        },
        "disposingOfSpentCatalysts_No catalysts used": {
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
        "disposingOfSpentCatalysts_Yes, special precautions taken": {
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
        "disposingOfSpentCatalysts_No, precautions not taken": {
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
        },
        "managingGasGeneratingWaste_No gas-generating waste": {
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
        "managingGasGeneratingWaste_Yes, managed to prevent pressure buildup": {
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
        "managingGasGeneratingWaste_No, not managed properly": {
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
        },
        "monitoringReactiveWasteShelfLife_No reactive waste with shelf life concerns": {
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
        "monitoringReactiveWasteShelfLife_Yes, shelf life is monitored": {
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
        "monitoringReactiveWasteShelfLife_No, shelf life is not monitored": {
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
        },
        "flashPointKnowledge_Yes, flash point known": {
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
        "flashPointKnowledge_No, flash point not known": {
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
        },
        "suitabilityOfEquipment_Yes, appropriate equipment used": {
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
        "suitabilityOfEquipment_No, equipment suitability not verified": {
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
        },
        "storageAndTransportationCompliance_Yes, documented": {
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
        "storageAndTransportationCompliance_No, not documented": {
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
        },
        "dustExplosionPotential_No, not prone": {
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
        "dustExplosionPotential_Yes, prone to dust explosions": {
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
        },
        "formationOfDustClouds_No, such conditions do not exist": {
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
        "formationOfDustClouds_Yes, such conditions exist and are managed": {
            "Risk of Chemical Exposure": 0,
            "Training Requirements": 0,
            "Regulatory Compliance": 0,
            "Emergency Preparedness": 0,
            "Process Stability": 0,
            "Equipment Safety": 0,
            "Environmental Impact": 0,
            "Waste Management": 0,
            "Operational Efficiency": 0,
            "Communication and Coordination": 0
        },
        "formationOfDustClouds_Yes, such conditions exist but are not managed": {
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
        },
        "flammableAtmospherePresence_No, flammable atmosphere not present": {
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
        "flammableAtmospherePresence_Yes, flammable atmosphere possible": {
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
        },
        "riskOfStaticElectricity_No, not prone": {
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
        "riskOfStaticElectricity_Yes, prone to static electricity": {
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
        },
        "groundingMeasures_Yes, equipment is grounded": {
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
        "groundingMeasures_No, equipment is not grounded": {
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
        },
        "handlingOfStaticProneMaterials_Yes, precautions taken": {
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
        "handlingOfStaticProneMaterials_No, precautions not taken": {
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
        },
        "testingForStaticElectricity_Yes, tests conducted": {
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
        "testingForStaticElectricity_No, tests not conducted": {
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
        },
        "reactivityWithIgnitionSources_No, not highly flammable": {
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
        "reactivityWithIgnitionSources_Yes, highly flammable": {
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
        },
        "handlingOfReactiveByProducts_No reactive by-products": {
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
        "handlingOfReactiveByProducts_Yes, reactive by-products generated": {
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
        },
        "solventAndReagentSafetyDataSheets_Yes, always refer to SDS": {
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
        "solventAndReagentSafetyDataSheets_No, do not refer to SDS": {
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
        },
        "safetyTrainingCommunication_Yes, fully trained": {
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
        "safetyTrainingCommunication_Some training needed, plan in place": {
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
        "safetyTrainingCommunication_Major training needed, no plan in place": {
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
            questionAnswerPairs[question.question] = option;
            const nextQuestionKey = Object.keys(decisionTree)[Object.keys(decisionTree).indexOf(questionKey) + 1];
            if (nextQuestionKey) {
                askQuestion(nextQuestionKey);
            } else {
                const result = evaluateSafety();
                renderRadarPlot(result.scores); // Pass only the scores to the radar plot function
                console.log(result.questionAnswerPairs); // Use or display question-answer pairs as needed
                
                const analyzeButton = document.createElement('button');
                analyzeButton.textContent = 'Analyse LCA and scale up of Safety Decisions';
                analyzeButton.addEventListener('click', () => {
                    analyzeSafetyDecisions(result.questionAnswerPairs);
                });
                document.getElementById('safetyScorePlotContainer').appendChild(analyzeButton);
                
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

async function analyzeSafetyDecisions(questionAnswerPairs) {
    const analysisContainer = document.createElement('div');
    analysisContainer.innerHTML = '<h3>Life Cycle Assessment Effects:</h3>';

    for (const [question, answer] of Object.entries(questionAnswerPairs)) {
        try {
            const prompt = `Determine the life cycle impacts of the following safety decision:
            - ${question}: ${answer}`;

            const response = await fetch('/api/analyze-safety-decision', {
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
                console.error('Error analyzing safety decision:', response.statusText);
            }
        } catch (error) {
            console.error('Error analyzing safety decision:', error);
        }
    }

    document.getElementById('safetyScorePlotContainer').appendChild(analysisContainer);
}

