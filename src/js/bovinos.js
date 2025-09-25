document.addEventListener('DOMContentLoaded', () => {

	// ==========================================================================
	// MENU HAMBÚRGUER E NAVEGAÇÃO MÓVEL
	// ==========================================================================

	const hamburgerButton = document.querySelector('.hamburger-button');
	const mobileNav = document.getElementById('mobile-nav');

	if (hamburgerButton && mobileNav) {
		const populateMobileNav = () => {
			mobileNav.innerHTML = '';
			const desktopNav = document.querySelector('.site-header__nav--desktop');
			const searchBar = document.querySelector('.site-header .search-bar');
			const userIcon = document.querySelector('.site-header .user-icon');
			const cartIcon = document.querySelector('.site-header .cart-icon');

			if (desktopNav) mobileNav.appendChild(desktopNav.cloneNode(true));
			if (window.innerWidth <= 768 && searchBar) {
				mobileNav.appendChild(searchBar.cloneNode(true));
			}
			if (userIcon) {
				const userIconClone = userIcon.cloneNode(true);
				const userText = document.createElement('span');
				userText.textContent = 'Login/Cadastro';
				userIconClone.appendChild(userText);
				mobileNav.appendChild(userIconClone);
			}
			if (cartIcon) {
				const cartIconClone = cartIcon.cloneNode(true);
				const cartText = document.createElement('span');
				cartText.textContent = 'Carrinho';
				cartIconClone.appendChild(cartText);
				mobileNav.appendChild(cartIconClone);
			}
		};

		hamburgerButton.addEventListener('click', () => {
			populateMobileNav();
			mobileNav.classList.toggle('is-active');
			const isExpanded = mobileNav.classList.contains('is-active');
			hamburgerButton.setAttribute('aria-expanded', isExpanded);
		});

		window.addEventListener('resize', () => {
			if (window.innerWidth > 1380) {
				mobileNav.classList.remove('is-active');
				hamburgerButton.setAttribute('aria-expanded', false);
			} else {
				if (mobileNav.classList.contains('is-active')) {
					populateMobileNav();
				}
			}
		});
	}

	// ==========================================================================
	// CARROSSEL DE CATEGORIAS
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
	// FILTROS RESPONSIVOS (SIDEBAR)
	// ==========================================================================

	const filterToggleButton = document.querySelector('.filter-toggle-button');
	const sidebar = document.getElementById('page-sidebar');
	const applyFiltersButton = document.getElementById('filter-apply-btn');

	if (filterToggleButton && sidebar) {
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
	// SLIDER DE PREÇO
	// ==========================================================================

	const priceSlider = document.getElementById('price-slider');

	if (priceSlider) {
		const valueDisplay = document.getElementById('price-slider-values');

		noUiSlider.create(priceSlider, {
			start: [56, 100],
			connect: true,
			range: {
				'min': 0,
				'max': 200
			},
			format: {
				to: function(value) {
					return 'R$ ' + value.toFixed(2).replace('.', ',');
				},
				from: function(value) {
					return Number(value.replace('R$ ', '').replace(',', '.'));
				}
			}
		});

		priceSlider.noUiSlider.on('update', function(values) {
			valueDisplay.textContent = values.join(' - ');
		});
	}

	// ==========================================================================
	// CONTROLE DE QUANTIDADE DE PRODUTOS
	// ==========================================================================

	const productGrid = document.querySelector('.product-grid');

	if (!productGrid) {
		return;
	}

	productGrid.addEventListener('click', (event) => {
		const target = event.target;

		if (target.tagName === 'BUTTON' && target.closest('.quantity-stepper')) {
			const stepper = target.closest('.quantity-stepper');
			const input = stepper.querySelector('input[type="text"]');
			let currentValue = parseInt(input.value, 10);

			if (isNaN(currentValue)) {
				currentValue = 1;
			}

			if (target.textContent === '+') {
				currentValue++;
			}

			if (target.textContent === '-') {
				if (currentValue > 1) {
					currentValue--;
				}
			}

			input.value = currentValue;
		}
	});

});