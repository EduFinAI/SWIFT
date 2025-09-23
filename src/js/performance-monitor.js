/**
 * Performance Monitor - Monitoramento avançado de performance
 * Core Web Vitals, métricas customizadas e relatórios
 */

class PerformanceMonitor {
    constructor(options = {}) {
        this.options = {
            reportUrl: '/api/performance',
            sampleRate: 1.0, // 100% dos usuários
            debug: false,
            collectResourceTiming: true,
            collectNavigationTiming: true,
            collectUserTiming: true,
            ...options
        };
        
        this.metrics = {};
        this.observers = [];
        this.init();
    }
    
    init() {
        // Aguardar página carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startMonitoring());
        } else {
            this.startMonitoring();
        }
        
        // Monitorar mudanças de página (SPA)
        window.addEventListener('pageChanged', () => {
            this.measurePageChange();
        });
    }
    
    startMonitoring() {
        this.measureCoreWebVitals();
        this.measureCustomMetrics();
        this.measureResourceTiming();
        this.measureUserInteractions();
        this.measureMemoryUsage();
        this.setupPerformanceObserver();
    }
    
    // Core Web Vitals
    measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        this.measureLCP();
        
        // First Input Delay (FID)
        this.measureFID();
        
        // Cumulative Layout Shift (CLS)
        this.measureCLS();
        
        // First Contentful Paint (FCP)
        this.measureFCP();
        
        // Time to Interactive (TTI)
        this.measureTTI();
    }
    
    // Largest Contentful Paint
    measureLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                this.metrics.lcp = {
                    value: lastEntry.startTime,
                    element: lastEntry.element,
                    url: lastEntry.url,
                    timestamp: Date.now()
                };
                
                this.log('LCP:', this.metrics.lcp.value);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(observer);
        }
    }
    
    // First Input Delay
    measureFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = {
                        value: entry.processingStart - entry.startTime,
                        eventType: entry.name,
                        timestamp: Date.now()
                    };
                    
                    this.log('FID:', this.metrics.fid.value);
                });
            });
            
            observer.observe({ entryTypes: ['first-input'] });
            this.observers.push(observer);
        }
    }
    
    // Cumulative Layout Shift
    measureCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            let clsEntries = [];
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        clsEntries.push(entry);
                    }
                });
                
                this.metrics.cls = {
                    value: clsValue,
                    entries: clsEntries,
                    timestamp: Date.now()
                };
                
                this.log('CLS:', this.metrics.cls.value);
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(observer);
        }
    }
    
    // First Contentful Paint
    measureFCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fcp = {
                        value: entry.startTime,
                        timestamp: Date.now()
                    };
                    
                    this.log('FCP:', this.metrics.fcp.value);
                });
            });
            
            observer.observe({ entryTypes: ['paint'] });
            this.observers.push(observer);
        }
    }
    
    // Time to Interactive
    measureTTI() {
        // Implementação simplificada do TTI
        const ttiThreshold = 5000; // 5 segundos
        
        setTimeout(() => {
            if (!this.metrics.tti) {
                this.metrics.tti = {
                    value: performance.now(),
                    timestamp: Date.now()
                };
                
                this.log('TTI:', this.metrics.tti.value);
            }
        }, ttiThreshold);
    }
    
    // Métricas customizadas
    measureCustomMetrics() {
        // Tempo de carregamento da página
        window.addEventListener('load', () => {
            this.metrics.pageLoadTime = {
                value: performance.now(),
                timestamp: Date.now()
            };
            
            this.log('Page Load Time:', this.metrics.pageLoadTime.value);
        });
        
        // Tempo de carregamento do DOM
        this.metrics.domContentLoaded = {
            value: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            timestamp: Date.now()
        };
        
        // Tempo de carregamento completo
        this.metrics.loadComplete = {
            value: performance.timing.loadEventEnd - performance.timing.navigationStart,
            timestamp: Date.now()
        };
        
        // Tamanho da página
        this.metrics.pageSize = {
            value: document.documentElement.outerHTML.length,
            timestamp: Date.now()
        };
    }
    
    // Resource Timing
    measureResourceTiming() {
        if (this.options.collectResourceTiming && 'PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    const resourceMetrics = {
                        name: entry.name,
                        duration: entry.duration,
                        size: entry.transferSize,
                        type: entry.initiatorType,
                        timestamp: Date.now()
                    };
                    
                    if (!this.metrics.resources) {
                        this.metrics.resources = [];
                    }
                    
                    this.metrics.resources.push(resourceMetrics);
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
            this.observers.push(observer);
        }
    }
    
    // User Interactions
    measureUserInteractions() {
        const interactions = ['click', 'keydown', 'scroll', 'touchstart'];
        
        interactions.forEach(eventType => {
            document.addEventListener(eventType, (event) => {
                const interactionTime = performance.now();
                
                if (!this.metrics.interactions) {
                    this.metrics.interactions = [];
                }
                
                this.metrics.interactions.push({
                    type: eventType,
                    timestamp: Date.now(),
                    time: interactionTime,
                    target: event.target.tagName
                });
                
                // Limitar histórico de interações
                if (this.metrics.interactions.length > 100) {
                    this.metrics.interactions = this.metrics.interactions.slice(-50);
                }
            });
        });
    }
    
    // Memory Usage
    measureMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                
                this.metrics.memory = {
                    used: memory.usedJSHeapSize,
                    total: memory.totalJSHeapSize,
                    limit: memory.jsHeapSizeLimit,
                    timestamp: Date.now()
                };
                
                // Alert se uso de memória estiver alto
                const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
                if (usagePercent > 80) {
                    console.warn('Alto uso de memória:', usagePercent.toFixed(2) + '%');
                }
            }, 10000); // A cada 10 segundos
        }
    }
    
    // Performance Observer geral
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'measure') {
                        this.metrics.userTiming = this.metrics.userTiming || {};
                        this.metrics.userTiming[entry.name] = {
                            value: entry.duration,
                            timestamp: Date.now()
                        };
                        
                        this.log('User Timing:', entry.name, entry.duration);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['measure'] });
            this.observers.push(observer);
        }
    }
    
    // Medir mudança de página
    measurePageChange() {
        const pageChangeTime = performance.now();
        
        this.metrics.pageChanges = this.metrics.pageChanges || [];
        this.metrics.pageChanges.push({
            timestamp: Date.now(),
            time: pageChangeTime
        });
        
        this.log('Page Change:', pageChangeTime);
    }
    
    // Medir tempo de execução de função
    measureFunction(name, fn) {
        return (...args) => {
            const start = performance.now();
            const result = fn(...args);
            const end = performance.now();
            
            performance.mark(`${name}-start`);
            performance.mark(`${name}-end`);
            performance.measure(name, `${name}-start`, `${name}-end`);
            
            this.log(`Function ${name}:`, end - start);
            
            return result;
        };
    }
    
    // Relatório de performance
    async generateReport() {
        const report = {
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
            metrics: this.metrics,
            connection: this.getConnectionInfo(),
            device: this.getDeviceInfo()
        };
        
        // Calcular scores
        report.scores = this.calculateScores();
        
        // Enviar relatório
        if (this.options.reportUrl) {
            await this.sendReport(report);
        }
        
        return report;
    }
    
    // Calcular scores de performance
    calculateScores() {
        const scores = {};
        
        // LCP Score
        if (this.metrics.lcp) {
            const lcp = this.metrics.lcp.value;
            if (lcp <= 2500) scores.lcp = 'good';
            else if (lcp <= 4000) scores.lcp = 'needs-improvement';
            else scores.lcp = 'poor';
        }
        
        // FID Score
        if (this.metrics.fid) {
            const fid = this.metrics.fid.value;
            if (fid <= 100) scores.fid = 'good';
            else if (fid <= 300) scores.fid = 'needs-improvement';
            else scores.fid = 'poor';
        }
        
        // CLS Score
        if (this.metrics.cls) {
            const cls = this.metrics.cls.value;
            if (cls <= 0.1) scores.cls = 'good';
            else if (cls <= 0.25) scores.cls = 'needs-improvement';
            else scores.cls = 'poor';
        }
        
        return scores;
    }
    
    // Informações de conexão
    getConnectionInfo() {
        if ('connection' in navigator) {
            const conn = navigator.connection;
            return {
                effectiveType: conn.effectiveType,
                downlink: conn.downlink,
                rtt: conn.rtt,
                saveData: conn.saveData
            };
        }
        return null;
    }
    
    // Informações do dispositivo
    getDeviceInfo() {
        return {
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth
            },
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory
        };
    }
    
    // Enviar relatório
    async sendReport(report) {
        try {
            await fetch(this.options.reportUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(report)
            });
        } catch (error) {
            console.warn('Erro ao enviar relatório de performance:', error);
        }
    }
    
    // Log
    log(...args) {
        if (this.options.debug) {
            console.log('[PerformanceMonitor]', ...args);
        }
    }
    
    // Cleanup
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Auto-inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceMonitor = new PerformanceMonitor({
            debug: true // Habilitar logs em desenvolvimento
        });
    });
} else {
    window.performanceMonitor = new PerformanceMonitor({
        debug: true
    });
}

// Exportar para uso global
window.PerformanceMonitor = PerformanceMonitor;
