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

## 📚 REFERÊNCIA
→ [REGRAS_PERMANENTES.md](REGRAS_PERMANENTES.md) - Todas as decisões  
→ [README.md](README.md) - Setup  
→ [TESTES_COMPONENTES.md](TESTES_COMPONENTES.md) - Testing


