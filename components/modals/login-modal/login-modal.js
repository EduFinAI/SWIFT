/**
 * Login Modal Component
 * Handles login and registration modal functionality
 * @version 2.0.0
 */

class SwiftLoginModal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onLogin: null,
      onRegister: null,
      onClose: null,
      ...options
    };
    
    this.isOpen = false;
    this.currentTab = 'login';
    this.isInitialized = false;
    
    this.init();
  }

  /**
   * Initialize the modal
   */
  init() {
    if (!this.element) return;

    this.bindEvents();
    this.isInitialized = true;
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Close modal events
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element || e.target.closest('.swift-login-modal__close')) {
        this.close();
      }
    });

    // Tab switching
    this.element.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-tab]');
      if (tab) {
        this.switchTab(tab.dataset.tab);
      }
    });

    // Form switching
    this.element.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]');
      if (action) {
        const actionType = action.dataset.action;
        if (actionType === 'switch-to-register') {
          this.switchTab('register');
        } else if (actionType === 'switch-to-login') {
          this.switchTab('login');
        }
      }
    });

    // Form submissions
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.target.id === 'swift-login-form') {
        this.handleLogin(e.target);
      } else if (e.target.id === 'swift-register-form') {
        this.handleRegister(e.target);
      }
    });

    // Password toggle
    this.element.addEventListener('click', (e) => {
      if (e.target.closest('.swift-login-modal__password-toggle')) {
        this.togglePasswordVisibility(e.target.closest('.swift-login-modal__password-toggle'));
      }
    });

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  /**
   * Switch between login and register tabs
   */
  switchTab(tab) {
    if (tab === this.currentTab) return;

    this.currentTab = tab;
    
    // Update tab buttons
    const tabs = this.element.querySelectorAll('.swift-login-modal__tab');
    tabs.forEach(t => {
      t.classList.remove('swift-login-modal__tab--active');
      if (t.dataset.tab === tab) {
        t.classList.add('swift-login-modal__tab--active');
      }
    });

    // Update form containers
    const loginContainer = this.element.querySelector('#swift-login-form-container');
    const registerContainer = this.element.querySelector('#swift-register-form-container');
    
    if (tab === 'login') {
      loginContainer.style.display = 'block';
      registerContainer.style.display = 'none';
    } else {
      loginContainer.style.display = 'none';
      registerContainer.style.display = 'block';
    }

    // Dispatch event
    this.dispatchEvent('swift:login-modal:tab-change', { tab });
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(button) {
    const input = button.parentElement.querySelector('input');
    const isPassword = input.type === 'password';
    
    input.type = isPassword ? 'text' : 'password';
    
    // Update icon (you could add different icons for show/hide)
    const icon = button.querySelector('svg');
    if (icon) {
      // Simple toggle - in a real implementation you'd use different icons
      icon.style.opacity = isPassword ? '0.5' : '1';
    }
  }

  /**
   * Handle login form submission
   */
  handleLogin(form) {
    console.log('=== MODAL LOGIN HANDLER CALLED ===');
    const formData = new FormData(form);
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    console.log('Form data extracted:', loginData);

    // Validate form
    if (!this.validateLoginForm(loginData)) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed');

    // Show loading state
    this.setFormLoading(form, true);

    // Always use SwiftAuth directly
    if (window.SwiftAuth) {
      console.log('SwiftAuth found, calling login...');
      console.log('Calling SwiftAuth.login with:', loginData);
      
      window.SwiftAuth.login(loginData.email, loginData.password)
        .then(() => {
          console.log('Login successful via modal');
          this.close();
        })
        .catch((error) => {
          console.error('Login error:', error);
          this.showMessage(error.message || 'Erro ao fazer login', 'error');
        })
        .finally(() => {
          this.setFormLoading(form, false);
        });
    } else {
      console.error('SwiftAuth not found!');
      this.showMessage('Erro: Sistema de autenticação não disponível', 'error');
      this.setFormLoading(form, false);
    }
  }

  /**
   * Handle register form submission
   */
  handleRegister(form) {
    const formData = new FormData(form);
    const registerData = {
      tipo_pessoa: formData.get('tipo_pessoa'),
      email: formData.get('email'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      cpf: formData.get('cpf'),
      phone: formData.get('phone'),
      birthdate: formData.get('birthdate'),
      password: formData.get('password'),
      confirm_password: formData.get('confirm_password'),
      privacy_policy: formData.has('privacy_policy'),
      socio_program: formData.has('socio_program'),
      communications: formData.has('communications')
    };

    // Validate form
    if (!this.validateRegisterForm(registerData)) {
      return;
    }

    // Show loading state
    this.setFormLoading(form, true);

    // Handle registration
    if (this.options.onRegister) {
      this.options.onRegister(registerData)
        .then(() => {
          this.close();
          this.showMessage('Cadastro realizado com sucesso!', 'success');
        })
        .catch((error) => {
          this.showMessage(error.message || 'Erro ao cadastrar', 'error');
        })
        .finally(() => {
          this.setFormLoading(form, false);
        });
    } else {
      // Default behavior - use SwiftAuth
      if (window.SwiftAuth) {
        window.SwiftAuth.login(registerData.email, registerData.password)
          .then(() => {
            console.log('Registration successful via modal');
            this.close();
            // Don't show alert, just close modal
          })
          .catch((error) => {
            this.showMessage(error.message || 'Erro ao cadastrar', 'error');
          })
          .finally(() => {
            this.setFormLoading(form, false);
          });
      } else {
        console.log('Register data:', registerData);
        this.close();
        this.showMessage('Cadastro realizado com sucesso!', 'success');
        this.setFormLoading(form, false);
      }
    }
  }

  /**
   * Validate login form
   */
  validateLoginForm(data) {
    console.log('Validating login form:', data);
    
    if (!data.email || !data.password) {
      console.log('Validation failed: missing fields');
      this.showMessage('Por favor, preencha todos os campos', 'error');
      return false;
    }

    if (!this.isValidEmail(data.email)) {
      console.log('Validation failed: invalid email');
      this.showMessage('Por favor, insira um e-mail válido', 'error');
      return false;
    }

    console.log('Validation passed');
    return true;
  }

  /**
   * Validate register form
   */
  validateRegisterForm(data) {
    // Required fields
    const requiredFields = ['email', 'first_name', 'last_name', 'cpf', 'phone', 'password', 'confirm_password'];
    for (const field of requiredFields) {
      if (!data[field]) {
        this.showMessage('Por favor, preencha todos os campos obrigatórios', 'error');
        return false;
      }
    }

    // Email validation
    if (!this.isValidEmail(data.email)) {
      this.showMessage('Por favor, insira um e-mail válido', 'error');
      return false;
    }

    // Password validation
    if (data.password.length < 8) {
      this.showMessage('A senha deve ter pelo menos 8 caracteres', 'error');
      return false;
    }

    if (data.password !== data.confirm_password) {
      this.showMessage('As senhas não coincidem', 'error');
      return false;
    }

    // Privacy policy
    if (!data.privacy_policy) {
      this.showMessage('Você deve aceitar a política de privacidade', 'error');
      return false;
    }

    return true;
  }

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Set form loading state
   */
  setFormLoading(form, loading) {
    const submitButton = form.querySelector('.swift-login-modal__submit');
    const inputs = form.querySelectorAll('input, button');
    
    if (loading) {
      submitButton.disabled = true;
      submitButton.style.opacity = '0.6';
      inputs.forEach(input => input.disabled = true);
    } else {
      submitButton.disabled = false;
      submitButton.style.opacity = '1';
      inputs.forEach(input => input.disabled = false);
    }
  }

  /**
   * Show message to user
   */
  showMessage(message, type = 'info') {
    // This would integrate with the message system
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // For now, show a simple alert
    if (type === 'error') {
      alert(`Erro: ${message}`);
    } else {
      alert(message);
    }
  }

  /**
   * Open modal
   */
  open(tab = 'login') {
    this.isOpen = true;
    this.element.classList.add('is-open');
    this.switchTab(tab);
    
    // Focus first input
    const firstInput = this.element.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Dispatch event
    this.dispatchEvent('swift:login-modal:open', { tab });
  }

  /**
   * Close modal
   */
  close() {
    this.isOpen = false;
    this.element.classList.remove('is-open');
    
    // Restore body scroll
    document.body.style.overflow = '';

    // Clear forms
    this.clearForms();

    // Dispatch event
    this.dispatchEvent('swift:login-modal:close');

    if (this.options.onClose) {
      this.options.onClose();
    }
  }

  /**
   * Clear form data
   */
  clearForms() {
    const forms = this.element.querySelectorAll('form');
    forms.forEach(form => form.reset());
  }

  /**
   * Get current state
   */
  getState() {
    return {
      isOpen: this.isOpen,
      currentTab: this.currentTab
    };
  }

  /**
   * Dispatch custom event
   */
  dispatchEvent(name, detail = {}) {
    const event = new CustomEvent(name, {
      detail: { ...detail, component: this },
      bubbles: true
    });
    this.element.dispatchEvent(event);
  }

  /**
   * Destroy component
   */
  destroy() {
    this.close();
    this.isInitialized = false;
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Listen for components loaded event
  document.addEventListener('swift:components:loaded', () => {
    const loginModalElement = document.getElementById('swift-login-modal');
    
    if (loginModalElement) {
      console.log('Login modal element found, initializing...');
      window.SwiftLoginModal = new SwiftLoginModal(loginModalElement, {
        onLogin: (data) => {
          // Handle login
          return Promise.resolve();
        },
        onRegister: (data) => {
          // Handle registration
          return Promise.resolve();
        },
        onClose: () => {
          // Handle modal close
        }
      });
      console.log('Login modal initialized successfully');
    } else {
      console.error('Login modal element not found!');
    }
  });
  
  // Fallback with timeout in case event doesn't fire
  setTimeout(() => {
    if (!window.SwiftLoginModal) {
      const loginModalElement = document.getElementById('swift-login-modal');
      
      if (loginModalElement) {
        console.log('Login modal element found (fallback), initializing...');
        window.SwiftLoginModal = new SwiftLoginModal(loginModalElement, {
          onLogin: (data) => {
            // Handle login
            return Promise.resolve();
          },
          onRegister: (data) => {
            // Handle registration
            return Promise.resolve();
          },
          onClose: () => {
            // Handle modal close
          }
        });
        console.log('Login modal initialized successfully (fallback)');
      } else {
        console.error('Login modal element not found (fallback)!');
      }
    }
  }, 1000);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwiftLoginModal;
}
