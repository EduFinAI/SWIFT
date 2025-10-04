/* ==========================================================================
   CORE FUNCTIONALITIES - SWIFT CORE
   ========================================================================== */

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
            } else if (event.target.textContent === '-' && currentValue > 1) {
                currentValue--;
            }
            
            input.value = currentValue;
        }
    });

    // ==========================================================================
    // VALIDAÇÃO DE FORMULÁRIOS BÁSICA
    // ==========================================================================
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            const errorMessage = input.parentNode.querySelector('.error-message');
            
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('invalid');
                if (errorMessage) {
                    errorMessage.textContent = 'Este campo é obrigatório';
                }
            } else {
                input.classList.remove('invalid');
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            }
        });

        return isValid;
    };

    // Aplicar validação a todos os formulários
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });

    // ==========================================================================
    // UTILITÁRIOS GLOBAIS
    // ==========================================================================
    
    // Formatação de moeda
    window.formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    // Formatação de CEP
    window.formatCEP = (cep) => {
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    // Formatação de telefone
    window.formatPhone = (phone) => {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    // ==========================================================================
    // BUSCA DE CEP (VIA CEP API)
    // ==========================================================================
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', async () => {
            const cep = cepInput.value.replace(/\D/g, '');
            
            if (cep.length === 8) {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await response.json();
                    
                    if (!data.erro) {
                        const addressInput = document.getElementById('address');
                        const neighborhoodInput = document.getElementById('neighborhood');
                        const cityInput = document.getElementById('city');
                        const stateInput = document.getElementById('state');
                        
                        if (addressInput) addressInput.value = data.logradouro;
                        if (neighborhoodInput) neighborhoodInput.value = data.bairro;
                        if (cityInput) cityInput.value = data.localidade;
                        if (stateInput) stateInput.value = data.uf;
                    }
                } catch (error) {
                    console.error('Erro ao buscar CEP:', error);
                }
            }
        });
    }

    // ==========================================================================
    // MÁSCARAS DE INPUT
    // ==========================================================================
    
    // Máscara para CEP
    const cepInputs = document.querySelectorAll('input[name="cep"], input[id="cep"]');
    cepInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    });

    // Máscara para telefone
    const phoneInputs = document.querySelectorAll('input[name="phone"], input[id="phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            e.target.value = value;
        });
    });

    console.log('Swift Core JS loaded successfully');
});
