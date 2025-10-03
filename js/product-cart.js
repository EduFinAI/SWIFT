/**
 * Product Cart Management
 * Handles adding products to cart and quantity controls
 * @version 1.0.0
 */

class SwiftProductCart {
  constructor() {
    this.cart = new Map(); // productId -> { quantity, product }
    this.isInitialized = false;
    
    // Product data for pricing
    this.products = {
      'picanha-premium': {
        name: 'Picanha Premium',
        price: 89.90,
        image: './assets/carne.jpg',
        weight: '1 kilo'
      },
      'ancho-angus': {
        name: 'Ancho Angus',
        price: 89.90,
        image: './assets/ancho.webp',
        weight: '1 kilo'
      },
      'file-frango': {
        name: 'Filé de Frango',
        price: 24.90,
        image: './assets/file de frang.png',
        weight: '1 kilo'
      },
      'costela-suina': {
        name: 'Costela Suína',
        price: 38.90,
        image: './assets/costela.png',
        weight: '1 kilo'
      },
      // Best Sellers products
      'picanha-premium-bs': {
        name: 'Picanha Premium',
        price: 89.90,
        image: './assets/carne.jpg',
        weight: '1 kilo'
      },
      'ancho-angus-bs': {
        name: 'Ancho Angus',
        price: 89.90,
        image: './assets/ancho.webp',
        weight: '1 kilo'
      },
      'costela-suina-bs': {
        name: 'Costela Suína',
        price: 38.90,
        image: './assets/costela.png',
        weight: '1 kilo'
      },
      'file-frango-bs': {
        name: 'Filé de Frango',
        price: 24.90,
        image: './assets/file de frang.png',
        weight: '1 kilo'
      },
      // Duplicate products for carousel
      'picanha-premium-bs-2': {
        name: 'Picanha Premium',
        price: 89.90,
        image: './assets/carne.jpg',
        weight: '1 kilo'
      },
      'ancho-angus-bs-2': {
        name: 'Ancho Angus',
        price: 89.90,
        image: './assets/ancho.webp',
        weight: '1 kilo'
      }
    };
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    this.bindEvents();
    this.isInitialized = true;
    
    console.log('SwiftProductCart initialized');
    console.log('Available products:', Object.keys(this.products));
  }

  bindEvents() {
    // Add to cart buttons (featured products and best sellers)
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.swift-product-card__add-btn') || e.target.closest('.swift-bestseller-card__add-btn');
      if (addBtn) {
        e.preventDefault();
        this.handleAddToCart(addBtn);
        return;
      }

      // Quantity control buttons (featured products and best sellers)
      const quantityBtn = e.target.closest('.swift-product-card__quantity-btn') || e.target.closest('.swift-bestseller-card__quantity-btn');
      if (quantityBtn) {
        e.preventDefault();
        this.handleQuantityChange(quantityBtn);
        return;
      }

      // Cart dropdown quantity buttons
      const cartQuantityBtn = e.target.closest('.swift-cart-dropdown__item-quantity-btn');
      if (cartQuantityBtn) {
        e.preventDefault();
        this.handleCartQuantityChange(cartQuantityBtn);
        return;
      }

      // Cart dropdown remove button
      const removeBtn = e.target.closest('.swift-cart-dropdown__item-remove');
      if (removeBtn) {
        e.preventDefault();
        this.handleRemoveFromCart(removeBtn);
        return;
      }
    });
  }

  handleAddToCart(addBtn) {
    const productId = addBtn.dataset.productId;
    console.log('Add to cart clicked for product:', productId);
    
    if (!productId) {
      console.error('No product ID found');
      return;
    }

    const product = this.products[productId];
    if (!product) {
      console.error('Product not found:', productId);
      return;
    }

    console.log('Adding product to cart:', product);

    // Add product to cart with quantity 1
    this.cart.set(productId, {
      quantity: 1,
      product: product
    });
    
    console.log('Cart after adding:', this.cart);
    
    // Hide add button and show quantity controls
    this.showQuantityControls(productId);
    
    // Update cart count and dropdown
    this.updateCartCount();
    this.updateCartDropdown();
    
    // Dispatch event
    this.dispatchEvent('swift:product-added', {
      productId,
      quantity: 1,
      cart: this.cart
    });

    console.log(`Product ${productId} added to cart`);
  }

  handleQuantityChange(quantityBtn) {
    const action = quantityBtn.dataset.action;
    const controls = quantityBtn.closest('.swift-product-card__quantity-controls') || quantityBtn.closest('.swift-bestseller-card__quantity-controls');
    const productId = controls.dataset.productId;
    
    if (!productId || !action) return;

    const cartItem = this.cart.get(productId);
    if (!cartItem) return;

    const currentQuantity = cartItem.quantity;
    let newQuantity = currentQuantity;

    if (action === 'increase') {
      newQuantity = currentQuantity + 1;
    } else if (action === 'decrease') {
      newQuantity = Math.max(0, currentQuantity - 1);
    }

    if (newQuantity === 0) {
      // Remove from cart and show add button
      this.cart.delete(productId);
      this.showAddButton(productId);
    } else {
      // Update quantity
      cartItem.quantity = newQuantity;
      this.cart.set(productId, cartItem);
      this.updateQuantityDisplay(productId, newQuantity);
    }

    // Update cart count and dropdown
    this.updateCartCount();
    this.updateCartDropdown();

    // Dispatch event
    this.dispatchEvent('swift:quantity-changed', {
      productId,
      quantity: newQuantity,
      action,
      cart: this.cart
    });

    console.log(`Product ${productId} quantity changed to ${newQuantity}`);
  }

  handleCartQuantityChange(cartQuantityBtn) {
    const action = cartQuantityBtn.dataset.action;
    const productId = cartQuantityBtn.dataset.productId;
    
    if (!productId || !action) return;

    const cartItem = this.cart.get(productId);
    if (!cartItem) return;

    const currentQuantity = cartItem.quantity;
    let newQuantity = currentQuantity;

    if (action === 'increase') {
      newQuantity = currentQuantity + 1;
    } else if (action === 'decrease') {
      newQuantity = Math.max(0, currentQuantity - 1);
    }

    if (newQuantity === 0) {
      // Remove from cart
      this.cart.delete(productId);
      this.showAddButton(productId);
    } else {
      // Update quantity
      cartItem.quantity = newQuantity;
      this.cart.set(productId, cartItem);
      this.updateQuantityDisplay(productId, newQuantity);
    }

    // Update cart count and dropdown
    this.updateCartCount();
    this.updateCartDropdown();

    // Dispatch event
    this.dispatchEvent('swift:quantity-changed', {
      productId,
      quantity: newQuantity,
      action,
      cart: this.cart
    });

    console.log(`Product ${productId} quantity changed to ${newQuantity} (from cart dropdown)`);
  }

  handleRemoveFromCart(removeBtn) {
    const productId = removeBtn.dataset.productId;
    if (!productId) return;

    // Remove from cart
    this.cart.delete(productId);
    this.showAddButton(productId);

    // Update cart count and dropdown
    this.updateCartCount();
    this.updateCartDropdown();

    // Dispatch event
    this.dispatchEvent('swift:product-removed', {
      productId,
      cart: this.cart
    });

    console.log(`Product ${productId} removed from cart`);
  }

  showQuantityControls(productId) {
    const addBtn = document.querySelector(`[data-product-id="${productId}"].swift-product-card__add-btn`) || 
                  document.querySelector(`[data-product-id="${productId}"].swift-bestseller-card__add-btn`);
    const controls = document.querySelector(`[data-product-id="${productId}"].swift-product-card__quantity-controls`) || 
                    document.querySelector(`[data-product-id="${productId}"].swift-bestseller-card__quantity-controls`);
    
    if (addBtn && controls) {
      addBtn.style.display = 'none';
      controls.classList.add('show');
    }
  }

  showAddButton(productId) {
    const addBtn = document.querySelector(`[data-product-id="${productId}"].swift-product-card__add-btn`) || 
                  document.querySelector(`[data-product-id="${productId}"].swift-bestseller-card__add-btn`);
    const controls = document.querySelector(`[data-product-id="${productId}"].swift-product-card__quantity-controls`) || 
                    document.querySelector(`[data-product-id="${productId}"].swift-bestseller-card__quantity-controls`);
    
    if (addBtn && controls) {
      addBtn.style.display = 'flex';
      controls.classList.remove('show');
    }
  }

  updateQuantityDisplay(productId, quantity) {
    const display = document.querySelector(`[data-product-id="${productId}"].swift-product-card__quantity-controls .swift-product-card__quantity-display`) ||
                   document.querySelector(`[data-product-id="${productId}"].swift-bestseller-card__quantity-controls .swift-bestseller-card__quantity-display`);
    if (display) {
      display.textContent = quantity;
    }
  }

  updateCartCount() {
    const totalItems = Array.from(this.cart.values()).reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('swift-header__cart-count');
    
    if (cartCountElement) {
      if (totalItems > 0) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = 'inline-block';
      } else {
        cartCountElement.style.display = 'none';
      }
    }
  }

  updateCartDropdown() {
    const isEmpty = this.cart.size === 0;
    console.log('Updating cart dropdown, isEmpty:', isEmpty, 'cart size:', this.cart.size);
    
    // Check which state is currently visible
    const guestState = document.getElementById('swift-cart-dropdown__guest');
    const loggedState = document.getElementById('swift-cart-dropdown__logged');
    
    const isGuestVisible = guestState && guestState.style.display !== 'none';
    const isLoggedVisible = loggedState && loggedState.style.display !== 'none';
    
    console.log('Current states visibility:', {
      guest: guestState ? guestState.style.display : 'not found',
      logged: loggedState ? loggedState.style.display : 'not found',
      isGuestVisible,
      isLoggedVisible
    });
    
    // Always update guest state by default (for non-logged users)
    console.log('Updating guest state');
    this.updateCartDropdownState('guest', isEmpty);
    
    // Also update logged state if visible
    if (isLoggedVisible) {
      console.log('Updating logged state (currently visible)');
      this.updateCartDropdownState('logged', isEmpty);
    }
    
    // Skip items state - it doesn't exist in current HTML structure
    console.log('Skipping items state - not implemented in current structure');
  }

  updateCartDropdownState(state, isEmpty) {
    const emptyElement = document.getElementById(`swift-cart-dropdown__empty-${state}`);
    const itemsListElement = document.getElementById(`swift-cart-dropdown__items-list-${state}`);
    const summaryElement = document.getElementById(`swift-cart-dropdown__summary-${state}`);
    
    console.log(`=== UPDATING ${state.toUpperCase()} STATE ===`);
    console.log(`Elements found:`, {
      emptyElement: !!emptyElement,
      itemsListElement: !!itemsListElement,
      summaryElement: !!summaryElement,
      isEmpty
    });
    
    if (summaryElement) {
      console.log(`Summary element before update:`, {
        id: summaryElement.id,
        currentDisplay: summaryElement.style.display,
        currentClasses: summaryElement.className,
        computedDisplay: window.getComputedStyle(summaryElement).display,
        computedVisibility: window.getComputedStyle(summaryElement).visibility,
        computedOpacity: window.getComputedStyle(summaryElement).opacity,
        computedZIndex: window.getComputedStyle(summaryElement).zIndex
      });
    }
    
    // Skip if no elements found for this state
    if (!emptyElement && !itemsListElement && !summaryElement) {
      console.log(`Skipping ${state} state - no elements found`);
      return;
    }
    
    if (isEmpty) {
      // Show empty state
      console.log(`Showing empty state for ${state}`);
      if (emptyElement) emptyElement.style.display = 'flex';
      if (itemsListElement) itemsListElement.style.display = 'none';
      if (summaryElement) {
        summaryElement.style.display = 'none';
        summaryElement.classList.remove('show');
      }
    } else {
      // Show items and summary
      console.log(`Showing items and summary for ${state}`);
      if (emptyElement) emptyElement.style.display = 'none';
      if (itemsListElement) {
        itemsListElement.style.display = 'block';
        this.renderCartItems(itemsListElement);
      }
      if (summaryElement) {
        summaryElement.style.display = 'block';
        summaryElement.classList.add('show');
        console.log(`Summary element after update:`, {
          id: summaryElement.id,
          display: summaryElement.style.display,
          classes: summaryElement.className,
          computedDisplay: window.getComputedStyle(summaryElement).display,
          computedVisibility: window.getComputedStyle(summaryElement).visibility,
          computedOpacity: window.getComputedStyle(summaryElement).opacity,
          computedZIndex: window.getComputedStyle(summaryElement).zIndex
        });
        
        
        this.updateCartSummary(summaryElement);
      } else {
        console.error(`Summary element not found for state: ${state}`);
      }
    }
    console.log(`=== END UPDATING ${state.toUpperCase()} STATE ===`);
  }

  renderCartItems(container) {
    container.innerHTML = '';
    
    this.cart.forEach((item, productId) => {
      const cartItemElement = this.createCartItemElement(productId, item);
      container.appendChild(cartItemElement);
    });
  }

  createCartItemElement(productId, item) {
    const div = document.createElement('div');
    div.className = 'swift-cart-dropdown__item';
    div.dataset.productId = productId;
    
    div.innerHTML = `
      <img src="${item.product.image}" alt="${item.product.name}" class="swift-cart-dropdown__item-image">
      <div class="swift-cart-dropdown__item-details">
        <h4 class="swift-cart-dropdown__item-name">${item.product.name}</h4>
        <p class="swift-cart-dropdown__item-price">R$ ${item.product.price.toFixed(2).replace('.', ',')}</p>
      </div>
      <div class="swift-cart-dropdown__item-controls">
        <div class="swift-cart-dropdown__item-quantity">
          <button class="swift-cart-dropdown__item-quantity-btn" data-action="decrease" data-product-id="${productId}">-</button>
          <span class="swift-cart-dropdown__item-quantity-value">${item.quantity}</span>
          <button class="swift-cart-dropdown__item-quantity-btn" data-action="increase" data-product-id="${productId}">+</button>
        </div>
        <button class="swift-cart-dropdown__item-remove" data-action="remove" data-product-id="${productId}" aria-label="Remover item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
    
    return div;
  }

  updateCartSummary(container) {
    console.log('=== DEBUG CART SUMMARY ===');
    console.log('Container:', container);
    console.log('Container HTML:', container.innerHTML);
    
    const totalValue = Array.from(this.cart.values()).reduce((sum, item) => {
      console.log('Adding to total:', item.product.name, item.product.price, 'x', item.quantity, '=', item.product.price * item.quantity);
      return sum + (item.product.price * item.quantity);
    }, 0);
    
    console.log('Final total calculated:', totalValue);
    
    // Try different selectors
    const totalElement1 = container.querySelector('.swift-cart-dropdown__total-value');
    const totalElement2 = container.querySelector('#swift-cart-dropdown__total-value-guest');
    const totalElement3 = container.querySelector('#swift-cart-dropdown__total-value-logged');
    
    console.log('Total elements found:', {
      byClass: !!totalElement1,
      byIdGuest: !!totalElement2,
      byIdLogged: !!totalElement3
    });
    
    const totalElement = totalElement1 || totalElement2 || totalElement3;
    
    if (totalElement) {
      console.log('Found total element:', totalElement);
      console.log('Element before update:', totalElement.textContent);
      
      const formattedValue = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
      totalElement.textContent = formattedValue;
      
      console.log('Element after update:', totalElement.textContent);
      console.log('Element computed styles:', window.getComputedStyle(totalElement));
      
      // Force visibility with !important
      totalElement.style.setProperty('display', 'inline', 'important');
      totalElement.style.setProperty('visibility', 'visible', 'important');
      totalElement.style.setProperty('opacity', '1', 'important');
      totalElement.style.setProperty('color', '#e65103', 'important');
      totalElement.style.setProperty('font-weight', '700', 'important');
      
      // Also ensure parent elements are visible
      const parentSummary = totalElement.closest('.swift-cart-dropdown__summary');
      if (parentSummary) {
        console.log('Found parent summary:', parentSummary);
        parentSummary.style.setProperty('display', 'block', 'important');
        parentSummary.style.setProperty('visibility', 'visible', 'important');
        parentSummary.style.setProperty('opacity', '1', 'important');
      }
      
      // Also check if the parent container is visible
      const parentContainer = totalElement.closest('.swift-cart-dropdown__content');
      if (parentContainer) {
        console.log('Parent container visibility:', {
          display: parentContainer.style.display,
          visibility: parentContainer.style.visibility,
          opacity: parentContainer.style.opacity
        });
      }
      
      console.log('Forced visibility for total element with !important');
    } else {
      console.error('No total element found! Container HTML:', container.innerHTML);
    }
    
    console.log('=== END DEBUG CART SUMMARY ===');
  }

  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  }

  // Public methods
  getCart() {
    return new Map(this.cart);
  }

  getCartTotal() {
    return Array.from(this.cart.values()).reduce((sum, qty) => sum + qty, 0);
  }

  clearCart() {
    this.cart.clear();
    
    // Hide all quantity controls and show add buttons
    document.querySelectorAll('.swift-product-card__quantity-controls').forEach(controls => {
      const productId = controls.dataset.productId;
      this.showAddButton(productId);
    });
    
    this.updateCartCount();
    this.updateCartDropdown();
    
    this.dispatchEvent('swift:cart-cleared', {
      cart: this.cart
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.swiftProductCart = new SwiftProductCart();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwiftProductCart;
}
