# Portfólio Lorissette13

Portfólio pessoal com estética retro-moderna (jornal 30-50s). Sistema modular com blog pessoal, galeria visual, timeline interativa, favoritos e navegação responsiva.

## 🚀 Quick Start

```bash
# Clone, instale e rode localmente
npm install
python -m http.server 8000  # ou: npx serve .
# Acesse: http://localhost:8000
```

## 📁 Estrutura

```
index.html                          # Home (layout + inline header)
pages/
  galeria.html, cotidiano.html, projetos.html, trajetoria.html, quem-sou.html
components/
  header.html, footer.html, nav-menu.html, post-card.html, timeline-preview.html
assets/
  css/
    tokens.css (cores/espaçamento)     → layout.css → style.css → home.css
    buttons.css, filters.css, etc.     → aplicados por página
  js/
    utils/
      typewriter.js (animação logo)
      component-loader.js (carregamento HTML)
      component-checker.js (testes)
    gallery.js, posts.js, projects.js, timeline.js (módulos de página)
    projects-page.js, trajectory-page.js, quem-sou-page-init.js (lógica específica)
  data/
    posts/, projects/, trajectory/, gallery/ (conteúdo em Markdown/JSON)
```

## 📝 Adicionar Conteúdo

Crie arquivos Markdown em:
- **Posts**: `assets/data/posts/YYYY-MM-DD-slug.md`
- **Projetos**: `assets/data/projects/YYYY-MM-DD-slug.md`
- **Trajetória**: `assets/data/trajectory/YYYY-MM-DD-slug.md`
- **Galeria**: `assets/data/gallery/YYYY-gallery-NNN-slug.json`

**Referência completa**: veja [PROMPT_CONSOLIDADO.md](PROMPT_CONSOLIDADO.md)

## 🎨 Customização

- **Cores/Espaços**: editar `assets/css/tokens.css`
- **Conteúdo**: arquivos Markdown em `assets/data/`
- **Layout/Estrutura**: HTML em `pages/` e `components/`

## ✅ Testes & Validação

### Verificar integridade de componentes

```javascript
// 1. Abra a home ou qualquer página
// 2. No console do navegador:
ComponentChecker.runAll()

// Esperado: ✓ todos os testes passarem
// Checa: header, footer, navegação, CSS, funções globais
```

Ou acesse com query param:
```
http://localhost:8000/?debug=components
http://localhost:8000/pages/galeria.html?debug=components
```

### Componentes Obrigatórios

Todas as páginas devem ter:
- ✅ Header (logo + navegação)
- ✅ Footer (informações de contato)
- ✅ Navegação menu (links funcionais)
- ✅ CSS carregado (tokens, layout, página específica)
- ✅ Funções globais (`loadComponent`, `initTypewriter`)

Se algum teste falhar, abra o console e veja:
```javascript
ComponentChecker.checkHeader()      // Detalha problemas do header
ComponentChecker.checkFooter()      // Detalha problemas do footer
ComponentChecker.checkNavigation()  // Detalha problemas do menu
ComponentChecker.checkCSS()         // Verifica stylesheets
ComponentChecker.checkGlobalFunctions()  // Verifica funções window
```

## 🛠️ Stack

HTML5, CSS3 (variáveis + grid), JavaScript ES6+ (vanilla), Markdown + YAML, localStorage

## 🔄 Workflow

1. Edite conteúdo em `assets/data/`
2. Teste localmente: `python -m http.server 8000`
3. Rode testes: `ComponentChecker.runAll()`
4. Commit → push → deploy

## 📚 Arquitetura

- **Modular**: Cada componente independente
- **Reutilizável**: Utilities em `utils/` para compartilhamento
- **Testável**: ComponentChecker valida integridade
- **Responsivo**: Grid 4→2→1 conforme tela
- **Sem build**: Vanilla JS + CSS (sem webpack/babel)

## 📄 Licença

Projeto pessoal - uso livre para referência e estudo
