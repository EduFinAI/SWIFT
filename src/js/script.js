// Espera todo o HTML ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Cache de Elementos do DOM ---
    // Armazenar seleções em variáveis evita buscas repetidas na página, melhorando a performance.
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const loginForm = document.getElementById('login-form');
    const addButtons = document.querySelectorAll('.btn-add');

    // Mapeia IDs de página para seus elementos para acesso rápido.
    const pageMap = new Map();
    pages.forEach(page => {
        pageMap.set(page.id, page);
    });

    // Função para mostrar uma página e esconder as outras
    const showPage = (pageId) => {
        // Esconde todas as páginas de forma eficiente
        pageMap.forEach((pageElement, id) => {
            if (id !== pageId) {
                pageElement.classList.add('hidden');
            }
        });

        // Mostra a página desejada usando o mapa cacheado
        const pageToShow = pageMap.get(pageId);
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
        }
    };

    // --- Navegação SPA (Single Page Application) Simulada ---
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                // Previne o comportamento padrão do link (que seria recarregar a página)
                event.preventDefault();
                
                // Pega o ID da página do atributo 'data-page' do link clicado
                const targetPage = link.dataset.page;
                
                // Chama a função para mostrar a página correspondente
                if (targetPage) {
                    showPage(targetPage);
                }
            });
        });
    }

    // --- INTERATIVIDADE EXTRA ---

    // Simulação de Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Previne o envio do formulário
            alert('Login realizado com sucesso! (Simulação)');
            showPage('home'); // Volta para a página inicial após o login
        });
    }

    // Simulação de Adicionar ao Carrinho
    if (addButtons.length > 0) {
        addButtons.forEach(button => {
            button.addEventListener('click', () => {
                alert('Produto adicionado ao carrinho! (Simulação)');
                // Futuramente, aqui poderia ser implementada uma lógica
                // para atualizar um contador de itens no carrinho.
            });
        });
    }

    // Define a página inicial a ser exibida quando o site carrega
    // Garante que a página 'home' exista antes de tentar mostrá-la.
    if (pageMap.has('home')) {
        showPage('home');
    }
});