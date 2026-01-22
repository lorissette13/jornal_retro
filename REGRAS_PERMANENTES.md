# 📋 REGRAS PERMANENTES - lorissette13

## 🎯 Decisões Técnicas

| Decisão | Regra |
|---------|-------|
| Cores | Editar só em `tokens.css` |
| Layout | Editar só em `layout.css` |
| Botões | Editar só em `buttons.css` |
| Animação logo | Editar só em `typewriter.js` |
| Componentes | Editar em `/components/` |
| Testes | Rodar `?debug=components` |

## 📐 Arquitetura

```
index.html (home, header inline)
├── assets/css/
│   ├── tokens.css (variáveis)
│   ├── layout.css (grid/flex)
│   └── page.css (páginas)
├── assets/js/
│   ├── utils/ (typewriter, loader, checker)
│   └── [page-modules]
├── assets/data/ (Markdown + JSON)
├── pages/ (6 páginas internas)
└── components/ (header, footer, etc)
```

## 📝 Conteúdo

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

## ✅ Testes

**Automático**: `http://localhost:8000/?debug=components`  
**Manual**: `ComponentChecker.runAll()` no console

**Checklist obrigatório**:
- ✓ Header presente (logo + menu)
- ✓ Footer presente
- ✓ CSS carregado
- ✓ Links funcionam
- ✓ Sem erros console

## 🚀 Workflow

1. Editar conteúdo em `assets/data/`
2. Atualizar estilo em `tokens.css` (variáveis)
3. Testar: `?debug=components`
4. Commit → Push

## 🔄 Padrão de Páginas

```javascript
// HTML: Sempre use este padrão
<script src="../assets/js/utils/component-loader.js"></script>
<script src="../assets/js/utils/component-checker.js"></script>
<script src="../assets/js/utils/navigation-checker.js"></script>
<script src="../assets/js/[module].js"></script>

// JS: Sempre use setTimeout após DOMContentLoaded
setTimeout(function() {
    initPage();
}, 100);
```

## 📦 Tecnologias

- HTML5 + CSS3 Grid/Flexbox
- Vanilla JavaScript (ES6+)
- Markdown + YAML para conteúdo
- Google Fonts: Special Elite + Times New Roman

## 🎨 Estilo

- Retro 30-50s (jornal)
- Cores de `tokens.css`
- Grid responsivo: 4→2→1 colunas
- Sem frameworks, sem build

---

**Última atualização**: Jan 22, 2026  
**Status**: ✅ Em produção  
**Próximo**: Filtros compartilhados
