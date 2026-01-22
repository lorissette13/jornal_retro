# CHANGELOG - Portfólio Retro (jornal_retro)

Todas mudanças notáveis neste projeto serão documentadas neste arquivo.

## [Em Desenvolvimento] - 2026-01-22

### Refatoração CSS Modular (Commits: 7faf8d4 até da994cc)

#### Adicionado
- ✅ **Módulo `assets/css/layout.css`** - Centraliza todos os estilos de layout global
  - Body com background gradiente e textura de papel
  - Container com borda dupla olive, espaçamento 50px top / 80px bottom
  - Page headers, footers e espaçamento padrão
  - Responsive breakpoints: 768px (tablet), 480px (mobile)

- ✅ **Módulo `assets/css/buttons.css`** - Padronização de todos os botões
  - `.btn-primary` / `.btn-read-more`: 15px 35px padding, olive gradient
  - `.btn-secondary` / `.btn-small`: 10px 25px padding, sage gradient
  - `.nav-btn` / `.pagination-btn`: 10px 20px padding, olive border
  - Efeito shine universal via pseudo-elemento `::before`
  - Estados: hover (translateY -3px, shadow aumentada), disabled (opacity 0.4)

- ✅ **Módulo `assets/css/filters.css`** - Estilos base de filtros
  - `.filters-container`: container transparente
  - `.filter-label`: Special Elite font, olive color, letter-spacing 1.5px
  - `.filter-btn`: 10px 22px padding, 0.81rem, glass effect com shine
  - `.filter-btn.active`: gold gradient, shadow aumentada
  - Layout horizontal com flex, gap 12px

- ✅ **Módulo `assets/css/filter-colors.css`** - Cores por categoria
  - `.filter-color-filmes`: red (#e63946)
  - `.filter-color-jogos`: blue (#457b9d)
  - `.filter-color-boardgames`: teal (#2a9d8f)
  - `.filter-color-livros`, `.filter-color-música`, `.filter-color-dev-life`
  - Cores de hover aumentadas para melhor visibility

#### Modificado
- 📝 **`assets/css/style.css`**
  - Adicionados imports: `@import 'tokens.css'`, `layout.css`, `buttons.css`, `filters.css`, `filter-colors.css`
  - Removidas ~100 linhas de duplicação (button styles, body styles)
  - Mantidos: navigation, hero, home-specific layouts
  - Reduzido de 963 para 856 linhas

- 📝 **`assets/css/page.css`**
  - Removidas ~45 linhas de duplicação (page-header, page-title, page-content)
  - Mantidos: interest-grid, interest-card, timeline-specific styles
  - Reduzido de 203 para 149 linhas

- 📝 **`assets/css/posts.css`**
  - Removidas ~25 linhas de duplicação (nav-btn styles)
  - Mantidos: posts-navigation, posts-grid, post-card styles

#### Checklist de Implementação
- [x] Criar `layout.css` com estilos centralizados de body/container/page
- [x] Criar `buttons.css` com todos tipos de botão
- [x] Criar `filters.css` com estilos base de filtro
- [x] Criar `filter-colors.css` com cores por categoria
- [x] Adicionar imports em `style.css`
- [x] Remover duplicação de `style.css`
- [x] Remover duplicação de `page.css`
- [x] Remover duplicação de `posts.css`
- [x] Aplicar filtros em **cotidiano.html** (posts + category filters)
- [x] Aplicar filtros em **galeria.html** (gallery + category/year filters)
- [x] Aplicar filtros em **projetos.html** (projects + status filters)
- [x] Aplicar filtros em **trajetoria.html** (timeline + skill filters)
- [x] Validar espaçamento entre borda e página em todas as páginas (50px top, 80px bottom)
- [x] Atualizar PROMPT_CONSOLIDADO.md com arquitetura modular

#### Benefícios Alcançados
✨ **Single Source of Truth**: Editar cores em 1 lugar (tokens.css), layout em 1 lugar (layout.css), botões em 1 lugar (buttons.css)
✨ **Redução de Duplicação**: ~170 linhas de CSS removidas mantendo funcionalidade idêntica
✨ **Manutenção Simplificada**: Mudar cor de container, espaçamento, ou estilo de filtro requer edição em 1 arquivo
✨ **Consistência Visual**: Todas as páginas agora herdam mesmo layout, espaçamento, cores

#### Git Commits
```
da994cc - fix: adicionar espaçamento acima e abaixo do container em todas as páginas
5798f88 - refactor: centralizar layout e estilos de body em módulo único layout.css
e28ec7d - refactor: centralizar estilos de botões em módulo único buttons.css
2fb3fc7 - refactor: extrair estilos de filtros em módulos separados
f0392ce - refactor: ajustar filtros layout horizontal com spacing
d5296a7 - refactor: remover espaçamento vertical dos filtros
a6e0464 - refactor: aplicar filtros em todas as páginas com cores
7faf8d4 - refactor: inicial estruturação dos filtros
```

---

## Projeto
**Portfólio Retro** - Estética jornal 30-50s, desenvolvedor front-end, sistema modular de posts/projetos/trajetória em Markdown.

**Tecnologias**: HTML5, CSS3 (modular), JavaScript vanilla, Google Fonts (Special Elite + Times New Roman)

**Responsável**: @lorissette13
