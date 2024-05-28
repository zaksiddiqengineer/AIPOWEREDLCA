export function openEconomicEnvironmentalAnalysis() {
    // Create the container for the economic and environmental analysis
    var container = document.createElement('div');
    container.id = 'economicEnvironmentalAnalysis';
    container.innerHTML = `
        <h2>Economic and Environmental Analysis</h2>
        <div>
            <label for="productionRate">Production Rate per Hour:</label>
            <input type="number" id="productionRate" name="productionRate" min="0" max="1000" value="1000" required>
        </div>
        <div>
            <label for="hoursPerDay">Hours per Day:</label>
            <input type="number" id="hoursPerDay" name="hoursPerDay" min="1" max="24" value="24" required>
        </div>
        <div>
            <label for="daysPerMonth">Days per Month:</label>
            <input type="number" id="daysPerMonth" name="daysPerMonth" min="1" max="30" value="30" required>
        </div>
        <div>
            <label for="monthsPerYear">Months per Year:</label>
            <input type="number" id="monthsPerYear" name="monthsPerYear" min="1" max="12" value="12" required>
        </div>
        <div>
            <label for="fuelType">Ultimate Fuel Type:</label>
            <select id="fuelType" name="fuelType" required>
                <option value="">Select Fuel Type</option>
                <!-- Fuel type options will be populated dynamically -->
            </select>
        </div>
        <div>
            <label for="utility">Utility:</label>
            <select id="utility" name="utility" required>
                <option value="">Select Utility</option>
                <!-- Utility options will be populated dynamically -->
            </select>
        </div>
        <button id="submitEconomicEnvironmentalData">Submit Data</button>
    `;

    // Append the container to the document body or a specific parent element
    document.body.appendChild(container);
    // Or use a specific parent element, e.g., document.getElementById('parentElement').appendChild(container);

    // Populate the fuel type dropdown
    populateFuelTypeDropdown();

    // Add event listener for the fuel type dropdown change
    document.getElementById('fuelType').addEventListener('change', populateUtilityDropdown);

    // Add event listener for the "Submit Data" button
    document.getElementById('submitEconomicEnvironmentalData').addEventListener('click', async function() {
        // Retrieve the entered values
        var productionRate = document.getElementById('productionRate').value;
        var hoursPerDay = document.getElementById('hoursPerDay').value;
        var daysPerMonth = document.getElementById('daysPerMonth').value;
        var monthsPerYear = document.getElementById('monthsPerYear').value;
        var fuelType = document.getElementById('fuelType').value;
        var utility = document.getElementById('utility').value;
    
        // Retrieve the emission data
        var emissionData = await getEmissionData();
        if (emissionData) {
            var co2Ef = emissionData.co2_ef;
            var effCp = emissionData.eff_cp;
    
            // Retrieve the enthalpy change result and extract the numeric value
            var enthalpyChangeResultElement = document.getElementById('enthalpyChangeResult');
            var enthalpyChangeResultText = enthalpyChangeResultElement.textContent.trim();
            
            console.log('enthalpyChangeResultText:', enthalpyChangeResultText);

            var enthalpyChangeResultMatch = enthalpyChangeResultText.match(/-?\d+(\.\d+)?/);
            var enthalpyChangeResult = enthalpyChangeResultMatch ? parseFloat(enthalpyChangeResultMatch[0]) : NaN;

        console.log('enthalpyChangeResult:', enthalpyChangeResult);
        // Prepare data to be sent to the backend
            var data = {
                productionRate: parseFloat(productionRate),
                hoursPerDay: parseFloat(hoursPerDay),
                daysPerMonth: parseFloat(daysPerMonth),
                monthsPerYear: parseFloat(monthsPerYear),
                co2Ef: parseFloat(co2Ef),
                effCp: parseFloat(effCp),
                enthalpyChangeResult: enthalpyChangeResult
            };
            console.log('Data to be sent:', data);
    
            // Send data to the backend
            try {
                const response = await fetch('/calculate_emissions_and_mass', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                const result = await response.json();
                console.log('Calculation result:', result);
                // Handle the result as needed
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }
    });
}

// Function to populate the fuel type dropdown
async function populateFuelTypeDropdown() {
    try {
        const response = await fetch('/get_fuel_types');
        const fuelTypes = await response.json();
        const fuelTypeDropdown = document.getElementById('fuelType');
        
        fuelTypes.forEach(fuelType => {
            const option = document.createElement('option');
            option.value = fuelType;
            option.textContent = fuelType;
            fuelTypeDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching fuel types:', error);
    }
}

// Function to populate the utility dropdown based on the selected fuel type
async function populateUtilityDropdown() {
    const fuelType = document.getElementById('fuelType').value;
    const utilityDropdown = document.getElementById('utility');
    utilityDropdown.innerHTML = '<option value="">Select Utility</option>';
    
    try {
        const response = await fetch(`/get_utilities?fuel_type=${encodeURIComponent(fuelType)}`);
        const utilities = await response.json();
        
        utilities.forEach(utility => {
            const option = document.createElement('option');
            option.value = utility;
            option.textContent = utility;
            utilityDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching utilities:', error);
    }
}

// Function to retrieve the emission data based on the selected fuel type and utility
async function getEmissionData() {
    const fuelType = document.getElementById('fuelType').value;
    const utility = document.getElementById('utility').value;
    
    try {
        const response = await fetch(`/get_emission_data?fuel_type=${encodeURIComponent(fuelType)}&utility=${encodeURIComponent(utility)}`);
        const emissionData = await response.json();
        return emissionData;
    } catch (error) {
        console.error('Error fetching emission data:', error);
        return null;
    }
}

