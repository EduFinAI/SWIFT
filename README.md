# Swift Frontend

Landing page estatica que apresenta a vitrine digital da rede Swift. O projeto demonstra a organizacao de estilos modulares, assets otimizados e scripts voltados a desempenho em uma pagina estaticamente servida.

## Visao geral
- HTML puro servido via `index.html`, sem dependencias de build.
- CSS organizado em camadas: reset, variaveis, componentes e overrides pontuais.
- JavaScript vanilla dividido em scripts de navegacao, otimizacao de imagens e monitoramento de performance.
- Assets centralizados em `assets/`, prontos para minificacao ou tratamento externo.

## Como executar
1. Abra `index.html` diretamente em um navegador moderno **ou**
2. Rode um servidor estatico (ex.: `npx serve .`) para validar caminhos relativos e evitar restricoes de CORS.

## Estrutura de pastas
```
.
|-- assets/          # imagens, svgs e demais midias da landing page
|-- src/
|   `-- js/          # scripts vanilla focados em navegacao e performance
|-- style/           # CSS modular dividido por responsabilidade
|-- index.html       # ponto de entrada da aplicacao
`-- README.md        # documentacao principal
```

## Estilos (diretorio `style/`)
### Camada base
- `style.css`: reset + tokens de tema `--dl-*` utilizados pelo layout de referencia.
- `variables.css`: dicionario de variaveis semanticas (`--color-*`, `--text-*`, `--font-*`).
- `base.css`: aplicacao das variaveis em elementos globais (`body`, headings, listas).
- `layout.css`: grids, larguras maximas e alinhamentos estruturais.
- `responsive.css`: media queries organizadas em abordagem mobile-first.

### Componentes e paginas
- `components/`: estilos reutilizaveis (header, navigation, search, buttons, cards, forms).
- `pages/index.css`: regras especificas da landing page Swift.
- `overrides.css`: ajustes visuais para aproximar o mock original.
- `main.css`: ponto unico que importa todos os modulos acima; use-o se preferir um unico `<link>`.

### Pipeline sugerido
1. Mantenha imports essenciais (`style.css`, `index.css`, `overrides.css`) em `index.html`.
2. Ao adicionar componentes, crie o arquivo em `style/components/` e adicione um `@import` correspondente em `main.css`.
3. Declare novos tokens em `variables.css` para preservar consistencia.
4. Documente mudancas no `style/README.md` para orientar o time.

## Paleta de cores e tokens
### Variaveis semanticas (`style/variables.css`)
| Grupo        | Variavel             | Valor   | Uso sugerido                                 |
|--------------|----------------------|---------|----------------------------------------------|
| Marca        | `--color-primary`    | #e55125 | Butoes primarios, destaques principais       |
| Marca        | `--color-primary-dark` | #d14a1f | Hover de butoes primarios                    |
| Marca        | `--color-primary-light` | #f6754a | Gradientes e backgrounds leves               |
| Acento       | `--color-secondary`  | #faa61a | Callouts, badgets e areas de alerta positiva |
| Acento       | `--color-accent`     | #bb2828 | Alertas negativos ou highlights pontuais     |
| Estados      | `--color-success`    | #28a745 | Indicadores de sucesso                       |
| Estados      | `--color-success-strong` | #059669 | Acoes confirmadas/de destaque                |
| Estados      | `--color-danger`     | #dc2626 | Mensagens de erro                            |
| Texto        | `--text-primary`     | #181716 | Texto principal                              |
| Texto        | `--text-secondary`   | #757575 | Subtitulos, texto auxiliar                   |
| Texto        | `--text-muted`       | #666666 | Labels desativados                           |
| Fundo        | `--color-gray-50`    | #f8f9fa | Fundo claro universal                        |
| Fundo        | `--color-gray-100`   | #f5f5f5 | Cards e blocos neutros                       |
| Fundo        | `--color-gray-250`   | #e0e0e0 | Divisores sutis                              |
| Contraste    | `--color-black`      | #000000 | Texto sobre fundos claros                    |
| Contraste    | `--color-white`      | #ffffff | Texto sobre fundos escuros                   |

> Consulte `variables.css` para a lista completa de neutros intermediarios (`--color-gray-150` ate `--color-gray-700`).

### Tokens herdados do template (`style/style.css`)
| Categoria     | Variavel                        | Valor   | Observacao                                   |
|---------------|---------------------------------|---------|----------------------------------------------|
| Tema          | `--dl-color-theme-primary1`     | #bf4408 | Laranja escuro usado em butoes e icones      |
| Tema          | `--dl-color-theme-primary2`     | #e65103 | Laranja medio para gradientes                |
| Tema          | `--dl-color-theme-secondary1`   | #ffffff | Texto em butoes escuros                      |
| Tema          | `--dl-color-theme-secondary2`   | #fbf1eb | Detalhes de cards                            |
| Neutros       | `--dl-color-theme-neutral-dark` | #191818 | Texto global                                 |
| Neutros       | `--dl-color-theme-neutral-light`| #fbfaf9 | Background geral                             |
| Radial        | `--dl-color-default-radial`     | rgb(250 145 26 / 100%) | Gradientes especiais |

### Tipografia e espacamento
- Fontes carregadas: Inter, Montserrat, Passion One, STIX Two Text, Noto Sans.
- Token principal: `--font-primary` (Montserrat) definido em `variables.css`.
- Unidades de espacamento (`style/style.css`):
  - `--dl-layout-space-unit`: 16px (base)
  - `--dl-layout-space-halfunit`: 8px
  - `--dl-layout-space-oneandhalfunits`: 24px
  - `--dl-layout-space-twounits`: 32px
  - `--dl-layout-space-threeunits`: 48px
  - `--dl-layout-space-fourunits`: 64px
  - `--dl-layout-space-fiveunits`: 80px
  - `--dl-layout-space-sixunits`: 96px
- Raios padrao: `--dl-layout-radius-cardradius` (8px), `--dl-layout-radius-buttonradius` (24px), `--dl-layout-radius-imageradius` (8px) e `--dl-layout-radius-round` (50%).

## Scripts (diretorio `src/js/`)
| Arquivo                   | Descricao                                                                 |
|---------------------------|---------------------------------------------------------------------------|
| `script.js`               | Navegacao SPA simples baseada em classes `.page` / `.nav-link`.          |
| `script-optimized.js`     | Versao otimizada com cache de DOM, memoizacao, debouncing e fallback.     |
| `image-optimizer.js`      | Lazy loading de imagens, suporte a WebP e placeholders inline base64.     |
| `performance-monitor.js`  | Coleta Core Web Vitals, timings e envia relatorio opcional a `/api/performance`. |

> Importe apenas os scripts necessarios para evitar carga desnecessaria na landing page final.

## Assets
- Utilize nomes minusculos e sem espacos em `assets/` para evitar problemas de path.
- Prefira formatos otimizados (`.webp`, `.svg`) quando existir alternativa.
- Atualize `style/overrides.css` ao alterar imagens aplicadas via `background-image`.

## Checklist apos modificacoes
- [ ] Testar a renderizacao em diferentes larguras para validar breakpoints.
- [ ] Verificar o console do navegador em busca de erros de rede ou JS.
- [ ] Confirmar que todos os caminhos de imagem apontam para arquivos existentes em `assets/`.
- [ ] Reutilizar tokens de cor e tipografia antes de introduzir valores hard-coded.

## Roadmap sugerido
- Integrar pipeline de build (Vite, Parcel ou similar) para minificacao e cache busting.
- Automatizar auditoria de acessibilidade (Lighthouse, axe) e lighthouse budget.
- Evoluir para componentes reutilizaveis (React, Vue ou Web Components) quando houver necessidade de dinamismo.
- Configurar CI simples para validar links, run lint e executar testes de regressao visual.

## Referencias cruzadas
- Guia detalhado de estilos: `style/README.md`.
- Templates de contribuicao e fluxo de PR: `.github/`.
- Scripts de desempenho e interacao: `src/js/`.

## Licenca
Projeto de estudo. Utilize como referencia para organizar landing pages modulares e implementar otimizacoes front-end.
