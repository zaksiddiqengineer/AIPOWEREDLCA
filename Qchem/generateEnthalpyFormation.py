import psi4
from rdkit import Chem
from rdkit.Chem import AllChem
import argparse
import json
import os

def compute_enthalpy(smiles):
    molecule_rdkit = Chem.MolFromSmiles(smiles)
    molecule_rdkit = Chem.AddHs(molecule_rdkit)
    AllChem.EmbedMolecule(molecule_rdkit, AllChem.ETKDG())
    AllChem.UFFOptimizeMolecule(molecule_rdkit)
    xyz = Chem.MolToXYZBlock(molecule_rdkit)
    psi4_molecule = psi4.geometry(xyz)
    psi4.set_options({'basis': 'cc-pVDZ', 'scf_type': 'pk'})
    psi4.core.set_output_file('output.dat')
    psi4.energy('scf', molecule=psi4_molecule)
    psi4.frequency('scf', molecule=psi4_molecule)
    
    enthalpy = None
    gibbs_free_energy = None
    zpve = None
    cp = None
    
    with open('output.dat', 'r') as f:
        for line in f:
            if "Total H, Enthalpy at  298.15 [K]" in line:
                enthalpy = float(line.split()[-2])
            elif "Total G, Gibbs energy at  298.15 [K]" in line:
                gibbs_free_energy = float(line.split()[-2])
            elif "Vibrational ZPVE" in line:
                zpve = float(line.split()[-2])
            elif "Total Cp" in line:
                cp = float(line.split()[2])  # Assuming the third value is in [cal/(mol K)]
    
    return enthalpy, gibbs_free_energy, zpve, cp

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Compute enthalpy of formation.')
    parser.add_argument('json_file', type=str, help='Path to JSON file containing reactants and products SMILES')
    args = parser.parse_args()

    try:
        with open(args.json_file, 'r') as f:
            data = json.load(f)
        reactants = data['reactants']
        products = data['products']
    except (json.JSONDecodeError, KeyError, FileNotFoundError) as e:
        print(f"Error decoding JSON: {e}")
        exit(1)

    # Debug: Print the received arguments
    print(f"Received reactants: {reactants}")
    print(f"Received products: {products}")

    reactant_enthalpies, reactant_gibbs, reactant_zpves, reactant_cps = zip(*[compute_enthalpy(smile) for smile in reactants])
    product_enthalpies, product_gibbs, product_zpves, product_cps = zip(*[compute_enthalpy(smile) for smile in products])
    
    # Print the extracted thermochemical properties for reactants and products
    print("Reactant Enthalpies:", reactant_enthalpies)
    print("Reactant Gibbs Free Energies:", reactant_gibbs)
    print("Reactant Zero-Point Vibrational Energies:", reactant_zpves)
    print("Reactant Constant Pressure Heat Capacities:", reactant_cps)

    print("Product Enthalpies:", product_enthalpies)
    print("Product Gibbs Free Energies:", product_gibbs)
    print("Product Zero-Point Vibrational Energies:", product_zpves)
    print("Product Constant Pressure Heat Capacities:", product_cps)

    total_reactant_enthalpy = sum(reactant_enthalpies)
    total_product_enthalpy = sum(product_enthalpies)
    enthalpy_change_hartree = total_product_enthalpy - total_reactant_enthalpy
    enthalpy_change_kjmol = enthalpy_change_hartree * 2625.5  # Conversion factor from Hartree to kJ/mol

    result = {
        "enthalpyChange": enthalpy_change_kjmol,
        "reactantEnthalpies": list(reactant_enthalpies),
        "reactantGibbs": list(reactant_gibbs),
        "reactantZPVEs": list(reactant_zpves),
        "reactantCPs": list(reactant_cps),
        "productEnthalpies": list(product_enthalpies),
        "productGibbs": list(product_gibbs),
        "productZPVEs": list(product_zpves),
        "productCPs": list(product_cps)
    }
    print(json.dumps(result))
