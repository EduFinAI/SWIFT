# 🚀 Swift Website Server

Servidor Node.js estável para desenvolvimento e visualização do site Swift.

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** (vem com Node.js)

## 🚀 Instalação e Execução

### Opção 1: Script Automático (Windows)
```bash
# Execute o arquivo .bat
start-server.bat
```

### Opção 2: Comandos Manuais
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor
npm start
```

### Opção 3: Desenvolvimento com Auto-reload
```bash
# Instalar nodemon globalmente (opcional)
npm install -g nodemon

# Executar em modo desenvolvimento
npm run dev
```

## 🌐 Acesso

- **Site**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

## 📁 Estrutura do Servidor

```
swift-website/
├── server.js          # Servidor principal
├── package.json       # Dependências e scripts
├── start-server.bat   # Script Windows
├── start-server.sh    # Script Linux/Mac
├── index.html         # Página principal
├── assets/            # Imagens e recursos
├── components/        # Componentes HTML/CSS/JS
└── style/            # Estilos CSS
```

## ⚡ Recursos do Servidor

- ✅ **Compressão GZIP** para melhor performance
- ✅ **Cache inteligente** para assets estáticos
- ✅ **CORS habilitado** para desenvolvimento
- ✅ **Health check** para monitoramento
- ✅ **Graceful shutdown** para encerramento seguro
- ✅ **Tratamento de erros** robusto

## 🔧 Scripts Disponíveis

```bash
npm start      # Inicia servidor de produção
npm run dev    # Inicia servidor com auto-reload
npm run serve  # Alias para start
```

## 🛠️ Configuração

### Variáveis de Ambiente
```bash
PORT=3000                    # Porta do servidor
NODE_ENV=development         # Ambiente (development/production)
```

### Cache de Assets
- **Assets**: Cache de 1 ano
- **Componentes**: Cache de 1 dia
- **Estilos**: Cache de 1 dia

## 🚨 Solução de Problemas

### Porta já em uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Dependências não instaladas
```bash
# Limpar cache e reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Erro de permissão
```bash
# Windows (como administrador)
npm install -g npm@latest

# Linux/Mac
sudo npm install -g npm@latest
```

## 📊 Monitoramento

### Health Check
```bash
curl http://localhost:3000/health
```

### Logs do Servidor
O servidor exibe logs em tempo real no console:
- ✅ Inicialização
- 📱 URL de acesso
- 🏥 Health check
- 🌍 Ambiente
- 📁 Diretório servido

## 🔄 Comparação com Live Server

| Recurso | Live Server | Node.js Server |
|---------|-------------|----------------|
| Estabilidade | ⚠️ Instável | ✅ Muito estável |
| Performance | ⚠️ Básica | ✅ Otimizada |
| Cache | ❌ Não | ✅ Inteligente |
| Compressão | ❌ Não | ✅ GZIP |
| Monitoramento | ❌ Não | ✅ Health check |
| Logs | ⚠️ Limitados | ✅ Detalhados |
| Configuração | ⚠️ Limitada | ✅ Flexível |

## 🎯 Vantagens do Node.js Server

1. **Estabilidade**: Não cai como Live Server
2. **Performance**: Compressão e cache otimizados
3. **Flexibilidade**: Configurável para diferentes ambientes
4. **Monitoramento**: Health check e logs detalhados
5. **Produção**: Pronto para deploy
6. **Debugging**: Melhor para desenvolvimento

---

**💡 Dica**: Use `npm run dev` durante desenvolvimento para auto-reload quando arquivos mudarem!
