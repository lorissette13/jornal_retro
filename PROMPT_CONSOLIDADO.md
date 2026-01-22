# PORTFÓLIO LORISSETTE13 - PROMPT CONSOLIDADO

## 📋 PROJETO
**Portfólio retro**: desenvolvedor front-end, estética jornal 30-50s (Special Elite + Times New Roman). Sistema modular com posts, projetos e trajetória em Markdown.

## 🏗️ ARQUITETURA
```
index.html | style.css
assets/css/ → tokens.css, layout.css, buttons.css, filters.css, filter-colors.css
assets/js/ → gallery.js, posts.js, projects.js, timeline.js, carousel-new.js
assets/data/ → gallery/, posts/, projects/, trajectory/ (arquivos Markdown/JSON)
pages/ | components/
```

## 🎨 DESIGN SYSTEM
**CSS Modular**: tokens.css (variáveis), layout.css (body/container), buttons.css (botões), filters.css (filtros), filter-colors.css (cores).

**JS Modular**: gallery.js (galeria automática), carousel-new.js (genérico), posts.js/projects.js/timeline.js (componentes).

**Dados**: Arquivos independentes em assets/data/ - galeria (JSON), posts/projetos/trajetória (Markdown + YAML).

**Regra**: Editar em UM lugar: cores→tokens.css, layout→layout.css, botões→buttons.css.

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
## Parágrafo 1
Conteúdo...
```

### Projetos: `assets/data/projects/YYYY-MM-DD-slug.md`
```yaml
---
title: "Nome"
description: "Breve descrição"
date: "YYYY-MM-DD"
status: "completed|in-progress"
stack: ["tech1", "tech2"]
---
## Descrição
## Resultados
```

### Trajetória: `assets/data/trajectory/YYYY-MM-DD-slug.md`
```yaml
---
title: "Experiência"
position: "Cargo"
company: "Empresa"
period: "Jan 2020 - Dez 2021"
skills: ["skill1", "skill2"]
---
## Realizações
```

## 🔄 PROTOCOLO
1. Adicione conteúdo em `assets/data/` (Markdown/JSON)
2. Sistema carrega automaticamente
3. Novos estilos: variáveis em `tokens.css` primeiro
4. Teste → commit → push

### COMPONENTES CHAVE
**Layout**: Header typewriter, Grid 3→2→1 colunas, Footer
**Estilo**: Animações fade-in, Gallery carousel, Buttons olive green
**JS**: Carousel dinâmico, localStorage favoritos, smooth scroll

### FUNCIONALIDADES
✅ Gallery carousel | ✅ Dynamic content | ✅ Timeline + Posts + Projetos | ✅ Favoritos | ✅ Mobile responsivo

### SISTEMA DE POSTS
**Estrutura**: `assets/data/posts/YYYY-MM-DD-slug.md`
**Formato**: YAML front matter + Markdown
**Categorias**: música, jogos, filmes, livros, boardgames, dev-life, viagens
**Template**: `assets/data/posts/_template.md`

### TECNOLOGIAS
HTML5, CSS3 grid/flexbox, JS vanilla, Google Fonts, Markdown + YAML

---

## ⚙️ DECISÕES TÉCNICAS

### Menu Modular (Jan 2026)
**Problema**: Menu em todas as páginas
**Solução**: `components/nav-menu.html` carregado via fetch()
**Justificativa**: Evita duplicação, manutenção centralizada

### Layout Padronizado (Jan 2026)
**Problema**: Estilos inconsistentes
**Solução**: Módulos CSS com tokens centralizados
**Justificativa**: DRY principle, consistência visual

### UI da Home: Grid de Miniaturas (Jan 2026)
**Problema**: Carrossel horizontal inconsistente com página galeria
**Solução**: Grid 4x1 com miniaturas (mesmo padrão da página galeria)
**Mudanças**:
- Título/logo centralizado com `text-align: center`
- Efeito typewriter reativado no carregamento (`initTypewriter()`)
- Substituição de `.gallery-carousel` por `.thumbnails-container-home`
- Grid responsivo: 4→2→1 colunas (desktop→tablet→mobile)
- Ícones por categoria: 💻 setup, 🎮 games, ✈️ viagens, 🎪 eventos, 📁 projetos
**Justificativa**: Consistência visual, melhor UX mobile, alinhamento com design system

---

## 🚀 PRÓXIMOS PASSOS

### 1. Integração de Conteúdo
- Sistema para adicionar posts/projetos via interface
- Editor visual Markdown
- Agendamento de posts

### 2. Responsividade Mobile
- Layout para telas pequenas (320px+)
- Menu hamburger
- Galeria touch/swipe
- Tipografia responsiva

### 3. Página de Contato
- Formulário com validação
- Integração backend (Netlify Forms)
- Proteção anti-spam

### 4. APIs Externas
- Spotify: músicas favoritas/playlists
- Letterboxd: filmes assistidos
- Fallback gracioso

### 5. Performance & SEO
- Lazy loading, compressão
- Cache, meta tags, analytics

### 6. Recursos Avançados
- Modo escuro, busca interna
- Comentários, RSS, PWA

### 7. Manutenção
- Testes automatizados, CI/CD
- Monitoramento, backup

**STATUS**: Limpeza concluída, mobile em desenvolvimento, próximos: contato e APIs.

