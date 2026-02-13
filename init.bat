@echo off
REM DRESSING - Initial Setup Script for Windows
REM This script helps you get started with DRESSING development

echo ===============================================================
echo.
echo   DRESSING - Initial Setup
echo   Detailed Report of Executed Scenarios, Steps and INsights
echo.
echo ===============================================================
echo.

REM Check Node.js
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js is not installed. Please install Node.js ^>= 14.0.0
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [+] Node.js version: %NODE_VERSION%

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] npm is not installed. Please install npm ^>= 6.0.0
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [+] npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo Installing dependencies...
echo This may take a few minutes...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [X] Failed to install dependencies
    exit /b 1
)

echo [+] Dependencies installed successfully
echo.

REM Build the project
echo Building the project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo [X] Failed to build the project
    exit /b 1
)

echo [+] Project built successfully
echo.

REM Run tests
echo Running tests...
call npm test

if %ERRORLEVEL% NEQ 0 (
    echo [!] Some tests failed. Please review the output above.
) else (
    echo [+] All tests passed
)

echo.
echo ===============================================================
echo.
echo Setup complete! DRESSING is ready to use.
echo.
echo Next steps:
echo.
echo 1. Try the example:
echo    npm run example
echo.
echo 2. Test the CLI:
echo    node dist\cli.js --help
echo    node dist\cli.js generate -i examples\sample-report.json -o test.html --open
echo.
echo 3. Link globally (optional):
echo    npm link
echo    dressing --help
echo.
echo 4. Read the documentation:
echo    - README.md - Main documentation
echo    - QUICKSTART.md - Quick start guide
echo    - SETUP.md - Development guide
echo    - COMMANDS.md - Command reference
echo.
echo 5. Start developing:
echo    npm run build:watch
echo.
echo ===============================================================
echo.
echo For more information, visit: https://github.com/jedau/cucumber-dressing
echo.
pause
