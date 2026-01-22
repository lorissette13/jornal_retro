# 📋 REGRAS PERMANENTES - lorissette13

## 🚀 SPRINT FIXES v3.0 - Resumo de Novas Regras (7 Regras - Máx 60 chars)

| Regra | Descrição |
|-------|-----------|
| **Seções Permanentes** | "Experiências & Conquistas" + "Habilidades" hardcoded na HOME |
| **Espaçamento Home** | `.who-section` e `.news-grid`: margin 30px (não 60px) |
| **Hover Cards** | `.news-item`, `.project`: `translateX(8px)` no hover |
| **Footer Retro** | Componente em `components/footer.html`, em TODAS páginas |
| **Sem Favoritos** | Sistema removido, campo JSON mantido para future use |
| **Botões Sem Linha** | `text-decoration: none !important` em TODO btn classes |
| **Cards Espaçamento** | Gap 50px entre cards, margin-bottom 50px antes botão voltar |

## 🎯 Decisões Técnicas (Essenciais)

| Decisão | Regra |
|---------|-------|
| **Cores** | `tokens.css` sempre |
| **Layout** | `layout.css` |
| **Botões** | `buttons.css` |
| **Header** | `header.css` + `header-loader.js` |
| **Tipografia** | Fonte padrão monospace (Special Elite) em TODO site via `body` |
| **Footer** | ✅ Obrigatório em TODAS as páginas |
| **Botão HOME** | ✅ Visível em páginas internas, oculto na HOME |
| **Typewriter** | `assets/js/typewriter.js` ativo sempre |
| **Componentes** | `/components/` carregados dinamicamente |
| **Dados** | Centralizado em `assets/content/` |
| **Funções** | `setup*()`, `display*()`, `fetch*()`, `render*()` |
| **Módulos** | Testar em HOME + página interna |
| **Testes** | 30% cobertura essencial, consolidado em `tests/index.test.js` |
| **Scripts Diagnóstico** | ✅ SEMPRE em Python, REMOVIDO antes de add/commit/push |

---

## 🏛️ REGRAS PERMANENTES v3.0 (PODE SER REMOVIDA APENAS COM PEDIDO EXPRESSO)

**Nota Importante**: As regras abaixo são PERMANENTES. Para remover qualquer uma, é necessário fazer um pedido EXPLÍCITO como: _"Remova a regra de [título]"_.

**Total de Regras Permanentes**: 14 (7 anteriores + 7 novas da Sprint Fixes)

### 1. 📝 Scripts Diagnóstico - SEMPRE Python
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Scripts Diagnóstico"]**
- ✅ Todo script diagnóstico/debugging: **OBRIGATORIAMENTE em Python** (`.py`)
- ✅ Removido **ANTES de `git add`** (nunca commitado)
- ✅ Exemplos válidos: `debug-home-css.py`, `trace-css.py`, `validate-fonts.py`
- ✅ Se criado: executar, analisar output, `rm [script].py` antes de commit

### 2. 🎬 Typewriter Module - Centralizado em `assets/js/typewriter.js`
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Typewriter Module"]**
- ✅ UMA única função: `initTypewriter()` em `assets/js/typewriter.js`
- ✅ Targets APENAS elemento com `id="typewriter-logo"` (logo/título)
- ✅ Velocidade: 100ms por caractere (elegante, legível)
- ✅ Safe check: `if (!element) return;` (não quebra se elemento não existe)
- ✅ Exportado globalmente: `window.initTypewriter`
- ✅ TODAS as 6 páginas chamam: `window.addEventListener('DOMContentLoaded', initTypewriter)`
- ✅ Sem duplicação de lógica (modular, reutilizável)

### 3. 🎨 Navegação - Hover Elegante (Dourado → Verde)
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Navegação Hover"]**
- ✅ Cor base `.nav-item`: `#d4af37` (dourado chique)
- ✅ Cor hover: `var(--color-accent-sage)` (#7E8C54 - verde elegante)
- ✅ Display: `inline-block` (sublinhado proporcional ao texto)
- ✅ Underline animation: `1px → 2px` em `0.25s cubic-bezier(0.4, 0, 0.2, 1)`
- ✅ Sem borders, background transparente
- ✅ Consistente em: `header.css` + `navigation.css` + `style.css`

### 4. 🔤 Tipografia - Monospace (Special Elite) em TODO Site
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Tipografia Monospace"]**
- ✅ `body { font-family: var(--font-family-mono); }` em `layout.css`
- ✅ Toda herança vem do `body` (SEM exceções de font-family)
- ✅ ZERO font-family declarations em outros arquivos (não redundar)
- ✅ Font carregada: **Special Elite** do Google Fonts
- ✅ **NUNCA** carregar Times New Roman (removido de Google Fonts URL)
- ✅ Resultado: 100% monospace em HOME + 5 páginas internas

### 5. 🔗 Google Fonts - APENAS Special Elite (SEM Times New Roman)
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Google Fonts"]**
- ✅ URL em `index.html`: `?family=Special+Elite&display=swap`
- ✅ **NUNCA adicionar** `&family=Times+New+Roman` (sobrescreve CSS monospace)
- ✅ Query string de cache: `?v=2.0` em TODO arquivo CSS em todas 6 páginas
- ✅ Cache buster atualizado quando font muda

### 6. 🐛 Sintaxe - SEM `:components/` ou `:assets/` Prefixes
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Sintaxe Prefixes"]**
- ✅ Primeira linha de arquivo NUNCA contém `:components/footer.html` (erro)
- ✅ Primeira linha de arquivo NUNCA contém `:assets/css/navigation.css` (erro)
- ✅ Exemplo ERRADO: `:assets/js/tech-carousel.js`
- ✅ Exemplo CORRETO: `<!-- Tech Carousel Module -->`

### 7. 💾 Cache Busting - Query Strings em TODO CSS
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Cache Busting"]**
- ✅ TODO arquivo HTML carrega CSS com `?v=X.X` query string
- ✅ Exemplo: `<link rel="stylesheet" href="assets/css/style.css?v=2.0">`
- ✅ Atualizar versão quando CSS é significativamente mudado
- ✅ Força refresh do browser (sem cache do arquivo antigo)

### 8. 🎯 Seções Permanentes - Experiências & Habilidades (Task 6)
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Seções Permanentes"]**
- ✅ "Experiências & Conquistas" hardcoded em `index.html` (linhas 51-56)
- ✅ "Habilidades Técnicas" hardcoded em `index.html` (linhas 62-66)
- ✅ Ambas são HTML estático (não dependem de JS/fetch)
- ✅ Sempre visíveis na HOME mesmo com erros JavaScript
- ✅ Testadas em `tests/index.test.js` (Task 6)

### 9. 📏 Espaçamento Padrão - Seções Home (Task 1)
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Espaçamento Padrão"]**
- ✅ `.who-section`: margin-bottom `30px` (não 60px)
- ✅ `.news-grid`: margin `30px 0` (não 60px 0)
- ✅ Simetria: 30px acima/abaixo da seção
- ✅ Remove "barra amarela" visual (excesso spacing)
- ✅ Aplicado em `assets/css/style.css` e `header.css`

### 10. 🪰 Hover Cards - Transform Elegante (Task 2)
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Hover Cards"]**
- ✅ `.news-item:hover`, `.project:hover`: `transform: translateX(8px)`
- ✅ `.tag-category:hover`: mesmo `translateX(8px)`
- ✅ `will-change: transform` para performance
- ✅ SEM `animation: forwards` (evita opacity: 0 invisibility)
- ✅ Overflow: visible em parent (não clipar movimento)
- ✅ Aplicado em `assets/css/style.css`

### 11. 🦶 Footer Retro - Componente Reusável (Task 3)
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Footer Retro"]**
- ✅ Arquivo: `components/footer.html` (sempre usar este)
- ✅ Links: email, github, linkedin (rel="noopener noreferrer")
- ✅ Separador: `text-decoration: line-through` ("developed...")
- ✅ Font: Times New Roman (typewriter)
- ✅ Hover: color → sage `#7E8C54` + `scale(1.05)`
- ✅ Carregado em: HOME + 5 páginas internas

### 12. ⭐ Sistema de Favoritos - REMOVIDO (Task 4)
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Sistema de Favoritos"]**
- ✅ Todas funções removidas: `toggleTimelineFavorite()`, `saveFavoritesToLocalStorage()`
- ✅ Botão ★/☆ removido de `createTimelineItem()` template
- ✅ Filtro 'favorites' removido de `setTimelineFilter()`
- ✅ Campo `favorite` em JSON mantido (para "future implementation")
- ✅ `loadFeaturedExperiences()` agora: sort by year DESC, return first N
- ✅ Aplicado em `assets/js/timeline.js`

### 13. 🔘 Botões - Sem Sublinhado (Task 5)
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Botões Sem Sublinhado"]**
- ✅ Base selector: `text-decoration: none !important`
- ✅ Comprehensive selector: `a[class*="btn"]` (todos botões)
- ✅ Todos estados: hover, visited, active, focus
- ✅ ALL 6 botões HOME afetados: "linha do tempo", "stack completo", etc.
- ✅ Aplicado em `assets/css/buttons.css`

### 14. 📐 Espaçamento Cards - Gap & Margin (Task 7)
**[REGRA PERMANENTE - Não remover sem pedido expresso: "Remova a regra Espaçamento Cards"]**
- ✅ `.projects-grid`: gap `var(--gap-2xl)` (50px)
- ✅ `.posts-container`: gap `var(--gap-2xl)` (50px)
- ✅ `.projects-container`: margin-bottom `var(--spacing-3xl)` (50px)
- ✅ `.posts-container`: margin-bottom `var(--spacing-3xl)` (50px)
- ✅ Melhor separação visual entre cards e botão voltar
- ✅ Aplicado em `assets/css/projects.css` e `posts.css`

## 📐 Arquitetura Essencial

```
index.html (home, header inline)
├── assets/
│   ├── css/
│   │   ├── tokens.css (variáveis SEMPRE!)
│   │   ├── header.css (logo 4.5rem home / 2.5rem internas)
│   │   ├── layout.css (grid/flex)
│   │   ├── navigation.css (menu + botão home)
│   │   └── page.css (páginas internas)
│   ├── js/
│   │   ├── header-loader.js (menu + nav)
│   │   ├── utils/typewriter.js (digitação)
│   │   ├── utils/component-loader.js
│   │   └── [page-modules: posts.js, projects.js, etc]
│   └── content/
│       ├── blog/
│       │   ├── data.json (todos posts)
│       │   └── images/
│       ├── projects/
│       │   ├── data.json (todos projetos)
│       │   └── images/
│       ├── timeline/
│       │   ├── data.json (todas experiências)
│       │   └── images/
│       └── gallery/
│           ├── data.json (todas imagens)
│           └── images/
├── pages/*.html (classe="internal-page" obrigatória)
├── components/
│   ├── header.html
│   ├── footer.html
│   └── nav-menu.html
└── tests/
    └── index.test.js (22 testes essenciais)
```

## 🎨 Componentes Obrigatórios

### Botões Home - Padrão Essencial ✅ 
**[REGRA PERMANENTE - Não remover sem pedido expresso]**

- **Classe obrigatória**: TODOS os botões da home usam `.btn-read-more`
- **Elementos**: 
  - trajetória (2): "linha do tempo", "stack completo"
  - projetos: "ver todos os projetos"
  - cotidiano: "ver cotidiano completo"
  - galeria: "ver galeria completa"
- **Proporção**: 100% idêntica entre botões
  - Desktop: `padding: 15px 35px; font-size: 1.05rem;`
  - Tablet: `padding: 13px 30px; font-size: 0.98rem;`
  - Mobile: `padding: 12px 25px; font-size: 0.92rem;`
- **Texto**: `white-space: nowrap;` (SEMPRE em uma linha)
- **Cores base**: Gradiente `--color-accent-olive` (#556B2F) → `--color-accent-olive-light` (#6B8E23)
- **Hover**: Mesmo verde (olive-light → sage-light), SEM ouro/dourado
- **Shine effect**: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)` com transição 0.6s
- **Wrapper HTML obrigatório**: `<div class="btn-container">` com `display: flex; justify-content: center;`
- **Contexto tags-section**: Limite máximo de 300px (`.tags-section .btn-container { max-width: 300px; }`)
- **Referência visual**: IGUAL ao padrão da página cotidiano (sem desvios)

### Header (em TODAS as páginas)
- ✅ **Footer** carregado via `loadComponent('footer-container', '../components/footer.html')`
- ✅ **Menu** com HOME link (visível em internas, oculto em home)
- ✅ **Logo** com typewriter effect
- ✅ Classe `hide-on-home` para ocultar HOME apenas na home page

### Navigation (nav-menu.html)

```html
<a href="./index.html" class="nav-item hide-on-home" data-page="home">home</a>
```
- `hide-on-home` = display:none na HOME
- Outras páginas: link funciona normalmente

## 📊 Dados - Estrutura Centralizada (v1.1+)

**Local**: `assets/content/` (pronto para API/MongoDB)

```json
{
  "blog/data.json": [{_id, title, category, date, favorite, tags, content}],
  "projects/data.json": [{_id, title, status, featured, date, description}],
  "timeline/data.json": [{_id, title, company, period, featured, content}],
  "gallery/data.json": [{_id, title, category, date, image_url, description}]
}
```

**Carregamento**: Cada módulo usa `loadJSON('assets/content/[section]/data.json')`

## ✅ Testes - 30% Essencial (22 testes)

**Arquivo único**: `tests/index.test.js`

**Cobertura obrigatória**:
- ✅ Componentes carregam (header, footer)
- ✅ Dados carregam (posts, projetos, timeline, galeria)
- ✅ HOME link visível em páginas internas
- ✅ Typewriter effect existe
- ✅ Cores tokens aplicadas
- ✅ Navegação básica funciona

**Removed**: 40+ testes redundantes (visual.test.js, navigation.test.js, main.test.js)

## 🔄 Workflow Essencial

1. **Adicionar conteúdo**: `assets/content/[section]/data.json`
2. **Estilo**: Usar `tokens.css` sempre (variáveis)
3. **Testar**: 
   - `npm test` (testes automáticos)
   - `http://localhost:8000/?debug=components` (visual)
4. **Commit**: Mensagem clara (fix/feat/refactor)
5. **Push**: GitHub

## ✅ Checklist Obrigatório (SEMPRE)

- ✓ Header presente (logo + menu com HOME)
- ✓ Footer presente em TODAS as páginas
- ✓ Botão HOME visível em páginas internas
- ✓ CSS carregado (tokens aplicados)
- ✓ Dados carregam de `assets/content/`
- ✓ Sem erros console
- ✓ Links funcionam (HOME, nav, botões)
- ✓ Typewriter ativo
- ✓ Testes passam (npm test)

## 📚 Stack Final

- **Frontend**: HTML5 + CSS3 Grid/Flexbox + Vanilla JS (ES6+)
- **Dados**: JSON centralizado (`assets/content/`)
- **Componentes**: HTML dinâmicos via `loadComponent()`
- **Estilo**: Tokens-based (design system em CSS)
- **Testes**: Jest com 30% cobertura essencial
- **Design**: Retro 30-50s, 4→2→1 responsivo
- **Fonts**: Special Elite + Times New Roman

---
**Última atualização**: Jan 22, 2026  
**Versão**: 3.0 (Sprint Fixes Visuais & UX - 14 Regras Permanentes)
