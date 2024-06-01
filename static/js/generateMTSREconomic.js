
export function openMTSREconomicAnalysis() {
    var container = document.createElement('div');
    container.id = 'MTSREconomicAnalysis';
    container.innerHTML = `
        <h2>Economic And Environmental Analysis</h2>
        <div>
            <label for="fuelTypeMTSR">Ultimate Fuel Type:</label>
            <select id="fuelTypeMTSR" name="fuelType" required>
                <option value="">Select Fuel Type</option>
            </select>
        </div>
        <div>
            <label for="utilityMTSR">Utility:</label>
            <select id="utilityMTSR" name="utility" required>
                <option value="">Select Utility</option>
            </select>
        </div>
        <button id="submitEconomicEnvironmentalDataMTSR">Submit Data</button>
    `;

    document.getElementById('MTSREconomicalContainer').appendChild(container);

    populateFuelTypeDropdownMTSR();
    document.getElementById('fuelTypeMTSR').addEventListener('change', populateUtilityDropdownMTSR);

    document.getElementById('submitEconomicEnvironmentalDataMTSR').addEventListener('click', async function() {
        var fuelType = document.getElementById('fuelTypeMTSR').value;
        var utility = document.getElementById('utilityMTSR').value;
        var cpMixture = parseFloat(localStorage.getItem('cpMixture'));
        var totalHeat = parseFloat(localStorage.getItem('totalHeat'));
        var totalProductMass = parseFloat(localStorage.getItem('totalProductMass'));
        var totalProductMoles = parseFloat(localStorage.getItem('totalProductMoles'));

        var emissionData = await getEmissionDataMTSR();
        if (emissionData) {
            var co2Ef = emissionData.co2_ef;
            var effCp = emissionData.eff_cp;
            var deltaT = emissionData.deltaT;
            var costIndex = emissionData.costIndex;

            var data = {
                cpMixture: parseFloat(cpMixture),
                totalHeat: parseFloat(totalHeat),
                totalProductMass: parseFloat(totalProductMass),
                totalProductMoles: parseFloat(totalProductMoles),
                co2Ef: parseFloat(co2Ef),
                effCp: parseFloat(effCp),
                deltaT: parseFloat(deltaT),
                costIndex: parseFloat(costIndex)
            };

            // Log all data to the console
            console.log('Data for calculation:', data);

            try {
                const response = await fetch('/calculate_water', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                displayCalculationResult(result);

            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }
    });
}

function displayCalculationResult(result) {
    var resultContainer = document.getElementById('MSTRCalculationResult');
    
    if (!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.id = 'MSTRCalculationResult';
        document.body.appendChild(resultContainer);
    }

    resultContainer.innerHTML = `
        <p>Mass of Cooling Liquid: ${result.massCoolingLiquid} kg</p>
        <p>Emissions: ${result.emissions} kg CO2</p>
        <p>Cost: ${result.cost}</p>
    `;
}

// Function to populate the fuel type dropdown
async function populateFuelTypeDropdownMTSR() {
    try {
        const response = await fetch('/get_fuel_types_MTSR');
        const fuelTypes = await response.json();
        const fuelTypeDropdown = document.getElementById('fuelTypeMTSR');
        
        fuelTypes.forEach(fuelType => {
            const option = document.createElement('option');
            option.value = fuelType;
            option.textContent = fuelType;
            fuelTypeDropdown.appendChild(option);
        });

        console.log('Fuel Types:', fuelTypes);  // Log the fuel types received
        console.log('Fuel Type Dropdown:', fuelTypeDropdown.innerHTML);  // Verify if the options are added correctly
    } catch (error) {
        console.error('Error fetching fuel types:', error);
    }
}

// Function to populate the utility dropdown based on the selected fuel type
async function populateUtilityDropdownMTSR() {
    const fuelType = document.getElementById('fuelTypeMTSR').value;
    const utilityDropdown = document.getElementById('utilityMTSR');
    utilityDropdown.innerHTML = '<option value="">Select Utility</option>';
    
    try {
        const response = await fetch(`/get_utilities_MTSR?fuel_type=${encodeURIComponent(fuelType)}`);
        const utilities = await response.json();
        
        utilities.forEach(utility => {
            const option = document.createElement('option');
            option.value = utility;
            option.textContent = utility;
            utilityDropdown.appendChild(option);
        });

        console.log('Utilities:', utilities);  // Log the utilities received
        console.log('Utility Dropdown:', utilityDropdown.innerHTML);  // Verify if the options are added correctly
    } catch (error) {
        console.error('Error fetching utilities:', error);
    }
}

async function getEmissionDataMTSR() {
    const fuelType = document.getElementById('fuelTypeMTSR').value;
    const utility = document.getElementById('utilityMTSR').value;

    try {
        const emissionResponse = await fetch(`/get_emission_data?fuel_type=${encodeURIComponent(fuelType)}&utility=${encodeURIComponent(utility)}`);
        const emissionData = await emissionResponse.json();

        const deltaTResponse = await fetch(`/get_utility_deltaT?utility=${encodeURIComponent(utility)}`);
        const deltaTData = await deltaTResponse.json();

        const costIndexResponse = await fetch(`/get_utility_cost_index?utility=${encodeURIComponent(utility)}`);
        const costIndexData = await costIndexResponse.json();

        if (emissionData.error || deltaTData.error || costIndexData.error) {
            console.error(`Error fetching data: ${emissionData.error || deltaTData.error || costIndexData.error}`);
            return null;
        }

        return {
            co2_ef: emissionData.co2_ef,
            eff_cp: emissionData.eff_cp,
            deltaT: deltaTData.deltaT,
            costIndex: costIndexData.costIndex
        };
    } catch (error) {
        console.error('Error fetching emission data:', error);
        return null;
    }
}


