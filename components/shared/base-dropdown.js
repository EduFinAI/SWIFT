/**
 * Base Dropdown Component - Shared functionality for all dropdowns
 * @version 2.0.0
 */

class SwiftBaseDropdown {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      triggerSelector: null,
      closeOnOutsideClick: true,
      closeOnEscape: true,
      onOpen: null,
      onClose: null,
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
    this.isInitialized = true;
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Find the trigger button
    const triggerButton = this.options.triggerSelector ? 
      document.querySelector(this.options.triggerSelector) :
      this.element.parentElement?.querySelector('button');

    if (triggerButton) {
      // Toggle dropdown on button click
      triggerButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    // Close dropdown when clicking outside
    if (this.options.closeOnOutsideClick) {
      document.addEventListener('click', (e) => {
        if (!this.element.contains(e.target) && !triggerButton?.contains(e.target)) {
          this.close();
        }
      });
    }

    // Handle keyboard navigation
    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }
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
    
    // Focus first interactive element
    const firstFocusable = this.element.querySelector('button, a, input');
    if (firstFocusable) {
      firstFocusable.focus();
    }

    // Dispatch event
    this.dispatchEvent('swift:dropdown:open');

    if (this.options.onOpen) {
      this.options.onOpen();
    }
  }

  /**
   * Close dropdown
   */
  close() {
    this.isOpen = false;
    this.element.classList.remove('is-open');
    
    // Dispatch event
    this.dispatchEvent('swift:dropdown:close');

    if (this.options.onClose) {
      this.options.onClose();
    }
  }

  /**
   * Get current state
   */
  getState() {
    return {
      isOpen: this.isOpen
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

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwiftBaseDropdown;
}

// Make globally available
if (typeof window !== 'undefined') {
  window.SwiftBaseDropdown = SwiftBaseDropdown;
}
