/**
 * Servidor de desenvolvimento com recursos avançados
 */

const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const config = require('./config');

// Middleware básico
app.use(compression(config.compression));
app.use(cors(config.cors));

// Middleware de logging personalizado
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  console.log(`[${timestamp}] ${method} ${url} - ${userAgent}`);
  next();
});

// Servir arquivos estáticos com cache otimizado
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: config.cache.assets,
  etag: true,
  lastModified: true
}));

app.use('/components', express.static(path.join(__dirname, 'components'), {
  maxAge: config.cache.components,
  etag: true,
  lastModified: true
}));

app.use('/style', express.static(path.join(__dirname, 'style'), {
  maxAge: config.cache.styles,
  etag: true,
  lastModified: true
}));

// Servir arquivos estáticos da raiz
app.use(express.static(path.join(__dirname)));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check detalhado
app.get('/health', (req, res) => {
  const stats = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: config.server.environment,
    version: process.version,
    platform: process.platform,
    arch: process.arch
  };
  
  res.json(stats);
});

// Rota para informações do sistema
app.get('/info', (req, res) => {
  const info = {
    server: config.server,
    cache: config.cache,
    compression: config.compression,
    cors: config.cors,
    development: config.development
  };
  
  res.json(info);
});

// Rota para listar arquivos (apenas em desenvolvimento)
if (config.server.environment === 'development') {
  app.get('/files', (req, res) => {
    const directory = req.query.dir || '.';
    const fullPath = path.join(__dirname, directory);
    
    try {
      const files = fs.readdirSync(fullPath, { withFileTypes: true });
      const fileList = files.map(file => ({
        name: file.name,
        type: file.isDirectory() ? 'directory' : 'file',
        path: path.join(directory, file.name)
      }));
      
      res.json(fileList);
    } catch (error) {
      res.status(404).json({ error: 'Directory not found' });
    }
  });
}

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro no servidor:', err);
  
  const errorResponse = {
    error: 'Erro interno do servidor',
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  };
  
  if (config.server.environment === 'development') {
    errorResponse.details = err.message;
    errorResponse.stack = err.stack;
  }
  
  res.status(500).json(errorResponse);
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log('🚀 Swift Website Server (Desenvolvimento) iniciado!');
  console.log(`📱 Acesse: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`ℹ️  Informações: http://localhost:${PORT}/info`);
  console.log(`🌍 Ambiente: ${config.server.environment}`);
  console.log(`📁 Servindo arquivos de: ${__dirname}`);
  console.log(`⚡ Compressão: ${config.compression.enabled ? 'Ativada' : 'Desativada'}`);
  console.log(`🌐 CORS: ${config.cors.enabled ? 'Ativado' : 'Desativado'}`);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Recebido sinal ${signal}. Encerrando servidor...`);
  
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso!');
    process.exit(0);
  });
  
  // Forçar encerramento após 10 segundos
  setTimeout(() => {
    console.log('⚠️  Forçando encerramento do servidor...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Tratamento de erros não capturados
process.on('uncaughtException', (err) => {
  console.error('❌ Erro não capturado:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada não tratada:', reason);
  process.exit(1);
});
