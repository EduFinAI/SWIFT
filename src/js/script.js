// Espera todo o HTML ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todas as seções que são "páginas"
    const pages = document.querySelectorAll('.page');
    // Seleciona todos os links que têm o atributo 'data-page'
    const navLinks = document.querySelectorAll('.nav-link');

    // Função para mostrar uma página e esconder as outras
    const showPage = (pageId) => {
        // Esconde todas as páginas
        pages.forEach(page => {
            page.classList.add('hidden');
        });

        // Mostra a página desejada
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
        }
    };

    // Adiciona um "escutador" de clique para cada link de navegação
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
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Produto adicionado ao carrinho! (Simulação)');
            // Aqui você poderia adicionar uma lógica para contar os itens do carrinho
        });
    });


    // Define a página inicial a ser exibida quando o site carrega
    showPage('home');
});