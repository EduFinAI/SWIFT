/* ==========================================================================
   COMPONENT-SPECIFIC FUNCTIONALITIES - SWIFT COMPONENTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // CARROSSEL DE CATEGORIAS (PÁGINAS DE LISTAGEM)
    // ==========================================================================
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const track = carouselContainer.querySelector('.carousel-track');
        const prevButton = carouselContainer.querySelector('.carousel-arrow.prev');
        const nextButton = carouselContainer.querySelector('.carousel-arrow.next');
        const items = Array.from(track.children);
        let currentIndex = 0;

        const updateCarouselState = () => {
            const scroller = track.parentElement;
            const trackWidth = track.scrollWidth;
            const scrollerWidth = scroller.clientWidth;

            if (trackWidth <= scrollerWidth) {
                prevButton.classList.add('is-hidden');
                nextButton.classList.add('is-hidden');
                track.style.transform = 'translateX(0)';
                currentIndex = 0;
            } else {
                prevButton.classList.remove('is-hidden');
                nextButton.classList.remove('is-hidden');
                const itemWidth = items[0].getBoundingClientRect().width + parseInt(window.getComputedStyle(track).gap);
                const maxScroll = trackWidth - scrollerWidth;
                prevButton.disabled = currentIndex === 0;
                nextButton.disabled = (currentIndex * itemWidth) >= maxScroll - 1;
            }
        };

        const moveToCurrentIndex = () => {
            const itemWidth = items[0].getBoundingClientRect().width + parseInt(window.getComputedStyle(track).gap);
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            updateCarouselState();
        };

        nextButton.addEventListener('click', () => { 
            currentIndex++; 
            moveToCurrentIndex(); 
        });
        
        prevButton.addEventListener('click', () => { 
            currentIndex--; 
            moveToCurrentIndex(); 
        });
        
        const observer = new ResizeObserver(() => { 
            updateCarouselState(); 
        });
        observer.observe(track.parentElement);
        updateCarouselState();
    }

    // ==========================================================================
    // FILTROS RESPONSIVOS E SIDEBAR (PÁGINAS DE LISTAGEM)
    // ==========================================================================
    const filterToggleButton = document.querySelector('.filter-toggle-button');
    if (filterToggleButton) {
        const sidebar = document.getElementById('page-sidebar');
        const applyFiltersButton = document.getElementById('filter-apply-btn');
        
        const closeFilters = () => {
            document.body.classList.remove('filters-are-open');
            filterToggleButton.setAttribute('aria-expanded', 'false');
        };
        
        filterToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('filters-are-open');
            const isExpanded = document.body.classList.contains('filters-are-open');
            filterToggleButton.setAttribute('aria-expanded', isExpanded);
        });
        
        if (applyFiltersButton) {
            applyFiltersButton.addEventListener('click', closeFilters);
        }
    }

    // ==========================================================================
    // SLIDER DE PREÇO (PÁGINAS DE LISTAGEM)
    // ==========================================================================
    const priceSlider = document.getElementById('price-slider');
    if (priceSlider && typeof noUiSlider !== 'undefined') {
        const valueDisplay = document.getElementById('price-slider-values');
        
        noUiSlider.create(priceSlider, {
            start: [0, 200],
            connect: true,
            range: { 'min': 0, 'max': 200 },
            format: {
                to: function (value) { 
                    return 'R$ ' + value.toFixed(2).replace('.', ','); 
                },
                from: function (value) { 
                    return Number(value.replace('R$ ', '').replace(',', '.')); 
                }
            }
        });
        
        priceSlider.noUiSlider.on('update', function (values) {
            if (valueDisplay) {
                valueDisplay.textContent = values.join(' - ');
            }
        });
    }

    // ==========================================================================
    // CHECKOUT STEPPER
    // ==========================================================================
    const checkoutStepper = document.querySelector('.checkout-stepper');
    if (checkoutStepper) {
        const steps = checkoutStepper.querySelectorAll('li');
        const checkoutBlocks = document.querySelectorAll('.checkout-block');
        
        const updateStep = (stepNumber) => {
            steps.forEach((step, index) => {
                if (index < stepNumber) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                } else if (index === stepNumber) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active', 'completed');
                }
            });
            
            checkoutBlocks.forEach((block, index) => {
                if (index === stepNumber) {
                    block.style.display = 'block';
                } else {
                    block.style.display = 'none';
                }
            });
        };
        
        // Inicializar no primeiro passo
        updateStep(0);
        
        // Adicionar listeners para navegação entre passos
        steps.forEach((step, index) => {
            step.addEventListener('click', () => {
                if (step.classList.contains('completed') || step.classList.contains('active')) {
                    updateStep(index);
                }
            });
        });
    }

    // ==========================================================================
    // COLLAPSE/EXPAND SECTIONS
    // ==========================================================================
    document.querySelectorAll('.toggle-collapse-btn').forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.checkout-block');
            const body = section.querySelector('.checkout-block__body');
            const isCollapsed = body.style.display === 'none';
            
            body.style.display = isCollapsed ? 'block' : 'none';
            button.setAttribute('aria-expanded', !isCollapsed);
        });
    });

    // ==========================================================================
    // PRODUCT CARD INTERACTIONS
    // ==========================================================================
    document.querySelectorAll('.product-card').forEach(card => {
        const addButton = card.querySelector('.button--primary');
        const quantityStepper = card.querySelector('.quantity-stepper');
        
        if (addButton && quantityStepper) {
            addButton.addEventListener('click', () => {
                const quantity = quantityStepper.querySelector('input').value;
                const productName = card.querySelector('.product-card__title a').textContent;
                
                // Simular adição ao carrinho
                console.log(`Adicionado ao carrinho: ${quantity}x ${productName}`);
                
                // Feedback visual
                addButton.textContent = 'Adicionado!';
                addButton.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    addButton.textContent = 'Adicionar';
                    addButton.style.backgroundColor = '';
                }, 2000);
            });
        }
    });

    console.log('Swift Components JS loaded successfully');
});
