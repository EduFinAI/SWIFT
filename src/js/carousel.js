(() => {
  const wireCarousel = (root, trackSel, leftSel, rightSel) => {
    if (!root) return;
    const track = root.querySelector(trackSel);
    if (!track) return;
    const left = root.querySelector(leftSel);
    const right = root.querySelector(rightSel);

    const updateArrows = () => {
      const atStart = track.scrollLeft <= 2;
      const atEnd = Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 2;
      if (left) left.classList.toggle('pginainicial-arrow--disabled', atStart);
      if (right) right.classList.toggle('pginainicial-arrow--disabled', atEnd);
    };

    const positionArrows = () => {
      if (!left && !right) return;
      const rect = track.getBoundingClientRect();
      const containerRect = root.getBoundingClientRect();
      const arrowH = (left || right)?.offsetHeight || 42;
      let topPx = rect.top - containerRect.top + (rect.height - arrowH) / 2;
      // Ajuste fino via CSS var --pmv-arrow-top-offset (px)
      try {
        const styles = getComputedStyle(root);
        const offsetVar = styles.getPropertyValue('--pmv-arrow-top-offset').trim();
        const extra = parseFloat(offsetVar || '0');
        if (!Number.isNaN(extra)) topPx += extra;
      } catch (_) {}
      if (left) left.style.top = `${topPx}px`;
      if (right) right.style.top = `${topPx}px`;
    };

    const scrollByPage = (dir = 1) => {
      const amount = track.clientWidth * 0.95 * dir;
      track.scrollBy({ left: amount, behavior: 'smooth' });
    };

    if (left) left.addEventListener('click', () => scrollByPage(-1));
    if (right) right.addEventListener('click', () => scrollByPage(1));
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', () => { updateArrows(); positionArrows(); });
    // Em alguns casos fontes/imagens alteram o layout após load
    window.addEventListener('load', positionArrows);
    updateArrows();
    positionArrows();
  };

  // Carrossel de depoimentos (já existente)
  const reviewsRoot = document.querySelector('.pginainicial-card-grid') || document;
  if (document.querySelector('.pginainicial-card-grid')) {
    wireCarousel(
      document.querySelector('.pginainicial-card-grid'),
      '.pginainicial-frame6',
      '.pginainicial-arrowleftcircle1',
      '.pginainicial-arrowrightcircle1'
    );
  }

  // Carrossel "Produtos mais vendidos"
  const produtosRoot = document.querySelector('.pginainicial-produtosmaisvendidos');
  if (produtosRoot) {
    wireCarousel(
      produtosRoot,
      '.pginainicial-frame22',
      '.pginainicial-arrowleftcircle2',
      '.pginainicial-arrowrightcircle2'
    );
  }
})();
