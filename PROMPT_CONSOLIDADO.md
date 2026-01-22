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

## 🔧 HISTÓRICO DE CORREÇÕES

### Problema #1: Botões Home Desproporcionais ✅ RESOLVIDO
**Soluções Implementadas**:
- ✅ Todos botões home usam `.btn-read-more` (proporção uniforme)
- ✅ Shine effect padronizado: `rgba(255,255,255,0.2)` em 0.6s
- ✅ Hover consistente: verde (olive-light → sage-light, sem ouro)
- ✅ Texto sempre uma linha: `white-space: nowrap`
- ✅ Botões em `.btn-container` com `justify-content: center`
- ✅ Limite 300px para `.tags-section .btn-container`

**Arquivos Modificados**: `buttons.css`, `style.css`, `gallery.css`, `filters.css`, `index.html`

**Status**: Commits 87063f3 → 4cd8280 (Problema concluído)

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
