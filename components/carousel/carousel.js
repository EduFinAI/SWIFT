/**
 * Swift Carousel Component - Scalable and Modular
 * Handles carousel functionality with automatic detection and configuration
 * @version 2.0.0
 */

class SwiftCarousel {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      trackSelector: '.swift-carousel__track, .swift-testimonials__track, .swift-best-sellers__track',
      prevSelector: '.swift-carousel__nav--prev, .swift-testimonials__nav--prev, .swift-best-sellers__nav--prev',
      nextSelector: '.swift-carousel__nav--next, .swift-testimonials__nav--next, .swift-best-sellers__nav--next',
      autoScroll: false,
      autoScrollInterval: 5000,
      scrollAmount: 0.8,
      enableTouch: true,
      enableKeyboard: true,
      ...options
    };
    
    this.track = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.autoScrollTimer = null;
    this.isInitialized = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    this.init();
  }

  /**
   * Initialize the carousel
   */
  init() {
    if (!this.element) return;

    this.track = this.element.querySelector(this.options.trackSelector);
    if (!this.track) return;

    this.prevBtn = this.element.querySelector(this.options.prevSelector);
    this.nextBtn = this.element.querySelector(this.options.nextSelector);

    if (!this.prevBtn || !this.nextBtn) return;

    this.bindEvents();
    this.updateArrows();
    
    if (this.options.autoScroll) {
      this.startAutoScroll();
    }
    
    this.isInitialized = true;
  }

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Navigation buttons
    this.prevBtn.addEventListener('click', () => this.scrollPrev());
    this.nextBtn.addEventListener('click', () => this.scrollNext());

    // Scroll events
    this.track.addEventListener('scroll', () => this.updateArrows(), { passive: true });
    
    // Resize events
    window.addEventListener('resize', () => this.updateArrows(), { passive: true });

    // Touch events
    if (this.options.enableTouch) {
      this.bindTouchEvents();
    }

    // Keyboard events
    if (this.options.enableKeyboard) {
      this.bindKeyboardEvents();
    }

    // Auto-scroll pause/resume
    if (this.options.autoScroll) {
      this.element.addEventListener('mouseenter', () => this.pauseAutoScroll());
      this.element.addEventListener('mouseleave', () => this.resumeAutoScroll());
    }
  }

  /**
   * Bind touch/swipe events
   */
  bindTouchEvents() {
    this.track.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.pauseAutoScroll();
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
      this.resumeAutoScroll();
    }, { passive: true });
  }

  /**
   * Bind keyboard events
   */
  bindKeyboardEvents() {
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.scrollNext();
      }
    });

    // Make carousel focusable
    this.element.setAttribute('tabindex', '0');
  }

  /**
   * Handle swipe gesture
   */
  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.scrollNext();
      } else {
        this.scrollPrev();
      }
    }
  }

  /**
   * Scroll to previous item
   */
  scrollPrev() {
    this.scrollByAmount(-1);
    this.pauseAutoScroll();
  }

  /**
   * Scroll to next item
   */
  scrollNext() {
    this.scrollByAmount(1);
    this.pauseAutoScroll();
  }

  /**
   * Scroll by specified amount
   * @param {number} direction - 1 for next, -1 for previous
   */
  scrollByAmount(direction = 1) {
    const scrollAmount = this.track.clientWidth * this.options.scrollAmount * direction;
    this.track.scrollBy({ 
      left: scrollAmount, 
      behavior: 'smooth' 
    });
  }

  /**
   * Update arrow states based on scroll position
   */
  updateArrows() {
    if (!this.track || !this.prevBtn || !this.nextBtn) return;

    const isAtStart = this.track.scrollLeft <= 2;
    const isAtEnd = Math.ceil(this.track.scrollLeft + this.track.clientWidth) >= this.track.scrollWidth - 2;
    
    this.prevBtn.classList.toggle('swift-carousel__nav--disabled', isAtStart);
    this.prevBtn.classList.toggle('swift-testimonials__nav--disabled', isAtStart);
    this.prevBtn.classList.toggle('swift-best-sellers__nav--disabled', isAtStart);
    
    this.nextBtn.classList.toggle('swift-carousel__nav--disabled', isAtEnd);
    this.nextBtn.classList.toggle('swift-testimonials__nav--disabled', isAtEnd);
    this.nextBtn.classList.toggle('swift-best-sellers__nav--disabled', isAtEnd);

    // Update ARIA attributes
    this.prevBtn.setAttribute('aria-disabled', isAtStart);
    this.nextBtn.setAttribute('aria-disabled', isAtEnd);
  }

  /**
   * Start auto-scroll
   */
  startAutoScroll() {
    if (!this.options.autoScroll) return;
    
    this.autoScrollTimer = setInterval(() => {
      const isAtEnd = Math.ceil(this.track.scrollLeft + this.track.clientWidth) >= this.track.scrollWidth - 2;
      
      if (isAtEnd) {
        this.track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        this.scrollNext();
      }
    }, this.options.autoScrollInterval);
  }

  /**
   * Pause auto-scroll
   */
  pauseAutoScroll() {
    if (this.autoScrollTimer) {
      clearInterval(this.autoScrollTimer);
      this.autoScrollTimer = null;
    }
  }

  /**
   * Resume auto-scroll
   */
  resumeAutoScroll() {
    if (this.options.autoScroll && !this.autoScrollTimer) {
      setTimeout(() => this.startAutoScroll(), 1000);
    }
  }

  /**
   * Destroy the carousel and clean up
   */
  destroy() {
    this.pauseAutoScroll();
    
    // Remove event listeners
    if (this.prevBtn) {
      this.prevBtn.removeEventListener('click', this.scrollPrev);
    }
    if (this.nextBtn) {
      this.nextBtn.removeEventListener('click', this.scrollNext);
    }
    
    this.isInitialized = false;
  }

  /**
   * Get current scroll position as percentage
   */
  getScrollProgress() {
    if (!this.track) return 0;
    const maxScroll = this.track.scrollWidth - this.track.clientWidth;
    return maxScroll > 0 ? (this.track.scrollLeft / maxScroll) * 100 : 0;
  }

  /**
   * Scroll to specific position
   * @param {number} position - Position as percentage (0-100)
   */
  scrollToPosition(position) {
    if (!this.track) return;
    const maxScroll = this.track.scrollWidth - this.track.clientWidth;
    const targetScroll = (position / 100) * maxScroll;
    this.track.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }
}

/**
 * Carousel Manager - Handles multiple carousels
 */
class SwiftCarouselManager {
  constructor() {
    this.carousels = new Map();
    this.init();
  }

  init() {
    // Auto-detect and initialize carousels
    this.initializeCarousels();
    
    // Re-initialize on DOM changes (if needed)
    if (typeof MutationObserver !== 'undefined') {
      this.observeDOM();
    }
  }

  /**
   * Initialize all carousels found in the DOM
   */
  initializeCarousels() {
    // Testimonials carousels
    const testimonialsCarousels = document.querySelectorAll('.swift-testimonials__carousel');
    testimonialsCarousels.forEach((element, index) => {
      const carousel = new SwiftCarousel(element, {
        autoScroll: false
      });
      this.carousels.set(`testimonials-${index}`, carousel);
    });

    // Best sellers carousels
    const bestSellersCarousels = document.querySelectorAll('.swift-best-sellers__carousel');
    bestSellersCarousels.forEach((element, index) => {
      const carousel = new SwiftCarousel(element, {
        autoScroll: true,
        autoScrollInterval: 4000
      });
      this.carousels.set(`best-sellers-${index}`, carousel);
    });

    // Generic carousels
    const genericCarousels = document.querySelectorAll('[data-carousel]:not(.swift-testimonials__carousel):not(.swift-best-sellers__carousel)');
    genericCarousels.forEach((element, index) => {
      const autoScroll = element.dataset.autoScroll === 'true';
      const interval = parseInt(element.dataset.autoScrollInterval) || 5000;
      
      const carousel = new SwiftCarousel(element, {
        autoScroll,
        autoScrollInterval: interval
      });
      this.carousels.set(`generic-${index}`, carousel);
    });

    // Legacy support
    this.initializeLegacyCarousels();
  }

  /**
   * Initialize legacy carousels for backward compatibility
   */
  initializeLegacyCarousels() {
    const legacySelectors = [
      {
        container: '.pginainicial-card-grid',
        track: '.pginainicial-frame6',
        prev: '.pginainicial-arrowleftcircle1',
        next: '.pginainicial-arrowrightcircle1'
      },
      {
        container: '.pginainicial-produtosmaisvendidos',
        track: '.pginainicial-frame22',
        prev: '.pginainicial-arrowleftcircle2',
        next: '.pginainicial-arrowrightcircle2'
      }
    ];

    legacySelectors.forEach((config, index) => {
      const element = document.querySelector(config.container);
      if (element) {
        const carousel = new SwiftCarousel(element, {
          trackSelector: config.track,
          prevSelector: config.prev,
          nextSelector: config.next,
          autoScroll: config.container.includes('produtos')
        });
        this.carousels.set(`legacy-${index}`, carousel);
      }
    });
  }

  /**
   * Observe DOM changes to initialize new carousels
   */
  observeDOM() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const carouselElements = node.querySelectorAll ? 
              node.querySelectorAll('[data-carousel], .swift-testimonials__carousel, .swift-best-sellers__carousel') : 
              [];
            
            if (carouselElements.length > 0) {
              setTimeout(() => this.initializeCarousels(), 100);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Get carousel by ID
   */
  getCarousel(id) {
    return this.carousels.get(id);
  }

  /**
   * Destroy all carousels
   */
  destroyAll() {
    this.carousels.forEach((carousel) => {
      carousel.destroy();
    });
    this.carousels.clear();
  }
}

// Initialize when DOM is ready
const initSwiftCarousels = () => {
  if (typeof window !== 'undefined') {
    window.SwiftCarouselManager = new SwiftCarouselManager();
    window.SwiftCarousel = SwiftCarousel;
  }
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwiftCarousels);
} else {
  initSwiftCarousels();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SwiftCarousel, SwiftCarouselManager };
}