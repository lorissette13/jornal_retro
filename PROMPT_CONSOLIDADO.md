# PORTFÓLIO LORISSETTE13 - PROMPT CONSOLIDADO

## 📋 PROJETO
**Portfólio retro**: desenvolvedor front-end, estética jornal 30-50s (Special Elite + Times New Roman). Sistema modular com posts, projetos e trajetória em Markdown.

## 🏗️ ARQUITETURA
```
index.html | style.css
assets/css/
  ├── tokens.css (variáveis centralizadas)
  ├── layout.css (body, container, page layout - espaçamento 50px top, 80px bottom)
  ├── buttons.css (todos tipos de botão)
  ├── filters.css (estilos base de filtros - padding 14px 30px, font-size 0.95rem)
  └── filter-colors.css (cores específicas por categoria)
assets/js/
  ├── gallery.js (carrega pasta data/gallery/ automaticamente)
  ├── posts.js, projects.js, timeline.js (componentes principais)
  └── carousel-new.js (classe Carousel genérica)
assets/data/
  ├── gallery/          (YYYY-ID-slug.json - cada imagem é um arquivo)
  ├── posts/           (YYYY-MM-DD-slug.md)
  ├── projects/        (YYYY-MM-DD-slug.md)
  └── trajectory/      (YYYY-MM-DD-slug.md)
assets/images/gallery/ (imagens reais - adicionar fotos aqui)
pages/ | components/
```

## 🎨 DESIGN SYSTEM
CSS modularizado para máxima reutilização e manutenção centralizada:

**Módulos CSS** (importados automaticamente via style.css):
- `tokens.css`: Variáveis de cores, espaçamento, tipografia, bordas, sombras
- `layout.css`: Body, container, headers, footers, espaçamento global (50px top, 80px bottom)
- `buttons.css`: Todos tipos de botão (btn-primary, btn-secondary, nav-btn) com efeito shine
- `filters.css`: Estilos base de componentes de filtro (14px 30px padding, 0.95rem font-size)
- `filter-colors.css`: Cores específicas por categoria (filmes, jogos, livros, etc)

**Módulos JavaScript**:
- `gallery.js`: Sistema de galeria modular - carrega `assets/data/gallery/*.json`
  - Cada imagem é um arquivo JSON separado (como posts em markdown)
  - Filtros, carrossel, modal, favoritos com localStorage
  - Adicione uma imagem: crie `YYYY-ID-slug.json` em `assets/data/gallery/`
- `carousel-new.js`: Classe Carousel genérica (reutilizável)
- `posts.js`, `projects.js`, `timeline.js`: Componentes principais

**Sistema de Dados Modular** (arquivos independentes):
- **Galeria**: `assets/data/gallery/2024-gallery-001-setup.json` (metadata)
  - Imagens em `assets/images/gallery/setup-2024.jpg`
- **Posts**: `assets/data/posts/YYYY-MM-DD-slug.md` (Markdown + YAML)
- **Projetos**: `assets/data/projects/YYYY-MM-DD-slug.md`
- **Trajetória**: `assets/data/trajectory/YYYY-MM-DD-slug.md`

**Regra Importante**: Sempre editar em UM ÚNICO LUGAR:
- Cores → `tokens.css`
- Layout/espaçamento → `layout.css`
- Botões → `buttons.css`
- Filtros → `filters.css` ou `filter-colors.css`

Principais variáveis: `--color-primary-brown`, `--color-accent-gold`, `--color-accent-olive`, `--color-accent-sage`, `--container-margin-y` (50px), `--container-margin-bottom` (80px), `--spacing-*`, `--font-family-serif`

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
## Título Parágrafo 1
Conteúdo...
## Título Parágrafo 2
Conteúdo...
## Título Parágrafo 3
Conclusão...
```

### Projetos: `assets/data/projects/YYYY-MM-DD-slug.md`
```yaml
---
title: "Nome"
description: "Breve descrição"
date: "YYYY-MM-DD"
featured: true/false
status: "completed|in-progress|archived"
stack: ["tech1", "tech2"]
links: {"github": "url", "live": "url"}
---
## Descrição
## Desafios
## Solução
## Resultados
```

### Trajetória: `assets/data/trajectory/YYYY-MM-DD-slug.md`
```yaml
---
title: "Experiência"
position: "Cargo"
company: "Empresa"
period: "Jan 2020 - Dez 2021"
date: "YYYY-MM-DD"
featured: true/false
skills: ["skill1", "skill2"]
---
## Contexto
## Realizações
## Aprendizados
```

## 🔄 PROTOCOLO
1. Adicione conteúdo em Markdown em `assets/data/`
2. Sistema carrega automaticamente
3. Novos estilos: adicione variáveis em `tokens.css` primeiro
4. Teste → commit → push → documentação

### COMPONENTES CHAVE

**Layout**: Header (typewriter logo), Grid responsivo 3→2→1 colunas, Footer
**Estilo**: Animações typewriter/fade-in, Gallery carousel 4 items, Buttons olive green
**JavaScript**: Carousel, dynamic content loading, localStorage favoritos, fade-in, smooth scroll

### FUNCIONALIDADES

✅ Gallery carousel | ✅ Dynamic content | ✅ Timeline + Posts + Projetos | ✅ Favoritos | ✅ Mobile responsivo

### SISTEMA DE POSTS (MODULAR)

**Estrutura de Arquivos**:
```
assets/data/posts/
├── _template.md          # Template para novos posts
├── 2024-01-15-nova-descoberta-musical.md
├── 2024-01-10-jogo-indie-surpreendeu.md
└── ... (posts organizados por data)
```

**Formato do Post (Markdown + YAML)**:
```markdown
---
title: "título descritivo"
category: "categoria"
date: "YYYY-MM-DD"
favorite: true/false
tags: ["tag1", "tag2", "tag3"]
---

## Parágrafo 1
Conteúdo do primeiro parágrafo.

## Parágrafo 2
Conteúdo do segundo parágrafo.

## Parágrafo 3
Conclusão ou reflexão final.
```

**Categorias Válidas**:
- `música` - Descobertas musicais, playlists, artistas
- `jogos` - Análise de video games, narrativa interativa
- `filmes` - Análise de filmes, inspiração visual
- `livros` - Resenhas, reflexões sobre leitura
- `boardgames` - Jogos de tabuleiro, estratégia
- `dev-life` - Rotina dev, setups, produtividade
- `viagens` - Experiências, localidades, aventuras

**Criar novo post**: Data (YYYY-MM-DD), categoria, 2-3 tags, 3 parágrafos. Arquivo: `YYYY-MM-DD-slug.md`. Template: `assets/data/posts/_template.md`

### TECNOLOGIAS
- HTML5 semântico | CSS3 grid/flexbox | JS vanilla
- Google Fonts | Unicode emojis | Sem frameworks
- Posts: Markdown + YAML front matter (arquivos independentes)

---

## ⚙️ DECISÕES TÉCNICAS RECENTES

### 1. Spacing do Headline (quem sou eu) - Jan 2026
**Problema**: Espaço excessivo entre menu-divider e headline "quem sou eu"  
**Solução**: Adicionar `margin-top: -var(--spacing-lg);` ao `.headline` (style.css)  
**Justificativa**: Usa sistema de tokens existentes (--spacing-lg = 24px), aproxima visualmente a seção ao menu mantendo hierarquia visual, sem quebrar layout em responsivo  
**Arquivo**: `style.css` linha ~250 (`.headline`)

### 2. Menu Modular com Fetch - Jan 2026
**Problema**: Menu precisava aparecer em todas as páginas (home + 5 internas)  
**Solução**: Criar `components/nav-menu.html` e carregar via `fetch()` em `index.html` e `components/header.html`  
**Justificativa**: Evita duplicação de HTML, garante consistência, permite manutenção centralizada  
**Arquivos**: `components/nav-menu.html`, `components/header.html`, `index.html`

### 3. Padronização Layout/Textura - Jan 2026
**Problema**: Layout.css e style.css tinham estilos inconsistentes (gradientes, sombras, espaçamento)  
**Solução**: Mover definições CSS para um único arquivo (style.css) com uso de tokens centralizados  
**Justificativa**: DRY principle, facilita manutenção, garante consistência visual em todas as páginas  
**Arquivo**: `style.css`, `assets/css/layout.css`

---

**IMPORTANTE**: Manter estética retro, decisões técnicas. Qualquer mudança precisa justificativa técnica.

