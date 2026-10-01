@echo off
setlocal
echo =====================================================
echo    Abhishek Singh Yadav Portfolio ^| Deploy
echo =====================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" %*
