/**
 * Tips Info Component JavaScript
 * Handles YouTube video functionality
 */

class TipsInfoVideo {
  constructor() {
    this.videoContainer = null;
    this.videoThumbnail = null;
    this.videoIframe = null;
    this.isVideoLoaded = false;
    this.videoId = 'nK1RZQeY-vE'; // ID do vídeo do YouTube - Vídeo de preparo de carne
    
    this.init();
  }

  init() {
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupVideo());
    } else {
      this.setupVideo();
    }
  }

  setupVideo() {
    this.videoContainer = document.getElementById('video-container');
    this.videoThumbnail = document.getElementById('video-thumbnail');
    this.videoIframe = document.getElementById('video-iframe');

    if (this.videoContainer && this.videoThumbnail && this.videoIframe) {
      this.bindEvents();
    }
  }

  bindEvents() {
    // Clique na thumbnail para carregar o vídeo
    this.videoContainer.addEventListener('click', (e) => {
      e.preventDefault();
      this.loadVideo();
    });

    // Tecla Enter para acessibilidade
    this.videoContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.loadVideo();
      }
    });

    // Adiciona atributos de acessibilidade
    this.videoContainer.setAttribute('tabindex', '0');
    this.videoContainer.setAttribute('role', 'button');
    this.videoContainer.setAttribute('aria-label', 'Reproduzir vídeo de preparo de carne');
  }

  loadVideo() {
    if (this.isVideoLoaded) return;

    // URL do vídeo do YouTube com autoplay
    const videoUrl = `https://www.youtube.com/embed/${this.videoId}?autoplay=1&rel=0&modestbranding=1`;
    
    // Define o src do iframe
    this.videoIframe.src = videoUrl;
    
    // Adiciona classe para mostrar o vídeo
    this.videoContainer.classList.add('playing');
    
    // Marca como carregado
    this.isVideoLoaded = true;

    // Atualiza atributos de acessibilidade
    this.videoContainer.setAttribute('aria-label', 'Vídeo reproduzindo');
    
    // Log para debug (pode ser removido em produção)
    console.log('Vídeo do YouTube carregado:', this.videoId);
  }

  // Método para trocar o vídeo (útil para futuras implementações)
  changeVideo(newVideoId) {
    this.videoId = newVideoId;
    this.isVideoLoaded = false;
    
    // Atualiza a thumbnail
    const thumbnailImg = this.videoThumbnail.querySelector('.swift-tips-card__thumbnail-img');
    if (thumbnailImg) {
      thumbnailImg.src = `https://img.youtube.com/vi/${newVideoId}/maxresdefault.jpg`;
    }
    
    // Remove a classe playing e limpa o iframe
    this.videoContainer.classList.remove('playing');
    this.videoIframe.src = '';
  }

  // Método para pausar o vídeo (útil para futuras implementações)
  pauseVideo() {
    if (this.isVideoLoaded && this.videoIframe.src) {
      // Note: Não é possível pausar um iframe do YouTube via JavaScript por questões de segurança
      // O usuário precisará pausar manualmente
      console.log('Para pausar o vídeo, clique no player do YouTube');
    }
  }
}

// Inicializa o componente quando o DOM estiver pronto
let tipsInfoVideo;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    tipsInfoVideo = new TipsInfoVideo();
  });
} else {
  tipsInfoVideo = new TipsInfoVideo();
}

// Exporta para uso global se necessário
window.TipsInfoVideo = TipsInfoVideo;
