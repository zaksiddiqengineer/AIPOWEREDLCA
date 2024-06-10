import { generateScaleUpAnalysis } from '../js/generateScaleUp.js';
import { startDecisionTree } from './generateFlowDiagram.js';
import { askQuestion } from './generateSafety.js';
import { askQuestionRecycle } from './generateRecycle.js';
import { estimateHeatOfReaction } from './generateReactionKinetics.js';
import { openEconomicEnvironmentalAnalysis } from './generateKineticEconomicEnvironmental.js';
import { openMTSREconomicAnalysis } from './generateMTSREconomic.js';
import { calculateMTSR } from './generateMTSR.js';
import { askQuestionMixing } from './generateMixing.js';
import { askQuestionRate } from './generateRate.js';
import { askQuestionSequence } from './generateSequence.js';
import { askQuestionHeating } from './generateHeating.js';
import { askQuestionGas } from './generateGas.js';
import { askQuestionCorrosivity } from './generateCorrosivity.js';
import { initializeFineTuneDataSubmission } from './generateFineTuneData.js';
//import { askQuestionSequence } from './generateSequence.js';

// static/js/script.js
var reactantCount = 0;
var productCount = 0;
var catalystCount = 0;
var solventCount = 0;

document.getElementById('openReactionBtn').addEventListener('click', function() {
    document.getElementById('reactionContainer').style.display = 'block';
});

document.getElementById('addReactantBtn').addEventListener('click', function() {
    reactantCount++;
    createReactantInput(reactantCount);
});

document.getElementById('addProductBtn').addEventListener('click', function() {
    productCount++;
    createProductInput(productCount);
});

document.getElementById('addCatalystBtn').addEventListener('click', function() {
    catalystCount++;
    createCatalystInput(catalystCount);
});

document.getElementById('addSolventBtn').addEventListener('click', function() {
    solventCount++;
    createSolventInput(solventCount);
});

document.getElementById('generateLCABtn').addEventListener('click', function() {
    var reactants = [];
    var products = [];
    var catalysts = [];
    var solvents = [];

    var reactantInputs = document.querySelectorAll('#reactants .input-group');
    reactantInputs.forEach(function(input) {
        var name = input.querySelector('input[name="reactant_name"]').value;
        var smile = input.querySelector('input[name="reactant_smile"]').value;
        var mass = input.querySelector('input[name="reactant_mass"]').value;
        reactants.push({ name: name, smile: smile, mass: mass });
    });

    var productInputs = document.querySelectorAll('#products .input-group');
    productInputs.forEach(function(input) {
        var name = input.querySelector('input[name="product_name"]').value;
        var smile = input.querySelector('input[name="product_smile"]').value;
        var mass = input.querySelector('input[name="product_mass"]').value;
        products.push({ name: name, smile: smile, mass: mass });
    });

    var catalystInputs = document.querySelectorAll('#catalysts .input-group');
    catalystInputs.forEach(function(input) {
        var name = input.querySelector('input[name="catalyst_name"]').value;
        var smile = input.querySelector('input[name="catalyst_smile"]').value;
        var mass = input.querySelector('input[name="catalyst_mass"]').value;
        catalysts.push({ name: name, smile: smile, mass: mass });
    });

    var solventInputs = document.querySelectorAll('#solvents .input-group');
    solventInputs.forEach(function(input) {
        var name = input.querySelector('input[name="solvent_name"]').value;
        var smile = input.querySelector('input[name="solvent_smile"]').value;
        var mass = input.querySelector('input[name="solvent_mass"]').value;
        solvents.push({ name: name, smile: smile, mass: mass });
    });

    var formData = new FormData();
    formData.append('reactants', JSON.stringify(reactants));
    formData.append('products', JSON.stringify(products));
    formData.append('catalysts', JSON.stringify(catalysts));
    formData.append('solvents', JSON.stringify(solvents));

    fetch('/get_chemical_info', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        console.log('Aggregate Scores:', data.aggregate_scores);
        console.log('Reactant Scores:', data.reactant_scores);
        console.log('Product Scores:', data.product_scores);
        console.log('Catalyst Scores:', data.catalyst_scores);
        console.log('Solvent Scores:', data.solvent_scores);

        document.getElementById('environmentalReport').style.display = 'block';
        document.getElementById('reportContent').innerHTML = data.text;

        // Create aggregate score radar plot
        console.log('Calling createRadarPlot for aggregate scores');
        createRadarPlot('aggregateScoreChart', data.aggregate_scores, null, false, true, false, false);

        // Create individual reactant score radar plots
        console.log('Creating reactant score radar plots');
        for (var reactant in data.reactant_scores) {
            console.log('Calling createRadarPlot for reactant:', reactant);
            createRadarPlot(`reactantScoreChart-${reactant}`, data.reactant_scores[reactant], reactant, true, false,false,false);
        }
        // Create individual catalyst score radar plots
        if (Object.keys(data.catalyst_scores).length > 0) {
            console.log('Creating catalyst score radar plots');
            for (var catalyst in data.catalyst_scores) {
                console.log('Calling createRadarPlot for catalyst:', catalyst);
                createRadarPlot(`catalystScoreChart-${catalyst}`, data.catalyst_scores[catalyst], catalyst, false, false, true, false);
            }
        } else {
            console.log('No catalysts found');
        }
        
        // Create individual product score radar plots
        console.log('Creating product score radar plots');
        for (var product in data.product_scores) {
            console.log('Calling createRadarPlot for product:', product);
            createRadarPlot(`productScoreChart-${product}`, data.product_scores[product], product, false, false, false,false);
        }

        // Create individual solvent score radar plots
        if (Object.keys(data.solvent_scores).length > 0) {
            console.log('Creating solvent score radar plots');
            for (var solvent in data.solvent_scores) {
                console.log('Calling createRadarPlot for solvent:', solvent);
                createRadarPlot(`solventScoreChart-${solvent}`, data.solvent_scores[solvent], solvent, false, false,false,true);
            }
        } else {
            console.log('No solvents found');
        }       
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('environmentalReport').style.display = 'block';
        document.getElementById('reportContent').innerText = 'An error occurred while fetching the response.';
    });
});



function createReactantInput(index) {
    var reactantsDiv = document.getElementById('reactants');
    var inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.innerHTML = `
        <label>Reactant ${index}</label>
        <input type="text" name="reactant_name" placeholder="Name" required>
        <input type="text" name="reactant_smile" placeholder="SMILE" required>
        <input type="number" name="reactant_mass" placeholder="Mass" required>
        <button class="deleteReactantBtn">Delete</button>
    `;
    reactantsDiv.appendChild(inputGroup);

    inputGroup.querySelector('.deleteReactantBtn').addEventListener('click', function() {
        reactantsDiv.removeChild(inputGroup);
        reactantCount--;
        updateReactantLabels();
    });
}

function createProductInput(index) {
    var productsDiv = document.getElementById('products');
    var inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.innerHTML = `
        <label>Product ${index}</label>
        <input type="text" name="product_name" placeholder="Name" required>
        <input type="text" name="product_smile" placeholder="SMILE" required>
        <input type="number" name="product_mass" placeholder="Mass" required>
        <button class="deleteProductBtn">Delete</button>
    `;
    productsDiv.appendChild(inputGroup);

    inputGroup.querySelector('.deleteProductBtn').addEventListener('click', function() {
        productsDiv.removeChild(inputGroup);
        productCount--;
        updateProductLabels();
    });
}

function createCatalystInput(index) {
    var catalystsDiv = document.getElementById('catalysts');
    var inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.innerHTML = `
        <label>Catalyst ${index}</label>
        <input type="text" name="catalyst_name" placeholder="Name" required>
        <input type="text" name="catalyst_smile" placeholder="SMILE" required>
        <input type="number" name="catalyst_mass" placeholder="Mass" required>
        <button class="deleteCatalystBtn">Delete</button>
    `;
    catalystsDiv.appendChild(inputGroup);

    inputGroup.querySelector('.deleteCatalystBtn').addEventListener('click', function() {
        catalystsDiv.removeChild(inputGroup);
        catalystCount--;
        updateCatalystLabels();
    });
}

function createSolventInput(index) {
    var solventsDiv = document.getElementById('solvents');
    var inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.innerHTML = `
        <label>Solvent ${index}</label>
        <input type="text" name="solvent_name" placeholder="Name" required>
        <input type="text" name="solvent_smile" placeholder="SMILE" required>
        <input type="number" name="solvent_mass" placeholder="Mass" required>
        <button class="deleteSolventBtn">Delete</button>
    `;
    solventsDiv.appendChild(inputGroup);

    inputGroup.querySelector('.deleteSolventBtn').addEventListener('click', function() {
        solventsDiv.removeChild(inputGroup);
        solventCount--;
        updateSolventLabels();
    });
}

function updateReactantLabels() {
    var reactantLabels = document.querySelectorAll('#reactants .input-group label');
    reactantLabels.forEach(function(label, index) {
        label.textContent = `Reactant ${index + 1}`;
    });
}

function updateProductLabels() {
    var productLabels = document.querySelectorAll('#products .input-group label');
    productLabels.forEach(function(label, index) {
        label.textContent = `Product ${index + 1}`;
    });
}

function updateCatalystLabels() {
    var catalystLabels = document.querySelectorAll('#catalysts .input-group label');
    catalystLabels.forEach(function(label, index) {
        label.textContent = `Catalyst ${index + 1}`;
    });
}

function updateSolventLabels() {
    var solventLabels = document.querySelectorAll('#solvents .input-group label');
    solventLabels.forEach(function(label, index) {
        label.textContent = `Solvent ${index + 1}`;
    });
}

function createRadarPlot(chartId, scores, title, isReactant, isAggregate, isCatalyst, isSolvent) {
    console.log('Creating radar plot with chartId:', chartId);
    console.log('Scores object:', scores);
    console.log('Title:', title);
    console.log('Is Reactant:', isReactant);
    console.log('Is Aggregate:', isAggregate);
    console.log('Is Catalyst:', isCatalyst);
    console.log('Is Solvent:', isSolvent);

    var existingCtx = document.getElementById(chartId);
    var ctx;
    if (!existingCtx) {
        ctx = document.createElement('canvas');
        ctx.id = chartId;
        console.log('Created canvas element with ID:', chartId);
        if (title) {
            var titleElement = document.createElement('h4');
            titleElement.textContent = title;
            if (isAggregate) {
                document.getElementById('aggregateScorePlot').appendChild(titleElement);
                document.getElementById('aggregateScorePlot').appendChild(ctx);
            } else if (isReactant) {
                document.getElementById('reactantScorePlots').appendChild(titleElement);
                document.getElementById('reactantScorePlots').appendChild(ctx);
            } else if (isCatalyst) {
                document.getElementById('catalystScorePlots').appendChild(titleElement);
                document.getElementById('catalystScorePlots').appendChild(ctx);
            } else if (isSolvent) {
                document.getElementById('solventScorePlots').appendChild(titleElement);
                document.getElementById('solventScorePlots').appendChild(ctx);
            } else {
                document.getElementById('productScorePlots').appendChild(titleElement);
                document.getElementById('productScorePlots').appendChild(ctx);
            }
            console.log('Created title element for:', title);
        }
        console.log('Appended canvas element to the correct div');
    } else {
        ctx = existingCtx;
        console.log('Canvas element already exists with ID:', chartId);
    }

    var labels, values;
    if (isAggregate) {
        labels = ['Air', 'Economic', 'Emissions', 'Energy', 'EOL', 'Innovations', 'Soil', 'Transportation', 'Waste', 'Water'];
        values = labels.map(label => scores[label.toLowerCase()] || 0);
    } else {
        labels = Object.keys(scores);
        values = Object.values(scores);
    }

    console.log('Extracted labels:', labels);
    console.log('Extracted values:', values);

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Environmental Impact',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0, // Set the minimum value to 0
                    max: 3, // Set the maximum value to 3
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        callback: function(value, index, values) {
                            switch(value) {
                                case 1: return 'Low';
                                case 2: return 'Medium';
                                case 3: return 'High';
                                default: return '';
                            }
                        }
                    }
                }
            }
        }
    });

    console.log('Radar plot created for chartId:', chartId);
}

document.getElementById('generateScaleUpBtn').addEventListener('click', function() {
    document.getElementById('scaleUpWizard').style.display = 'block';
    generateScaleUpAnalysis();
  });

document.getElementById("FlowDiagramAnalysisButton").addEventListener("click", () => {
    document.getElementById("flowDiagramContainer").style.display = "none";
    document.getElementById("flowDiagramWizard").style.display = "block";
    startDecisionTree();
});

document.getElementById('safetyAnalysisButton').addEventListener('click', () => {
    document.getElementById('safetyContainer').style.display = 'none';
    document.getElementById('safetyWizard').style.display = 'block';
    document.getElementById('safetyScorePlotContainer').style.display = 'block';
    askQuestion('newChemicalUsage');
});

document.getElementById('recycleAnalysisButton').addEventListener('click', () => {
    document.getElementById('recycleContainer').style.display = 'none';
    document.getElementById('recycleWizard').style.display = 'block';
    document.getElementById('recycleScorePlotContainer').style.display = 'block';
    askQuestionRecycle('costConsiderations');
});

document.getElementById('reactionKineticsAnalysisButton').addEventListener('click', function() {
    document.getElementById('reactionKineticsContainer').style.display = 'block';
    document.getElementById('heatOfReactionButtonContainer').style.display = 'block';
});

document.getElementById('calculateHeatOfReactionButton').addEventListener('click', function() {
    estimateHeatOfReaction();
});

document.getElementById('reactionKineticsEconomicalEnvironmentalButton').addEventListener('click', function() {
    openEconomicEnvironmentalAnalysis();
});

document.getElementById('reactionMTSRButton').addEventListener('click', calculateMTSR);

document.getElementById('economicMTSRButton').addEventListener('click', function() {
    openMTSREconomicAnalysis();
});

document.getElementById('mixingAnalysisButton').addEventListener('click', () => {
    document.getElementById('mixingContainer').style.display = 'none';
    document.getElementById('mixingWizard').style.display = 'block';
    document.getElementById('mixingScorePlotContainer').style.display = 'block';
    askQuestionMixing('typeOfReaction');
});

document.getElementById('rateAnalysisButton').addEventListener('click', () => {
    document.getElementById('rateContainer').style.display = 'none';
    document.getElementById('rateWizard').style.display = 'block';
    document.getElementById('rateScorePlotContainer').style.display = 'block';
    askQuestionRate('impactOnYield');
});

document.getElementById('sequenceAnalysisButton').addEventListener('click', () => {
    document.getElementById('sequenceContainer').style.display = 'none';
    document.getElementById('sequenceWizard').style.display = 'block';
    document.getElementById('sequenceScorePlotContainer').style.display = 'block';
    askQuestionSequence('reactantAddition');
});


document.getElementById('heatingAnalysisButton').addEventListener('click', () => {
    document.getElementById('heatingContainer').style.display = 'none';
    document.getElementById('heatingWizard').style.display = 'block';
    document.getElementById('heatingScorePlotContainer').style.display = 'block';
    askQuestionHeating('reactionExothermicity');
});

document.getElementById('gasAnalysisButton').addEventListener('click', () => {
    document.getElementById('gasContainer').style.display = 'none';
    document.getElementById('gasWizard').style.display = 'block';
    document.getElementById('gasScorePlotContainer').style.display = 'block';
    askQuestionGas('gasProduction');
});

document.getElementById('corrosivityAnalysisButton').addEventListener('click', () => {
    document.getElementById('corrosivityContainer').style.display = 'none';
    document.getElementById('corrosivityWizard').style.display = 'block';
    document.getElementById('corrosivityScorePlotContainer').style.display = 'block';
    askQuestionCorrosivity('chemicalComposition');
});


// Initialize Fine Tune Data Submission
initializeFineTuneDataSubmission();

// generation of gas phase kinetics
document.getElementById('generateGasPhaseKinetics').addEventListener('click', function() {
    generateGasPhaseKinetics();
});
