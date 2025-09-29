/**
 * Debug script para botões da seção Featured Products
 */

console.log('🔍 Debug dos botões Featured Products...');

// Verificar se os botões existem
const addButtons = document.querySelectorAll('.swift-product-card__add-btn');
const viewAllButton = document.querySelector('.swift-featured-products__view-all-btn');

console.log(`📦 Encontrados ${addButtons.length} botões "Adicionar"`);
console.log(`👁️ Botão "Ver Todos": ${viewAllButton ? 'Encontrado' : 'Não encontrado'}`);

// Adicionar event listeners de debug
addButtons.forEach((button, index) => {
  console.log(`🔘 Botão ${index + 1}:`, button);
  
  // Verificar se já tem event listeners
  const hasListeners = button.onclick !== null || 
                      button.addEventListener !== undefined;
  
  console.log(`🎧 Event listeners: ${hasListeners ? 'Sim' : 'Não'}`);
  
  // Adicionar listener de debug
  button.addEventListener('click', (e) => {
    console.log(`🖱️ Clique no botão ${index + 1}`);
    console.log('Evento:', e);
    console.log('Target:', e.target);
    console.log('Current Target:', e.currentTarget);
    
    // Verificar se há algum problema
    e.preventDefault();
    console.log('✅ Evento prevenido com sucesso');
  }, { capture: true });
});

if (viewAllButton) {
  viewAllButton.addEventListener('click', (e) => {
    console.log('🖱️ Clique no botão "Ver Todos"');
    console.log('Evento:', e);
    e.preventDefault();
    console.log('✅ Evento prevenido com sucesso');
  }, { capture: true });
}

// Verificar se há algum CSS que pode estar causando problemas
const cards = document.querySelectorAll('.swift-product-card');
cards.forEach((card, index) => {
  const computedStyle = window.getComputedStyle(card);
  console.log(`🎨 Card ${index + 1} styles:`, {
    position: computedStyle.position,
    zIndex: computedStyle.zIndex,
    pointerEvents: computedStyle.pointerEvents,
    cursor: computedStyle.cursor
  });
});

// Verificar se há algum problema com o CSS dos botões
addButtons.forEach((button, index) => {
  const computedStyle = window.getComputedStyle(button);
  console.log(`🎨 Botão ${index + 1} styles:`, {
    position: computedStyle.position,
    zIndex: computedStyle.zIndex,
    pointerEvents: computedStyle.pointerEvents,
    cursor: computedStyle.cursor,
    display: computedStyle.display,
    visibility: computedStyle.visibility
  });
});

console.log('🔍 Debug dos botões concluído');
