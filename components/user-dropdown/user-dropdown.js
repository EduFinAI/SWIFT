/**
 * User Dropdown Component
 * Handles user authentication dropdown functionality
 * @version 2.0.0
 */

class SwiftUserDropdown extends SwiftBaseDropdown {
  constructor(element, options = {}) {
    const dropdownOptions = {
      triggerSelector: '.swift-header__user-btn',
      closeOnOutsideClick: true,
      closeOnEscape: true,
      ...options
    };
    
    super(element, dropdownOptions);
    
    this.options = {
      isLoggedIn: false,
      userData: null,
      onLogin: null,
      onRegister: null,
      onLogout: null,
      onNavigate: null,
      ...options
    };
  }

  /**
   * Initialize the dropdown
   */
  init() {
    if (!this.element) return;

    this.bindEvents();
    this.updateState();
    this.isInitialized = true;
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Call parent bindEvents first
    super.bindEvents();

    // Handle dropdown actions
    this.element.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.dataset.action;
      if (action) {
        this.handleAction(action, e);
      }
    });
  }

  /**
   * Handle dropdown actions
   */
  handleAction(action, event) {
    event.preventDefault();
    
    switch (action) {
      case 'login':
        this.handleLogin();
        break;
      case 'register':
        this.handleRegister();
        break;
      case 'logout':
        this.handleLogout();
        break;
      default:
        if (this.options.onNavigate) {
          this.options.onNavigate(action);
        }
        break;
    }
  }

  /**
   * Handle login action
   */
  handleLogin() {
    this.close();
    if (this.options.onLogin) {
      this.options.onLogin();
    } else {
      // Default behavior - show login modal
      this.showLoginModal();
    }
  }

  /**
   * Handle register action
   */
  handleRegister() {
    this.close();
    if (this.options.onRegister) {
      this.options.onRegister();
    } else {
      // Default behavior - show register modal
      this.showRegisterModal();
    }
  }

  /**
   * Handle logout action
   */
  handleLogout() {
    this.close();
    if (this.options.onLogout) {
      this.options.onLogout();
    } else {
      // Default behavior
      this.setLoggedIn(false);
      this.showMessage('Logout realizado com sucesso!', 'success');
    }
  }

  /**
   * Show login modal
   */
  showLoginModal() {
    if (window.SwiftLoginModal) {
      window.SwiftLoginModal.open('login');
    } else {
      console.error('SwiftLoginModal not found');
    }
  }

  /**
   * Show register modal
   */
  showRegisterModal() {
    if (window.SwiftLoginModal) {
      window.SwiftLoginModal.open('register');
    } else {
      console.error('SwiftLoginModal not found');
    }
  }

  /**
   * Show message to user
   */
  showMessage(message, type = 'info') {
    // This would integrate with the message system
    console.log(`${type.toUpperCase()}: ${message}`);
  }


  /**
   * Update dropdown state based on login status
   */
  updateState() {
    console.log('User dropdown updateState called, isLoggedIn:', this.options.isLoggedIn);
    const guestState = this.element.querySelector('#swift-user-dropdown__guest');
    const loggedState = this.element.querySelector('#swift-user-dropdown__logged');
    
    console.log('Guest state element:', guestState);
    console.log('Logged state element:', loggedState);
    
    if (this.options.isLoggedIn) {
      if (guestState) guestState.style.display = 'none';
      if (loggedState) loggedState.style.display = 'block';
      this.updateUserInfo();
    } else {
      if (guestState) guestState.style.display = 'block';
      if (loggedState) loggedState.style.display = 'none';
    }
  }

  /**
   * Update user information display
   */
  updateUserInfo() {
    console.log('Updating user info:', this.options.userData);
    if (!this.options.userData) return;

    const userName = this.element.querySelector('.swift-user-dropdown__user-name');
    const userEmail = this.element.querySelector('.swift-user-dropdown__user-email');
    
    console.log('User name element:', userName);
    console.log('User email element:', userEmail);
    
    if (userName) {
      userName.textContent = this.options.userData.name || 'Usuário';
      console.log('Updated user name to:', userName.textContent);
    }
    
    if (userEmail) {
      userEmail.textContent = this.options.userData.email || '';
      console.log('Updated user email to:', userEmail.textContent);
    }
  }

  /**
   * Set logged in state
   */
  setLoggedIn(isLoggedIn, userData = null) {
    console.log('User dropdown setLoggedIn called:', { isLoggedIn, userData });
    this.options.isLoggedIn = isLoggedIn;
    this.options.userData = userData;
    this.updateState();
    
    // Dispatch event
    this.dispatchEvent('swift:user-dropdown:state-change', {
      isLoggedIn,
      userData
    });
  }

  /**
   * Get current state
   */
  getState() {
    return {
      isOpen: this.isOpen,
      isLoggedIn: this.options.isLoggedIn,
      userData: this.options.userData
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
  const userDropdownElement = document.getElementById('swift-user-dropdown');
  
  if (userDropdownElement) {
    console.log('User dropdown element found');
    
    // Get initial auth state
    const initialAuthState = window.SwiftAuth ? window.SwiftAuth.getState() : { isLoggedIn: false, userData: null };
    console.log('Initial auth state for user dropdown:', initialAuthState);
    
    window.SwiftUserDropdown = new SwiftUserDropdown(userDropdownElement, {
      isLoggedIn: initialAuthState.isLoggedIn,
      userData: initialAuthState.userData,
      onLogin: () => {
        if (window.SwiftLoginModal) {
          window.SwiftLoginModal.open('login');
        }
      },
      onRegister: () => {
        if (window.SwiftLoginModal) {
          window.SwiftLoginModal.open('register');
        }
      },
      onLogout: () => {
        if (window.SwiftAuth) {
          window.SwiftAuth.logout();
        }
      },
      onNavigate: (action) => {
        console.log('Navigate to:', action);
      }
    });

    // Listen for auth state changes
    if (window.SwiftAuth) {
      console.log('Adding auth listener to user dropdown');
      window.SwiftAuth.addListener((authState) => {
        console.log('User dropdown received auth state change:', authState);
        if (window.SwiftUserDropdown) {
          window.SwiftUserDropdown.setLoggedIn(authState.isLoggedIn, authState.userData);
        }
      });
    }
  } else {
    console.error('User dropdown element not found!');
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwiftUserDropdown;
}
