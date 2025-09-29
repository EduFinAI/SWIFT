@echo off
echo 🚀 Iniciando Swift Website Server...
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado! Instale em: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar se npm está disponível
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm não encontrado!
    pause
    exit /b 1
)

echo ✅ Node.js encontrado: 
node --version

echo.
echo 📦 Instalando dependências...
npm install

if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências!
    pause
    exit /b 1
)

echo.
echo 🎯 Iniciando servidor...
echo 📱 Acesse: http://localhost:3000
echo 🛑 Para parar: Ctrl+C
echo.

npm start
