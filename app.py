from flask import Flask, request, render_template, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_chemical_info', methods=['POST'])
def get_chemical_info():
    reactants = json.loads(request.form['reactants'])
    products = json.loads(request.form['products'])

    environmental_report = ""

    for reactant in reactants:
        prompt = f"What is the environmental impact of {reactant['name']}?"
        response = ask_koboldcpp(prompt)
        environmental_report += f"Reactant: {reactant['name']}\n{response['text']}\n\n"

    for product in products:
        prompt = f"What is the environmental impact of {product['name']}?"
        response = ask_koboldcpp(prompt)
        environmental_report += f"Product: {product['name']}\n{response['text']}\n\n"

    return jsonify({"text": environmental_report})

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