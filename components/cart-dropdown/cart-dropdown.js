/**
 * Cart Dropdown Component
 * Handles cart dropdown functionality for both logged and guest users
 * @version 2.0.0
 */

class SwiftCartDropdown {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      isLoggedIn: false,
      cartItems: [],
      onLogin: null,
      onCheckout: null,
      onClearCart: null,
      onRemoveItem: null,
      ...options
    };
    
    this.isOpen = false;
    this.isInitialized = false;
    
    this.init();
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
    // Find the cart button (parent of the dropdown)
    const cartButton = this.element.parentElement?.querySelector('.swift-header__cart-btn');
    
    if (cartButton) {
      // Toggle dropdown on button click
      cartButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    // Close dropdown when clicking outside or on overlay
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target) && !cartButton?.contains(e.target)) {
        this.close();
      }
    });

    // Close dropdown when clicking on overlay
    const overlay = this.element.querySelector('.swift-cart-dropdown__overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.close();
      });
    }

    // Handle dropdown actions
    this.element.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.dataset.action;
      if (action) {
        this.handleAction(action, e);
      }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
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
      case 'checkout':
        this.handleCheckout();
        break;
      case 'clear-cart':
        this.handleClearCart();
        break;
      case 'back':
        this.handleBack();
        break;
      case 'close':
        this.close();
        break;
      default:
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
   * Handle checkout action
   */
  handleCheckout() {
    this.close();
    if (this.options.onCheckout) {
      this.options.onCheckout(this.options.cartItems);
    } else {
      // Default behavior
      console.log('Proceeding to checkout...', this.options.cartItems);
    }
  }

  /**
   * Handle clear cart action
   */
  handleClearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      if (this.options.onClearCart) {
        this.options.onClearCart();
      } else {
        // Default behavior
        this.setCartItems([]);
        this.showMessage('Carrinho limpo com sucesso!', 'success');
      }
    }
  }

  /**
   * Handle back action
   */
  handleBack() {
    this.close();
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
   * Show message to user
   */
  showMessage(message, type = 'info') {
    // This would integrate with the message system
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  /**
   * Toggle dropdown state
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open dropdown
   */
  open() {
    this.isOpen = true;
    this.element.classList.add('is-open');
    
    // Add class to body to adjust chatbot position
    document.body.classList.add('cart-open');
    
    // Focus first interactive element
    const firstFocusable = this.element.querySelector('button, a, input');
    if (firstFocusable) {
      firstFocusable.focus();
    }

    // Dispatch event
    this.dispatchEvent('swift:cart-dropdown:open');
  }

  /**
   * Close dropdown
   */
  close() {
    this.isOpen = false;
    this.element.classList.remove('is-open');
    
    // Remove class from body to restore chatbot position
    document.body.classList.remove('cart-open');
    
    // Dispatch event
    this.dispatchEvent('swift:cart-dropdown:close');
  }

  /**
   * Update dropdown state based on login status and cart items
   */
  updateState() {
    console.log('Cart dropdown updateState called, isLoggedIn:', this.options.isLoggedIn, 'cartItems:', this.options.cartItems.length);
    const guestState = this.element.querySelector('#swift-cart-dropdown__guest');
    const loggedState = this.element.querySelector('#swift-cart-dropdown__logged');
    const itemsState = this.element.querySelector('#swift-cart-dropdown__items');
    
    console.log('Guest state element:', guestState);
    console.log('Logged state element:', loggedState);
    console.log('Items state element:', itemsState);
    
    // Hide all states first
    if (guestState) guestState.style.display = 'none';
    if (loggedState) loggedState.style.display = 'none';
    if (itemsState) itemsState.style.display = 'none';
    
    // Show appropriate state
    if (this.options.cartItems.length > 0) {
      if (itemsState) itemsState.style.display = 'block';
      this.updateCartItems();
      this.updateCartSummary();
    } else if (this.options.isLoggedIn) {
      if (loggedState) loggedState.style.display = 'block';
    } else {
      if (guestState) guestState.style.display = 'block';
    }
  }

  /**
   * Update cart items display
   */
  updateCartItems() {
    const itemsList = this.element.querySelector('.swift-cart-dropdown__items-list');
    if (!itemsList) return;

    // Clear existing items
    itemsList.innerHTML = '';

    // Add cart items
    this.options.cartItems.forEach((item, index) => {
      const itemElement = this.createCartItemElement(item, index);
      itemsList.appendChild(itemElement);
    });
  }

  /**
   * Create cart item element
   */
  createCartItemElement(item, index) {
    const itemElement = document.createElement('div');
    itemElement.className = 'swift-cart-dropdown__item';
    itemElement.innerHTML = `
      <img src="${item.image || './assets/carne.jpg'}" alt="${item.name}" class="swift-cart-dropdown__item-image">
      <div class="swift-cart-dropdown__item-details">
        <h4 class="swift-cart-dropdown__item-name">${item.name}</h4>
        <p class="swift-cart-dropdown__item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
      </div>
      <button class="swift-cart-dropdown__item-remove" data-action="remove-item" data-index="${index}" aria-label="Remover item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    // Add remove item event listener
    const removeBtn = itemElement.querySelector('[data-action="remove-item"]');
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeItem(index);
    });

    return itemElement;
  }

  /**
   * Update cart summary
   */
  updateCartSummary() {
    const totalValue = this.element.querySelector('.swift-cart-dropdown__total-value');
    if (totalValue) {
      const total = this.options.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      totalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  }

  /**
   * Remove item from cart
   */
  removeItem(index) {
    if (this.options.onRemoveItem) {
      this.options.onRemoveItem(index);
    } else {
      // Default behavior
      this.options.cartItems.splice(index, 1);
      this.updateState();
      this.showMessage('Item removido do carrinho!', 'success');
    }
  }

  /**
   * Set logged in state
   */
  setLoggedIn(isLoggedIn) {
    console.log('Cart dropdown setLoggedIn called:', { isLoggedIn });
    this.options.isLoggedIn = isLoggedIn;
    this.updateState();
    
    // Dispatch event
    this.dispatchEvent('swift:cart-dropdown:state-change', {
      isLoggedIn
    });
  }

  /**
   * Set cart items
   */
  setCartItems(items) {
    this.options.cartItems = items;
    this.updateState();
    
    // Dispatch event
    this.dispatchEvent('swift:cart-dropdown:items-change', {
      items: this.options.cartItems
    });
  }

  /**
   * Add item to cart
   */
  addItem(item) {
    this.options.cartItems.push(item);
    this.updateState();
    
    // Dispatch event
    this.dispatchEvent('swift:cart-dropdown:item-added', {
      item,
      totalItems: this.options.cartItems.length
    });
  }

  /**
   * Get cart total
   */
  getCartTotal() {
    return this.options.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /**
   * Get cart item count
   */
  getCartItemCount() {
    return this.options.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Get current state
   */
  getState() {
    return {
      isOpen: this.isOpen,
      isLoggedIn: this.options.isLoggedIn,
      cartItems: this.options.cartItems,
      total: this.getCartTotal(),
      itemCount: this.getCartItemCount()
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
  const cartDropdownElement = document.getElementById('swift-cart-dropdown');
  
  if (cartDropdownElement) {
    console.log('Cart dropdown element found');
    
    // Get initial auth state
    const initialAuthState = window.SwiftAuth ? window.SwiftAuth.getState() : { isLoggedIn: false, userData: null };
    console.log('Initial auth state for cart:', initialAuthState);
    
    window.SwiftCartDropdown = new SwiftCartDropdown(cartDropdownElement, {
      isLoggedIn: initialAuthState.isLoggedIn,
      cartItems: [], // This would come from cart state
      onLogin: () => {
        if (window.SwiftLoginModal) {
          window.SwiftLoginModal.open('login');
        }
      },
      onCheckout: (items) => {
        console.log('Checkout items:', items);
      },
      onClearCart: () => {
        console.log('Clear cart');
      },
      onRemoveItem: (index) => {
        console.log('Remove item at index:', index);
      }
    });

    // Listen for auth state changes
    if (window.SwiftAuth) {
      console.log('Adding auth listener to cart dropdown');
      window.SwiftAuth.addListener((authState) => {
        console.log('Cart dropdown received auth state change:', authState);
        if (window.SwiftCartDropdown) {
          window.SwiftCartDropdown.setLoggedIn(authState.isLoggedIn);
        }
      });
    }
  } else {
    console.error('Cart dropdown element not found!');
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwiftCartDropdown;
}
