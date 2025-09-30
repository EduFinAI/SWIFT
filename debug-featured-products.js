/**
 * Debug script para identificar problemas na seção Featured Products
 */

console.log('🔍 Iniciando debug da seção Featured Products...');

// Verificar se a seção existe
const featuredSection = document.querySelector('.swift-featured-products');
if (!featuredSection) {
  console.error('❌ Seção .swift-featured-products não encontrada!');
} else {
  console.log('✅ Seção .swift-featured-products encontrada');
}

// Verificar se os cards existem
const productCards = document.querySelectorAll('.swift-product-card');
console.log(`📦 Encontrados ${productCards.length} cards de produto`);

// Verificar se as imagens estão carregando
const images = document.querySelectorAll('.swift-product-card__img');
console.log(`🖼️ Encontradas ${images.length} imagens`);

images.forEach((img, index) => {
  img.addEventListener('load', () => {
    console.log(`✅ Imagem ${index + 1} carregada: ${img.src}`);
  });
  
  img.addEventListener('error', () => {
    console.error(`❌ Erro ao carregar imagem ${index + 1}: ${img.src}`);
  });
});

// Verificar se há problemas com CSS
const computedStyle = window.getComputedStyle(featuredSection);
console.log('🎨 Estilos computados da seção:', {
  display: computedStyle.display,
  position: computedStyle.position,
  width: computedStyle.width,
  height: computedStyle.height,
  overflow: computedStyle.overflow
});

// Verificar se há problemas com grid
const grid = document.querySelector('.swift-featured-products__grid');
if (grid) {
  const gridStyle = window.getComputedStyle(grid);
  console.log('📐 Estilos do grid:', {
    display: gridStyle.display,
    gridTemplateColumns: gridStyle.gridTemplateColumns,
    gap: gridStyle.gap
  });
}

// Verificar performance
let renderStart = performance.now();
requestAnimationFrame(() => {
  let renderEnd = performance.now();
  console.log(`⚡ Tempo de renderização: ${renderEnd - renderStart}ms`);
});

// Verificar se há loops infinitos
let renderCount = 0;
const observer = new MutationObserver(() => {
  renderCount++;
  if (renderCount > 100) {
    console.warn('⚠️ Possível loop infinito detectado! Renderizações:', renderCount);
  }
});

if (featuredSection) {
  observer.observe(featuredSection, {
    childList: true,
    subtree: true,
    attributes: true
  });
}

console.log('🔍 Debug da seção Featured Products concluído');
