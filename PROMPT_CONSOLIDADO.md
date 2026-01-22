# PORTFÓLIO LORISSETTE13 - PROMPT

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

## 🎨 REGRAS
1. Cores em `tokens.css`
2. Layout em `layout.css`
3. Componentes em `/components/`
4. Testes: `?debug=components`

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
---
## Descrição
```

### Trajetória: `assets/data/trajectory/YYYY-MM-DD-slug.md`
```yaml
---
title: "Cargo"
company: "Empresa"
period: "Jan 2020 - Dez 2021"
featured: true/false
---
## Realizações
```

## 🔄 WORKFLOW
1. Adicione conteúdo em `assets/data/`
2. Edite estilos em `tokens.css` (variáveis)
3. Teste: `?debug=components`
4. Commit → Push

## ✅ CHECKLIST SEMPRE
- Header + menu + footer carregados
- CSS aplicado (tokens, layout, page)
- Sem erros no console
- Links funcionam
- Testes passam

## 📂 DADOS

```
assets/data/
├── cotidiano/        ← Posts (JSON)
├── projetos/         ← Projects (JSON)
├── galeria/          ← Gallery (JSON)
└── trajetoria/       ← Timeline (JSON)

assets/images/
├── cotidiano/, projetos/, galeria/, trajetoria/
```

Preparado para MongoDB: cada arquivo com `_id`

## 🏗️ PADRÃO NOVO (v2+) - Módulos Limpos

### Nomenclatura Funções
| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Setup | `setup[Feature]()` | `setupFilters()`, `setupNavigation()` |
| Display | `display[Feature]()` | `displayPosts()`, `displayProjects()` |
| Fetch | `fetch[Feature]()` | `fetchPosts()`, `fetchProjects()` |
| Load | `load[Component]()` | `loadHeader()`, `loadFooter()` |
| Render | `render[Item]()` | `renderPostCard()`, `renderProjectCard()` |

### Evitar (v0 defasado)
❌ `loadComponent(path, container, {...args})`  
❌ Funções com +100 linhas de lógica mista  
❌ Variáveis globais sem namespace  

### Testes (30% cobertura)
```javascript
describe('setupFilters()', () => {
  test('deve adicionar listeners aos botões', () => {
    // Arrange + Act + Assert
  });
});
```

### Init Limpo
```javascript
async function init() {
  await loadHeader();
  await setupFilters();
  await setupNavigation();
  const data = await fetchPosts();
  await displayPosts(data);
}
document.addEventListener('DOMContentLoaded', init);
```

## 📍 MÓDULOS - Responsabilidades por Página

| Página | Arquivo JS | Responsabilidades | Home | Integração |
|--------|-----------|-------------------|------|-----------|
| **cotidiano** | `posts.js` | displayPosts(), setupFilters(), setupNavigation() | 3 posts featured | Testar em index + cotidiano.html |
| **projetos** | `projects.js` | displayProjects(), setupFilters(), paginação | 3-4 projects | Testar em index + projetos.html |
| **galeria** | `gallery.js` | displayGallery(), filtros, grid 4→2→1 | 6-8 destaques | Testar em index + galeria.html |
| **trajetória** | `trajectory-page.js` | displayTimeline(), ordem cronológica | 2-3 experiências | Testar em index + trajetoria.html |
| **quem-sou** | `quem-sou-page.js` + tech-carousel.js | Tech stack, bio, redes | Tech skills | Testar em index + quem-sou.html |
| **GLOBAL** | `header-loader.js` + utils.js | Header, Footer, Typewriter | TODAS as páginas | Testar em TODAS as 6 páginas |

**Regra**: Ao mexer em um módulo, testar em TODAS as páginas onde aparece (home + interna)

## 🎨 Design Unificado
- Cores: Sempre em `tokens.css`
- Botões: Sempre em `buttons.css`
- Filtros: Em `filters.css` (usa vars de tokens)
- Navegação: Em `navigation.css` (usa vars de tokens)
- Responsivo: 4→2→1 colunas (desktop→tablet→mobile)

## 📚 REFERÊNCIA
→ [REGRAS_PERMANENTES.md](REGRAS_PERMANENTES.md)  
→ [README.md](README.md)

**Nota**: Adicionar docs em REGRAS_PERMANENTES (sucinto). Não criar .md novos.


