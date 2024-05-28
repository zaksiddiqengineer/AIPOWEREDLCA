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
            <label for="temperatureIn">Temperature In:</label>
            <input type="number" id="temperatureIn" name="temperatureIn" min="-1000" max="1000" value="25" required>
        </div>
        <div>
            <label for="temperatureReaction">Temperature Reaction:</label>
            <input type="number" id="temperatureReaction" name="temperatureReaction" min="-1000" max="1000" value="25" required>
        </div>

        <div>
        <label for="reactorVolume">Reactor Volume:</label>
        <select id="reactorVolume" name="reactorVolume" required>
            <option value="">Select Reactor Volume</option>
            <option value="very_large">Very Large Reactor 10000-20,000 m³</option>
            <option value="large">Large Reactor 1000-10,000 m³</option>
            <option value="medium">Medium Reactor 100-1,000 m³</option>
            <option value="small">Small Reactor 0-100 m³</option>
        </select>
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
        var temperatureIn = document.getElementById('temperatureIn').value;
        var temperatureReaction = document.getElementById('temperatureReaction').value;
        var reactorVolume = document.getElementById('reactorVolume').value;
        var fuelType = document.getElementById('fuelType').value;
        var utility = document.getElementById('utility').value;
    
        // Retrieve the emission data
        var emissionData = await getEmissionData();
        if (emissionData) {
            var co2Ef = emissionData.co2_ef;
            var effCp = emissionData.eff_cp;

            var UValue = await getUValue(reactorVolume);
            var AValue = await getAValue(reactorVolume);
    
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
                monthsPerYear: parseFloat(monthsPerYear),
                tIn: parseFloat(temperatureIn),
                tReact: parseFloat(temperatureReaction),
                co2Ef: parseFloat(co2Ef),
                UValue: parseFloat(UValue),
                AValue: parseFloat(AValue),
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

                //display the results
                displayCalculationResult(result)
                // Handle the result as needed
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }
    });
}

function displayCalculationResult(result) {
    var resultContainer = document.getElementById('calculationResult');
    
    if (!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.id = 'calculationResult';
        document.body.appendChild(resultContainer);
    }

    resultContainer.innerHTML = `
        <h3>Calculation Result</h3>
        <p>Moles per Month: ${result.moles_per_month}</p>
        <p>Q Monthly (kJ): ${result.Q_monthly_kJ}</p>
        <p>Q Annual (kJ): ${result.Q_annual_kJ}</p>
        <p>Heating/Cooling Needed: ${result.heating_cooling_needed}</p>
        <p>CO2 Emissions Monthly (kg): ${result.CO2_emissions_monthly_kg}</p>
        <p>CO2 Emissions Annual (kg): ${result.CO2_emissions_annual_kg}</p>
        <p>Mass of Fluid Monthly (kg): ${result.mass_fluid_monthly_kg}</p>
        <p>Cost Monthly (USD): ${result.cost_monthly_usd}</p>
        <p>Cost Annual (USD): ${result.cost_annual_usd}</p>
    `;
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

async function getUValue(reactorVolume) {
    try {
        const response = await fetch(`/get_U_value?reactor_volume=${encodeURIComponent(reactorVolume)}`);
        const data = await response.json();
        return data.U;
    } catch (error) {
        console.error('Error fetching U value:', error);
        return null;
    }
}

async function getAValue(reactorVolume) {
    try {
        const response = await fetch(`/get_A_value?reactor_volume=${encodeURIComponent(reactorVolume)}`);
        const data = await response.json();
        return data.A;
    } catch (error) {
        console.error('Error fetching A value:', error);
        return null;
    }
}

