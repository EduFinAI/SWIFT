#!/bin/bash

echo "🚀 Iniciando Swift Website Server..."
echo

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado! Instale em: https://nodejs.org/"
    exit 1
fi

# Verificar se npm está disponível
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado!"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo

echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências!"
    exit 1
fi

echo
echo "🎯 Iniciando servidor..."
echo "📱 Acesse: http://localhost:3000"
echo "🛑 Para parar: Ctrl+C"
echo

npm start
