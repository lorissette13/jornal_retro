# 📋 REGRAS PERMANENTES - lorissette13

## 🎯 Decisões Técnicas (Essenciais)

| Decisão | Regra |
|---------|-------|
| **Cores** | `tokens.css` sempre |
| **Layout** | `layout.css` |
| **Botões** | `buttons.css` |
| **Header** | `header.css` + `header-loader.js` |
| **Footer** | ✅ Obrigatório em TODAS as páginas |
| **Botão HOME** | ✅ Visível em páginas internas, oculto na HOME |
| **Typewriter** | `typewriter.js` ativo sempre |
| **Componentes** | `/components/` carregados dinamicamente |
| **Dados** | Centralizado em `assets/content/` |
| **Funções** | `setup*()`, `display*()`, `fetch*()`, `render*()` |
| **Módulos** | Testar em HOME + página interna |
| **Testes** | 30% cobertura essencial, consolidado em `tests/index.test.js` |

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

### Header (em TODAS as páginas)
- ✅ **Footer** carregado via `loadComponent('footer-container', '../components/footer.html')`
- ✅ **Menu** com HOME link (visível em internas, oculto em home)
- ✅ **Logo** com typewriter effect
- ✅ Classe `hide-on-home` para ocultar HOME apenas na home page

### Botões - Padrão Obrigatório
- **Classes**: `.btn-read-more` (primário) e `.btn-small` (secundário)
- **CSS**: Sempre em `assets/css/buttons.css` (NUNCA em style.css)
- **Cores**: Gradiente olive - `--color-accent-olive` (#556B2F) a `--color-accent-olive-light` (#6B8E23)
- **Efeito**: Shine/brilho com `::before` pseudo-element (linear-gradient 90deg)
- **Texto**: `text-decoration: none !important;` para links
- **HTML obrigatório**: Nenhuma classe `news-btn` ou classes obsoletas
- **Verificação**: Validar cores.json antes de commit

### Parágrafos "Quem Sou" - Layout Lado-a-Lado
- **Classe CSS**: `.who-grid.two-columns` (OBRIGATÓRIO)
- **HTML**: `<div class="who-grid two-columns">` (NÃO deixar vazio)
- **Layout**: `grid-template-columns: repeat(2, 1fr)` em desktop
- **Altura**: ~140 caracteres por parágrafo (máximo 3 linhas)
- **Responsividade**: Muda para 1 coluna em 900px (mobile)

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
**Versão**: 1.2 (com footer, HOME button, dados centralizados, testes simplificados)
