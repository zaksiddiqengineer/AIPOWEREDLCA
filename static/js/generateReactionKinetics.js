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
          // Check if the received data is in the expected format
          if (
            data.hasOwnProperty('enthalpyChange') &&
            data.hasOwnProperty('reactantEnthalpies') &&
            data.hasOwnProperty('reactantGibbs') &&
            data.hasOwnProperty('reactantZPVEs') &&
            data.hasOwnProperty('reactantCPs') &&
            data.hasOwnProperty('productEnthalpies') &&
            data.hasOwnProperty('productGibbs') &&
            data.hasOwnProperty('productZPVEs') &&
            data.hasOwnProperty('productCPs') &&
            Array.isArray(data.reactantEnthalpies) &&
            Array.isArray(data.reactantGibbs) &&
            Array.isArray(data.reactantZPVEs) &&
            Array.isArray(data.reactantCPs) &&
            Array.isArray(data.productEnthalpies) &&
            Array.isArray(data.productGibbs) &&
            Array.isArray(data.productZPVEs) &&
            Array.isArray(data.productCPs)
          ) {
            // Store all the received variables
            let enthalpyChange = parseFloat(data.enthalpyChange).toFixed(2);
            let reactantEnthalpies = data.reactantEnthalpies;
            let reactantGibbs = data.reactantGibbs;
            let reactantZPVEs = data.reactantZPVEs;
            let reactantCPs = data.reactantCPs;
            let productEnthalpies = data.productEnthalpies;
            let productGibbs = data.productGibbs;
            let productZPVEs = data.productZPVEs;
            let productCPs = data.productCPs;

            // Log the received reactantCPs and productCPs arrays
            console.log('Received reactantCPs:', reactantCPs);
            console.log('Received productCPs:', productCPs);

             // Store the variables in local storage
            localStorage.setItem('enthalpyChange', enthalpyChange);
            localStorage.setItem('reactantCPs', JSON.stringify(reactantCPs));
            localStorage.setItem('productCPs', JSON.stringify(productCPs));

            // Retrieve the stored variables from local storage and log them
            let storedEnthalpyChange = localStorage.getItem('enthalpyChange');
            let storedReactantCPs = JSON.parse(localStorage.getItem('reactantCPs'));
            let storedProductCPs = JSON.parse(localStorage.getItem('productCPs'));
            console.log('Stored enthalpyChange:', storedEnthalpyChange);
            console.log('Stored reactantCPs:', storedReactantCPs);
            console.log('Stored productCPs:', storedProductCPs);

    
            // Display only the calculated enthalpy change in the UI
            document.getElementById('enthalpyChangeResult').textContent = 'Heat of reaction: ' + enthalpyChange + ' kJ/mol';
    
            // Show the button to advance to the economic and environmental analysis
            document.getElementById('reactionKineticsEconomicalEnvironmentalContainer').style.display = 'block';
          } else {
            console.error('Received data is not in the expected format');
            // Display an error message to the user
            document.getElementById('enthalpyChangeResult').textContent = 'Received data is not in the expected format';
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Display an error message to the user
        document.getElementById('enthalpyChangeResult').textContent = 'An error occurred during enthalpy calculation.';
      });
    }