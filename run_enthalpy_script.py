# run_enthalpy_script.py

import os
import subprocess
import sys

def run_enthalpy_script(reactants, products):
    conda_env = 'LLMwebapp'
    script_path = 'C:\\Users\\zaksi\\LLMTESTER\\Qchem\\generateEnthalpyFormation.py'

    # Activate the Anaconda environment
    activate_cmd = f'conda activate {conda_env}'
    subprocess.call(activate_cmd, shell=True)

    # Run the generateEnthalpyFormation.py script and capture the output
    command = f'python "{script_path}" --reactants "{reactants}" --products "{products}"'
    output = subprocess.check_output(command, shell=True, universal_newlines=True)
    print(output)

if __name__ == '__main__':
    reactants = sys.argv[1]
    products = sys.argv[2]
    run_enthalpy_script(reactants, products)