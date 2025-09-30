@echo off
title Swift Website Server
color 0A

echo.
echo  ███████╗██╗    ██╗██╗███████╗████████╗
echo  ██╔════╝██║    ██║██║██╔════╝╚══██╔══╝
echo  ███████╗██║ █╗ ██║██║███████╗   ██║   
echo  ╚════██║██║███╗██║██║╚════██║   ██║   
echo  ███████║╚███╔███╔╝██║███████║   ██║   
echo  ╚══════╝ ╚══╝╚══╝ ╚═╝╚══════╝   ╚═╝   
echo.
echo  🚀 Swift Website Server
echo  ========================
echo.

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado!
    echo 📥 Instale em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js: 
node --version
echo.

REM Verificar dependências
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Erro ao instalar dependências!
        pause
        exit /b 1
    )
    echo ✅ Dependências instaladas!
    echo.
)

echo 🎯 Escolha o modo de execução:
echo.
echo [1] Servidor de Produção (rápido)
echo [2] Servidor de Desenvolvimento (com logs)
echo [3] Servidor com Auto-reload
echo.
set /p choice="Digite sua escolha (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Iniciando servidor de produção...
    echo 📱 Acesse: http://localhost:3000
    echo 🛑 Para parar: Ctrl+C
    echo.
    npm start
) else if "%choice%"=="2" (
    echo.
    echo 🔧 Iniciando servidor de desenvolvimento...
    echo 📱 Acesse: http://localhost:3000
    echo 🏥 Health: http://localhost:3000/health
    echo ℹ️  Info: http://localhost:3000/info
    echo 🛑 Para parar: Ctrl+C
    echo.
    npm run dev
) else if "%choice%"=="3" (
    echo.
    echo 🔄 Iniciando servidor com auto-reload...
    echo 📱 Acesse: http://localhost:3000
    echo 🔄 Arquivos serão recarregados automaticamente
    echo 🛑 Para parar: Ctrl+C
    echo.
    npm run dev-watch
) else (
    echo ❌ Opção inválida!
    pause
    exit /b 1
)

pause
