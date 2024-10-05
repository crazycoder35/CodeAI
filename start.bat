@echo off

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed. Please install Python and try again.
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js and try again.
    exit /b 1
)

REM Start the backend
echo Starting the backend...
cd backend

REM Check if virtual environment exists, create if it doesn't
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install requirements
call venv\Scripts\activate
pip install -r ..\requirements.txt

REM Start the backend server
start cmd /k "venv\Scripts\activate && uvicorn main:app --reload"

REM Start the frontend
echo Starting the frontend...
cd ..\frontend

REM Install frontend dependencies
call npm install

REM Start the frontend development server
start cmd /k "npm start"

echo AI Coder is starting. Please wait for both the backend and frontend to initialize.
echo Backend will be available at http://localhost:8000
echo Frontend will be available at http://localhost:3000

REM Return to the original directory
cd ..

echo Setup complete. Press any key to exit.
pause >nul