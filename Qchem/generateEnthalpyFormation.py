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
    with open('output.dat', 'r') as f:
        for line in f:
            if "Total H, Enthalpy at  298.15 [K]" in line:
                enthalpy = float(line.split()[-2])
                break
    return enthalpy

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

    reactant_enthalpies = [compute_enthalpy(smile) for smile in reactants]
    product_enthalpies = [compute_enthalpy(smile) for smile in products]
    total_reactant_enthalpy = sum(reactant_enthalpies)
    total_product_enthalpy = sum(product_enthalpies)
    enthalpy_change_hartree = total_product_enthalpy - total_reactant_enthalpy
    enthalpy_change_kjmol = enthalpy_change_hartree * 2625.5  # Conversion factor from Hartree to kJ/mol

    result = {"enthalpyChange": enthalpy_change_kjmol}
    print(json.dumps(result))
