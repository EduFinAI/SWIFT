# Guia de estilos

Este diretorio centraliza o CSS modular utilizado na landing page Swift. A proposta e manter os estilos separados por funcao, facilitando manutencao e reuso.

## Arquivos principais
- `style.css`: reset global, tokens basicos e utilitarios compartilhados.
- `variables.css`: definicoes de cores, tipografia, espacamentos e raios padrao.
- `layout.css`: regras de grid, containers e alinhamentos estruturais.
- `main.css`: ponto de entrada opcional que importa todos os modulos listados abaixo.
- `critical.css`: estilos essenciais para carregamento inicial (caso necessario inline).

## Subdiretorios
- `components/`: estilos reaproveitaveis (header, navigation, search, buttons, cards, forms).
- `pages/`: regras especificas por pagina; atualmente contem `index.css`.

## Como usar
1. Importe apenas o que for preciso em `index.html`. O projeto atual carrega `style.css`, `index.css` e `overrides.css` diretamente.
2. Para carregar tudo via unico arquivo, substitua os imports por `style/main.css`.
3. Adicione novos componentes criando um arquivo em `components/` e incluindo `@import` correspondente em `main.css`.
4. Sempre declare variaveis em `variables.css` e reutilize-as nos demais modulos.

## Boas praticas
- Prefira nomes de classe descritivos e consistentes (`pginainicial-*` mantem compatibilidade com o layout de origem).
- Agrupe responsividade em `responsive.css` para facilitar auditoria.
- Evite duplicar regras: utilize variaveis e utilitarios existentes.

## Referencias rapidas
- Guia geral do projeto: `../README.md`.
- Assets relacionados: `../assets/`.

Manter a estrutura modular ajuda a escalar o layout com clareza e minimizar conflitos de CSS.
