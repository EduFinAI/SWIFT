document.addEventListener('DOMContentLoaded', () => {

    const closeButton = document.getElementById('closeBtn');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            alert('O botão de fechar foi clicado!');
        });
    }

    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('senha');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Formulário de LOGIN enviado!');
        });
    }

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }
});