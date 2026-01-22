# CHANGELOG - Portfólio Retro (jornal_retro)

Todas mudanças notáveis neste projeto serão documentadas neste arquivo.

## [Em Desenvolvimento] - 2026-01-22

### Padronização Visual das Colunas na Homepage

#### Adicionado
- 🎨 **Efeito hover padronizado**: Colunas trajetoria e projetos agora têm o mesmo movimento lateral ao passar o mouse que a coluna cotidiano
- 🎨 **Link "ver projeto" estilizado**: Link agora usa cores do tema (gradiente olive/sage) ao invés de cores fixas

#### Modificado
- 📝 **`assets/css/home.css`**
  - Adicionado `.news-item` com background, padding, bordas e efeito hover
  - Adicionado `.project-link` com gradiente temático e animação hover
  - Padronização visual entre todas as colunas da homepage

- 📝 **`assets/css/style.css`**
  - Adicionada importação do `home.css`
  - Adicionado efeito hover `translateX(5px)` aos `.news-item` (trajetória e projetos)
  - Movidas regras específicas da homepage para o final do arquivo para garantir prioridade de carregamento

### Limpeza de Código e Princípios Clean Code

#### Adicionado
- ✅ **Script de análise de código**: `analyze_code.py` - analisa funções não usadas, CSS duplicado, tamanhos de arquivos
- ✅ **Relatório de análise**: `code_analysis_report.json` - relatório completo das descobertas
- ✅ **Roadmap de desenvolvimento**: Seção "PRÓXIMOS PASSOS" em `PROMPT_CONSOLIDADO.md`

#### Modificado
- 📝 **`assets/css/layout.css`**
  - Atualizado para usar variáveis CSS em vez de valores hardcoded
  - `font-family: var(--font-family-serif)` em vez de `'Times New Roman', serif`
  - `color: var(--color-text-primary)` em vez de `#2a2018`

- 📝 **`PROMPT_CONSOLIDADO.md`**
  - Adicionada seção "PRÓXIMOS PASSOS" com roadmap detalhado
  - Inclui: integração de conteúdo, responsividade mobile, página de contato, APIs Spotify/Letterboxd

#### Removido
- ❌ **10 arquivos JS não utilizados**:
  - `assets/js/all-data.js` (25.2KB)
  - `assets/js/timeline-new.js`
  - `assets/js/carousel-new.js`
  - `assets/js/posts-new.js`
  - `assets/js/data-module.js`
  - `assets/js/projects-new.js`
  - `assets/js/dom-renderer.js`
  - `assets/js/index.js`
  - `assets/js/config.js`
  - `assets/js/utilities.js`

- ❌ **Regras CSS duplicadas** de `style.css` (raiz):
  - `html`, `body`, `body::before`, `body::after`
  - `.container`, `.container::before`
  - `.header`, `.date`, `.logo-section`
  - `.who-content`, `.who-column`, `.who-column:last-child::before`
  - `.news-item`, `.news-item:last-child`

#### Corrigido
- 🐛 **Layout da home restaurado**: Problema onde limpeza de CSS duplicado removeu regras essenciais da página inicial
- 🐛 **Carregamento universal de CSS**: `style.css` (raiz) agora importa módulos `layout.css`, `buttons.css`, etc.
- 🐛 **Regras duplicadas removidas**: Limpeza de `assets/css/style.css` para evitar conflitos de sobrescrita

#### Git Commits
```
[NOVO] fix: restore universal CSS loading by importing layout.css in root style.css
[NOVO] refactor: remove unused JS files (10 files, 3.2K linhas removidas)
[NOVO] refactor: remove duplicate CSS rules and update layout.css variables
[NOVO] feat: add code analysis script and update roadmap in PROMPT_CONSOLIDADO.md
```

#### Resultados da Análise
- **Redução**: 26 → 16 arquivos JS (-38%)
- **CSS duplicado**: Reduzido significativamente
- **Função não usada**: Apenas 1 identificada (função `later` em debounce)
- **Funcionamento**: Site testado e funcionando normalmente após mudanças

## [Em Desenvolvimento] - 2026-01-22

### Sistema de Menu Modular e Padronização

#### Adicionado
- ✅ **Menu modular reutilizável**
  - Novo arquivo: `components/nav-menu.html` - componente independente do menu de navegação
  - Menu aparece agora em TODAS as páginas (home + páginas internas)
  - Sistema automático de detecção de página ativa com classe `.active`
  - Links com contexto dinâmico (ajusta caminhos relativos conforme a página)

- ✅ **Header unificado**
  - `components/header.html` atualizado para carregar menu via módulo
  - Logo com link funcional para home em todas as páginas
  - Divisor visual (`.divider` e `.menu-divider`) consistente
  - Efeito typewriter preservado na home

#### Modificado
- 📝 **`index.html`** (home)
  - Refatorado para usar header como componente
  - Header agora carregado dinamicamente via `loadComponent()`
  - Script de carregamento otimizado para garantir ordem de execução correta
  - Efeito typewriter mantido através de script sincronizado

- 📝 **`components/header.html`**
  - Agora carrega menu via fetch do `nav-menu.html`
  - Script dinâmico que ajusta caminhos baseado no contexto (root vs pages/)
  - Função `updateActiveNavItem()` para destacar página atual

#### Removido
- ❌ Menu hardcoded de `index.html`
- ❌ Duplicação de menu HTML entre páginas

#### Notas de Implementação
- Menu usa `data-href-root` e `data-href-pages` para diferentes contextos
- Sistema de detecção de página ativa baseado em `window.location.pathname`
- Fetch assincronamente com fallback para garantir compatibilidade
- Links com `href="#"` atualizados dinamicamente via JavaScript

---

## [Em Desenvolvimento] - 2026-01-22

### Ajustes de Separadores Visuais e Limpeza de Estilos

#### Modificado
- 📝 **`assets/css/style.css`**
  - `.headline::after`: Alterado para usar apenas cor verde (sage) como o divider
  - `.gallery-title`: Adicionado separador `::after` similar ao divider-footer com cores verde/azeite
  - `.divider-footer`: Alterado para usar apenas cor verde (sage)

- 📝 **`style.css`** (raiz)
  - Removido `.gallery-section::before` com linha decorativa marrom
  - `.divider-footer`: Alterado de cores tan/brown para verde (color-accent-sage)

#### Removido
- Removido pseudo-elemento `::before` da `.gallery-section` que exibia linha decorativa em gradiente marrom

#### Notas de Design
- Padronização de cores: separadores agora usam paleta verde/azeite
- `divider`: verde sage puro
- `headline::after`: verde sage puro
- `gallery-title::after`: gradiente verde/azeite (como antes do divider-footer)
- `divider-footer`: verde sage puro

---

## [Em Desenvolvimento] - 2026-01-22

### Paginação de Galeria e Redesign do Carrossel - Novas Implementações

#### Adicionado
- ✅ **Paginação na página de galeria**
  - Grid de 8 fotos (4 colunas × 2 linhas)
  - Botões "← voltar" e "avançar →" alinhados à direita
  - Contador de páginas (ex: "página 1 de 3")
  - Suporte a filtros mantendo paginação

- ✅ **Carrossel moderno na home**
  - 2 imagens completas no centro (50% cada)
  - 2 imagens pela metade nas bordas (25% cada)
  - Scroll horizontal nativo com snap
  - Suporte a touch/swipe em mobile
  - Botões modernos com efeito shine/glass (← →)
  - Estados dos botões atualizados automaticamente

- ✅ **Correções de Estilos**
  - Centralizado `.btn-container` com flex
  - Centralizado `.gallery-pagination` com flex
  - Filtros mantidos alinhados à esquerda
  - Removido sublinhado de links `.btn-read-more`
  - Padronizado estilo de botões em `buttons.css`

#### Modificado
- 📝 **`assets/js/gallery.js`**
  - Adicionadas variáveis: `currentPage`, `itemsPerPage = 8`
  - Função `setupPaginationControls()` para gerenciar navegação
  - Função `updatePaginationControls()` para atualizar estados
  - `updateThumbnails()` agora suporta paginação com slice
  - `applyGalleryFilters()` reseta página ao filtrar
  - `setupHomeCarousel()` refatorado para scroll nativo

- 📝 **`assets/css/buttons.css`**
  - Adicionado `text-decoration: none !important` a `.btn-read-more`
  - Regras específicas para `a.btn-read-more` (todos os estados)

- 📝 **`assets/css/gallery.css`**
  - Paginação com layout flex (esquerda/direita)
  - Botões de navegação em flex-column
  - Margem reduzida para proximidade

- 📝 **`assets/css/filters.css`**
  - Adicionado `text-align: left` a `.filters-container`

- 📝 **`style.css`**
  - Redesign do `.gallery-carousel-container` com gap 30px
  - Nova estrutura `.gallery-carousel-wrapper` para flex
  - `.gallery-item` com 50% inicial, depois 25%
  - Scroll comportamento smooth com scroll-snap
  - Botões carrossel com gradientes e efeitos modernos
  - Regra específica `.gallery-button-container a` sem underline
  - Regra `.news-column .btn-read-more::after { content: none }`

- 📝 **`index.html`**
  - Botão "ver galeria completa" → "ver galeria"
  - Link direto `<a href="pages/galeria.html">` em vez de onclick
  - Adicionado `id` aos botões do carrossel (carousel-prev, carousel-next)
  - Nova estrutura: `.gallery-carousel-wrapper` englobando `.gallery-carousel`

- 📝 **`pages/galeria.html`**
  - Adicionado container `.gallery-pagination`
  - Botões "← voltar" e "avançar →" com IDs específicos
  - Contador de páginas com ID `pagination-counter`

#### Git Commits (Esperados)
```
[NOVO] feat: adicionar paginação de galeria com grid 4x2 (8 fotos)
[NOVO] feat: redesenhar carrossel home com scroll nativo
[NOVO] feat: centralizar botões home e galeria (exceto filtros)
[NOVO] fix: remover sublinhado de links btn-read-more
[NOVO] fix: corrigir alinhamento botões paginação galeria
```

---

### Refatoração Sistema de Galeria - Modular como Posts (Versão Anterior)

#### Adicionado
- ✅ **Pasta `assets/data/gallery/`** com 28 arquivos JSON modular (um por imagem)
  - Formato: `YYYY-ID-slug.json` (ex: `2024-gallery-001-setup-de-trabalho.json`)
  - Cada arquivo contém metadata da imagem
  - Template em `_template.json` para criar novas imagens
  - Carregamento automático por gallery.js

#### Modificado
- 📝 **`assets/js/gallery.js`** - Atualizado para carregar pasta em vez de JSON centralizado
  - Busca todos os arquivos de `assets/data/gallery/` via fetch
  - Carregamento paralelo de arquivos para melhor performance
  - Compatível com adição dinâmica de novas imagens

- 📝 **`pages/galeria.html`** - Removido menu de estatísticas
  - ❌ Removido: div `.gallery-stats` com estatísticas (0 imagens, 0 favoritas, etc)
  - Mantido: Filtros, carrossel, miniaturas, modal

#### Removido
- ❌ `assets/data/gallery.json` (agora em pasta modular)
- ❌ Função `updateGalleryStats()` (não mais necessária)
- ❌ Estatísticas da página (0 imagens, 0 favoritas, 0 categorias, 0 anos)

#### Como Adicionar Nova Imagem
1. **Criar arquivo JSON**:
   - Copie `assets/data/gallery/_template.json`
   - Renomeie para `YYYY-ID-slug.json` (ex: `2024-gallery-029-meu-setup.json`)
   - Preencha metadata (title, category, description, tags, etc)

2. **Adicionar imagem**:
   - Coloque arquivo `assets/images/gallery/nome-imagem.jpg`
   - Atualize `"image"` no JSON

3. **Commit e Deploy**:
   - Site carrega automaticamente na próxima inicialização
   - Sem necessidade de editar lists ou arrays centralizados

#### Git Commits
```
[NOVO] - refactor: converter galeria para sistema modular com pasta
[NOVO] - feat: adicionar 28 arquivos JSON em assets/data/gallery/
[NOVO] - feat: remover estatísticas não-críticas da página galeria
[NOVO] - docs: criar template para adicionar novas imagens
```

---

### Refatoração Sistema de Galeria (Limpar código duplicado) - Versão Anterior

#### Adicionado
- ✅ **12 novas imagens de mock** em `assets/data/gallery.json` (16 → 28 imagens)
  - Categorias: setup, games, viagens, eventos, projetos, livros, hobbies, cotidiano
  - Permite testar carrossel com múltiplos cards

#### Modificado
- 📝 **`assets/css/filters.css`** - Aumentar tamanho botões
  - Padding: 10px 22px → **14px 30px**
  - Font-size: 0.81rem → **0.95rem**
  - Melhor visualização e usabilidade dos filtros

- 📝 **`assets/js/gallery.js`** - Refatoração completa
  - **Removido**: GALLERY_DATA duplicado (28 itens) - agora carregado de `gallery.json`
  - **Removido**: função morta `loadFeaturedGalleryHome()` (não usada)
  - **Removido**: função morta `createGalleryPreview()` (não usada)
  - **Consolidado**: 2 versões de `loadFeaturedGallery()` em 1 função
  - **Consolidado**: localStorage simplificado
  - **Resultado**: reduzido de **701 para 505 linhas (-28%)**
  - Backup mantido em `gallery-legacy.js`

#### Removido (Código Morto)
- ❌ `assets/js/gallery-new.js` - nunca foi carregado no HTML
- ❌ `assets/js/carousel.js` - versão simplista, obsoleta (em favor de carousel-new.js)
- ❌ GALLERY_DATA de gallery.js (dados centralizados em gallery.json)

#### Checklist de Limpeza
- [x] Adicionar 12+ imagens mock em gallery.json
- [x] Aumentar tamanho dos botões de filtro
- [x] Remover duplicação de GALLERY_DATA
- [x] Consolidar loadFeaturedGallery em 1 função
- [x] Remover funções mortas (loadFeaturedGalleryHome, createGalleryPreview)
- [x] Remover gallery-new.js (código não utilizado)
- [x] Remover carousel.js (código não utilizado)
- [x] Testar funcionalidade com mock data

---

### Refatoração CSS Modular (Commits: 7faf8d4 até da994cc)

#### Adicionado
- ✅ **Módulo `assets/css/layout.css`** - Centraliza todos os estilos de layout global
  - Body com background gradiente e textura de papel
  - Container com borda dupla olive, espaçamento 50px top / 80px bottom
  - Page headers, footers e espaçamento padrão
  - Responsive breakpoints: 768px (tablet), 480px (mobile)

- ✅ **Módulo `assets/css/buttons.css`** - Padronização de todos os botões
  - `.btn-primary` / `.btn-read-more`: 15px 35px padding, olive gradient
  - `.btn-secondary` / `.btn-small`: 10px 25px padding, sage gradient
  - `.nav-btn` / `.pagination-btn`: 10px 20px padding, olive border
  - Efeito shine universal via pseudo-elemento `::before`
  - Estados: hover (translateY -3px, shadow aumentada), disabled (opacity 0.4)

- ✅ **Módulo `assets/css/filters.css`** - Estilos base de filtros
  - `.filters-container`: container transparente
  - `.filter-label`: Special Elite font, olive color, letter-spacing 1.5px
  - `.filter-btn`: 14px 30px padding, 0.95rem, glass effect com shine
  - `.filter-btn.active`: gold gradient, shadow aumentada
  - Layout horizontal com flex, gap 12px

- ✅ **Módulo `assets/css/filter-colors.css`** - Cores por categoria
  - `.filter-color-filmes`: red (#e63946)
  - `.filter-color-jogos`: blue (#457b9d)
  - `.filter-color-boardgames`: teal (#2a9d8f)
  - `.filter-color-livros`, `.filter-color-música`, `.filter-color-dev-life`
  - Cores de hover aumentadas para melhor visibility

#### Modificado
- 📝 **`assets/css/style.css`**
  - Adicionados imports: `@import 'tokens.css'`, `layout.css`, `buttons.css`, `filters.css`, `filter-colors.css`
  - Removidas ~100 linhas de duplicação (button styles, body styles)
  - Mantidos: navigation, hero, home-specific layouts
  - Reduzido de 963 para 856 linhas

- 📝 **`assets/css/page.css`**
  - Removidas ~45 linhas de duplicação (page-header, page-title, page-content)
  - Mantidos: interest-grid, interest-card, timeline-specific styles
  - Reduzido de 203 para 149 linhas

- 📝 **`assets/css/posts.css`**
  - Removidas ~25 linhas de duplicação (nav-btn styles)
  - Mantidos: posts-navigation, posts-grid, post-card styles

#### Git Commits
```
da994cc - fix: adicionar espaçamento acima e abaixo do container em todas as páginas
5798f88 - refactor: centralizar layout e estilos de body em módulo único layout.css
e28ec7d - refactor: centralizar estilos de botões em módulo único buttons.css
2fb3fc7 - refactor: extrair estilos de filtros em módulos separados
f0392ce - refactor: ajustar filtros layout horizontal com spacing
d5296a7 - refactor: remover espaçamento vertical dos filtros
a6e0464 - refactor: aplicar filtros em todas as páginas com cores
7faf8d4 - refactor: inicial estruturação dos filtros
```

---

## Projeto
**Portfólio Retro** - Estética jornal 30-50s, desenvolvedor front-end, sistema modular de posts/projetos/trajetória em Markdown.

**Tecnologias**: HTML5, CSS3 (modular), JavaScript vanilla, Google Fonts (Special Elite + Times New Roman)

**Responsável**: @lorissette13
