/**
 * Region Modal Component
 * 
 * A responsive and accessible modal for region selection with:
 * - Geolocation API integration
 * - CEP input with automatic formatting (00000-000)
 * - Full keyboard navigation and screen reader support
 * - Focus management and trap
 * - Mobile-responsive design
 * 
 * Usage:
 * - openRegionModal() - Opens the modal
 * - closeRegionModal() - Closes the modal
 * - window.onChangeRegion - Callback function for region changes
 * 
 * The modal uses existing CSS variables from the project's design system.
 */

class RegionModal {
  constructor() {
    this.modal = null;
    this.overlay = null;
    this.dialog = null;
    this.closeBtn = null;
    this.useLocationBtn = null;
    this.cepInput = null;
    this.cepSubmitBtn = null;
    this.titleElement = null;
    this.lastFocusedElement = null;
    this.focusableElements = [];
    
    this.init();
  }

  init() {
    this.modal = document.getElementById('regionModal');
    if (!this.modal) return;

    this.overlay = this.modal.querySelector('.region-modal__overlay');
    this.dialog = this.modal.querySelector('.region-modal__dialog');
    this.closeBtn = this.modal.querySelector('.region-modal__close');
    this.useLocationBtn = document.getElementById('useLocationBtn');
    this.cepInput = document.getElementById('cepInput');
    this.cepSubmitBtn = document.getElementById('cepSubmitBtn');
    this.titleElement = document.getElementById('regionModalTitle');

    this.bindEvents();
    this.setupCEPMask();
  }

  bindEvents() {
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Overlay click
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    // Use location button
    if (this.useLocationBtn) {
      this.useLocationBtn.addEventListener('click', () => this.handleGeolocation());
    }

    // CEP input events
    if (this.cepInput) {
      this.cepInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleCEPSubmit();
        }
      });

      this.cepInput.addEventListener('blur', () => {
        if (this.cepInput.value.length === 9) {
          this.handleCEPSubmit();
        }
      });

      // Show/hide submit button based on input
      this.cepInput.addEventListener('input', () => {
        this.toggleCEPSubmitButton();
      });
    }

    // CEP submit button
    if (this.cepSubmitBtn) {
      this.cepSubmitBtn.addEventListener('click', () => {
        this.handleCEPSubmit();
      });
    }

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (this.isOpen()) {
        this.handleKeydown(e);
      }
    });

    // Shipping banner region button
    const regionBtn = document.getElementById('swift-region-selector');
    if (regionBtn) {
      regionBtn.addEventListener('click', () => {
        // Reset button state when opening modal
        this.resetShippingBannerButton();
        this.open();
      });
    }
  }

  setupCEPMask() {
    if (!this.cepInput) return;

    this.cepInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
      
      // Limit to 8 digits
      if (value.length > 8) {
        value = value.substring(0, 8);
      }
      
      // Apply mask: 00000-000
      if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5);
      }
      
      e.target.value = value;
    });

    // Allow only numbers and backspace/delete
    this.cepInput.addEventListener('keypress', (e) => {
      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter'];
      if (allowedKeys.includes(e.key)) return;
      
      if (!/\d/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  open() {
    if (!this.modal) return;

    // Store the currently focused element
    this.lastFocusedElement = document.activeElement;

    // Prevent body scroll
    document.body.classList.add('modal-open');

    // Show modal
    this.modal.classList.add('is-open');
    this.modal.setAttribute('aria-hidden', 'false');

    // Focus management
    this.updateFocusableElements();
    
    // Focus on title for screen readers, then move to first interactive element
    setTimeout(() => {
      if (this.titleElement) {
        this.titleElement.focus();
        setTimeout(() => {
          if (this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
          }
        }, 100);
      }
    }, 100);
  }

  close() {
    if (!this.modal) return;

    // Hide modal
    this.modal.classList.remove('is-open');
    this.modal.setAttribute('aria-hidden', 'true');

    // Restore body scroll
    document.body.classList.remove('modal-open');

    // Restore focus
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }

    // Clear form
    if (this.cepInput) {
      this.cepInput.value = '';
    }

    // Hide submit button
    this.toggleCEPSubmitButton();
  }

  isOpen() {
    return this.modal && this.modal.classList.contains('is-open');
  }

  updateFocusableElements() {
    if (!this.dialog) return;

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ];

    this.focusableElements = Array.from(
      this.dialog.querySelectorAll(focusableSelectors.join(', '))
    );
  }

  handleKeydown(e) {
    // Close on Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
      return;
    }

    // Focus trap
    if (e.key === 'Tab') {
      this.handleTabKey(e);
    }
  }

  handleTabKey(e) {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  handleGeolocation() {
    if (!navigator.geolocation) {
      this.showError('Geolocalização não é suportada neste navegador.');
      return;
    }

    // Show loading state
    const originalText = this.useLocationBtn.textContent;
    this.useLocationBtn.textContent = 'Obtendo localização...';
    this.useLocationBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        // Call the callback function
        this.onChangeRegion({
          type: 'geolocation',
          coords: coords
        });

        // Reset button
        this.useLocationBtn.textContent = originalText;
        this.useLocationBtn.disabled = false;

        // Close modal
        this.close();
      },
      (error) => {
        let errorMessage = 'Não foi possível obter sua localização.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permissão de localização negada. Por favor, digite seu CEP.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Localização indisponível. Por favor, digite seu CEP.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tempo limite excedido. Por favor, digite seu CEP.';
            break;
        }

        this.showError(errorMessage);

        // Reset button
        this.useLocationBtn.textContent = originalText;
        this.useLocationBtn.disabled = false;

        // Focus on CEP input
        if (this.cepInput) {
          this.cepInput.focus();
        }
      },
      {
        timeout: 10000,
        enableHighAccuracy: true
      }
    );
  }

  handleCEPSubmit() {
    const cep = this.cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
      this.showError('Por favor, digite um CEP válido com 8 dígitos.');
      this.cepInput.focus();
      return;
    }

    // Call the callback function
    this.onChangeRegion({
      type: 'cep',
      cep: cep
    });

    // Close modal
    this.close();
  }

  onChangeRegion(data) {
    // Update shipping banner button
    this.updateShippingBannerButton(data);
    
    // Default callback - can be overridden
    if (typeof window.onChangeRegion === 'function') {
      window.onChangeRegion(data);
    } else {
      console.log('region-change', data);
    }
  }

  updateShippingBannerButton(data) {
    const regionButton = document.getElementById('swift-region-selector');
    const regionText = regionButton?.querySelector('.swift-shipping-banner__region-text');
    
    if (!regionButton || !regionText) return;

    if (data.type === 'cep' && data.cep) {
      // Format CEP for display (00000-000)
      const formattedCEP = data.cep.length === 8 
        ? `${data.cep.substring(0, 5)}-${data.cep.substring(5)}`
        : data.cep;
      
      // Add CEP class and update text
      regionButton.classList.add('has-cep');
      regionText.textContent = formattedCEP;
      
      // Update aria-label for accessibility
      regionButton.setAttribute('aria-label', `CEP selecionado: ${formattedCEP}. Clique para alterar`);
      
    } else if (data.type === 'geolocation') {
      // For geolocation, show a location icon or text
      regionButton.classList.add('has-cep');
      regionText.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
      
      // Update aria-label for accessibility
      regionButton.setAttribute('aria-label', 'Localização detectada. Clique para alterar');
    }
  }

  resetShippingBannerButton() {
    const regionButton = document.getElementById('swift-region-selector');
    const regionText = regionButton?.querySelector('.swift-shipping-banner__region-text');
    
    if (!regionButton || !regionText) return;

    // Remove CEP class and reset text
    regionButton.classList.remove('has-cep');
    regionText.textContent = 'Confira sua região';
    
    // Reset aria-label
    regionButton.setAttribute('aria-label', 'Confira sua região');
  }

  toggleCEPSubmitButton() {
    if (!this.cepInput || !this.cepSubmitBtn) return;

    const hasValue = this.cepInput.value.trim().length > 0;
    
    if (hasValue) {
      this.cepSubmitBtn.classList.add('show');
      this.cepSubmitBtn.style.display = 'flex';
    } else {
      this.cepSubmitBtn.classList.remove('show');
      // Don't immediately hide, let CSS transition handle it
      setTimeout(() => {
        if (!this.cepSubmitBtn.classList.contains('show')) {
          this.cepSubmitBtn.style.display = 'none';
        }
      }, 250); // Match CSS transition duration
    }
  }

  showError(message) {
    // Simple error display - could be enhanced with a proper notification system
    alert(message);
  }
}

// Global functions for external access
function openRegionModal() {
  if (window.regionModalInstance) {
    window.regionModalInstance.open();
  }
}

function closeRegionModal() {
  if (window.regionModalInstance) {
    window.regionModalInstance.close();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.regionModalInstance = new RegionModal();
});

// Default callback stub
window.onChangeRegion = window.onChangeRegion || function(data) {
  console.log('region-change', data);
  
  // Example of what could be done with the data:
  if (data.type === 'geolocation') {
    console.log('User location:', data.coords);
    // Here you would typically call an API to get region info from coordinates
  } else if (data.type === 'cep') {
    console.log('User CEP:', data.cep);
    // Here you would typically call an API to validate and get region info from CEP
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RegionModal, openRegionModal, closeRegionModal };
}
