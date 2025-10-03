/**
 * Component Loader - Swift Design System
 * Loads HTML components dynamically to avoid duplication
 */

class SwiftComponentLoader {
  constructor() {
    this.loadedComponents = new Set();
    this.componentCache = new Map();
  }

  /**
   * Load a component from its HTML file
   * @param {string} componentPath - Path to the component HTML file
   * @param {string} targetId - ID of the element where component should be loaded
   * @returns {Promise<void>}
   */
  async loadComponent(componentPath, targetId) {
    try {
      // Check if component is already loaded
      if (this.loadedComponents.has(targetId)) {
        console.log(`Component ${targetId} already loaded`);
        return;
      }

      // Check cache first
      if (this.componentCache.has(componentPath)) {
        this.insertComponent(this.componentCache.get(componentPath), targetId);
        this.loadedComponents.add(targetId);
        return;
      }

      // Fetch component HTML
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${response.status}`);
      }

      const componentHtml = await response.text();
      
      // Cache the component
      this.componentCache.set(componentPath, componentHtml);
      
      // Insert component into target element
      this.insertComponent(componentHtml, targetId);
      
      // Mark as loaded
      this.loadedComponents.add(targetId);
      
      console.log(`Component ${targetId} loaded successfully from ${componentPath}`);
      
    } catch (error) {
      console.error(`Error loading component ${targetId}:`, error);
      // Fallback: show error message
      this.showError(targetId, error.message);
    }
  }

  /**
   * Insert component HTML into target element
   * @param {string} html - Component HTML content
   * @param {string} targetId - Target element ID
   */
  insertComponent(html, targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      console.error(`Target element with ID ${targetId} not found`);
      return;
    }

    targetElement.innerHTML = html;
  }

  /**
   * Show error message in target element
   * @param {string} targetId - Target element ID
   * @param {string} message - Error message
   */
  showError(targetId, message) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.innerHTML = `
        <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c33;">
          <strong>Erro ao carregar componente:</strong><br>
          ${message}
        </div>
      `;
    }
  }

  /**
   * Load multiple components
   * @param {Array} components - Array of {path, targetId} objects
   * @returns {Promise<void>}
   */
  async loadComponents(components) {
    const promises = components.map(comp => 
      this.loadComponent(comp.path, comp.targetId)
    );
    
    await Promise.all(promises);
  }

  /**
   * Preload components for better performance
   * @param {Array} componentPaths - Array of component paths
   */
  async preloadComponents(componentPaths) {
    const promises = componentPaths.map(async (path) => {
      try {
        const response = await fetch(path);
        if (response.ok) {
          const html = await response.text();
          this.componentCache.set(path, html);
        }
      } catch (error) {
        console.warn(`Failed to preload component ${path}:`, error);
      }
    });

    await Promise.all(promises);
  }
}

// Initialize component loader
window.swiftComponentLoader = new SwiftComponentLoader();

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Define components to load
  const componentsToLoad = [
    {
      path: './components/modals/login-modal/login-modal.html',
      targetId: 'swift-login-modal-container'
    }
  ];

  // Load components
  await window.swiftComponentLoader.loadComponents(componentsToLoad);
  
  // Dispatch event when all components are loaded
  document.dispatchEvent(new CustomEvent('swift:components:loaded'));
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwiftComponentLoader;
}
