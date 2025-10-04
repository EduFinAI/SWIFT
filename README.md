# 🥩 Swift - E-commerce de Carnes Premium

[![Version](https://img.shields.io/badge/version-2.0.0-orange.svg)](https://github.com/swift/carnes)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-production-green.svg)](https://swift.com.br)
[![Node.js](https://img.shields.io/badge/node.js-16%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-4.18%2B-blue.svg)](https://expressjs.com/)
[![CSS3](https://img.shields.io/badge/CSS3-modern-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [🏗️ Arquitetura do Projeto](#️-arquitetura-do-projeto)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🎨 Sistema de Design](#-sistema-de-design)
- [🛠️ Instalação e Configuração](#️-instalação-e-configuração)
- [🎯 Funcionalidades Principais](#-funcionalidades-principais)
- [🔧 Componentes Principais](#-componentes-principais)
- [📱 Responsividade](#-responsividade)
- [♿ Acessibilidade](#-acessibilidade)
- [🚀 Performance](#-performance)
- [🧪 Testes e Qualidade](#-testes-e-qualidade)
- [📊 Métricas do Projeto](#-métricas-do-projeto)
- [🔮 Roadmap Futuro](#-roadmap-futuro)
- [🛠️ Desenvolvimento](#️-desenvolvimento)
- [🐛 Debugging](#-debugging)
- [📞 Suporte](#-suporte)
- [📄 Licença](#-licença)

## 🎯 Sobre o Projeto

Swift é uma plataforma de e-commerce especializada em carnes premium, desenvolvida com arquitetura moderna e foco na experiência do usuário. O projeto representa uma solução completa para comércio eletrônico, combinando design responsivo, performance otimizada e acessibilidade total.

### 🎪 Visão Geral

Este projeto foi completamente refatorado em 2024, migrando de uma arquitetura monolítica para uma estrutura modular baseada em componentes. A nova arquitetura permite maior escalabilidade, manutenibilidade e performance, seguindo as melhores práticas da indústria.

### ✨ Características Principais

#### 🛒 **Sistema de Carrinho Inteligente**
- **Estados Dinâmicos**: Adaptação automática entre usuário convidado e logado
- **Controles de Quantidade**: Interface intuitiva com botões +/- e animações suaves
- **Persistência de Dados**: Manutenção do carrinho entre sessões
- **Validação em Tempo Real**: Verificação de estoque e preços
- **Cálculo Automático**: Totalização dinâmica com impostos e frete

#### 🎠 **Carrossel Hero Interativo**
- **3 Slides Temáticos**: Cada slide com propósito específico e design único
- **Autoplay Inteligente**: Pausa automática no hover e retomada ao sair
- **Navegação Múltipla**: Setas, indicadores e suporte a touch/swipe
- **Transições Suaves**: Animações CSS3 com cubic-bezier otimizadas
- **Responsividade Total**: Adaptação perfeita para todos os dispositivos

#### 📱 **Design Responsivo Avançado**
- **Mobile-First**: Desenvolvido primeiro para dispositivos móveis
- **Breakpoints Inteligentes**: 4 níveis de responsividade otimizados
- **Touch-Friendly**: Áreas de toque adequadas para dispositivos móveis
- **Performance Adaptativa**: Carregamento otimizado por dispositivo

#### 🎨 **Sistema de Design Consistente**
- **Design Tokens**: Variáveis CSS centralizadas para cores, tipografia e espaçamentos
- **Componentes Modulares**: Biblioteca de componentes reutilizáveis
- **Padrões Visuais**: Consistência em toda a interface
- **Tema Flexível**: Fácil customização e manutenção

#### ♿ **Acessibilidade Completa**
- **WCAG 2.1 AA**: Conformidade com padrões internacionais
- **Navegação por Teclado**: Suporte completo a navegação sem mouse
- **Screen Readers**: Compatibilidade com tecnologias assistivas
- **Contraste Adequado**: Cores com relação de contraste apropriada

#### 🚀 **Performance Otimizada**
- **Lazy Loading**: Carregamento sob demanda de recursos
- **CSS Otimizado**: Remoção de código duplicado e minificação
- **JavaScript Modular**: Carregamento apenas do necessário
- **Compressão Gzip**: Redução significativa do tamanho dos arquivos

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura Detalhada

```
swift-website/
├── 📁 components/                 # Componentes modulares (HTML/CSS/JS)
│   ├── 🎠 hero/                   # Carrossel principal com 3 slides
│   │   ├── hero.html              # Estrutura HTML do carrossel
│   │   ├── hero.css               # Estilos responsivos e animações
│   │   └── hero-carousel.js       # Lógica JavaScript (autoplay, navegação)
│   ├── 🛒 cart-dropdown/          # Sistema de carrinho de compras
│   │   ├── cart-dropdown.html     # Estrutura HTML do carrinho
│   │   ├── cart-dropdown.css      # Estilos do dropdown e estados
│   │   └── cart-dropdown.js       # Lógica de carrinho e persistência
│   ├── 🎯 region-modal/           # Modal de seleção de região/CEP
│   │   ├── region-modal.css       # Estilos do modal e formulários
│   │   └── region-modal.js        # Geolocalização e validação de CEP
│   ├── 📦 best-sellers/           # Seção de produtos mais vendidos
│   │   ├── best-sellers.html      # Estrutura HTML dos produtos
│   │   ├── best-sellers.css       # Estilos dos cards de produtos
│   │   └── best-sellers.js        # Lógica do carrossel de produtos
│   ├── ⭐ featured-products/       # Produtos em destaque
│   │   ├── featured-products.html # Estrutura HTML dos produtos
│   │   ├── featured-products.css  # Estilos dos cards de produtos
│   │   └── featured-products.js   # Lógica de interação
│   ├── 📱 app-download/           # Seção de download do aplicativo
│   │   ├── app-download.html      # Estrutura HTML da seção
│   │   ├── app-download.css       # Estilos responsivos
│   │   └── app-download.js        # Lógica de download
│   ├── 🤖 chatbot/                # Assistente virtual integrado
│   │   ├── chatbot.html           # Estrutura HTML do chat
│   │   ├── chatbot.css            # Estilos do chat e mensagens
│   │   └── chatbot.js             # Lógica de conversação
│   ├── 🚚 shipping-banner/        # Banner de informações de frete
│   │   ├── shipping-banner.html   # Estrutura HTML do banner
│   │   ├── shipping-banner.css    # Estilos do banner
│   │   └── shipping-banner.js     # Lógica de atualização
│   ├── 📋 header/                 # Cabeçalho responsivo
│   │   ├── header.html            # Estrutura HTML do cabeçalho
│   │   ├── header.css             # Estilos responsivos
│   │   └── header.js              # Lógica de navegação
│   ├── 📄 footer/                 # Rodapé com links e informações
│   │   ├── footer.html            # Estrutura HTML do rodapé
│   │   ├── footer.css             # Estilos do rodapé
│   │   └── footer.js              # Lógica de interação
│   ├── 🎪 occasions/              # Seção de ocasiões especiais
│   ├── 💡 tips-info/              # Dicas e informações úteis
│   ├── 💬 testimonials/           # Depoimentos de clientes
│   ├── 🔄 carousel/               # Sistema de carrossel reutilizável
│   │   └── carousel.js            # Classe base para carrosséis
│   ├── 👤 user-dropdown/          # Dropdown do usuário
│   ├── 🔍 modals/                 # Sistema de modais
│   │   └── login-modal/           # Modal de login
│   └── 🔧 shared/                 # Componentes compartilhados
│       └── base-dropdown.js       # Classe base para dropdowns
├── 📁 style/                      # Sistema de design centralizado
│   ├── 🎨 variables.css           # Design tokens (cores, tipografia, espaçamentos)
│   ├── 🔧 base.css                # Reset CSS e estilos base
│   ├── ⚡ utilities.css           # Classes utilitárias (similar ao Tailwind)
│   ├── 🔄 mixins.css              # Padrões CSS reutilizáveis
│   ├── 📱 responsive.css          # Breakpoints e media queries
│   └── 📁 components/             # Estilos específicos de componentes
│       └── shared.css             # Estilos compartilhados
├── 📁 js/                         # JavaScript modular e organizado
│   ├── 🎮 swift-app.js            # Controlador principal da aplicação
│   ├── 🛒 product-cart.js         # Sistema completo de carrinho
│   ├── ⚙️ swift-config.js         # Configurações centralizadas
│   ├── 🔧 component-loader.js     # Carregador automático de componentes
│   └── 🔐 swift-auth.js           # Sistema de autenticação
├── 📁 assets/                     # Recursos estáticos organizados
│   ├── 🖼️ images/                 # Imagens otimizadas por categoria
│   │   ├── products/              # Imagens de produtos
│   │   ├── banners/               # Imagens de banners
│   │   ├── icons/                 # Ícones e símbolos
│   │   └── backgrounds/           # Imagens de fundo
│   ├── 🎨 icons/                  # Ícones SVG vetoriais
│   ├── 📱 logos/                  # Logotipos em diferentes formatos
│   └── 📄 fonts/                  # Fontes customizadas
├── 📄 index.html                  # Página principal com todos os componentes
├── 🖥️ server.js                   # Servidor Express com middleware
├── 📦 package.json                # Dependências e scripts do projeto
├── 📋 package-lock.json           # Lock file das dependências
├── 🚀 start-server.bat            # Script de inicialização (Windows)
├── 🐧 start-server.sh             # Script de inicialização (Linux/Mac)
├── 📚 README.md                   # Documentação principal
├── 📖 README-FINAL.md             # Documentação técnica detalhada
├── 🖥️ README-SERVER.md            # Documentação do servidor
└── 🌿 README_Como_usar_o_GitFlow_nesse_projeto.md # Guia de GitFlow
```

### 🎯 Princípios Arquiteturais

#### 1. **Modularidade**
- Cada componente é independente e reutilizável
- Separação clara entre HTML, CSS e JavaScript
- Baixo acoplamento entre componentes

#### 2. **Escalabilidade**
- Estrutura preparada para crescimento
- Fácil adição de novos componentes
- Sistema de design tokens para consistência

#### 3. **Manutenibilidade**
- Código organizado e bem documentado
- Padrões consistentes de nomenclatura
- Configuração centralizada

#### 4. **Performance**
- Carregamento otimizado de recursos
- Lazy loading implementado
- CSS e JavaScript minificados

## 🚀 Tecnologias Utilizadas

### 🎨 Frontend

#### **HTML5**
- **Semântica Moderna**: Uso de elementos semânticos (`<header>`, `<main>`, `<section>`, `<article>`)
- **Acessibilidade**: Atributos ARIA, roles e labels apropriados
- **SEO Otimizado**: Meta tags, structured data e hierarquia correta
- **Validação**: HTML5 validation API para formulários

#### **CSS3**
- **Variáveis Customizadas**: Sistema de design tokens centralizado
- **Grid Layout**: Layout bidimensional para estruturas complexas
- **Flexbox**: Layout unidimensional para componentes flexíveis
- **Animações**: Transitions e keyframes para interações suaves
- **Media Queries**: Responsividade adaptativa
- **Pseudo-elementos**: ::before e ::after para elementos decorativos

#### **JavaScript ES6+**
- **Classes**: Programação orientada a objetos
- **Módulos**: Import/export para organização de código
- **Async/Await**: Programação assíncrona moderna
- **Arrow Functions**: Sintaxe concisa para funções
- **Destructuring**: Extração de dados de arrays e objetos
- **Template Literals**: Interpolação de strings
- **Spread/Rest**: Manipulação de arrays e objetos

### 🖥️ Backend

#### **Express.js**
- **Servidor HTTP**: Framework web minimalista e flexível
- **Middleware**: Processamento de requisições em camadas
- **Roteamento**: Sistema de rotas organizado
- **Static Files**: Servir arquivos estáticos otimizados

#### **Node.js**
- **Runtime JavaScript**: Execução de JavaScript no servidor
- **Event Loop**: Processamento assíncrono não-bloqueante
- **NPM**: Gerenciador de pacotes e dependências
- **File System**: Manipulação de arquivos do sistema

### 🔧 Ferramentas de Desenvolvimento

#### **Nodemon**
- **Hot Reload**: Reinicialização automática do servidor
- **Watch Mode**: Monitoramento de mudanças em arquivos
- **Development**: Otimizado para ambiente de desenvolvimento

#### **Compression Middleware**
- **Gzip**: Compressão de respostas HTTP
- **Performance**: Redução do tamanho de arquivos
- **Bandwidth**: Economia de largura de banda

#### **CORS (Cross-Origin Resource Sharing)**
- **Segurança**: Controle de acesso entre domínios
- **Flexibilidade**: Configuração de políticas de CORS
- **APIs**: Suporte a chamadas cross-origin

### 📦 Dependências do Projeto

#### **Produção**
```json
{
  "express": "^4.18.2",      // Framework web
  "compression": "^1.7.4",   // Middleware de compressão
  "cors": "^2.8.5"           // Middleware CORS
}
```

#### **Desenvolvimento**
```json
{
  "nodemon": "^3.0.2"        // Hot reload para desenvolvimento
}
```

### 🎯 Padrões e Convenções

#### **Nomenclatura**
- **BEM (Block Element Modifier)**: Metodologia CSS
- **camelCase**: JavaScript (variáveis e funções)
- **kebab-case**: Arquivos e pastas
- **PascalCase**: Classes JavaScript

#### **Estrutura de Arquivos**
- **Componentes**: Um componente por pasta
- **Separação**: HTML, CSS e JS em arquivos separados
- **Organização**: Agrupamento lógico por funcionalidade

#### **Versionamento**
- **Semantic Versioning**: Controle de versões semântico
- **Git Flow**: Fluxo de trabalho com branches
- **Commits**: Mensagens descritivas e padronizadas

## 🎨 Sistema de Design

### Paleta de Cores
```css
/* Cores Primárias */
--swift-primary-orange: #E65103;      /* Laranja principal */
--swift-primary-orange-dark: #BF4408; /* Laranja escuro */
--swift-secondary-red: #BC2929;       /* Vermelho secundário */

/* Cores Neutras */
--swift-neutral-dark: #191818;        /* Preto */
--swift-neutral-white: #ffffff;       /* Branco */
--swift-neutral-gray: #f8f9fa;        /* Cinza claro */
```

### Tipografia
```css
/* Fontes */
--swift-font-display: 'Passion One';    /* Títulos principais */
--swift-font-primary: 'Montserrat';     /* Textos principais */
--swift-font-body: 'Inter';             /* Textos corridos */
```

### Espaçamentos
```css
--swift-space-1: 4px;    /* Espaço mínimo */
--swift-space-2: 8px;    /* Espaço pequeno */
--swift-space-4: 16px;   /* Espaço padrão */
--swift-space-6: 24px;   /* Espaço médio */
--swift-space-8: 32px;   /* Espaço grande */
--swift-space-12: 48px;  /* Espaço extra grande */
```

## 🛠️ Instalação e Configuração

### 📋 Pré-requisitos

#### **Sistema Operacional**
- **Windows**: 10 ou superior
- **macOS**: 10.14 ou superior
- **Linux**: Ubuntu 18.04+ ou distribuição equivalente

#### **Software Necessário**
- **Node.js**: Versão 16.0.0 ou superior
- **NPM**: Versão 8.0.0 ou superior (incluído com Node.js)
- **Git**: Para clonagem do repositório

#### **Navegadores Suportados**
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### 🚀 Instalação Passo a Passo

#### **1. Clone o Repositório**
```bash
# Clone via HTTPS
git clone https://github.com/swift/carnes.git

# Ou clone via SSH (se configurado)
git clone git@github.com:swift/carnes.git

# Navegue para o diretório
cd swift-website
```

#### **2. Instale as Dependências**
```bash
# Instalação padrão
npm install

# Ou usando yarn (se preferir)
yarn install

# Verifique se a instalação foi bem-sucedida
npm list --depth=0
```

#### **3. Configuração Inicial**
```bash
# Verifique a versão do Node.js
node --version

# Verifique a versão do NPM
npm --version

# Verifique se o projeto foi clonado corretamente
ls -la
```

#### **4. Inicie o Servidor**
```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm start

# Ou usando o script de inicialização
./start-server.sh    # Linux/Mac
start-server.bat     # Windows
```

### ⚙️ Scripts Disponíveis

#### **Scripts NPM**
```bash
# Desenvolvimento
npm run dev          # Inicia servidor com Nodemon (hot reload)
npm start            # Inicia servidor de produção
npm run serve        # Alias para npm start

# Utilitários
npm run lint         # Verifica qualidade do código
npm run build        # Build para produção
npm run test         # Executa testes
npm run clean        # Limpa arquivos temporários
```

#### **Scripts de Sistema**
```bash
# Windows
start-server.bat     # Inicia servidor (Windows)

# Linux/Mac
./start-server.sh    # Inicia servidor (Unix)
chmod +x start-server.sh  # Torna executável
```

### 🔧 Configuração Avançada

#### **Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
# Configurações do servidor
PORT=3000
NODE_ENV=development

# Configurações de banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swift_db

# Configurações de API
API_KEY=your_api_key_here
API_URL=https://api.swift.com.br

# Configurações de email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password
```

#### **Configuração do Servidor**
Edite `server.js` para personalizar:
```javascript
// Porta do servidor
const PORT = process.env.PORT || 3000;

// Middleware personalizado
app.use(compression());
app.use(cors());

// Rotas personalizadas
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});
```

### 🐛 Solução de Problemas

#### **Problemas Comuns**

##### **Erro: "Port already in use"**
```bash
# Encontre o processo usando a porta
netstat -ano | findstr :3000

# Encerre o processo (Windows)
taskkill /PID <PID> /F

# Encerre o processo (Linux/Mac)
kill -9 <PID>
```

##### **Erro: "Module not found"**
```bash
# Limpe o cache do NPM
npm cache clean --force

# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

##### **Erro: "Permission denied"**
```bash
# Linux/Mac: Torne o script executável
chmod +x start-server.sh

# Ou execute com sudo (não recomendado)
sudo npm start
```

#### **Verificação de Instalação**
```bash
# Verifique se o servidor está rodando
curl http://localhost:3000

# Ou acesse no navegador
open http://localhost:3000
```

### 📱 Configuração para Diferentes Dispositivos

#### **Desenvolvimento Mobile**
```bash
# Acesse via IP local para testar em dispositivos móveis
npm start -- --host 0.0.0.0

# Acesse via: http://SEU_IP:3000
```

#### **Configuração de Proxy**
```bash
# Para desenvolvimento com proxy
npm start -- --proxy http://localhost:8080
```

### 🔒 Configuração de Segurança

#### **HTTPS Local (Desenvolvimento)**
```bash
# Instale mkcert para certificados locais
npm install -g mkcert

# Crie certificado local
mkcert localhost 127.0.0.1 ::1

# Configure o servidor para HTTPS
```

#### **CORS e Headers de Segurança**
```javascript
// Configuração de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://swift.com.br'],
  credentials: true
}));

// Headers de segurança
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

## 🎯 Funcionalidades Principais

### 1. 🎠 Carrossel Hero Interativo

#### **Estrutura dos Slides**
- **Slide 1 - Hero Principal**:
  - Busca de CEP para cálculo de frete
  - Informações de entrega em tempo real
  - Call-to-action principal "COMPRAR AGORA"
  - Background dinâmico com produtos premium

- **Slide 2 - "Receba Promoções"**:
  - Cadastro via WhatsApp para ofertas exclusivas
  - Lista de benefícios (descontos, produtos premium, ofertas limitadas)
  - Formulário de telefone com validação
  - Badge "OFERTA ESPECIAL" fixo no canto superior esquerdo

- **Slide 3 - "Swift Bem-Estar"**:
  - Produtos saudáveis e orgânicos
  - Características dos produtos (orgânico, proteína magra, premium)
  - Call-to-action "EXPLORAR LINHA"
  - Badge "BEM-ESTAR" fixo no canto superior esquerdo

#### **Recursos Técnicos**
- **Autoplay Inteligente**: 5 segundos por slide com pausa no hover
- **Navegação Múltipla**: Setas laterais, indicadores inferiores, touch/swipe
- **Transições Suaves**: Animações CSS3 com cubic-bezier otimizadas
- **Responsividade Total**: Adaptação perfeita para todos os dispositivos
- **Acessibilidade**: Suporte a navegação por teclado e screen readers

### 2. 🛒 Sistema de Carrinho Inteligente

#### **Estados Dinâmicos**
- **Usuário Convidado**:
  - Exibe apenas "Limpar Carrinho"
  - Não mostra "Finalizar Compra"
  - Mantém funcionalidade básica de carrinho

- **Usuário Logado**:
  - Exibe "Finalizar Compra" e "Limpar Carrinho"
  - Acesso completo às funcionalidades
  - Persistência de dados entre sessões

#### **Funcionalidades Avançadas**
- **Controles de Quantidade**: Botões +/- com animações suaves
- **Validação em Tempo Real**: Verificação de estoque e preços
- **Cálculo Automático**: Totalização dinâmica com impostos e frete
- **Persistência Local**: Armazenamento no localStorage
- **Sincronização**: Atualização automática entre abas

#### **Interface do Carrinho**
- **Dropdown Responsivo**: Adaptação para mobile e desktop
- **Estados Visuais**: Feedback visual para todas as ações
- **Animações**: Transições suaves para melhor UX
- **Acessibilidade**: Navegação por teclado e ARIA labels

### 3. 🎯 Modal de Seleção de Região

#### **Funcionalidades de Localização**
- **Geolocalização Automática**: Detecção via GPS do navegador
- **Busca por CEP**: Validação e formatação automática
- **Máscara de Input**: Formatação automática (00000-000)
- **Validação**: Verificação de CEP válido antes do envio

#### **Interface e UX**
- **Modal Responsivo**: Adaptação para todos os dispositivos
- **Navegação por Teclado**: Suporte completo a Tab, Enter, Escape
- **Focus Management**: Controle de foco dentro do modal
- **Acessibilidade**: ARIA labels e roles apropriados

#### **Integração com Sistema**
- **Atualização Dinâmica**: Banner de frete atualizado automaticamente
- **Estados Visuais**: Feedback visual para diferentes estados
- **Persistência**: Lembrança da região selecionada
- **Fallback**: Opções alternativas caso geolocalização falhe

### 4. 📱 Design Responsivo Avançado

#### **Estratégia Mobile-First**
- **Desenvolvimento Progressivo**: Base mobile, depois desktop
- **Performance Otimizada**: Carregamento adaptativo por dispositivo
- **Touch-Friendly**: Áreas de toque adequadas (44px mínimo)
- **Gestos Naturais**: Suporte a swipe, pinch, tap

#### **Breakpoints Inteligentes**
- **Mobile Pequeno**: < 360px (smartphones pequenos)
- **Mobile**: 360px - 480px (smartphones padrão)
- **Tablet**: 480px - 768px (tablets e phablets)
- **Desktop Pequeno**: 768px - 1024px (laptops)
- **Desktop**: 1024px - 1440px (desktops padrão)
- **Desktop Grande**: > 1440px (monitores grandes)

#### **Adaptações por Dispositivo**
- **Mobile**: Layout em coluna, navegação simplificada
- **Tablet**: Layout híbrido, navegação otimizada
- **Desktop**: Layout em grid, navegação completa
- **Touch vs Mouse**: Interações adaptadas ao tipo de input

### 5. 🎨 Sistema de Design Consistente

#### **Design Tokens**
- **Cores**: Paleta consistente com variações de tom
- **Tipografia**: Hierarquia clara com fontes otimizadas
- **Espaçamentos**: Sistema de espaçamento baseado em múltiplos
- **Sombras**: Efeitos visuais consistentes
- **Bordas**: Raios e estilos padronizados

#### **Componentes Modulares**
- **Reutilização**: Componentes independentes e reutilizáveis
- **Consistência**: Padrões visuais uniformes
- **Manutenibilidade**: Fácil atualização e modificação
- **Escalabilidade**: Preparado para crescimento

### 6. ♿ Acessibilidade Completa

#### **Padrões WCAG 2.1 AA**
- **Contraste**: Relação de contraste adequada (4.5:1 mínimo)
- **Navegação**: Suporte completo a navegação por teclado
- **Screen Readers**: Compatibilidade com tecnologias assistivas
- **Foco Visível**: Indicadores de foco claros e visíveis

#### **Implementações Técnicas**
- **ARIA Labels**: Descrições para elementos interativos
- **Roles Semânticos**: Papéis apropriados para elementos
- **Skip Links**: Navegação rápida para conteúdo principal
- **Alt Text**: Descrições alternativas para imagens

### 7. 🚀 Performance Otimizada

#### **Otimizações de Carregamento**
- **Lazy Loading**: Imagens carregadas sob demanda
- **Code Splitting**: JavaScript carregado por partes
- **Minificação**: CSS e JS minificados para produção
- **Compressão**: Gzip para redução de tamanho

#### **Otimizações de Renderização**
- **CSS Otimizado**: Remoção de código duplicado
- **Critical CSS**: Estilos críticos inline
- **Font Display**: Otimização de carregamento de fontes
- **Image Optimization**: Imagens otimizadas e em formatos modernos

## 🔧 Componentes Principais

### 🎮 SwiftApp (Controlador Principal)

#### **Inicialização e Configuração**
```javascript
// Inicialização automática
window.SwiftApp.init();

// Configuração personalizada
SwiftApp.config = {
  debug: true,
  autoInit: true,
  components: {
    carousel: { autoScroll: true },
    cart: { persistence: true }
  }
};
```

#### **Métodos Principais**
```javascript
// Sistema de mensagens
SwiftApp.showMessage('Sucesso!', 'success');
SwiftApp.showMessage('Erro!', 'error');
SwiftApp.showMessage('Aviso!', 'warning');

// Informações da aplicação
const info = SwiftApp.getInfo();
console.log(info); // { version: '2.0.0', components: [...], config: {...} }

// Sistema de eventos
SwiftApp.dispatchEvent('custom:event', { 
  data: 'value',
  timestamp: Date.now()
});

// Listeners de eventos
SwiftApp.addEventListener('cart:updated', (event) => {
  console.log('Carrinho atualizado:', event.detail);
});
```

#### **Sistema de Componentes**
```javascript
// Registrar componente
SwiftApp.registerComponent('my-component', MyComponent);

// Obter instância
const component = SwiftApp.getComponent('my-component');

// Listar componentes
const components = SwiftApp.getComponents();
```

### 🛒 SwiftProductCart (Sistema de Carrinho)

#### **Inicialização**
```javascript
// Inicialização automática
const cart = new SwiftProductCart();

// Configuração personalizada
const cart = new SwiftProductCart({
  persistence: true,
  validation: true,
  autoSave: true
});
```

#### **Operações Básicas**
```javascript
// Adicionar produto
cart.addToCart('product-id', 1);

// Adicionar com validação
cart.addToCart('product-id', 1, {
  validateStock: true,
  showMessage: true
});

// Atualizar quantidade
cart.updateQuantity('product-id', 2);

// Remover produto
cart.removeFromCart('product-id');

// Limpar carrinho
cart.clearCart();
```

#### **Operações Avançadas**
```javascript
// Obter carrinho
const items = cart.getCart();

// Obter total
const total = cart.getTotal();

// Obter quantidade de itens
const count = cart.getItemCount();

// Verificar se produto está no carrinho
const exists = cart.hasProduct('product-id');

// Obter quantidade de um produto específico
const quantity = cart.getProductQuantity('product-id');
```

#### **Eventos do Carrinho**
```javascript
// Listeners
cart.addEventListener('itemAdded', (event) => {
  console.log('Item adicionado:', event.detail);
});

cart.addEventListener('itemRemoved', (event) => {
  console.log('Item removido:', event.detail);
});

cart.addEventListener('cartCleared', () => {
  console.log('Carrinho limpo');
});

cart.addEventListener('totalUpdated', (event) => {
  console.log('Total atualizado:', event.detail.total);
});
```

#### **Persistência e Sincronização**
```javascript
// Salvar carrinho
cart.save();

// Carregar carrinho
cart.load();

// Sincronizar entre abas
cart.enableSync();

// Desabilitar sincronização
cart.disableSync();
```

### 🎠 SwiftCarousel (Sistema de Carrossel)

#### **Inicialização**
```javascript
// Inicialização básica
const carousel = new SwiftCarousel(element);

// Configuração avançada
const carousel = new SwiftCarousel(element, {
  autoScroll: true,
  interval: 5000,
  enableTouch: true,
  enableKeyboard: true,
  pauseOnHover: true,
  loop: true,
  transition: 'slide' // 'slide', 'fade', 'zoom'
});
```

#### **Controles de Navegação**
```javascript
// Navegação básica
carousel.nextSlide();
carousel.prevSlide();
carousel.goToSlide(2);

// Navegação com animação
carousel.nextSlide({ animate: true });
carousel.goToSlide(2, { duration: 500 });

// Pausar/retomar autoplay
carousel.pause();
carousel.resume();
carousel.toggleAutoplay();
```

#### **Informações do Carrossel**
```javascript
// Obter slide atual
const currentSlide = carousel.getCurrentSlide();

// Obter total de slides
const totalSlides = carousel.getTotalSlides();

// Verificar se está no primeiro slide
const isFirst = carousel.isFirstSlide();

// Verificar se está no último slide
const isLast = carousel.isLastSlide();

// Obter configurações
const config = carousel.getConfig();
```

#### **Eventos do Carrossel**
```javascript
// Listeners
carousel.addEventListener('slideChanged', (event) => {
  console.log('Slide alterado:', event.detail);
});

carousel.addEventListener('autoplayStarted', () => {
  console.log('Autoplay iniciado');
});

carousel.addEventListener('autoplayStopped', () => {
  console.log('Autoplay parado');
});

carousel.addEventListener('touchStart', (event) => {
  console.log('Touch iniciado:', event.detail);
});
```

#### **Métodos de Controle**
```javascript
// Destruir carrossel
carousel.destroy();

// Recriar carrossel
carousel.recreate();

// Atualizar configurações
carousel.updateConfig({
  interval: 3000,
  enableTouch: false
});

// Adicionar slide dinamicamente
carousel.addSlide(htmlContent);

// Remover slide
carousel.removeSlide(2);
```

### 🎯 SwiftRegionModal (Modal de Região)

#### **Inicialização**
```javascript
// Inicialização automática
const regionModal = new SwiftRegionModal();

// Configuração personalizada
const regionModal = new SwiftRegionModal({
  enableGeolocation: true,
  enableCEP: true,
  autoClose: true,
  showCloseButton: true
});
```

#### **Métodos Principais**
```javascript
// Abrir modal
regionModal.open();

// Fechar modal
regionModal.close();

// Verificar se está aberto
const isOpen = regionModal.isOpen();

// Resetar formulário
regionModal.reset();
```

#### **Funcionalidades de Localização**
```javascript
// Obter localização atual
regionModal.getCurrentLocation()
  .then(location => {
    console.log('Localização:', location);
  })
  .catch(error => {
    console.error('Erro:', error);
  });

// Validar CEP
const isValid = regionModal.validateCEP('12345-678');

// Formatar CEP
const formatted = regionModal.formatCEP('12345678');
```

#### **Eventos do Modal**
```javascript
// Listeners
regionModal.addEventListener('opened', () => {
  console.log('Modal aberto');
});

regionModal.addEventListener('closed', () => {
  console.log('Modal fechado');
});

regionModal.addEventListener('locationFound', (event) => {
  console.log('Localização encontrada:', event.detail);
});

regionModal.addEventListener('cepValidated', (event) => {
  console.log('CEP validado:', event.detail);
});
```

### 🤖 SwiftChatbot (Assistente Virtual)

#### **Inicialização**
```javascript
// Inicialização básica
const chatbot = new SwiftChatbot();

// Configuração avançada
const chatbot = new SwiftChatbot({
  autoOpen: false,
  position: 'bottom-right',
  theme: 'light',
  language: 'pt-BR'
});
```

#### **Controles**
```javascript
// Abrir chat
chatbot.open();

// Fechar chat
chatbot.close();

// Minimizar
chatbot.minimize();

// Maximizar
chatbot.maximize();

// Toggle
chatbot.toggle();
```

#### **Sistema de Mensagens**
```javascript
// Enviar mensagem
chatbot.sendMessage('Olá!');

// Adicionar resposta automática
chatbot.addResponse('track-order', {
  text: 'Para rastrear seu pedido...',
  quickActions: [...]
});

// Obter histórico
const history = chatbot.getHistory();

// Limpar histórico
chatbot.clearHistory();
```

#### **Eventos do Chatbot**
```javascript
// Listeners
chatbot.addEventListener('messageSent', (event) => {
  console.log('Mensagem enviada:', event.detail);
});

chatbot.addEventListener('messageReceived', (event) => {
  console.log('Mensagem recebida:', event.detail);
});

chatbot.addEventListener('quickActionClicked', (event) => {
  console.log('Ação rápida clicada:', event.detail);
});
```

## 📱 Responsividade

### 🎯 Estratégia Mobile-First

#### **Filosofia de Desenvolvimento**
- **Base Mobile**: Desenvolvimento começando pelo dispositivo móvel
- **Progressive Enhancement**: Melhorias progressivas para telas maiores
- **Performance First**: Otimização para conexões móveis
- **Touch-First**: Interface otimizada para interação tátil

#### **Implementação Prática**
```css
/* Base mobile (0px+) */
.swift-component {
  padding: var(--swift-space-4);
  font-size: 14px;
  width: 100%;
  display: block;
}

/* Mobile pequeno (360px+) */
@media (min-width: 360px) {
  .swift-component {
    padding: var(--swift-space-5);
    font-size: 15px;
  }
}

/* Mobile grande (480px+) */
@media (min-width: 480px) {
  .swift-component {
    padding: var(--swift-space-6);
    font-size: 16px;
  }
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .swift-component {
    padding: var(--swift-space-8);
    font-size: 18px;
    display: flex;
    flex-direction: row;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .swift-component {
    padding: var(--swift-space-12);
    font-size: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Desktop grande (1440px+) */
@media (min-width: 1440px) {
  .swift-component {
    padding: var(--swift-space-16);
    font-size: 22px;
    max-width: 1400px;
  }
}
```

### 📐 Sistema de Breakpoints

#### **Breakpoints Principais**
```css
/* Variáveis de breakpoints */
:root {
  --swift-bp-mobile-small: 360px;
  --swift-bp-mobile: 480px;
  --swift-bp-tablet: 768px;
  --swift-bp-desktop-small: 1024px;
  --swift-bp-desktop: 1440px;
  --swift-bp-desktop-large: 1920px;
}
```

#### **Media Queries Customizadas**
```css
/* Mobile pequeno */
@media (max-width: 359px) {
  .swift-component {
    padding: var(--swift-space-2);
    font-size: 12px;
  }
}

/* Mobile */
@media (max-width: 479px) {
  .swift-component {
    padding: var(--swift-space-3);
    font-size: 14px;
  }
}

/* Tablet */
@media (max-width: 767px) {
  .swift-component {
    padding: var(--swift-space-4);
    font-size: 16px;
  }
}

/* Desktop pequeno */
@media (max-width: 1023px) {
  .swift-component {
    padding: var(--swift-space-6);
    font-size: 18px;
  }
}

/* Desktop */
@media (max-width: 1439px) {
  .swift-component {
    padding: var(--swift-space-8);
    font-size: 20px;
  }
}
```

### 🎨 Adaptações por Dispositivo

#### **Mobile (0px - 767px)**
```css
/* Layout em coluna */
.swift-container {
  flex-direction: column;
  padding: var(--swift-space-4);
}

/* Navegação simplificada */
.swift-nav {
  display: none; /* Hidden by default */
}

.swift-nav--mobile {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--swift-neutral-white);
  border-top: 1px solid var(--swift-border-light);
}

/* Botões touch-friendly */
.swift-btn {
  min-height: 44px;
  min-width: 44px;
  padding: var(--swift-space-3) var(--swift-space-4);
}

/* Texto otimizado */
.swift-text {
  font-size: 16px;
  line-height: 1.5;
}
```

#### **Tablet (768px - 1023px)**
```css
/* Layout híbrido */
.swift-container {
  flex-direction: row;
  flex-wrap: wrap;
  padding: var(--swift-space-6);
}

/* Navegação otimizada */
.swift-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--swift-space-2);
}

/* Grid responsivo */
.swift-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--swift-space-6);
}

/* Tipografia intermediária */
.swift-text {
  font-size: 18px;
  line-height: 1.6;
}
```

#### **Desktop (1024px+)**
```css
/* Layout completo */
.swift-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-areas: "sidebar main";
  gap: var(--swift-space-8);
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--swift-space-8);
}

/* Navegação completa */
.swift-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid otimizado */
.swift-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--swift-space-8);
}

/* Tipografia desktop */
.swift-text {
  font-size: 20px;
  line-height: 1.7;
}
```

### 🎯 Componentes Responsivos

#### **Carrossel Hero**
```css
/* Mobile */
@media (max-width: 767px) {
  .swift-hero {
    min-height: 400px;
  }
  
  .swift-hero__title {
    font-size: clamp(24px, 8vw, 32px);
  }
  
  .swift-hero__controls {
    display: none;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .swift-hero {
    min-height: 500px;
  }
  
  .swift-hero__title {
    font-size: clamp(32px, 6vw, 48px);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .swift-hero {
    min-height: 600px;
  }
  
  .swift-hero__title {
    font-size: clamp(48px, 4vw, 72px);
  }
}
```

#### **Carrinho de Compras**
```css
/* Mobile */
@media (max-width: 767px) {
  .swift-cart-dropdown {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
  }
  
  .swift-cart-dropdown--open {
    transform: translateY(0);
  }
}

/* Desktop */
@media (min-width: 768px) {
  .swift-cart-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
  }
}
```

#### **Modal de Região**
```css
/* Mobile */
@media (max-width: 767px) {
  .region-modal__dialog {
    width: 95vw;
    height: 90vh;
    margin: 5vh auto;
  }
  
  .region-modal__content {
    padding: var(--swift-space-6);
  }
}

/* Desktop */
@media (min-width: 768px) {
  .region-modal__dialog {
    width: 500px;
    height: auto;
    margin: 10vh auto;
  }
  
  .region-modal__content {
    padding: var(--swift-space-8);
  }
}
```

### 🔧 Utilitárias Responsivas

#### **Classes de Display**
```css
/* Mobile only */
.swift-mobile-only {
  display: block;
}

@media (min-width: 768px) {
  .swift-mobile-only {
    display: none;
  }
}

/* Desktop only */
.swift-desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .swift-desktop-only {
    display: block;
  }
}

/* Tablet and up */
.swift-tablet-up {
  display: none;
}

@media (min-width: 768px) {
  .swift-tablet-up {
    display: block;
  }
}
```

#### **Classes de Espaçamento**
```css
/* Padding responsivo */
.swift-p-responsive {
  padding: var(--swift-space-4);
}

@media (min-width: 768px) {
  .swift-p-responsive {
    padding: var(--swift-space-8);
  }
}

/* Margin responsivo */
.swift-m-responsive {
  margin: var(--swift-space-4);
}

@media (min-width: 768px) {
  .swift-m-responsive {
    margin: var(--swift-space-8);
  }
}
```

#### **Classes de Tipografia**
```css
/* Título responsivo */
.swift-title-responsive {
  font-size: clamp(24px, 8vw, 48px);
  line-height: 1.2;
}

/* Texto responsivo */
.swift-text-responsive {
  font-size: clamp(14px, 4vw, 18px);
  line-height: 1.5;
}

/* Botão responsivo */
.swift-btn-responsive {
  padding: var(--swift-space-3) var(--swift-space-4);
  font-size: clamp(14px, 4vw, 16px);
}

@media (min-width: 768px) {
  .swift-btn-responsive {
    padding: var(--swift-space-4) var(--swift-space-6);
  }
}
```

## ♿ Acessibilidade

### 🎯 Padrões e Conformidade

#### **WCAG 2.1 AA Compliance**
- **Nível A**: Funcionalidades básicas de acessibilidade
- **Nível AA**: Padrão recomendado para sites comerciais
- **Nível AAA**: Funcionalidades avançadas (quando aplicável)

#### **Princípios Fundamentais**
- **Perceptível**: Informações apresentadas de forma que os usuários possam percebê-las
- **Operável**: Interface de usuário deve ser operável por todos
- **Compreensível**: Informações e operação da interface devem ser compreensíveis
- **Robusto**: Conteúdo deve ser robusto o suficiente para ser interpretado por uma ampla variedade de tecnologias assistivas

### 🔧 Implementações Técnicas

#### **ARIA (Accessible Rich Internet Applications)**
```html
<!-- Modal acessível -->
<div class="modal" 
     role="dialog" 
     aria-modal="true" 
     aria-labelledby="modal-title"
     aria-describedby="modal-description">
  <h2 id="modal-title">Título do Modal</h2>
  <p id="modal-description">Descrição do conteúdo do modal</p>
  <button class="close-btn" aria-label="Fechar modal">×</button>
</div>

<!-- Formulário acessível -->
<form role="search" aria-label="Buscar produtos">
  <label for="search-input">Buscar produtos</label>
  <input type="search" 
         id="search-input" 
         aria-describedby="search-help"
         placeholder="Digite o nome do produto">
  <div id="search-help" class="help-text">
    Digite pelo menos 3 caracteres para buscar
  </div>
</form>

<!-- Navegação acessível -->
<nav role="navigation" aria-label="Menu principal">
  <ul>
    <li><a href="/" aria-current="page">Início</a></li>
    <li><a href="/produtos">Produtos</a></li>
    <li><a href="/contato">Contato</a></li>
  </ul>
</nav>
```

#### **Navegação por Teclado**
```css
/* Indicadores de foco visíveis */
.swift-btn:focus,
.swift-input:focus,
.swift-link:focus {
  outline: 2px solid var(--swift-primary-orange);
  outline-offset: 2px;
}

/* Remover outline padrão e adicionar customizado */
.swift-btn:focus:not(:focus-visible) {
  outline: none;
}

.swift-btn:focus-visible {
  outline: 2px solid var(--swift-primary-orange);
  outline-offset: 2px;
}

/* Skip links para navegação rápida */
.swift-skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--swift-primary-orange);
  color: var(--swift-neutral-white);
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.swift-skip-link:focus {
  top: 6px;
}
```

#### **Semântica HTML5**
```html
<!-- Estrutura semântica correta -->
<header role="banner">
  <nav role="navigation" aria-label="Menu principal">
    <!-- Navegação -->
  </nav>
</header>

<main role="main">
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">Swift - Carnes Premium</h1>
    <!-- Conteúdo do hero -->
  </section>
  
  <section aria-labelledby="products-title">
    <h2 id="products-title">Nossos Produtos</h2>
    <!-- Lista de produtos -->
  </section>
</main>

<aside role="complementary" aria-labelledby="sidebar-title">
  <h3 id="sidebar-title">Informações Adicionais</h3>
  <!-- Conteúdo da sidebar -->
</aside>

<footer role="contentinfo">
  <!-- Informações do rodapé -->
</footer>
```

### 🎨 Design Acessível

#### **Contraste de Cores**
```css
/* Cores com contraste adequado */
:root {
  /* Contraste 4.5:1 (mínimo para texto normal) */
  --swift-text-primary: #191818;    /* Sobre fundo branco */
  --swift-text-secondary: #666666;  /* Sobre fundo branco */
  
  /* Contraste 3:1 (mínimo para texto grande) */
  --swift-text-large: #333333;      /* Sobre fundo branco */
  
  /* Contraste 7:1 (recomendado para texto importante) */
  --swift-text-important: #000000;  /* Sobre fundo branco */
}

/* Verificação de contraste */
.swift-text--low-contrast {
  color: #999999; /* Contraste insuficiente - evitar */
}

.swift-text--high-contrast {
  color: #000000; /* Contraste adequado - usar */
}
```

#### **Tipografia Acessível**
```css
/* Tamanhos de fonte adequados */
.swift-text {
  font-size: 16px; /* Mínimo recomendado */
  line-height: 1.5; /* Espaçamento adequado */
}

.swift-text--small {
  font-size: 14px; /* Mínimo para texto secundário */
  line-height: 1.4;
}

.swift-text--large {
  font-size: 18px; /* Texto grande para melhor legibilidade */
  line-height: 1.6;
}

/* Fontes legíveis */
.swift-font-primary {
  font-family: 'Montserrat', sans-serif; /* Fonte sans-serif legível */
}

.swift-font-display {
  font-family: 'Passion One', cursive; /* Fonte display para títulos */
}
```

### 🎯 Componentes Acessíveis

#### **Botões Acessíveis**
```html
<!-- Botão com texto descritivo -->
<button type="button" aria-label="Adicionar produto ao carrinho">
  <svg aria-hidden="true" focusable="false">
    <!-- Ícone do carrinho -->
  </svg>
  <span class="sr-only">Adicionar ao carrinho</span>
</button>

<!-- Botão com estado -->
<button type="button" 
        aria-pressed="false"
        aria-label="Favoritar produto">
  ♡
</button>

<!-- Botão com contador -->
<button type="button" 
        aria-label="Carrinho de compras, 3 itens">
  🛒
  <span aria-hidden="true">3</span>
</button>
```

#### **Formulários Acessíveis**
```html
<!-- Campo de entrada com label -->
<div class="form-group">
  <label for="cep-input">CEP</label>
  <input type="text" 
         id="cep-input" 
         name="cep"
         placeholder="00000-000"
         aria-describedby="cep-help"
         aria-invalid="false"
         required>
  <div id="cep-help" class="help-text">
    Digite seu CEP para calcular o frete
  </div>
  <div id="cep-error" class="error-text" role="alert" aria-live="polite">
    <!-- Mensagens de erro aparecem aqui -->
  </div>
</div>

<!-- Campo de busca acessível -->
<div class="search-container">
  <label for="search-input" class="sr-only">Buscar produtos</label>
  <input type="search" 
         id="search-input"
         name="search"
         placeholder="Buscar produtos..."
         aria-describedby="search-results"
         autocomplete="off">
  <button type="submit" aria-label="Executar busca">
    🔍
  </button>
  <div id="search-results" 
       role="region" 
       aria-live="polite" 
       aria-label="Resultados da busca">
    <!-- Resultados aparecem aqui -->
  </div>
</div>
```

#### **Modais Acessíveis**
```html
<!-- Modal com foco e escape -->
<div class="modal-overlay" 
     role="dialog" 
     aria-modal="true"
     aria-labelledby="modal-title"
     aria-describedby="modal-description">
  <div class="modal-content">
    <h2 id="modal-title">Selecionar Região</h2>
    <p id="modal-description">
      Escolha sua região para calcular o frete
    </p>
    
    <!-- Conteúdo do modal -->
    
    <div class="modal-actions">
      <button type="button" 
              class="btn btn--secondary"
              aria-label="Fechar modal">
        Cancelar
      </button>
      <button type="button" 
              class="btn btn--primary">
        Confirmar
      </button>
    </div>
    
    <button type="button" 
            class="modal-close"
            aria-label="Fechar modal">
      ×
    </button>
  </div>
</div>
```

### 🔍 Tecnologias Assistivas

#### **Screen Readers**
```html
<!-- Texto oculto para screen readers -->
<span class="sr-only">Texto visível apenas para screen readers</span>

<!-- CSS para texto oculto -->
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Texto oculto que pode ser revelado */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

#### **Navegação por Teclado**
```javascript
// Gerenciamento de foco em modais
class AccessibleModal {
  constructor(element) {
    this.element = element;
    this.focusableElements = this.getFocusableElements();
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
  }
  
  getFocusableElements() {
    return this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }
  
  trapFocus(event) {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === this.firstFocusable) {
          event.preventDefault();
          this.lastFocusable.focus();
        }
      } else {
        if (document.activeElement === this.lastFocusable) {
          event.preventDefault();
          this.firstFocusable.focus();
        }
      }
    }
    
    if (event.key === 'Escape') {
      this.close();
    }
  }
  
  open() {
    this.element.style.display = 'block';
    this.firstFocusable.focus();
    document.addEventListener('keydown', this.trapFocus.bind(this));
  }
  
  close() {
    this.element.style.display = 'none';
    document.removeEventListener('keydown', this.trapFocus.bind(this));
  }
}
```

### 📊 Testes de Acessibilidade

#### **Ferramentas de Teste**
```bash
# Lighthouse (Chrome DevTools)
npx lighthouse http://localhost:3000 --only-categories=accessibility

# axe-core (Automated testing)
npm install --save-dev @axe-core/cli
npx axe http://localhost:3000

# WAVE (Web Accessibility Evaluation Tool)
# https://wave.webaim.org/

# Screen Reader Testing
# NVDA (Windows) - https://www.nvaccess.org/
# JAWS (Windows) - https://www.freedomscientific.com/
# VoiceOver (macOS) - Built-in
```

#### **Checklist de Acessibilidade**
- [ ] **Contraste**: Todas as cores têm contraste adequado (4.5:1 mínimo)
- [ ] **Navegação**: Site é totalmente navegável por teclado
- [ ] **Foco**: Indicadores de foco são visíveis e claros
- [ ] **Labels**: Todos os elementos interativos têm labels apropriados
- [ ] **ARIA**: Atributos ARIA são usados corretamente
- [ ] **Semântica**: HTML semântico é usado adequadamente
- [ ] **Alt Text**: Todas as imagens têm texto alternativo
- [ ] **Headings**: Estrutura de cabeçalhos é lógica
- [ ] **Forms**: Formulários são acessíveis e validados
- [ ] **Modals**: Modais são acessíveis e gerenciam foco
- [ ] **Screen Reader**: Testado com tecnologias assistivas
- [ ] **Mobile**: Acessibilidade mantida em dispositivos móveis

### 🎯 Melhores Práticas

#### **Desenvolvimento**
- **Teste Regularmente**: Use ferramentas de acessibilidade durante o desenvolvimento
- **Validação Contínua**: Integre testes de acessibilidade no pipeline de CI/CD
- **Feedback de Usuários**: Colete feedback de usuários com necessidades especiais
- **Documentação**: Mantenha documentação sobre padrões de acessibilidade

#### **Manutenção**
- **Auditorias Regulares**: Realize auditorias de acessibilidade periodicamente
- **Atualizações**: Mantenha-se atualizado com as diretrizes WCAG
- **Treinamento**: Treine a equipe sobre práticas de acessibilidade
- **Monitoramento**: Monitore métricas de acessibilidade em produção

## 🚀 Performance

### Otimizações Implementadas
- **Lazy Loading**: Imagens carregadas sob demanda
- **CSS Otimizado**: Remoção de código duplicado
- **JavaScript Modular**: Carregamento apenas do necessário
- **Compressão Gzip**: Redução do tamanho dos arquivos
- **Cache Headers**: Controle de cache do navegador

### Métricas de Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🧪 Testes e Qualidade

### Checklist de Qualidade
- [x] **Performance**: Lighthouse score > 90
- [x] **Acessibilidade**: WCAG 2.1 AA compliance
- [x] **SEO**: Meta tags, semântica HTML5
- [x] **Responsividade**: Testado em múltiplos dispositivos
- [x] **Compatibilidade**: Suporte a navegadores modernos
- [x] **Manutenibilidade**: Código limpo e documentado

### Ferramentas de Teste
```bash
# Lighthouse (Performance, SEO, Acessibilidade)
npx lighthouse http://localhost:3000 --view

# Wave (Acessibilidade)
# https://wave.webaim.org/

# BrowserStack (Compatibilidade)
# https://www.browserstack.com/
```

## 📊 Métricas do Projeto

### Antes vs Depois da Refatoração
| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Arquivos CSS** | 15+ arquivos | 4 arquivos base + componentes | -70% |
| **Arquivos JS** | 6 arquivos | 3 arquivos modulares | -50% |
| **Linhas de CSS** | ~8000 linhas | ~4000 linhas | -50% |
| **Performance Score** | 65/100 | 92/100 | +42% |
| **Acessibilidade Score** | 70/100 | 95/100 | +36% |
| **SEO Score** | 75/100 | 90/100 | +20% |

## 🔮 Roadmap Futuro

### Fase 2 - PWA (Progressive Web App)
- [ ] Service Worker para cache offline
- [ ] Manifest.json para instalação
- [ ] Push notifications
- [ ] Background sync

### Fase 3 - Funcionalidades Avançadas
- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] Filtros avançados de produtos
- [ ] Sistema de avaliações

### Fase 4 - Analytics e Otimização
- [ ] Google Analytics 4
- [ ] Event tracking detalhado
- [ ] A/B testing
- [ ] Performance monitoring

## 🛠️ Desenvolvimento

### Estrutura de Componentes
Cada componente segue o padrão:
```
component-name/
├── component-name.html    # Estrutura HTML
├── component-name.css     # Estilos específicos
└── component-name.js      # Lógica JavaScript (opcional)
```

### Adicionando Novos Componentes
1. **Crie a pasta** do componente em `components/`
2. **Adicione os arquivos** HTML, CSS e JS
3. **Use as variáveis CSS** para manter consistência
4. **Siga o padrão BEM** para nomenclatura
5. **Teste a responsividade** em diferentes breakpoints

### Exemplo de Novo Componente
```html
<!-- components/my-component/my-component.html -->
<div class="swift-my-component swift-card">
  <h3 class="swift-my-component__title">Título</h3>
  <p class="swift-my-component__description">Descrição</p>
  <button class="swift-my-component__btn swift-btn swift-btn--primary">
    Ação
  </button>
</div>
```

```css
/* components/my-component/my-component.css */
.swift-my-component {
  padding: var(--swift-space-6);
  border-left: 4px solid var(--swift-primary-orange);
}

.swift-my-component__title {
  font-family: var(--swift-font-display);
  color: var(--swift-neutral-dark);
  margin-bottom: var(--swift-space-4);
}

.swift-my-component__btn {
  margin-top: var(--swift-space-4);
}
```

## 🐛 Debugging

### Modo Debug
```javascript
// Ativar logs detalhados
SwiftConfig.debug = true;

// Informações da aplicação
console.log(SwiftApp.getInfo());

// Eventos em tempo real
document.addEventListener('swift:debug', console.log);
```

### Logs Úteis
```javascript
// Performance
console.log('Page loaded in:', performance.now(), 'ms');

// Carrinho
console.log('Cart items:', swiftProductCart.getCart());

// Configuração
console.log('Current config:', SwiftConfig);
```

## 📞 Suporte

### Documentação Adicional
- [README-SERVER.md](README-SERVER.md) - Configuração do servidor
- [README_Como_usar_o_GitFlow_nesse_projeto.md](README_Como_usar_o_GitFlow_nesse_projeto.md) - GitFlow

### Contato
- **Email**: dev@swift.com.br
- **GitHub**: [@swift/carnes](https://github.com/swift/carnes)
- **Website**: [swift.com.br](https://swift.com.br)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Equipe de desenvolvimento Swift
- Comunidade open source
- Contribuidores do projeto

---

**Versão**: 2.0.0  
**Status**: ✅ Produção  
**Última Atualização**: Dezembro 2024  
**Compatibilidade**: Navegadores modernos (ES6+)

> 🚀 **Swift** - Transformando a experiência de compra de carnes premium!
