@echo off
setlocal

set REACTANTS_FILE=reactants.json
set PRODUCTS_FILE=products.json

rem Write JSON to files
python -c "import sys, json; json.dump(json.loads(sys.argv[1]), open(sys.argv[2], 'w'))" "%~1" %REACTANTS_FILE%
python -c "import sys, json; json.dump(json.loads(sys.argv[1]), open(sys.argv[2], 'w'))" "%~2" %PRODUCTS_FILE%

rem Activate the psi4_env environment and run the Python script
call C:\Users\zaksi\anaconda3\Scripts\activate psi4_env
python "C:\Users\zaksi\LLMTESTER\Qchem\generateEnthalpyFormation.py" --reactants_file %REACTANTS_FILE% --products_file %PRODUCTS_FILE%

endlocal
