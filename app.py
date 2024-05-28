from flask import Flask, request, render_template, jsonify
import requests
import json
import re
import os
import csv
import subprocess
import shlex
import tempfile  

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/calculate_emissions_and_mass', methods=['POST'])
def calculate_emissions_and_mass_route():
    try:
        data = request.json
        heat_of_reaction = float(data.get('enthalpyChangeResult'))
        production_rate_per_hour = float(data.get('productionRate'))
        hours_per_day = float(data.get('hoursPerDay'))
        days_per_month = float(data.get('daysPerMonth'))
        months_per_year = float(data.get('monthsPerYear'))
        co2_ef = float(data.get('co2Ef'))
        eff_cp = float(data.get('effCp'))

        result = calculate_emissions_and_mass(
            heat_of_reaction,
            production_rate_per_hour,
            hours_per_day,
            days_per_month,
            months_per_year,
            co2_ef,
            eff_cp
        ) 

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get_fuel_types', methods=['GET'])
def get_fuel_types():
    fuel_types = []
    file_path = 'C:\\Users\\zaksi\\LLMTESTER\\data\\EMISSIONFACTORDATABASE.csv'
    
    with open(file_path, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            fuel_type = row['Ultimate Fuel Type']
            if fuel_type not in fuel_types:
                fuel_types.append(fuel_type)
    
    return jsonify(fuel_types)


@app.route('/get_utilities', methods=['GET'])
def get_utilities():
    fuel_type = request.args.get('fuel_type')
    utilities = []
    
    file_path = 'C:\\Users\\zaksi\\LLMTESTER\\data\\EMISSIONFACTORDATABASE.csv'
    
    with open(file_path, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            if row['Ultimate Fuel Type'] == fuel_type:
                utility = row['Utility']
                if utility not in utilities:
                    utilities.append(utility)
    
    return jsonify(utilities)


@app.route('/get_emission_data', methods=['GET'])
def get_emission_data():
    fuel_type = request.args.get('fuel_type')
    utility = request.args.get('utility')
    
    file_path = 'C:\\Users\\zaksi\\LLMTESTER\\data\\EMISSIONFACTORDATABASE.csv'
    
    with open(file_path, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            if row['Ultimate Fuel Type'] == fuel_type and row['Utility'] == utility:
                co2_ef = float(row['CO2 EF [KG/KJ]'])
                eff_cp = float(row['Eff Cp[KJ/KG-C]'])
                return jsonify({'co2_ef': co2_ef, 'eff_cp': eff_cp})
    
    return jsonify({'error': 'Data not found'})



@app.route('/calculate_enthalpy', methods=['POST'])
def calculate_enthalpy():
    try:
        reactants = request.form['reactants']
        products = request.form['products']

        # Debug: Print the reactants and products
        print(f"Reactants: {reactants}")
        print(f"Products: {products}")

        # Create the JSON string containing reactants and products
        reactants_products_json = {
            "reactants": json.loads(reactants),
            "products": json.loads(products)
        }

        # Write the JSON string to a temporary file
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json') as temp_json_file:
            json.dump(reactants_products_json, temp_json_file)
            temp_json_file_path = temp_json_file.name

        # Create the command to run the batch file
        script_path = r'C:\Users\zaksi\LLMTESTER\run_enthalpy.bat'
        command = f'cmd.exe /c "{script_path} {temp_json_file_path}"'

        # Debug: Print the command to ensure it is correct
        print(f"Running command: {command}")

        # Run the batch file and capture the output
        result = subprocess.run(command, shell=True, capture_output=True, text=True)

        # Debug: Print the output to verify it
        print(f"Output from script: {result.stdout}")
        print(f"Error from script: {result.stderr}")

        # Debug: Print the raw output before splitting
        print(f"Raw output: {result.stdout.strip()}")

        # Parse the JSON output from the batch file
        output = result.stdout.strip().split('\n')[-1]

        # Debug: Print the parsed output
        print(f"Parsed output: {output}")

        result_json = json.loads(output)
        enthalpy_change = result_json.get('enthalpyChange')

        # Remove the temporary JSON file
        os.remove(temp_json_file_path)

        if enthalpy_change is not None:
            return jsonify({'enthalpyChange': enthalpy_change})
        else:
            return jsonify({'error': 'Invalid output from enthalpy calculation.'}), 500
    except Exception as e:
        print(f"Error in calculate_enthalpy: {str(e)}")
        return jsonify({'error': 'An error occurred during enthalpy calculation.'}), 500
def extract_scores(text):
    score = 0  # Initialize score with a default valu
    score_match = re.search(r'Overall Score:\s*(High|Medium|Low)', text, re.IGNORECASE)
    if score_match:
        score = score_match.group(1).lower()
        print(f"Extracted score: {score}")  # Logging statement
        if score == 'high':
            return 3
        elif score == 'medium':
            return 2
        else:
            return 1
    else:
        print("No score found")  # Logging statement
        return 0

@app.route('/get_chemical_info', methods=['POST'])
def get_chemical_info():
    reactants = json.loads(request.form['reactants'])
    products = json.loads(request.form['products'])

    environmental_report = ""
    reactant_scores = {}
    product_scores = {}
    aggregate_scores = {'emissions': [], 'waste': [], 'energy': [], 'transportation': [], 'economic': [], 'innovations': [], 'soil': [], 'water': [], 'air': [], 'eol': []}

    for reactant in reactants:
        reactant_scores[reactant['name']] = {'emissions': 0, 'waste': 0, 'energy': 0, 'transportation': 0, 'economic': 0, 'innovations':0}

        # Emissions impact
        #print(f"Emissions response for {reactant['name']}: {response_emissions['text']}")  # Logging statement
        prompt_emissions = f"List the 4 main environmental impacts of the production phase of {reactant['name']} in regards to emissions. First  assign an Overall Score: high, medium, or low score to the emission category not indvidually ."
        response_emissions = ask_koboldcpp(prompt_emissions)
        environmental_report += f"<div class='material-impacts-emissions'><h3>Emissions Impact for Reactant: {reactant['name']}</h3><p>{response_emissions['text']}</p></div>"
        reactant_scores[reactant['name']]['emissions'] = extract_scores(response_emissions['text'])
        aggregate_scores['emissions'].append(extract_scores(response_emissions['text']))

        # Waste generation impact
        #print(f"Emissions response for {reactant['name']}: {response_waste['text']}")  # Logging statement
        prompt_waste = f"List the 4 main environmental impacts of the production phase of {reactant['name']} in regards to waste generation. First assign an Overall Score: high, medium, or low score to the waste category not indivudally."
        response_waste = ask_koboldcpp(prompt_waste)
        environmental_report += f"<div class='material-impacts-waste'><h3>Waste Generation Impact for Reactant: {reactant['name']}</h3><p>{response_waste['text']}</p></div>"
        reactant_scores[reactant['name']]['waste'] = extract_scores(response_waste['text'])
        aggregate_scores['waste'].append(extract_scores(response_waste['text']))

        # Energy consumption impact
        prompt_energy = f"List the 4 main environmental impacts of the production phase of {reactant['name']} in regards to energy consumption. First assign an Overall Score: high, medium, or low score to the energy category not indvidually."
        response_energy = ask_koboldcpp(prompt_energy)
        environmental_report += f"<div class='material-impacts-energy'><h3>Energy Consumption Impact for Reactant: {reactant['name']}</h3><p>{response_energy['text']}</p></div>"
        reactant_scores[reactant['name']]['energy'] = extract_scores(response_energy['text'])
        aggregate_scores['energy'].append(extract_scores(response_energy['text']))

        # Transportation impact
        prompt_transportation = f"List the 4 main environmental impacts of the transportation phase of {reactant['name']} . First assign an Overall Score: high, medium, or low score to the transporation category not indvidually."
        response_transportation = ask_koboldcpp(prompt_transportation)
        environmental_report += f"<div class='material-impacts-transportation'><h3>Transportation Impact for Reactant: {reactant['name']}</h3><p>{response_transportation['text']}</p></div>"
        reactant_scores[reactant['name']]['transportation'] = extract_scores(response_transportation['text'])
        aggregate_scores['transportation'].append(extract_scores(response_transportation['text']))

        # Economic impact of sustainable practices
        prompt_economic = f"List the 4 main economic impacts of the sustainable pracices for {reactant['name']} . First assign an Overall Score: high, medium, or low score to the economic category not indvidually."
        response_economic = ask_koboldcpp(prompt_economic)
        environmental_report += f"<div class='material-impacts-economic'><h3>Economic Impact of Sustainable Practices for Reactant: {reactant['name']}</h3><p>{response_economic['text']}</p></div>"
        reactant_scores[reactant['name']]['economic'] = extract_scores(response_economic['text'])
        aggregate_scores['economic'].append(extract_scores(response_economic['text']))

        # Green chemistry innovations
        prompt_innovations = f"List the 4 main innovations in green chemistry that could replace {reactant['name']} or make its use more sustainable but First start by assigning an Overall Score: high, medium, or low score to the innovations category ."
        response_innovations = ask_koboldcpp(prompt_innovations)
        environmental_report += f"<div class='material-innovations'><h3>Green Chemistry Innovations for Reactant: {reactant['name']}</h3><p>{response_innovations['text']}</p></div>"
        reactant_scores[reactant['name']]['innovations'] = extract_scores(response_innovations['text'])
        aggregate_scores['innovations'].append(extract_scores(response_innovations['text']))

    for product in products:
        product_scores[product['name']] = {'soil': 0, 'water': 0, 'air': 0, 'eol': 0}

        # Soil degradation impact
        prompt_soil = f"List the 4 main environmental impacts of the production phase of {product['name']} in regards to soil. First  assign an Overall Score: high, medium, or low score to the soil category not indvidually ."
        response_soil = ask_koboldcpp(prompt_soil)
        environmental_report += f"<div class='material-impacts-soil'><h3>Soil Degradation Impact for Product: {product['name']}</h3><p>{response_soil['text']}</p></div>"
        product_scores[product['name']]['soil'] = extract_scores(response_soil['text'])
        aggregate_scores['soil'].append(extract_scores(response_soil['text']))

        # Water degradation impact
        prompt_water = f"List the 4 main environmental impacts of the production phase of {product['name']} in regards to water. First  assign an Overall Score: high, medium, or low score to the water category not indvidually ."
        response_water = ask_koboldcpp(prompt_water)
        environmental_report += f"<div class='material-impacts-water'><h3>Water Degradation Impact for Product: {product['name']}</h3><p>{response_water['text']}</p></div>"
        product_scores[product['name']]['water'] = extract_scores(response_water['text'])
        aggregate_scores['water'].append(extract_scores(response_water['text']))

        # Air quality impact
        prompt_air = f"List the 4 main environmental impacts of the production phase of {product['name']} in regards to air. First  assign an Overall Score: high, medium, or low score to the air category not indvidually ."
        response_air = ask_koboldcpp(prompt_air)
        environmental_report += f"<div class='material-impacts-air'><h3>Air Quality Impact for Product: {product['name']}</h3><p>{response_air['text']}</p></div>"
        product_scores[product['name']]['air'] = extract_scores(response_air['text'])
        aggregate_scores['air'].append(extract_scores(response_air['text']))

        # End-of-life scenarios
        prompt_eol = f"List the 4 main end of life scenarios for {product['name']} . First  assign an Overall Score: high, medium, or low score to the end of life category not indvidually ."
        response_eol = ask_koboldcpp(prompt_eol)
        environmental_report += f"<div class='material-impacts-eol'><h3>End-of-Life Scenarios for Product: {product['name']}</h3><p>{response_eol['text']}</p></div>"
        product_scores[product['name']]['eol'] = extract_scores(response_eol['text'])
        aggregate_scores['eol'].append(extract_scores(response_eol['text']))

    return jsonify({
        "text": environmental_report,
        "reactant_scores": reactant_scores,
        "product_scores": product_scores,
        "aggregate_scores": {k: sum(v) / len(v) for k, v in aggregate_scores.items() if len(v) > 0}
    })


def ask_koboldcpp(prompt):
    url = "http://localhost:5001/api/v1/generate"
    payload = {
        "prompt": prompt,
        "max_length": 500,
        "temperature": 0.2,
        "top_p": 0.9
    }
    headers = {"Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        # Return only the 'text' field from the first result
        return {"text": response.json()['results'][0]['text']}
    else:
        return {"text": f"Error: Unable to fetch response from KoboldCpp. Status Code: {response.status_code}"}

def calculate_emissions_and_mass(heat_of_reaction, production_rate_per_hour, hours_per_day, days_per_month, months_per_year, co2_ef, eff_cp):
    # Assumed temperature change (Delta T)
    delta_T = 10  # °C, assumed value for heating/cooling

    # Convert the production rate to moles per month
    moles_per_month = production_rate_per_hour * hours_per_day * days_per_month

    # Calculate the monthly and annual energy requirements
    Q_monthly = heat_of_reaction * moles_per_month
    Q_annual = Q_monthly * months_per_year

    # Determine if heating or cooling is required
    if Q_monthly < 0:
        heating_cooling_needed = "cooling"
    else:
        heating_cooling_needed = "heating"

    # Calculate CO2 emissions
    CO2_emissions_monthly = Q_monthly * co2_ef
    CO2_emissions_annual = CO2_emissions_monthly * months_per_year

    # Calculate the mass of the heating/cooling fluid required
    mass_fluid_monthly = abs(Q_monthly) / (eff_cp * delta_T)

    # Calculate the cost of heating/cooling
    cost_per_kWh = 0.10  # Assuming $0.10 per kWh
    Q_monthly_kWh = Q_monthly / 3600
    cost_monthly = Q_monthly_kWh * cost_per_kWh
    cost_annual = cost_monthly * months_per_year

    result = {
        "moles_per_month": moles_per_month,
        "Q_monthly_kJ": Q_monthly,
        "Q_annual_kJ": Q_annual,
        "heating_cooling_needed": heating_cooling_needed,
        "CO2_emissions_monthly_kg": CO2_emissions_monthly,
        "CO2_emissions_annual_kg": CO2_emissions_annual,
        "mass_fluid_monthly_kg": mass_fluid_monthly,
        "cost_monthly_usd": cost_monthly,
        "cost_annual_usd": cost_annual
    }

    return result



if __name__ == '__main__':
    app.run(debug=True, port=5000)