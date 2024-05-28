// generateReactionKinetics.js

export function estimateHeatOfReaction() {
    var reactants = [];
    var products = [];

    // Collect reactant and product SMILEs from the input fields
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

    // Send the reactant and product SMILEs to the server
    var formData = new FormData();
    formData.append('reactants', JSON.stringify(reactants));
    formData.append('products', JSON.stringify(products));

    fetch('/calculate_enthalpy', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
            // Display an error message to the user
            document.getElementById('enthalpyChangeResult').textContent = 'Error: ' + data.error;
        } else {
            let enthalpyChange = parseFloat(data.enthalpyChange).toFixed(2);
            // Display the calculated enthalpy change in the UI
            document.getElementById('enthalpyChangeResult').textContent = 'Heat of reaction: ' + enthalpyChange + ' kJ/mol';

            // Show the button to advance to the economic and environmental analysis
            document.getElementById('reactionKineticsEconomicalEnvironmentalContainer').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Display an error message to the user
        document.getElementById('enthalpyChangeResult').textContent = 'An error occurred during enthalpy calculation.';
    });
}