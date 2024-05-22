// static/js/script.js
var reactantCount = 0;
var productCount = 0;

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

document.getElementById('submitReactionBtn').addEventListener('click', function() {
    var reactants = [];
    var products = [];

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

    var formData = new FormData();
    formData.append('reactants', JSON.stringify(reactants));
    formData.append('products', JSON.stringify(products));

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

        document.getElementById('environmentalReport').style.display = 'block';
        document.getElementById('reportContent').innerHTML = data.text;

        // Create aggregate score radar plot
        console.log('Calling createRadarPlot for aggregate scores');
        createRadarPlot('aggregateScoreChart', data.aggregate_scores);

        // Create individual reactant score radar plots
        console.log('Creating reactant score radar plots');
        for (var reactant in data.reactant_scores) {
            console.log('Calling createRadarPlot for reactant:', reactant);
            createRadarPlot(`reactantScoreChart-${reactant}`, data.reactant_scores[reactant], reactant);
        }

        // Create individual product score radar plots
        console.log('Creating product score radar plots');
        for (var product in data.product_scores) {
            console.log('Calling createRadarPlot for product:', product);
            createRadarPlot(`productScoreChart-${product}`, data.product_scores[product], product);
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

function createRadarPlot(chartId, scores, title) {
    var ctx = document.getElementById(chartId);
    if (!ctx) {
        ctx = document.createElement('canvas');
        ctx.id = chartId;
        console.log('Created canvas element with ID:', chartId);
        if (title) {
            var titleElement = document.createElement('h4');
            titleElement.textContent = title;
            document.getElementById('environmentalReport').appendChild(titleElement);
            console.log('Created title element for:', title);
        }
        document.getElementById('environmentalReport').appendChild(ctx);
        console.log('Appended canvas element to environmentalReport');
    } else {
        console.log('Canvas element already exists with ID:', chartId);
    }

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(scores),
            datasets: [{
                label: 'Environmental Impact',
                data: Object.values(scores),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 3,
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
    });
}