# 🏗️ Arquitetura do Projeto Swift - E-commerce de Carnes

## 📁 Estrutura de Pastas

```
newSwift/
├── index.html                    # Página principal (arquitetura modular)
├── categories/                   # Páginas de categoria de produtos
│   ├── aves.html                # Página de aves
│   ├── bovinos.html             # Página de bovinos
│   └── suinos.html              # Páginas de suínos
├── checkout/                    # Páginas de checkout
│   └── checkout.html            # Finalização de compra
├── produtos/                    # Páginas individuais de produtos
│   ├── aves/                    # 9 produtos de aves
│   ├── bovinos/                 # 9 produtos de bovinos
│   └── suinos/                  # 9 produtos de suínos
├── components/                  # Sistema modular (index.html)
│   ├── header/                  # Cabeçalho
│   ├── footer/                  # Rodapé
│   ├── hero/                    # Banner principal
│   ├── cart-dropdown/           # Carrinho dropdown
│   ├── chatbot/                 # Chat de atendimento
│   └── ...                      # Outros componentes
├── shared/                      # Código compartilhado
│   ├── css/
│   │   ├── base.css             # Estilos globais e resets
│   │   ├── components.css       # Componentes específicos
│   │   └── main.css             # Arquivo original (backup)
│   └── js/
│       ├── core.js              # Funcionalidades básicas
│       ├── components.js        # Componentes específicos
│       └── main.js              # Arquivo original (backup)
├── style/                       # CSS do sistema modular
│   ├── variables.css            # Variáveis CSS
│   ├── base.css                 # Estilos base
│   ├── mixins.css               # Mixins CSS
│   ├── utilities.css            # Utilitários
│   ├── responsive.css           # Responsividade
│   └── components/
│       └── shared.css           # Componentes compartilhados
├── js/                          # JavaScript do sistema modular
│   ├── swift-app.js             # Aplicação principal
│   ├── swift-auth.js            # Autenticação
│   ├── swift-config.js          # Configurações
│   ├── product-cart.js          # Carrinho de produtos
│   └── component-loader.js      # Carregador de componentes
├── src/                         # Código fonte original
│   └── js/
│       └── main.js              # JavaScript original
├── assets/                      # Recursos estáticos
│   ├── *.png                    # Imagens PNG
│   ├── *.jpg                    # Imagens JPG
│   ├── *.svg                    # Ícones SVG
│   └── ...                      # Outros assets
└── node_modules/                # Dependências Node.js
```

## 🎯 Arquitetura Híbrida

### **Sistema Modular (index.html)**
- **Componentes**: Header, Footer, Hero, etc.
- **CSS**: Variáveis, mixins, utilitários
- **JavaScript**: Carregamento dinâmico de componentes
- **Vantagem**: Manutenção fácil, reutilização

### **Páginas Tradicionais (categories/, checkout/)**
- **HTML**: Páginas completas e independentes
- **CSS**: Arquivos compartilhados do `shared/`
- **JavaScript**: Funcionalidades específicas
- **Vantagem**: Compatibilidade, simplicidade

## 🔗 Navegação

### **Links Internos**
```html
<!-- Index para categorias -->
<a href="categories/aves.html">Aves</a>
<a href="categories/bovinos.html">Bovinos</a>
<a href="categories/suinos.html">Suínos</a>

<!-- Categorias para index -->
<a href="../index.html">Swift</a>

<!-- Categorias entre si -->
<a href="./aves.html">Aves</a>
<a href="./bovinos.html">Bovinos</a>
<a href="./suinos.html">Suínos</a>
```

### **Assets**
```html
<!-- De categorias para assets -->
<img src="../assets/logo.png" alt="Logo">

<!-- De index para assets -->
<img src="./assets/logo.png" alt="Logo">
```

## 📦 Código Compartilhado

### **CSS Compartilhado**
- `shared/css/base.css`: Estilos globais, resets, variáveis
- `shared/css/components.css`: Header, hero, carrossel, etc.

### **JavaScript Compartilhado**
- `shared/js/core.js`: Menu hambúrguer, validação, máscaras
- `shared/js/components.js`: Carrossel, filtros, checkout

## 🚀 Funcionalidades

### **Páginas de Categoria**
- ✅ Hero banner com imagem de fundo
- ✅ Carrossel de categorias
- ✅ Filtros responsivos
- ✅ Grid de produtos
- ✅ Sidebar com filtros
- ✅ Busca de produtos

### **Checkout**
- ✅ Stepper de 3 etapas
- ✅ Validação de formulários
- ✅ Busca de CEP automática
- ✅ Métodos de pagamento
- ✅ Resumo do pedido

### **Sistema Modular (index.html)**
- ✅ Componentes reutilizáveis
- ✅ Carregamento dinâmico
- ✅ Carrinho dropdown
- ✅ Chatbot
- ✅ Modais

## 📱 Responsividade

### **Breakpoints**
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Mobile Small**: < 480px

### **Componentes Responsivos**
- Header com menu hambúrguer
- Carrossel adaptativo
- Grid de produtos flexível
- Sidebar colapsável
- Formulários otimizados

## 🛠️ Tecnologias

### **Frontend**
- **HTML5**: Estrutura semântica
- **CSS3**: Variáveis, Flexbox, Grid
- **JavaScript ES6+**: Módulos, async/await
- **noUiSlider**: Filtros de preço

### **Backend**
- **Node.js**: Servidor de desenvolvimento
- **Express**: Framework web
- **Compression**: Otimização de resposta

## 📋 Manutenção

### **Adicionar Nova Categoria**
1. Criar `categories/nova-categoria.html`
2. Copiar estrutura de `categories/aves.html`
3. Atualizar links no `index.html`
4. Adicionar CSS específico se necessário

### **Adicionar Novo Componente**
1. Criar pasta em `components/`
2. Adicionar HTML, CSS e JS
3. Registrar no `component-loader.js`
4. Importar no `index.html`

### **Atualizar Código Compartilhado**
1. Editar arquivos em `shared/`
2. Testar em todas as páginas
3. Manter compatibilidade

## 🔧 Desenvolvimento

### **Servidor Local**
```bash
# Instalar dependências
npm install

# Iniciar servidor
npm start
# ou
node server.js
```

### **Estrutura de Arquivos**
- **Modular**: Para componentes reutilizáveis
- **Tradicional**: Para páginas específicas
- **Compartilhado**: Para código comum

## 📈 Benefícios da Arquitetura

### **Organização**
- ✅ Separação clara de responsabilidades
- ✅ Código compartilhado reduzido
- ✅ Manutenção facilitada
- ✅ Escalabilidade

### **Performance**
- ✅ CSS/JS otimizados
- ✅ Carregamento assíncrono
- ✅ Cache de recursos
- ✅ Lazy loading

### **Compatibilidade**
- ✅ Funciona em todos os navegadores
- ✅ Responsivo em todos os dispositivos
- ✅ Acessibilidade (ARIA)
- ✅ SEO otimizado

---

**Versão**: 2.0  
**Data**: Janeiro 2025  
**Autor**: Swift Team
