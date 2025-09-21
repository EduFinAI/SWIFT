/**
 * Script otimizado com lazy loading, debouncing e memoização
 * Performance melhorada para navegação SPA
 */

// Cache de elementos DOM para evitar re-queries
const DOMCache = {
    pages: null,
    navLinks: null,
    loginForm: null,
    addButtons: null,
    
    // Inicializa o cache
    init() {
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.loginForm = document.getElementById('login-form');
        this.addButtons = document.querySelectorAll('.btn-add');
    },
    
    // Limpa o cache quando necessário
    clear() {
        this.pages = null;
        this.navLinks = null;
        this.loginForm = null;
        this.addButtons = null;
    }
};

// Memoização para funções custosas
const memoize = (fn, keyFn = (...args) => args.join('_')) => {
    const cache = new Map();
    return (...args) => {
        const key = keyFn(...args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

// Debounce para eventos frequentes
const debounce = (func, wait, immediate = false) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
};

// Throttle para scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Gerenciador de performance
const PerformanceManager = {
    // Mede o tempo de execução de funções
    measureTime(fn, name = 'Function') {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${name} executada em ${(end - start).toFixed(2)}ms`);
        return result;
    },
    
    // Lazy loading de imagens
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    // Preload de recursos críticos
    preloadCriticalResources() {
        const criticalImages = document.querySelectorAll('img[data-preload]');
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src || img.dataset.src;
            document.head.appendChild(link);
        });
    }
};

// Sistema de navegação otimizado
const NavigationManager = {
    currentPage: null,
    pageHistory: [],
    
    // Memoizada para evitar re-cálculos
    showPage: memoize((pageId) => {
        // Esconde todas as páginas de forma otimizada
        DOMCache.pages.forEach(page => {
            page.classList.add('hidden');
            // Remove do DOM se não for a página atual
            if (page.id !== pageId) {
                page.style.display = 'none';
            }
        });

        // Mostra a página desejada
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
            pageToShow.style.display = '';
            
            // Adiciona à história
            this.pageHistory.push(this.currentPage);
            this.currentPage = pageId;
            
            // Dispara evento customizado para lazy loading
            window.dispatchEvent(new CustomEvent('pageChanged', {
                detail: { pageId, previousPage: this.pageHistory[this.pageHistory.length - 1] }
            }));
            
            // Atualiza URL sem recarregar a página
            history.pushState({ page: pageId }, '', `#${pageId}`);
        }
    }),
    
    // Navegação com animação suave
    showPageWithAnimation(pageId) {
        const currentPage = this.currentPage;
        const targetPage = pageId;
        
        if (currentPage === targetPage) return;
        
        // Adiciona classe de transição
        document.body.classList.add('page-transitioning');
        
        // Usa requestAnimationFrame para animação suave
        requestAnimationFrame(() => {
            this.showPage(pageId);
            
            // Remove classe após animação
            setTimeout(() => {
                document.body.classList.remove('page-transitioning');
            }, 300);
        });
    }
};

// Gerenciador de formulários otimizado
const FormManager = {
    // Validação com debounce
    validateForm: debounce((form, validationRules) => {
        const errors = [];
        const formData = new FormData(form);
        
        Object.entries(validationRules).forEach(([field, rules]) => {
            const value = formData.get(field);
            const fieldElement = form.querySelector(`[name="${field}"]`);
            
            rules.forEach(rule => {
                if (!rule.validate(value)) {
                    errors.push({ field, message: rule.message });
                    fieldElement?.classList.add('error');
                } else {
                    fieldElement?.classList.remove('error');
                }
            });
        });
        
        return errors;
    }, 300),
    
    // Envio otimizado de formulários
    async submitForm(form, endpoint, options = {}) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Desabilita botão durante envio
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result;
            
        } catch (error) {
            console.error('Erro no envio do formulário:', error);
            throw error;
            
        } finally {
            // Reabilita botão
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        }
    }
};

// Gerenciador de eventos otimizado
const EventManager = {
    // Event delegation para melhor performance
    delegate(selector, event, handler) {
        document.addEventListener(event, (e) => {
            if (e.target.matches(selector) || e.target.closest(selector)) {
                handler(e);
            }
        });
    },
    
    // Remove event listeners de forma segura
    cleanup() {
        // Remove listeners globais se necessário
        window.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.resizeHandler);
    },
    
    // Scroll handler otimizado com throttle
    scrollHandler: throttle(() => {
        const scrollY = window.scrollY;
        const header = document.querySelector('.pginainicial-header');
        
        if (header) {
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }, 16), // ~60fps
    
    // Resize handler otimizado
    resizeHandler: debounce(() => {
        // Recalcula layouts responsivos
        window.dispatchEvent(new CustomEvent('layoutChanged'));
    }, 250)
};

// Inicialização otimizada
const App = {
    init() {
        // Inicializa cache DOM
        DOMCache.init();
        
        // Configura navegação
        this.setupNavigation();
        
        // Configura formulários
        this.setupForms();
        
        // Configura eventos
        this.setupEvents();
        
        // Inicializa lazy loading
        PerformanceManager.lazyLoadImages();
        PerformanceManager.preloadCriticalResources();
        
        // Define página inicial
        NavigationManager.showPage('home');
        
        console.log('App inicializado com otimizações de performance');
    },
    
    setupNavigation() {
        // Usa event delegation para melhor performance
        EventManager.delegate('.nav-link', 'click', (event) => {
            event.preventDefault();
            const targetPage = event.target.closest('.nav-link').dataset.page;
            
            if (targetPage) {
                NavigationManager.showPageWithAnimation(targetPage);
            }
        });
        
        // Suporte ao botão voltar do navegador
        window.addEventListener('popstate', (event) => {
            const page = event.state?.page || 'home';
            NavigationManager.showPage(page);
        });
    },
    
    setupForms() {
        // Login form otimizado
        if (DOMCache.loginForm) {
            DOMCache.loginForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                try {
                    const result = await FormManager.submitForm(
                        DOMCache.loginForm, 
                        '/api/login'
                    );
                    
                    alert('Login realizado com sucesso!');
                    NavigationManager.showPage('home');
                    
                } catch (error) {
                    alert('Erro no login. Tente novamente.');
                }
            });
        }
        
        // Botões de adicionar ao carrinho otimizados
        EventManager.delegate('.btn-add', 'click', (event) => {
            const button = event.target.closest('.btn-add');
            const productId = button.dataset.productId;
            
            // Feedback visual imediato
            button.textContent = 'Adicionando...';
            button.disabled = true;
            
            // Simula API call
            setTimeout(() => {
                button.textContent = 'Adicionado!';
                button.classList.add('success');
                
                setTimeout(() => {
                    button.textContent = 'Adicionar ao Carrinho';
                    button.disabled = false;
                    button.classList.remove('success');
                }, 2000);
            }, 500);
        });
    },
    
    setupEvents() {
        // Scroll events
        window.addEventListener('scroll', EventManager.scrollHandler);
        
        // Resize events
        window.addEventListener('resize', EventManager.resizeHandler);
        
        // Custom events para lazy loading
        window.addEventListener('pageChanged', (event) => {
            const { pageId } = event.detail;
            console.log(`Página alterada para: ${pageId}`);
            
            // Lazy load de conteúdo específico da página
            this.lazyLoadPageContent(pageId);
        });
    },
    
    lazyLoadPageContent(pageId) {
        // Carrega conteúdo específico da página quando necessário
        const pageElement = document.getElementById(pageId);
        if (pageElement && pageElement.dataset.lazy) {
            // Simula carregamento de conteúdo
            setTimeout(() => {
                pageElement.classList.add('content-loaded');
            }, 100);
        }
    },
    
    // Cleanup quando necessário
    destroy() {
        EventManager.cleanup();
        DOMCache.clear();
    }
};

// Aguarda DOM estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        PerformanceManager.measureTime(() => App.init(), 'App Initialization');
    });
} else {
    // DOM já está pronto
    PerformanceManager.measureTime(() => App.init(), 'App Initialization');
}

// Service Worker para cache (se suportado)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration);
            })
            .catch(error => {
                console.log('SW falhou:', error);
            });
    });
}
