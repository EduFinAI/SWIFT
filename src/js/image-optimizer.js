/**
 * Image Optimizer - Lazy loading e otimização de imagens
 * Performance otimizada para carregamento de imagens
 */

class ImageOptimizer {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px 0px',
            threshold: 0.1,
            loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+',
            errorPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVycm88L3RleHQ+PC9zdmc+',
            webpSupport: null,
            ...options
        };
        
        this.observer = null;
        this.imageQueue = [];
        this.init();
    }
    
    async init() {
        // Detectar suporte WebP
        this.options.webpSupport = await this.detectWebPSupport();
        
        // Configurar Intersection Observer
        this.setupIntersectionObserver();
        
        // Processar imagens existentes
        this.processExistingImages();
        
        // Observer para novas imagens
        this.observeNewImages();
    }
    
    // Detectar suporte WebP
    detectWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    // Configurar Intersection Observer
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: this.options.rootMargin,
            threshold: this.options.threshold
        });
    }
    
    // Processar imagens existentes
    processExistingImages() {
        const images = document.querySelectorAll('img[data-src], img[data-srcset]');
        images.forEach(img => {
            // Adicionar placeholder
            if (!img.src || img.src === '') {
                img.src = this.options.loadingPlaceholder;
                img.classList.add('lazy-loading');
            }
            
            // Observar imagem
            this.observer.observe(img);
        });
    }
    
    // Observer para novas imagens
    observeNewImages() {
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'IMG') {
                            this.processImage(node);
                        }
                        
                        // Processar imagens dentro de elementos adicionados
                        const images = node.querySelectorAll && node.querySelectorAll('img[data-src], img[data-srcset]');
                        if (images) {
                            images.forEach(img => this.processImage(img));
                        }
                    }
                });
            });
        });
        
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Processar imagem individual
    processImage(img) {
        if (img.dataset.src || img.dataset.srcset) {
            img.src = this.options.loadingPlaceholder;
            img.classList.add('lazy-loading');
            this.observer.observe(img);
        }
    }
    
    // Carregar imagem
    async loadImage(img) {
        try {
            // Remover classe de loading
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-loading-active');
            
            // Determinar URL otimizada
            const optimizedSrc = await this.getOptimizedImageSrc(img);
            
            // Criar nova imagem para pré-carregamento
            const tempImg = new Image();
            
            tempImg.onload = () => {
                // Imagem carregada com sucesso
                img.src = tempImg.src;
                img.classList.remove('lazy-loading-active');
                img.classList.add('lazy-loaded');
                
                // Disparar evento customizado
                img.dispatchEvent(new CustomEvent('lazyLoaded', {
                    detail: { originalSrc: img.dataset.src, optimizedSrc }
                }));
            };
            
            tempImg.onerror = () => {
                // Erro no carregamento
                img.src = this.options.errorPlaceholder;
                img.classList.remove('lazy-loading-active');
                img.classList.add('lazy-error');
                
                console.warn('Erro ao carregar imagem:', img.dataset.src);
            };
            
            // Iniciar carregamento
            tempImg.src = optimizedSrc;
            
        } catch (error) {
            console.error('Erro no carregamento da imagem:', error);
            img.src = this.options.errorPlaceholder;
            img.classList.add('lazy-error');
        }
    }
    
    // Obter URL otimizada da imagem
    async getOptimizedImageSrc(img) {
        const originalSrc = img.dataset.src || img.src;
        const srcset = img.dataset.srcset;
        
        // Se tem srcset, processar diferentes tamanhos
        if (srcset) {
            return this.optimizeSrcSet(srcset);
        }
        
        // Otimizar imagem única
        return this.optimizeImageSrc(originalSrc, img);
    }
    
    // Otimizar srcset
    optimizeSrcSet(srcset) {
        const sources = srcset.split(',');
        const optimizedSources = sources.map(source => {
            const [url, descriptor] = source.trim().split(' ');
            const optimizedUrl = this.optimizeImageSrc(url);
            return `${optimizedUrl} ${descriptor}`;
        });
        
        return optimizedSources.join(', ');
    }
    
    // Otimizar URL da imagem
    optimizeImageSrc(src, img = null) {
        if (!src) return src;
        
        // Se já é WebP, manter
        if (src.includes('.webp')) {
            return src;
        }
        
        // Se suporta WebP, converter
        if (this.options.webpSupport) {
            const webpSrc = this.convertToWebP(src);
            if (webpSrc) {
                return webpSrc;
            }
        }
        
        // Otimizações baseadas no tamanho da imagem
        if (img) {
            const width = img.offsetWidth || img.naturalWidth || 800;
            const height = img.offsetHeight || img.naturalHeight || 600;
            
            // Se imagem é pequena, pode usar versão otimizada
            if (width <= 400 && height <= 300) {
                return this.addImageOptimizationParams(src, width, height);
            }
        }
        
        return src;
    }
    
    // Converter para WebP
    convertToWebP(src) {
        if (!src || !this.options.webpSupport) return null;
        
        // Verificar se é uma imagem válida
        if (!/\.(jpg|jpeg|png)$/i.test(src)) {
            return null;
        }
        
        // Converter extensão para WebP
        return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    // Adicionar parâmetros de otimização
    addImageOptimizationParams(src, width, height) {
        // Para serviços de otimização de imagem como Cloudinary, ImageKit, etc.
        // Exemplo para Cloudinary:
        // return src.replace('upload/', `upload/w_${width},h_${height},c_fill,f_auto,q_auto/`);
        
        // Para implementação local, retornar src original
        return src;
    }
    
    // Pré-carregar imagens críticas
    preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('img[data-preload="critical"]');
        
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src || img.dataset.src;
            
            if (img.srcset) {
                link.imagesrcset = img.srcset;
                link.imagesizes = img.sizes || '';
            }
            
            document.head.appendChild(link);
        });
    }
    
    // Otimizar imagens em background
    async optimizeImagesInBackground() {
        const images = document.querySelectorAll('img[data-optimize]');
        
        for (const img of images) {
            try {
                const optimizedSrc = await this.getOptimizedImageSrc(img);
                
                // Se a URL mudou, atualizar
                if (optimizedSrc !== img.src) {
                    img.dataset.originalSrc = img.src;
                    img.src = optimizedSrc;
                }
                
                // Pequeno delay para não bloquear UI
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.warn('Erro na otimização em background:', error);
            }
        }
    }
    
    // Métricas de performance
    getPerformanceMetrics() {
        const images = document.querySelectorAll('img');
        const lazyImages = document.querySelectorAll('img.lazy-loaded');
        const errorImages = document.querySelectorAll('img.lazy-error');
        
        return {
            totalImages: images.length,
            lazyLoadedImages: lazyImages.length,
            errorImages: errorImages.length,
            webpSupport: this.options.webpSupport,
            loadTime: performance.now()
        };
    }
    
    // Cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Auto-inicialização quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.imageOptimizer = new ImageOptimizer();
    });
} else {
    window.imageOptimizer = new ImageOptimizer();
}

// Exportar para uso global
window.ImageOptimizer = ImageOptimizer;
