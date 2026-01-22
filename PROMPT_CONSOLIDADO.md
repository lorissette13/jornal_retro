# PORTFÓLIO LORISSETTE13 - PROMPT CONSOLIDADO

## 📋 PROJETO
**Portfólio retro**: desenvolvedor front-end, estética jornal 30-50s (Special Elite + Times New Roman). Sistema modular com posts, projetos e trajetória em Markdown.

## 🏗️ ARQUITETURA
```
index.html | style.css | script.js
assets/css/tokens.css (variáveis centralizadas)
assets/js/ (carregamento e renderização)
assets/data/
  ├── posts/      (YYYY-MM-DD-slug.md)
  ├── projects/   (YYYY-MM-DD-slug.md)
  └── trajectory/ (YYYY-MM-DD-slug.md)
pages/ | components/
```

## 🎨 DESIGN SYSTEM
Todas variáveis CSS centralizadas em `tokens.css`. **Regra**: use variáveis em vez de hardcoding.

Principais: `--color-primary-brown`, `--color-accent-gold`, `--color-accent-olive`, `--color-cat-*`, `--spacing-*`, `--font-family-serif`, `--border-width-*`, `--transition-*`, `--z-*`

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

**IMPORTANTE**: Manter estética retro, decisões técnicas. Qualquer mudança precisa justificativa técnica.

