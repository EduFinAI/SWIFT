/**
 * Swift Configuration - Central configuration for scalability
 * @version 2.0.0
 */

window.SwiftConfig = {
  // Version
  version: '2.0.0',
  
  // Environment
  environment: 'production', // 'development' | 'production'
  
  // Debug mode
  debug: false,
  
  // API Configuration
  api: {
    baseUrl: '/api',
    timeout: 10000,
    retries: 3
  },
  
  // Component Configuration
  components: {
    carousel: {
      autoScroll: {
        enabled: true,
        interval: 4000,
        pauseOnHover: true,
        pauseOnFocus: true
      },
      touch: {
        enabled: true,
        threshold: 50
      },
      keyboard: {
        enabled: true
      },
      accessibility: {
        enabled: true,
        announceChanges: true
      }
    },
    
    header: {
      sticky: true,
      searchDebounce: 300,
      mobileBreakpoint: 768
    },
    
    productCard: {
      hoverEffects: true,
      lazyLoading: true,
      imageOptimization: true
    },
    
    testimonials: {
      autoRotate: false,
      rotateInterval: 8000,
      showIndicators: false
    }
  },
  
  // Performance Configuration
  performance: {
    lazyLoading: {
      enabled: true,
      rootMargin: '50px',
      threshold: 0.1
    },
    
    animations: {
      enabled: true,
      respectReducedMotion: true,
      duration: 300
    },
    
    fonts: {
      preload: ['Montserrat', 'Passion One'],
      display: 'swap'
    }
  },
  
  // Analytics Configuration
  analytics: {
    enabled: false, // Set to true when implementing analytics
    provider: 'gtag', // 'gtag' | 'gtm' | 'custom'
    trackingId: '',
    events: {
      productView: true,
      addToCart: true,
      search: true,
      navigation: false
    }
  },
  
  // Feature Flags
  features: {
    darkMode: false,
    pwa: false,
    offlineMode: false,
    notifications: false,
    geolocation: false,
    voiceSearch: false
  },
  
  // Breakpoints (should match CSS)
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1280,
    xlarge: 1536
  },
  
  // Colors (should match CSS variables)
  colors: {
    primary: '#E65103',
    primaryDark: '#BF4408',
    secondary: '#BC2929',
    neutral: {
      dark: '#191818',
      medium: '#666666',
      light: '#f5f5f5',
      white: '#ffffff'
    }
  },
  
  // Spacing (should match CSS variables)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  
  // Content Configuration
  content: {
    companyName: 'Swift',
    tagline: 'Carnes selecionadas com entrega rápida',
    phone: '0800 702 1234',
    email: 'atendimento@swift.com.br',
    whatsapp: '(11) 99876-5432',
    
    social: {
      facebook: '#facebook',
      instagram: '#instagram',
      twitter: '#twitter',
      linkedin: '#linkedin'
    },
    
    shipping: {
      freeShippingThreshold: 299.00,
      deliveryTime: '2 horas',
      deliveryArea: 'São Paulo'
    }
  },
  
  // SEO Configuration
  seo: {
    title: 'Swift — Carnes selecionadas com entrega rápida',
    description: 'Descubra o sabor autêntico das melhores carnes selecionadas para sua mesa. Entrega rápida e qualidade garantida.',
    keywords: 'carnes, churrasco, entrega rápida, qualidade, picanha, frango, suíno',
    ogImage: '/assets/og-image.jpg',
    twitterCard: 'summary_large_image'
  },
  
  // Validation Rules
  validation: {
    cep: {
      pattern: /^\d{5}-?\d{3}$/,
      message: 'CEP deve ter 8 dígitos'
    },
    
    phone: {
      pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
      message: 'Telefone deve estar no formato (XX) XXXXX-XXXX'
    },
    
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email deve ser válido'
    }
  },
  
  // Error Messages
  messages: {
    errors: {
      generic: 'Ocorreu um erro inesperado. Tente novamente.',
      network: 'Erro de conexão. Verifique sua internet.',
      timeout: 'Operação expirou. Tente novamente.',
      notFound: 'Conteúdo não encontrado.',
      validation: 'Dados inválidos. Verifique os campos.'
    },
    
    success: {
      addToCart: 'Produto adicionado ao carrinho!',
      formSubmit: 'Dados enviados com sucesso!',
      subscribe: 'Inscrição realizada com sucesso!'
    },
    
    loading: {
      generic: 'Carregando...',
      products: 'Carregando produtos...',
      search: 'Buscando...'
    }
  },
  
  // Development helpers
  dev: {
    showComponentBoundaries: false,
    logPerformance: false,
    mockAPI: false,
    bypassCache: false
  }
};

// Utility functions for configuration
window.SwiftConfig.utils = {
  /**
   * Get configuration value by path
   * @param {string} path - Dot notation path (e.g., 'components.carousel.autoScroll.enabled')
   * @param {*} defaultValue - Default value if path not found
   * @returns {*}
   */
  get(path, defaultValue = null) {
    return path.split('.').reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : defaultValue;
    }, this);
  },
  
  /**
   * Check if feature is enabled
   * @param {string} feature - Feature name
   * @returns {boolean}
   */
  isFeatureEnabled(feature) {
    return this.get(`features.${feature}`, false);
  },
  
  /**
   * Get breakpoint value
   * @param {string} size - Breakpoint size
   * @returns {number}
   */
  getBreakpoint(size) {
    return this.get(`breakpoints.${size}`, 768);
  },
  
  /**
   * Check if current screen size matches breakpoint
   * @param {string} size - Breakpoint size
   * @returns {boolean}
   */
  matchesBreakpoint(size) {
    const breakpoint = this.getBreakpoint(size);
    return window.innerWidth <= breakpoint;
  },
  
  /**
   * Get color value
   * @param {string} colorPath - Color path (e.g., 'primary', 'neutral.dark')
   * @returns {string}
   */
  getColor(colorPath) {
    return this.get(`colors.${colorPath}`, '#000000');
  },
  
  /**
   * Update configuration at runtime
   * @param {string} path - Dot notation path
   * @param {*} value - New value
   */
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => {
      if (!obj[key]) obj[key] = {};
      return obj[key];
    }, window.SwiftConfig);
    target[lastKey] = value;
  }
};

// Environment-specific overrides
if (window.SwiftConfig.environment === 'development') {
  window.SwiftConfig.debug = true;
  window.SwiftConfig.dev.showComponentBoundaries = true;
  window.SwiftConfig.dev.logPerformance = true;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.SwiftConfig;
}
