/**
 * Swift Chatbot Component
 * Handles chatbot functionality, messages, and interactions
 */

class SwiftChatbot {
  constructor() {
    this.isOpen = false;
    this.isMinimized = false;
    this.messages = [];
    this.isTyping = false;
    
    // DOM Elements
    this.chatbot = document.getElementById('swift-chatbot');
    this.toggle = document.getElementById('swift-chatbot-toggle');
    this.window = document.getElementById('swift-chatbot-window');
    this.messagesContainer = document.getElementById('swift-chatbot-messages');
    this.input = document.getElementById('swift-chatbot-input');
    this.sendButton = document.getElementById('swift-chatbot-send');
    this.minimizeButton = document.getElementById('swift-chatbot-minimize');
    this.typingIndicator = document.getElementById('swift-chatbot-typing');
    this.notification = document.getElementById('swift-chatbot-notification');
    
    // Bot responses
    this.botResponses = {
      'track-order': {
        text: 'Para rastrear seu pedido, preciso do número do pedido. Você pode encontrá-lo no email de confirmação ou na sua conta.',
        quickActions: [
          { text: 'Verificar email', action: 'check-email' },
          { text: 'Acessar minha conta', action: 'access-account' }
        ]
      },
      'shipping-info': {
        text: 'Nossas entregas são feitas de segunda a sexta, das 8h às 18h. O frete é grátis para pedidos acima de R$ 299,00 em São Paulo.',
        quickActions: [
          { text: 'Calcular frete', action: 'calculate-shipping' },
          { text: 'Agendar entrega', action: 'schedule-delivery' }
        ]
      },
      'product-help': {
        text: 'Posso te ajudar com informações sobre nossos produtos! Temos uma variedade de carnes bovinas, aves e suínos. O que você gostaria de saber?',
        quickActions: [
          { text: 'Cortes bovinos', action: 'beef-cuts' },
          { text: 'Produtos de aves', action: 'poultry-products' },
          { text: 'Produtos suínos', action: 'pork-products' }
        ]
      },
      'contact-support': {
        text: 'Vou conectar você com um de nossos atendentes especializados. Aguarde um momento...',
        quickActions: []
      },
      'default': {
        text: 'Entendi! Como posso te ajudar melhor? Você pode usar os botões abaixo ou digitar sua pergunta.',
        quickActions: [
          { text: 'Rastrear pedido', action: 'track-order' },
          { text: 'Informações de entrega', action: 'shipping-info' },
          { text: 'Dúvidas sobre produtos', action: 'product-help' },
          { text: 'Falar com atendente', action: 'contact-support' }
        ]
      }
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadChatHistory();
    this.showWelcomeMessage();
  }
  
  bindEvents() {
    // Toggle chatbot
    this.toggle.addEventListener('click', () => {
      this.toggleChatbot();
    });
    
    // Minimize chatbot
    this.minimizeButton.addEventListener('click', () => {
      this.minimizeChatbot();
    });
    
    // Send message
    this.sendButton.addEventListener('click', () => {
      this.sendMessage();
    });
    
    // Send message on Enter
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Quick actions
    this.messagesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('swift-chatbot__quick-action')) {
        const action = e.target.dataset.action;
        this.handleQuickAction(action);
      }
    });
    
    // Auto-resize input
    this.input.addEventListener('input', () => {
      this.autoResizeInput();
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.chatbot.contains(e.target)) {
        this.closeChatbot();
      }
    });
  }
  
  toggleChatbot() {
    if (this.isOpen) {
      this.closeChatbot();
    } else {
      this.openChatbot();
    }
  }
  
  openChatbot() {
    this.isOpen = true;
    this.isMinimized = false;
    
    this.toggle.classList.add('active');
    this.window.classList.add('active');
    this.window.classList.remove('swift-chatbot__window--minimized');
    
    // Hide notification
    this.hideNotification();
    
    // Focus input
    setTimeout(() => {
      this.input.focus();
    }, 300);
    
    // Track event
    this.trackEvent('chatbot_opened');
  }
  
  closeChatbot() {
    this.isOpen = false;
    this.isMinimized = false;
    
    this.toggle.classList.remove('active');
    this.window.classList.remove('active');
    this.window.classList.remove('swift-chatbot__window--minimized');
    
    // Track event
    this.trackEvent('chatbot_closed');
  }
  
  minimizeChatbot() {
    this.isMinimized = true;
    this.window.classList.add('swift-chatbot__window--minimized');
    
    // Track event
    this.trackEvent('chatbot_minimized');
  }
  
  sendMessage() {
    const message = this.input.value.trim();
    
    if (!message) return;
    
    // Add user message
    this.addMessage(message, 'user');
    
    // Clear input
    this.input.value = '';
    this.autoResizeInput();
    
    // Disable send button
    this.sendButton.disabled = true;
    
    // Show typing indicator
    this.showTypingIndicator();
    
    // Simulate bot response
    setTimeout(() => {
      this.hideTypingIndicator();
      this.handleBotResponse(message);
      this.sendButton.disabled = false;
    }, 1500);
    
    // Track event
    this.trackEvent('message_sent', { message_length: message.length });
  }
  
  addMessage(text, sender, quickActions = []) {
    const messageElement = document.createElement('div');
    messageElement.className = `swift-chatbot__message swift-chatbot__message--${sender} swift-chatbot__message--new`;
    
    const time = new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    let avatarHtml = '';
    if (sender === 'bot') {
      avatarHtml = `
        <div class="swift-chatbot__message-avatar">
          <img src="./assets/chatbot-avatar.png" alt="Assistente Swift" class="swift-chatbot__message-avatar-img">
        </div>
      `;
    }
    
    messageElement.innerHTML = `
      ${avatarHtml}
      <div class="swift-chatbot__message-content">
        <div class="swift-chatbot__message-bubble">
          <p class="swift-chatbot__message-text">${text}</p>
        </div>
        <div class="swift-chatbot__message-time">${time}</div>
      </div>
    `;
    
    this.messagesContainer.appendChild(messageElement);
    
    // Add quick actions if provided
    if (quickActions.length > 0) {
      const quickActionsElement = document.createElement('div');
      quickActionsElement.className = 'swift-chatbot__quick-actions';
      
      quickActions.forEach(action => {
        const button = document.createElement('button');
        button.className = 'swift-chatbot__quick-action';
        button.textContent = action.text;
        button.dataset.action = action.action;
        quickActionsElement.appendChild(button);
      });
      
      this.messagesContainer.appendChild(quickActionsElement);
    }
    
    // Scroll to bottom
    this.scrollToBottom();
    
    // Store message
    this.messages.push({
      text,
      sender,
      timestamp: new Date(),
      quickActions
    });
    
    // Save to localStorage
    this.saveChatHistory();
  }
  
  handleBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let responseKey = 'default';
    
    // Simple keyword matching
    if (lowerMessage.includes('pedido') || lowerMessage.includes('rastrear')) {
      responseKey = 'track-order';
    } else if (lowerMessage.includes('entrega') || lowerMessage.includes('frete')) {
      responseKey = 'shipping-info';
    } else if (lowerMessage.includes('produto') || lowerMessage.includes('carne')) {
      responseKey = 'product-help';
    } else if (lowerMessage.includes('atendente') || lowerMessage.includes('humano')) {
      responseKey = 'contact-support';
    }
    
    const response = this.botResponses[responseKey];
    this.addMessage(response.text, 'bot', response.quickActions);
  }
  
  handleQuickAction(action) {
    const response = this.botResponses[action];
    if (response) {
      this.addMessage(response.text, 'bot', response.quickActions);
    }
    
    // Track event
    this.trackEvent('quick_action_clicked', { action });
  }
  
  showTypingIndicator() {
    this.isTyping = true;
    this.typingIndicator.style.display = 'flex';
    this.scrollToBottom();
  }
  
  hideTypingIndicator() {
    this.isTyping = false;
    this.typingIndicator.style.display = 'none';
  }
  
  showNotification() {
    this.notification.style.display = 'flex';
  }
  
  hideNotification() {
    this.notification.style.display = 'none';
  }
  
  scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }, 100);
  }
  
  autoResizeInput() {
    this.input.style.height = 'auto';
    this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
  }
  
  showWelcomeMessage() {
    // Show notification after 3 seconds if chatbot is closed
    setTimeout(() => {
      if (!this.isOpen) {
        this.showNotification();
      }
    }, 3000);
  }
  
  loadChatHistory() {
    try {
      const saved = localStorage.getItem('swift-chatbot-history');
      if (saved) {
        this.messages = JSON.parse(saved);
        // Don't restore messages on page load to keep it clean
      }
    } catch (error) {
      console.warn('Could not load chat history:', error);
    }
  }
  
  saveChatHistory() {
    try {
      // Keep only last 50 messages
      const recentMessages = this.messages.slice(-50);
      localStorage.setItem('swift-chatbot-history', JSON.stringify(recentMessages));
    } catch (error) {
      console.warn('Could not save chat history:', error);
    }
  }
  
  trackEvent(eventName, data = {}) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'chatbot',
        ...data
      });
    }
    
    // Console log for development
    console.log('Chatbot Event:', eventName, data);
  }
  
  // Public methods for external use
  open() {
    this.openChatbot();
  }
  
  close() {
    this.closeChatbot();
  }
  
  sendMessage(text) {
    this.input.value = text;
    this.sendMessage();
  }
  
  addBotMessage(text, quickActions = []) {
    this.addMessage(text, 'bot', quickActions);
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create chatbot element if it doesn't exist
  if (!document.getElementById('swift-chatbot')) {
    const chatbotHtml = `
      <!-- Chatbot Component -->
      <div class="swift-chatbot" id="swift-chatbot">
        <!-- Chatbot Toggle Button -->
        <button class="swift-chatbot__toggle" id="swift-chatbot-toggle" aria-label="Abrir chat de atendimento">
          <div class="swift-chatbot__toggle-icon">
            <svg class="swift-chatbot__chat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 9H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M8 13H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg class="swift-chatbot__close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" style="display: none;">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="swift-chatbot__notification" id="swift-chatbot-notification" style="display: none;">
            <span class="swift-chatbot__notification-dot"></span>
          </div>
        </button>

        <!-- Chatbot Window -->
        <div class="swift-chatbot__window" id="swift-chatbot-window">
          <!-- Chatbot Header -->
          <div class="swift-chatbot__header">
            <div class="swift-chatbot__header-info">
              <div class="swift-chatbot__avatar">
                <img src="./assets/chatbot-avatar.png" alt="Assistente Swift" class="swift-chatbot__avatar-img">
              </div>
              <div class="swift-chatbot__header-text">
                <h3 class="swift-chatbot__title">Assistente Swift</h3>
                <span class="swift-chatbot__status">Online</span>
              </div>
            </div>
            <button class="swift-chatbot__minimize" id="swift-chatbot-minimize" aria-label="Minimizar chat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 8H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- Chatbot Messages -->
          <div class="swift-chatbot__messages" id="swift-chatbot-messages">
            <!-- Welcome Message -->
            <div class="swift-chatbot__message swift-chatbot__message--bot">
              <div class="swift-chatbot__message-avatar">
                <img src="./assets/chatbot-avatar.png" alt="Assistente Swift" class="swift-chatbot__message-avatar-img">
              </div>
              <div class="swift-chatbot__message-content">
                <div class="swift-chatbot__message-bubble">
                  <p class="swift-chatbot__message-text">
                    Olá! Sou o assistente virtual da Swift. Como posso te ajudar hoje?
                  </p>
                </div>
                <div class="swift-chatbot__message-time">Agora</div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="swift-chatbot__quick-actions">
              <button class="swift-chatbot__quick-action" data-action="track-order">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                Rastrear pedido
              </button>
              <button class="swift-chatbot__quick-action" data-action="shipping-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16,8 20,8 23,11 23,16 16,16"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                Informações de entrega
              </button>
              <button class="swift-chatbot__quick-action" data-action="product-help">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Dúvidas sobre produtos
              </button>
              <button class="swift-chatbot__quick-action" data-action="contact-support">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                  <path d="M16 11l2 2-2 2"/>
                  <path d="M12 11l-2 2 2 2"/>
                </svg>
                Falar com atendente
              </button>
            </div>
          </div>

          <!-- Chatbot Input -->
          <div class="swift-chatbot__input-container">
            <div class="swift-chatbot__input-wrapper">
              <input 
                type="text" 
                class="swift-chatbot__input" 
                id="swift-chatbot-input"
                placeholder="Digite sua mensagem..."
                maxlength="500"
              >
              <button class="swift-chatbot__send" id="swift-chatbot-send" aria-label="Enviar mensagem">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 2L9 11L2 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18 2L12 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18 2L9 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div class="swift-chatbot__typing-indicator" id="swift-chatbot-typing" style="display: none;">
              <div class="swift-chatbot__typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span class="swift-chatbot__typing-text">Assistente está digitando...</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHtml);
  }
  
  // Initialize chatbot
  window.swiftChatbot = new SwiftChatbot();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwiftChatbot;
}
