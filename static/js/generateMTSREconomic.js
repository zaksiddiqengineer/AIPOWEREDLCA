export function openMTSREconomicAnalysis() {
    var container = document.createElement('div');
    container.id = 'MTSReconomicAnalysis';
    container.innerHTML = `
        <h2>Economic And evironmental  Analysis</h2>
        <div>
            <label for="fuelType">Ultimate Fuel Type:</label>
            <select id="fuelType" name="fuelType" required>
                <option value="">Select Fuel Type</option>
            </select>
        </div>
        <div>
            <label for="utility">Utility:</label>
            <select id="utility" name="utility" required>
                <option value="">Select Utility</option>
            </select>
        </div>
        <button id="submitEconomicEnvironmentalData">Submit Data</button>
    `;

    document.getElementById('economicEnvironmentalFormContainer').appendChild(container);

    populateFuelTypeDropdown();
    document.getElementById('fuelType').addEventListener('change', populateUtilityDropdown);
    document.getElementById('submitEconomicEnvironmentalData').addEventListener('click', async function() {
        var productionRate = document.getElementById('productionRate').value;
        var hoursPerDay = document.getElementById('hoursPerDay').value;
        var daysPerMonth = document.getElementById('daysPerMonth').value;
        var monthsPerYear = document.getElementById('monthsPerYear').value;
        var temperatureIn = document.getElementById('temperatureIn').value;
        var temperatureReaction = document.getElementById('temperatureReaction').value;
        var reactorVolume = document.getElementById('reactorVolume').value;
        var fuelType = document.getElementById('fuelType').value;
        var utility = document.getElementById('utility').value;

        var emissionData = await getEmissionData();
        if (emissionData) {
            var co2Ef = emissionData.co2_ef;
            var effCp = emissionData.eff_cp;

            var UValue = await getUValue(reactorVolume);
            var AValue = await getAValue(reactorVolume);

            var enthalpyChangeResultElement = document.getElementById('enthalpyChangeResult');
            var enthalpyChangeResultText = enthalpyChangeResultElement.textContent.trim();
            var enthalpyChangeResultMatch = enthalpyChangeResultText.match(/-?\d+(\.\d+)?/);
            var enthalpyChangeResult = enthalpyChangeResultMatch ? parseFloat(enthalpyChangeResultMatch[0]) : NaN;

            var data = {
                productionRate: parseFloat(productionRate),
                hoursPerDay: parseFloat(hoursPerDay),
                daysPerMonth: parseFloat(daysPerMonth),
                monthsPerYear: parseFloat(monthsPerYear),
                tIn: parseFloat(temperatureIn),
                tReact: parseFloat(temperatureReaction),
                co2Ef: parseFloat(co2Ef),
                UValue: parseFloat(UValue),
                AValue: parseFloat(AValue),
                effCp: parseFloat(effCp),
                enthalpyChangeResult: enthalpyChangeResult
            };

            try {
                const response = await fetch('/calculate_emissions_and_mass', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                displayCalculationResult(result);

                document.getElementById('reactionMTSRContainer').style.display = 'block';
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
