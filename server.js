/**
 * Swift Website Server
 * Servidor Express simples para desenvolvimento e produção
 */

const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression()); // Comprime arquivos para melhor performance
app.use(cors()); // Habilita CORS para desenvolvimento
app.use(express.static(path.join(__dirname))); // Serve arquivos estáticos

// Configuração de cache para assets
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '1y', // Cache de 1 ano para assets
  etag: true
}));

app.use('/components', express.static(path.join(__dirname, 'components'), {
  maxAge: '1d', // Cache de 1 dia para componentes
  etag: true
}));

app.use('/style', express.static(path.join(__dirname, 'style'), {
  maxAge: '1d', // Cache de 1 dia para estilos
  etag: true
}));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 Swift Website Server iniciado!');
  console.log(`📱 Acesse: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('📁 Servindo arquivos de:', __dirname);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Servidor sendo encerrado...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Servidor sendo encerrado...');
  process.exit(0);
});
