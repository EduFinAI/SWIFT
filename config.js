/**
 * Configuração do ambiente de desenvolvimento
 */

const config = {
  // Configurações do servidor
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development'
  },

  // Configurações de cache
  cache: {
    assets: '1y',      // Assets estáticos (imagens, etc.)
    components: '1d',  // Componentes HTML/CSS/JS
    styles: '1d'        // Arquivos CSS
  },

  // Configurações de compressão
  compression: {
    enabled: true,
    level: 6,           // Nível de compressão (1-9)
    threshold: 1024     // Tamanho mínimo para compressão (bytes)
  },

  // Configurações de CORS
  cors: {
    enabled: true,
    origin: '*',       // Em produção, especificar domínios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },

  // Configurações de logging
  logging: {
    enabled: true,
    level: 'info',      // debug, info, warn, error
    format: 'combined'  // combined, common, dev, short, tiny
  },

  // Configurações de desenvolvimento
  development: {
    autoReload: true,   // Auto-reload com nodemon
    hotReload: false,  // Hot reload para CSS/JS
    debugMode: true     // Modo debug ativado
  }
};

module.exports = config;
