from flask import Flask, request, render_template, jsonify
import requests
import json
import re
import subprocess

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/calculate_enthalpy', methods=['POST'])
def calculate_enthalpy():
    try:
        reactants = request.form['reactants']
        products = request.form['products']

        # Save reactants and products to temporary JSON files
        with open('reactants.json', 'w') as reactants_file:
            reactants_file.write(reactants)
        with open('products.json', 'w') as products_file:
            products_file.write(products)

        # Create the command to run the batch file
        script_path = 'run_enthalpy.bat'
        command = f'{script_path} reactants.json products.json'

        # Debug: Print the command to ensure it is correct
        print(f"Running command: {command}")

        # Run the batch file and capture the output
        result = subprocess.run(command, shell=True, capture_output=True, text=True)

        # Debug: Print the output to verify it
        print(f"Output from script: {result.stdout}")
        print(f"Error from script: {result.stderr}")

        # Parse the JSON output from the batch file
        output = result.stdout.strip().split('\n')[-1]
        result_json = json.loads(output)
        enthalpy_change = result_json.get('enthalpyChange')
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





if __name__ == '__main__':
    app.run(debug=True, port=5000)

