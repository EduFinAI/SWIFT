document.addEventListener('DOMContentLoaded', () => {

    const closeButton = document.getElementById('closeBtn');

    closeButton.addEventListener('click', () => {
        alert('O botão de fechar foi clicado!');
    });

    const form = document.getElementById('cadastroForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Formulário enviado com sucesso! (sem recarregar a página)');
    });

    const dateInput = document.getElementById('nascimento');
    if (dateInput) {
        dateInput.setAttribute('data-placeholder', 'dd/mm/aaaa');

        const checkDateValue = () => {
            dateInput.classList.toggle('has-value', dateInput.value !== '');
        };

        dateInput.addEventListener('input', () => {
            checkDateValue();
        });
        checkDateValue();
    }
});