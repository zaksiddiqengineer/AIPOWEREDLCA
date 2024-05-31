// generateMSTR.js

export function calculateMTSR() {
    // Access the stored variables from estimateHeatOfReaction
    let enthalpyChange = parseFloat(localStorage.getItem('enthalpyChange'));
    let reactantCPs = JSON.parse(localStorage.getItem('reactantCPs'));
    let productCPs = JSON.parse(localStorage.getItem('productCPs'));
  
    var reactants = [];
    var products = [];
  

    // Collect reactant SMILEs and masses from the input fields
    var reactantInputs = document.querySelectorAll('#reactants .input-group');
    reactantInputs.forEach(function(input, index) {
        var smile = input.querySelector('input[name="reactant_smile"]').value;
        var mass = input.querySelector('input[name="reactant_mass"]').value;
        var cp = reactantCPs && reactantCPs[index] ? reactantCPs[index] : 0; // Default to 0 if reactantCPs or the specific index is undefined
        reactants.push({ smile: smile, mass: mass, cp: cp });
    });

    // Collect product SMILEs and masses from the input fields
    var productInputs = document.querySelectorAll('#products .input-group');
    productInputs.forEach(function(input, index) {
        var smile = input.querySelector('input[name="product_smile"]').value;
        var mass = input.querySelector('input[name="product_mass"]').value;
        var cp = productCPs && productCPs[index] ? productCPs[index] : 0; // Default to 0 if productCPs or the specific index is undefined
        products.push({ smile: smile, mass: mass, cp: cp });
    });
  
    // Send the reactant and product data to the backend
    var requestData = {
      reactants: reactants,
      products: products,
      enthalpyChange: enthalpyChange
    };
  
    // Make API request to calculate molar masses and MTSR
    fetch('/calculate_mtsr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(mtsrData => {
      // Display the calculated MTSR and ΔTad values
      document.getElementById('mtsrResult').textContent = 'MTSR: ' + mtsrData.mtsr;
      document.getElementById('deltaTadResult').textContent = 'ΔTad: ' + mtsrData.deltaTad;

      // Show the button to advance to the economic and environmental analysis
      document.getElementById('reactionKineticsEconomicalEnvironmentalContainer').style.display = 'block';


    })
    .catch(error => {
      console.error('Error:', error);
      // Display an error message to the user
      document.getElementById('mtsrResult').textContent = 'An error occurred during MTSR calculation.';
    });
  }