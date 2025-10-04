/**
 * Swift Hero Carousel Component
 * Handles carousel functionality for the hero section
 */
class SwiftHeroCarousel {
  constructor() {
    this.carousel = document.querySelector('.swift-hero__carousel');
    this.slides = document.querySelectorAll('.swift-hero__slide');
    this.indicators = document.querySelectorAll('.swift-hero__indicator');
    this.prevBtn = document.querySelector('.swift-hero__control--prev');
    this.nextBtn = document.querySelector('.swift-hero__control--next');
    
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoplayInterval = null;
    this.autoplayDelay = 8000; // 8 seconds - more time for users to read content
    this.isTransitioning = false;
    
    this.init();
  }
  
  init() {
    if (!this.carousel || this.slides.length === 0) return;
    
    this.bindEvents();
    this.startAutoplay();
    this.updateIndicators();
  }
  
  bindEvents() {
    // Previous button
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousSlide());
    }
    
    // Next button
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Pause autoplay on hover
    this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Touch/swipe support
    this.addTouchSupport();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }
  
  addTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });
    
    this.carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      
      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    });
  }
  
  handleKeyboard(e) {
    if (e.key === 'ArrowLeft') {
      this.previousSlide();
    } else if (e.key === 'ArrowRight') {
      this.nextSlide();
    }
  }
  
  nextSlide() {
    if (this.isTransitioning) return;
    
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }
  
  previousSlide() {
    if (this.isTransitioning) return;
    
    const prevIndex = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.goToSlide(prevIndex);
  }
  
  goToSlide(index) {
    if (this.isTransitioning || index === this.currentSlide) return;
    
    this.isTransitioning = true;
    this.pauseAutoplay();
    
    // Remove active class from current slide
    this.slides[this.currentSlide].classList.remove('active');
    this.slides[this.currentSlide].classList.add('prev');
    
    // Add active class to new slide
    this.slides[index].classList.add('active');
    this.slides[index].classList.remove('prev');
    
    // Update current slide
    this.currentSlide = index;
    
    // Update indicators
    this.updateIndicators();
    
    // Reset transition flag after animation
    setTimeout(() => {
      this.isTransitioning = false;
      this.startAutoplay();
      
      // Remove prev class from all slides
      this.slides.forEach(slide => slide.classList.remove('prev'));
    }, 600);
  }
  
  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  startAutoplay() {
    this.pauseAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }
  
  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  // Public methods for external control
  play() {
    this.startAutoplay();
  }
  
  pause() {
    this.pauseAutoplay();
  }
  
  destroy() {
    this.pauseAutoplay();
    // Remove event listeners if needed
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SwiftHeroCarousel();
});

// Export for potential external use
window.SwiftHeroCarousel = SwiftHeroCarousel;
