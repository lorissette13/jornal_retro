# PORTFÓLIO LORISSETTE13 - PROMPT CONSOLIDADO (v2.5.0)

## 🤖 PROTOCOLO

Após mudanças: Teste, commit, push. Atualizar docs. Usar variáveis CSS do Design System.

---

## PROJETO

**Portfólio retro**: desenvolvedora front-end, estética jornal 30-50s, lowercase, Special Elite + Times New Roman.

### ESTRUTURA
```
index.html | style.css | script.js
assets/
├── css/
│   ├── tokens.css          ← VARIÁVEIS CSS CENTRALIZADAS (importado em style.css)
│   ├── style.css           ← Estilos principais
│   ├── home.css | page.css | posts.css | projects.css | gallery.css | timeline.css
│   ├── navigation.css | index.css
│   └── [todos usam tokens.css automaticamente]
├── js/ | data/
pages/
├── quem-sou.html | cotidiano.html | galeria.html
├── projetos.html | trajetoria.html
```

### DESIGN SYSTEM (v2.5.0)
**NOVO**: Sistema centralizado de variáveis CSS em `assets/css/tokens.css`

Variáveis disponíveis para:
- **Cores**: primárias, secundárias, categorias, neutras, borders, shadows
- **Espaçamentos**: container, seções, gaps, padding
- **Tipografia**: fontes, tamanhos, line-height, letter-spacing
- **Borders**: widths, radius, alturas
- **Transições**: durações, easing
- **Z-Index**: valores padronizados

📖 Ver `DESIGN_SYSTEM.md` para documentação completa e exemplos!

**IMPORTANTE**: Ao adicionar/modificar estilos:
1. Use variáveis CSS do `tokens.css` em vez de valores hardcoded
2. Exemplo: `color: var(--color-text-primary)` em vez de `color: #000000`
3. Se precisar de nova cor/espaçamento, adicione em `tokens.css` primeiro
4. Isso garante consistência e facilita manutenção futura

### PALETA CORES

Variáveis centralizadas em `tokens.css`: primárias (brown, tan), destaque (gold, olive), categorias, neutras

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

