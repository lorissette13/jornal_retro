# 📋 REGRAS PERMANENTES - lorissette13

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

## 🏛️ REGRAS PERMANENTES v2.0 (PODE SER REMOVIDA APENAS COM PEDIDO EXPRESSO)

**Nota Importante**: As regras abaixo são PERMANENTES. Para remover qualquer uma, é necessário fazer um pedido EXPLÍCITO como: _"Remova a regra de [título]"_.

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
**Versão**: 2.0 (Sprint Tipografia & Modularização - 7 Regras Permanentes)
