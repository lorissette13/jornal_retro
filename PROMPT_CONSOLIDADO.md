# PORTFÓLIO LORISSETTE13 - PROMPT CONSOLIDADO

## 📋 PROJETO
Portfólio retro (30-50s): front-end dev, Special Elite + Times New Roman, posts+projetos+trajetória em Markdown.

## 🏗️ STACK
- **Frontend**: HTML5 + CSS3 Grid + Vanilla JS (ES6+)
- **Conteúdo**: Markdown + YAML em `assets/data/`
- **Modular**: Sem build, sem frameworks
- **Responsivo**: 4→2→1 colunas (desktop→tablet→mobile)

## 📁 ESTRUTURA
```
index.html (home, header inline)
pages/ (6 páginas internas, components dinâmicos)
assets/
  ├── css/ (tokens, layout, page-specific)
  ├── js/utils/ (typewriter, loader, checker)
  ├── js/ (module por página)
  └── data/ (posts, projects, gallery, trajectory)
components/ (header, footer, reusáveis)
```

## 🎨 REGRAS ESSENCIAIS
1. Cores em `tokens.css`
2. Layout em `layout.css`
3. Botões em `buttons.css` (SEMPRE)
4. Componentes em `/components/`
5. Testes: `?debug=components`

## 📝 CONTEÚDO

### Posts: `assets/data/posts/YYYY-MM-DD-slug.md`
```yaml
---
title: "título"
category: "música|jogos|filmes|livros|boardgames|dev-life|viagens"
date: "YYYY-MM-DD"
favorite: true/false
tags: ["tag1", "tag2"]
---
## Conteúdo
```

### Projetos: `assets/data/projects/YYYY-MM-DD-slug.md`
```yaml
---
title: "Nome"
status: "completed|in-progress"
featured: true/false
date: "YYYY-MM-DD"
tech: ["tech1", "tech2"]
---
## Conteúdo
```

### Timeline: `assets/data/timeline/trajectory.md`
```yaml
---
title: "Experiência"
company: "Empresa"
period: "Período"
featured: true/false
---
## Responsabilidades
```

## 🔧 HISTÓRICO DE CORREÇÕES v2.0 (Sprint Tipografia & Modularização)

### Problema #1: Formalizar Regra de Scripts Diagnóstico ✅ RESOLVIDO
**Decisão Técnica**: Scripts diagnóstico SEMPRE em Python e REMOVIDOS antes de add/commit/push
**Arquivos Modificados**: `REGRAS_PERMANENTES.md`
**Status**: Regra adicionada. Todos scripts futuros seguem este padrão.

---

### Problema #2: Remover Efeito Typewriter dos Parágrafos + Modularizar ✅ RESOLVIDO
**Soluções Implementadas**:
- ✅ Criado módulo centralizado `assets/js/typewriter.js` com função `initTypewriter()`
- ✅ Efeito APENAS no elemento `#typewriter-logo` (logo/título)
- ✅ Velocidade: 100ms por caractere
- ✅ Paragrafos (`<p>`) removidos do targeting
- ✅ Todos páginas importam e usam: `index.html`, `quem-sou.html`, `projetos.html`, `cotidiano.html`, `trajetoria.html`, `galeria.html`

**Arquivos Modificados**: `typewriter.js` (novo), `index.html`, `pages/*.html` (6 páginas)
**Status**: Modularizado em 1 linha: `window.addEventListener('DOMContentLoaded', initTypewriter)`

---

### Problema #3: Estilizar Navegação com Hover Elegante ✅ RESOLVIDO
**Soluções Implementadas**:
- ✅ `.nav-item` cor padrão: `#d4af37` (dourado chique)
- ✅ Hover color: `var(--color-accent-sage)` (#7E8C54 - verde elegante)
- ✅ Underline animation: 1px → 2px em 0.25s cubic-bezier(0.4, 0, 0.2, 1)
- ✅ Display: `inline-block` (para sublinhado proporcional ao texto)
- ✅ Removido: borders, background colors, conflitos de estilo

**Arquivos Modificados**: `header.css`, `style.css`, `navigation.css`
**Status**: Navegação consistente em TODO site

---

### Problema #4: Padronizar Fonte Monospace em TODO Site ✅ RESOLVIDO
**Soluções Implementadas**:
- ✅ `body { font-family: var(--font-family-mono) }` em `layout.css`
- ✅ Removidas 30+ declarações redundantes de `font-family: 'Special Elite'`
- ✅ Removidas 15+ instâncias de `font-family: Times New Roman` (do CSS)
- ✅ Toda herança derivada do `body` (sem exceções)
- ✅ Font principal: **Special Elite** (Google Fonts, monospace elegante)

**Arquivos Modificados**: `layout.css` (body), `buttons.css`, `header.css`, `style.css`
**Removed**: 45+ linhas de código redundante
**Status**: 0 font-family declarations (tudo herda de body)

---

### Problema #5: Otimizar Efeito Typewriter no Carregamento ✅ RESOLVIDO
**Soluções Implementadas**:
- ✅ Lógica centralizada em `typewriter.js` (sem duplicação)
- ✅ 1 função pura: `initTypewriter()` com 15 linhas
- ✅ Timing: 100ms entre caracteres (velocidade elegante)
- ✅ Safe check: retorna se elemento não existe (`if (!element) return`)
- ✅ Export global: `window.initTypewriter` (acessível de qualquer página)

**Arquivos Modificados**: `typewriter.js` (refatorado)
**Status**: Performance melhorada, sem delays

---

### Problema #6: Corrigir Sintaxe Erronea (`:components/`, `:assets/` prefixes) ✅ RESOLVIDO
**Soluções Implementadas**:
- ✅ Removido `:components/footer.html` de `components/footer.html`
- ✅ Removido `:components/header.html` de `components/header-old.html`
- ✅ Removido `:components/timeline-preview.html` de `components/timeline-preview.html`
- ✅ Removido `:components/post-card.html` de `components/post-card.html`
- ✅ Removido `:assets/css/navigation.css` de `assets/css/navigation.css`
- ✅ Removido `:assets/js/tech-carousel.js` de `assets/js/tech-carousel.js`
- ✅ Removido `:assets/js/projects.js` de `assets/js/projects.js`
- ✅ Removido `:assets/css/posts.css` de `assets/css/posts.css`
- ✅ Removido `:assets/css/index.css` de `assets/css/index.css`
- ✅ Removido `:assets/css/projects.css` de `assets/css/projects.css`

**Arquivos Modificados**: 10 arquivos com erros de sintaxe
**Status**: 0 syntax errors

---

### Problema #7: Corrigir Fontes na Home (Google Fonts + Cache) ✅ RESOLVIDO
**Root Cause Identificado**: 
`index.html` estava carregando `Times+New+Roman` do Google Fonts, sobrescrevendo CSS body monospace

**Diagnostic Process**:
1. Criado `debug-home-css.py` → CSS chain estava correto
2. Criado `trace-css.py` → Revelou culprit: `index.html` carregava Times+New+Roman, `projetos.html` não
3. Google Fonts URL em `index.html`: `?family=Special+Elite&family=Times+New+Roman&display=swap`

**Soluções Implementadas**:
- ✅ Removido `&family=Times+New+Roman` de `index.html` Google Fonts link
- ✅ Adicionado `?v=2.0` query string em todas 6 páginas (cache busting)
- ✅ Home agora renderiza com monospace correto
- ✅ Diagnostic scripts removidos (`debug-home-css.py`, `trace-css.py`)

**Arquivos Modificados**: `index.html` (Google Fonts), `quem-sou.html`, `projetos.html`, `cotidiano.html`, `trajetoria.html`, `galeria.html` (query strings)
**Status**: Todo site com monospace uniformemente (home + 5 páginas internas)

## � ARQUIVOS EXISTENTES (NÃO CRIAR NOVOS)

**Regra Permanente**: Não criar mais arquivos `.md` de instruções. Tudo deve estar em:

1. **PROMPT_CONSOLIDADO.md** (este arquivo) - Stack, estrutura, regras gerais
2. **REGRAS_PERMANENTES.md** - Regras que não podem ser removidas sem pedido expresso
3. **TESTES.md** - Guia de execução e cobertura de testes
4. **README.md** - Documentação do projeto

**Arquivos que NÃO devem existir**:
- ❌ CHANGELOG.md (histórico vai em seção deste arquivo)
- ❌ FIXES_*.md (tudo vai em HISTÓRICO DE CORREÇÕES aqui)
- ❌ MUDANCAS_*.md (consolidado acima)
- ❌ TESTES_COMPONENTES.md (consolidado em TESTES.md)
- ❌ TESTES_SIMPLIFICACAO.md (consolidado em TESTES.md)
- ❌ CODE_REVIEW_*.md (não criar)

## �📚 REFERÊNCIA
→ [REGRAS_PERMANENTES.md](REGRAS_PERMANENTES.md) (regras que não podem ser removidas)
→ [README.md](README.md)

**Nota**: Tudo documentado em REGRAS_PERMANENTES. Não criar .md novos para documentação.
