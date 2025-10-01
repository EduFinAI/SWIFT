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

		nextButton.addEventListener('click', () => { currentIndex++; moveToCurrentIndex(); });
		prevButton.addEventListener('click', () => { currentIndex--; moveToCurrentIndex(); });
		const observer = new ResizeObserver(() => { updateCarouselState(); });
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
	if (priceSlider) {
		const valueDisplay = document.getElementById('price-slider-values');
		noUiSlider.create(priceSlider, {
			start: [0, 200],
			connect: true,
			range: { 'min': 0, 'max': 200 },
			format: {
				to: function (value) { return 'R$ ' + value.toFixed(2).replace('.', ','); },
				from: function (value) { return Number(value.replace('R$ ', '').replace(',', '.')); }
			}
		});
		priceSlider.noUiSlider.on('update', function (values) {
			valueDisplay.textContent = values.join(' - ');
		});
	}

	// ==========================================================================
	// CONTROLE DE QUANTIDADE DE PRODUTOS (GLOBAL)
	// ==========================================================================
	document.addEventListener('click', (event) => {
		if (event.target.matches('.quantity-stepper button')) {
			const stepper = event.target.closest('.quantity-stepper');
			if (!stepper) return;
			const input = stepper.querySelector('input[type="text"]');
			let currentValue = parseInt(input.value, 10) || 1;
			if (event.target.textContent === '+') {
				currentValue++;
			} else if (currentValue > 1) {
				currentValue--;
			}
			input.value = currentValue;
		}
	});

	// ==========================================================================
	// FUNÇÕES DA PÁGINA DE PRODUTO
	// ==========================================================================
	function setupProductPage() {
		// --- Lógica da Galeria de Miniaturas ---
		const gallery = document.querySelector('.product-media-gallery');
		if (gallery) {
			const thumbnails = gallery.querySelectorAll('.thumbnail');
			const mainPhoto = gallery.querySelector('.main-photo');
			const videoPlayer = gallery.querySelector('.main-video');

			thumbnails.forEach(thumb => {
				thumb.addEventListener('click', () => {
					gallery.querySelector('.thumbnail.active').classList.remove('active');
					thumb.classList.add('active');

					const type = thumb.dataset.type;

					if (type === 'image') {
						mainPhoto.src = thumb.dataset.src;
						mainPhoto.classList.remove('hidden');
						videoPlayer.classList.add('hidden');
						videoPlayer.src = "";

					} else if (type === 'video') {
						mainPhoto.classList.add('hidden');
						videoPlayer.classList.remove('hidden');

						if (videoPlayer.src !== videoPlayer.dataset.src) {
							videoPlayer.src = videoPlayer.dataset.src;
						}
					}
				});
			});
		}

		// --- Lógica das Abas de Conteúdo ---
		const tabLinks = document.querySelectorAll('.tab-navigation .tab-link');
		const tabContents = document.querySelectorAll('.tab-content-wrapper .tab-content');
		if (tabLinks.length > 0 && tabContents.length > 0) {
			tabLinks.forEach(link => {
				link.addEventListener('click', () => {
					const tabId = link.getAttribute('data-tab');
					tabContents.forEach(content => content.classList.remove('active'));
					tabLinks.forEach(l => l.classList.remove('active'));
					document.getElementById(tabId).classList.add('active');
					link.classList.add('active');
				});
			});
		}
	}

	// Executa a configuração da página de produto APENAS se encontrar seus elementos
	if (document.querySelector('.product-details-layout')) {
		setupProductPage();
	}
});