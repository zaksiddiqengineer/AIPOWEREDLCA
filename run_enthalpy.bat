@echo off
setlocal

REM Activate the psi4 environment
call conda activate psi4_env

REM Check if the environment activated successfully
if %errorlevel% neq 0 (
    echo Failed to activate psi4 environment
    exit /b %errorlevel%
)

REM Read JSON file path from argument
set JSON_FILE=%1

REM Debug: Print the JSON file path
echo JSON file path: %JSON_FILE%

REM Run the Python script with the JSON file
python C:\Users\zaksi\LLMTESTER\Qchem\generateEnthalpyFormation.py %JSON_FILE%

REM Check if the Python script ran successfully
if %errorlevel% neq 0 (
    echo Python script execution failed
    exit /b %errorlevel%
)

endlocal
