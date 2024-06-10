export function generateGasPhaseKinetics() {
    var reactants = [];
    var products = [];

    var reactantInputs = document.querySelectorAll('#reactants .input-group');
    reactantInputs.forEach(function(input) {
        var smile = input.querySelector('input[name="reactant_smile"]').value;
        reactants.push(smile);
    });

    var productInputs = document.querySelectorAll('#products .input-group');
    productInputs.forEach(function(input) {
        var smile = input.querySelector('input[name="product_smile"]').value;
        products.push(smile);
    });

    var formData = new FormData();
    formData.append('reactants', JSON.stringify(reactants));
    formData.append('products', JSON.stringify(products));

    fetch('/gas_phase_kinetics', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Update the HTML with the prediction results
        var resultContainer = document.getElementById('gasPhaseKineticsResult');
        resultContainer.innerHTML = 'Prediction: ' + data.predictions[0];
    })
    .catch(error => {
        console.error('Error:', error);
    });
}