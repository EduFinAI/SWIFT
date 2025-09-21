# CSS Modular - Swift Frontend

Este diretório contém a estrutura modular de CSS para o projeto Swift, organizada de forma sistemática e mantível.

## Estrutura de Arquivos

```
frontend/style/
├── main.css                 # Arquivo principal que importa todos os módulos
├── variables.css            # Variáveis CSS (cores, tipografia, espaçamentos)
├── base.css                 # Estilos base e utilitários
├── layout.css               # Layout e estrutura geral
├── responsive.css           # Media queries e estilos responsivos
├── components/              # Componentes reutilizáveis
│   ├── header.css           # Cabeçalho e navegação
│   ├── navigation.css       # Pílulas de navegação
│   ├── search.css           # Barras de busca
│   ├── buttons.css          # Botões e ações
│   ├── cards.css            # Cards de produtos e avaliações
│   └── forms.css            # Formulários e inputs
├── pages/                   # Estilos específicos por página
│   └── index.css            # Página inicial
├── overrides.css            # Overrides específicos (mantido)
└── README.md               # Esta documentação
```

## Como Usar

### Importação Principal
O arquivo `main.css` é o ponto de entrada que importa todos os módulos na ordem correta:

```html
<link rel="stylesheet" href="./style/main.css" />
```

### Variáveis CSS
Todas as variáveis estão centralizadas em `variables.css`:
- **Cores**: primárias, secundárias, neutras
- **Tipografia**: fontes, tamanhos, pesos
- **Espaçamentos**: margens, paddings consistentes
- **Bordas**: raios de borda padronizados
- **Sombras**: elevações visuais
- **Transições**: animações suaves
- **Breakpoints**: pontos de quebra responsivos

### Componentes
Cada componente tem seu próprio arquivo CSS com estilos específicos:
- **Header**: cabeçalho, logo, autenticação, frete
- **Navigation**: pílulas de navegação
- **Search**: barras de busca
- **Buttons**: botões primários, secundários, estados
- **Cards**: produtos, avaliações, informações
- **Forms**: inputs, labels, validação

### Responsividade
O arquivo `responsive.css` contém todas as media queries organizadas por breakpoint:
- Mobile First approach
- Breakpoints: 480px, 600px, 768px, 992px, 1024px, 1200px, 1366px, 1400px
- Ajustes específicos para header, hero, navegação

## Benefícios da Modularização

### 1. **Manutenibilidade**
- Código organizado por funcionalidade
- Fácil localização de estilos específicos
- Redução de conflitos entre estilos

### 2. **Reutilização**
- Componentes podem ser reutilizados em outras páginas
- Variáveis centralizadas garantem consistência
- Estilos base aplicados globalmente

### 3. **Performance**
- Possibilidade de carregar apenas CSS necessário
- Melhor cache do navegador
- Menos redundância de código

### 4. **Escalabilidade**
- Fácil adição de novos componentes
- Estrutura clara para novos desenvolvedores
- Separação clara de responsabilidades

## Convenções de Nomenclatura

### Classes CSS
- Prefixo `pginainicial-` para manter compatibilidade
- Nomes descritivos e semânticos
- Uso de variáveis CSS quando possível

### Variáveis CSS
- Prefixo `--` seguido de categoria
- Nomes em inglês para consistência
- Agrupamento por funcionalidade

### Estrutura de Arquivos
- Nomes em inglês para universalidade
- Organização hierárquica por funcionalidade
- Documentação clara em cada arquivo

## Próximos Passos

1. **Testes**: Validar funcionamento em diferentes navegadores
2. **Otimização**: Minificação e compressão para produção
3. **Componentes**: Adicionar novos componentes conforme necessário
4. **Documentação**: Expandir documentação de componentes
5. **Automação**: Configurar build process para CSS modular

## Manutenção

### Adicionando Novos Componentes
1. Criar arquivo em `components/nome-do-componente.css`
2. Adicionar import em `main.css`
3. Documentar o componente

### Modificando Variáveis
1. Editar `variables.css`
2. Testar impacto em todos os componentes
3. Atualizar documentação se necessário

### Ajustes Responsivos
1. Adicionar media queries em `responsive.css`
2. Seguir padrão mobile-first
3. Testar em diferentes dispositivos

---

**Desenvolvido com foco em organização, manutenibilidade e escalabilidade.**
