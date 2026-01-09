@echo off
echo Starting local server for Jewellery Box Application...
echo.
echo Please wait while the server starts...
echo.
echo Once started, open your browser and go to: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server when done.
echo.

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python to start server...
    python -m http.server 8000
    goto :end
)

REM Try Python 2
python2 --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 2 to start server...
    python2 -m SimpleHTTPServer 8000
    goto :end
)

REM Try PHP
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using PHP to start server...
    php -S localhost:8000
    goto :end
)

echo.
echo ERROR: No suitable server found!
echo.
echo Please install one of the following:
echo   - Python 3: https://www.python.org/downloads/
echo   - PHP: https://www.php.net/downloads.php
echo   - Node.js: https://nodejs.org/
echo.
echo Or use VS Code with Live Server extension.
echo.
pause

:end

