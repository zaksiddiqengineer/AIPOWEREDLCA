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
    reactantInputs.forEach(function(input) {
      var smile = input.querySelector('input[name="reactant_smile"]').value;
      var mass = input.querySelector('input[name="reactant_mass"]').value;
      reactants.push({ smile: smile, mass: mass, cp: reactantCPs[reactants.length] });
    });
  
    // Collect product SMILEs and masses from the input fields
    var productInputs = document.querySelectorAll('#products .input-group');
    productInputs.forEach(function(input) {
      var smile = input.querySelector('input[name="product_smile"]').value;
      var mass = input.querySelector('input[name="product_mass"]').value;
      products.push({ smile: smile, mass: mass, cp: productCPs[products.length] });
    });
  
    // Send the reactant and product data to the backend
    var formData = new FormData();
    formData.append('reactants', JSON.stringify(reactants));
    formData.append('products', JSON.stringify(products));
    formData.append('enthalpyChange', enthalpyChange);
  
    // Make API request to calculate molar masses and MTSR
    fetch('/calculate_mtsr', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(mtsrData => {
      // Display the calculated MTSR and ΔTad values
      document.getElementById('mtsrResult').textContent = 'MTSR: ' + mtsrData.mtsr;
      document.getElementById('deltaTadResult').textContent = 'ΔTad: ' + mtsrData.deltaTad;
    })
    .catch(error => {
      console.error('Error:', error);
      // Display an error message to the user
      document.getElementById('mtsrResult').textContent = 'An error occurred during MTSR calculation.';
    });
  }