# PORTFÓLIO LORISSETTE13 - PROMPT CONSOLIDADO (v2.5.0)

## 🤖 PROTOCOLO OBRIGATÓRIO

**APÓS CADA MUDANÇA DE CÓDIGO**:
1. Teste no navegador / valide no terminal
2. `git add . && git commit` + `git push`
3. Atualizar HISTÓRICO DE MUDANÇAS
4. Documentação é parte da tarefa
5. **USAR VARIÁVEIS CSS DO DESIGN SYSTEM** (ver DESIGN_SYSTEM.md)

## HISTÓRICO DE MUDANÇAS

**v2.5.0** - Design System & Padronização de Cores/Espaçamentos
**v2.4.0** - Sistema Modular de Posts (Markdown)
**v2.3.15** - Gallery Carousel & Content Loading Fixes
**v2.3.14** - Content Expansion & Visual Refinement
**v2.3.13** - Visual Polish & Content Reliability
**v2.3.12** - Navigation & Content Fixes
**v2.3.11** - Final Implementation & Testing
**v2.3.10** - Typewriter & Connect Button
**v2.3.9** - Dynamic Data Loading
**v2.3.8** - Component Architecture
**v2.3.7** - Galeria, news items, dividers, estilos finais
**v2.3.6** - Menu e botão restaurados
**v2.3.5** - Padronização de botões
**v2.3.4** - Z-index e seletores CSS

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

### PALETA CORES (Variables)
- **Primárias**: `--color-primary-brown` (#8b4513), `--color-primary-tan` (#a07850)
- **Destaque**: `--color-accent-gold` (#d4af37), `--color-accent-olive` (#556B2F)
- **Categorias**: filmes, jogos, boardgames, livros, música, dev-life
- **Neutros**: text-primary, text-secondary, bg-white, etc.

### COMPONENTES CHAVE

**Layout**:
- Header com top-bar: "portfólio digital • since 1995 • developer & creative"
- Logo typewriter: `lorissette13`
- Grid 3 colunas: curriculum | projetos | cotidiano
- Footer: "desenvolvido com código e café • desde 1995"

**Estilo**:
- Animações: typewriter, fade-in, hover effects, carousel transitions
- Responsivo: 3→2→1 colunas (480px, 768px, 1024px)
- Buttons: olive green (#556B2F, #6B8E23) + shine effect, 20% smaller than original
- Gallery: Interactive carousel showing 4 items with navigation buttons
- News-items: emoji 📄, underline animation
- Dividers: separadores padrão (sem duplicatas)

**JavaScript Vanilla**:
- Gallery carousel with 4 visible items and smooth navigation
- Dynamic content loading with fallback for text, experiences, and projects
- Intersection Observer para fade-in
- localStorage para favoritos
- Smooth scroll navegação
- Carrossel com emoji placeholders

### FUNCIONALIDADES
✅ Gallery carousel with 4 visible items and olive green navigation buttons
✅ Dynamic content loading with fallback for text, experiences, and projects
✅ News-items with emojis + animations
✅ Timeline + projetos + posts
✅ Sistema favoritos
✅ Responsivo mobile-first
✅ Performance otimizada

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

**Instruções para o Agent**:
Ao criar um novo post, siga este processo:
1. Determine a data do post (formato YYYY-MM-DD)
2. Escolha 1 categoria principal (lista acima)
3. Defina 2-3 tags relevantes
4. Escreva 3 parágrafos com títulos descritivos
5. Considere favoritar posts particularmente bons (favorite: true)
6. Nomeie arquivo: `YYYY-MM-DD-slug-do-titulo.md`
7. Salve em `assets/data/posts/`
8. Use template em `assets/data/posts/_template.md` como referência

**Exemplo de Comando para o Agent**:
```
Criar novo post no portfólio:
- Tema: "descoberta de uma nova ferramenta de dev"
- Categoria: dev-life
- Data: 2026-01-21
- Tags: ferramentas, produtividade, automação
- Conteúdo: 3 parágrafos sobre como a ferramenta melhorou workflow
- Favorite: true (destaque)

Salve em: assets/data/posts/2026-01-21-nova-ferramenta-dev.md
```

### TECNOLOGIAS
- HTML5 semântico | CSS3 grid/flexbox | JS vanilla
- Google Fonts | Unicode emojis | Sem frameworks
- Posts: Markdown + YAML front matter (arquivos independentes)

---

**IMPORTANTE**: Manter estética retro, decisões técnicas. Qualquer mudança precisa justificativa técnica.

