/**
 * Swift Application - Main application controller
 * @version 2.0.0
 */

class SwiftApp {
  constructor() {
    this.version = window.SwiftConfig?.version || '2.0.0';
    this.isInitialized = false;
    this.components = new Map();
    this.observers = new Map();
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log(`🚀 Swift App v${this.version} initializing...`);
      
      // Check if config is loaded
      if (!window.SwiftConfig) {
        console.warn('SwiftConfig not found. Loading default configuration.');
        this.loadDefaultConfig();
      }

      // Initialize core features
      await this.initializeCore();
      
      // Initialize components
      this.initializeComponents();
      
      // Setup observers
      this.setupObservers();
      
      // Setup global event listeners
      this.setupGlobalEvents();
      
      // Initialize performance monitoring
      if (window.SwiftConfig.debug) {
        this.initializePerformanceMonitoring();
      }
      
      this.isInitialized = true;
      console.log('✅ Swift App initialized successfully');
      
      // Dispatch ready event
      this.dispatchEvent('swift:ready');
      
    } catch (error) {
      console.error('❌ Swift App initialization failed:', error);
      this.dispatchEvent('swift:error', { error });
    }
  }

  /**
   * Load default configuration if SwiftConfig is not available
   */
  loadDefaultConfig() {
    window.SwiftConfig = {
      version: this.version,
      debug: false,
      components: {
        carousel: { autoScroll: { enabled: true } }
      },
      performance: {
        lazyLoading: { enabled: true }
      }
    };
  }

  /**
   * Initialize core application features
   */
  async initializeCore() {
    // Initialize lazy loading
    if (window.SwiftConfig.performance?.lazyLoading?.enabled) {
      this.initializeLazyLoading();
    }

    // Initialize animations with reduced motion support
    if (window.SwiftConfig.performance?.animations?.respectReducedMotion) {
      this.setupReducedMotionSupport();
    }

    // Initialize accessibility features
    this.initializeAccessibility();

    // Initialize error handling
    this.setupErrorHandling();
  }

  /**
   * Initialize all components
   */
  initializeComponents() {
    // Initialize carousels
    if (window.SwiftCarouselManager) {
      this.components.set('carousels', window.SwiftCarouselManager);
    }

    // Initialize forms
    this.initializeForms();

    // Initialize search
    this.initializeSearch();

    // Initialize cart functionality
    this.initializeCart();

    // Initialize smooth scrolling
    this.initializeSmoothScrolling();
  }

  /**
   * Initialize lazy loading for images
   */
  initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
      const config = window.SwiftConfig.performance.lazyLoading;
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: config.rootMargin || '50px',
        threshold: config.threshold || 0.1
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });

      this.observers.set('images', imageObserver);
    }
  }

  /**
   * Setup reduced motion support
   */
  setupReducedMotionSupport() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e) => {
      document.documentElement.classList.toggle('reduce-motion', e.matches);
    };

    handleReducedMotion(prefersReducedMotion);
    prefersReducedMotion.addEventListener('change', handleReducedMotion);
  }

  /**
   * Initialize accessibility features
   */
  initializeAccessibility() {
    // Focus management
    this.setupFocusManagement();
    
    // Keyboard navigation
    this.setupKeyboardNavigation();
  }

  /* Skip to content functionality removed */

  /**
   * Setup focus management
   */
  setupFocusManagement() {
    // Track focus for better accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Escape key closes modals/dropdowns
      if (e.key === 'Escape') {
        this.dispatchEvent('swift:escape');
      }
      
      // Enter key on clickable elements
      if (e.key === 'Enter' && e.target.hasAttribute('data-clickable')) {
        e.target.click();
      }
    });
  }

  /**
   * Initialize form handling
   */
  initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Add form validation
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      // Add real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
      });
    });
  }

  /**
   * Validate form
   */
  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  /**
   * Validate individual field
   */
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let message = '';

    // Required validation
    if (required && !value) {
      isValid = false;
      message = 'Este campo é obrigatório';
    }

    // Type-specific validation
    if (value && window.SwiftConfig.validation) {
      switch (type) {
        case 'email':
          if (!window.SwiftConfig.validation.email.pattern.test(value)) {
            isValid = false;
            message = window.SwiftConfig.validation.email.message;
          }
          break;
        case 'tel':
          if (!window.SwiftConfig.validation.phone.pattern.test(value)) {
            isValid = false;
            message = window.SwiftConfig.validation.phone.message;
          }
          break;
      }
    }

    // CEP validation
    if (field.name === 'cep' && value && window.SwiftConfig.validation?.cep) {
      if (!window.SwiftConfig.validation.cep.pattern.test(value)) {
        isValid = false;
        message = window.SwiftConfig.validation.cep.message;
      }
    }

    // Update UI
    field.classList.toggle('invalid', !isValid);
    field.setAttribute('aria-invalid', !isValid);
    
    // Show/hide error message
    this.showFieldError(field, isValid ? '' : message);
    
    return isValid;
  }

  /**
   * Show field error message
   */
  showFieldError(field, message) {
    let errorElement = field.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('field-error')) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = message ? 'block' : 'none';
  }

  /**
   * Initialize search functionality
   */
  initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    
    searchInputs.forEach(input => {
      let debounceTimer;
      
      input.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.handleSearch(e.target.value);
        }, window.SwiftConfig.components?.header?.searchDebounce || 300);
      });
    });
  }

  /**
   * Handle search
   */
  handleSearch(query) {
    if (query.length < 2) return;
    
    this.dispatchEvent('swift:search', { query });
    
    if (window.SwiftConfig.debug) {
      console.log('Search query:', query);
    }
  }

  /**
   * Initialize cart functionality
   */
  initializeCart() {
    const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = button.dataset.productId;
        this.addToCart(productId);
      });
    });
  }

  /**
   * Add product to cart
   */
  addToCart(productId) {
    // Simulate adding to cart
    this.dispatchEvent('swift:add-to-cart', { productId });
    
    // Show success message
    this.showMessage(
      window.SwiftConfig.messages?.success?.addToCart || 'Produto adicionado ao carrinho!',
      'success'
    );
  }

  /**
   * Initialize smooth scrolling
   */
  initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Setup observers for dynamic content
   */
  setupObservers() {
    // Observe for new components added to DOM
    if ('MutationObserver' in window) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              this.initializeNewComponents(node);
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      this.observers.set('dom', observer);
    }
  }

  /**
   * Initialize components in new DOM nodes
   */
  initializeNewComponents(node) {
    // Re-initialize carousels if new ones are added
    const carousels = node.querySelectorAll ? node.querySelectorAll('[data-carousel]') : [];
    if (carousels.length > 0 && window.SwiftCarouselManager) {
      window.SwiftCarouselManager.initializeCarousels();
    }

    // Re-initialize lazy loading
    const images = node.querySelectorAll ? node.querySelectorAll('img[data-src]') : [];
    if (images.length > 0 && this.observers.get('images')) {
      images.forEach(img => {
        this.observers.get('images').observe(img);
      });
    }
  }

  /**
   * Setup global event listeners
   */
  setupGlobalEvents() {
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.dispatchEvent('swift:resize');
      }, 250);
    });

    // Handle scroll
    let scrollTimer;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        this.dispatchEvent('swift:scroll');
      }, 100);
    }, { passive: true });

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
      this.dispatchEvent('swift:visibility-change', {
        visible: !document.hidden
      });
    });
  }

  /**
   * Setup error handling
   */
  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      this.dispatchEvent('swift:error', { error: e.error });
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      this.dispatchEvent('swift:error', { error: e.reason });
    });
  }

  /**
   * Initialize performance monitoring
   */
  initializePerformanceMonitoring() {
    if ('performance' in window) {
      // Monitor Core Web Vitals
      this.monitorWebVitals();
      
      // Monitor resource loading
      this.monitorResources();
    }
  }

  /**
   * Monitor Core Web Vitals
   */
  monitorWebVitals() {
    // This would integrate with web-vitals library in a real implementation
    console.log('Performance monitoring initialized');
  }

  /**
   * Monitor resource loading
   */
  monitorResources() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
  }

  /**
   * Show message to user
   */
  showMessage(message, type = 'info') {
    const messageEl = document.createElement('div');
    messageEl.className = `swift-message swift-message--${type}`;
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 3000);
  }

  /**
   * Dispatch custom event
   */
  dispatchEvent(name, detail = {}) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
    
    if (window.SwiftConfig.debug) {
      console.log(`Event dispatched: ${name}`, detail);
    }
  }

  /**
   * Destroy the application
   */
  destroy() {
    // Clean up observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();

    // Clean up components
    this.components.forEach(component => {
      if (component.destroy) {
        component.destroy();
      }
    });
    this.components.clear();

    this.isInitialized = false;
    console.log('Swift App destroyed');
  }

  /**
   * Get application info
   */
  getInfo() {
    return {
      version: this.version,
      initialized: this.isInitialized,
      components: Array.from(this.components.keys()),
      observers: Array.from(this.observers.keys())
    };
  }
}

// Initialize when DOM is ready
const initSwiftApp = () => {
  window.SwiftApp = new SwiftApp();
  
  // Make it globally accessible for debugging
  if (window.SwiftConfig?.debug) {
    window.swift = window.SwiftApp;
  }
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwiftApp);
} else {
  initSwiftApp();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwiftApp;
}
