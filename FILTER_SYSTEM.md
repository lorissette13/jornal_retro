# Sistema Modular de Filtros Coloridos

## Visão Geral
Sistema reutilizável de filtros com cores dinâmicas baseado em classes CSS. Todos os filtros compartilham o mesmo padrão visual mantendo cores específicas para cada categoria.

## Arquitetura

### Arquivo Principal: `assets/css/filter-colors.css`
Contém todas as definições de cores para diferentes tipos de filtros usando CSS custom properties (variáveis).

### Padrão de Nomenclatura
- **Classes de cor**: `filter-color-{categoria}`
  - Exemplo: `filter-color-filmes`, `filter-color-React`, `filter-color-completed`

### Como Usar

#### 1. Na HTML (estrutura padronizada)
```html
<div class="filters-container">
    <div class="filter-label">filtrar por:</div>
    <div class="filter-buttons">
        <button class="filter-btn active" data-attr="all">todos</button>
        <button class="filter-btn filter-color-categoria" data-attr="valor">Rótulo</button>
    </div>
</div>
```

#### 2. Adicionar nova categoria
1. No `assets/css/filter-colors.css`, adicione:
```css
.filter-btn.filter-color-nova-categoria {
    --filter-color: #HEXCOLOR;
}
```

2. Na página HTML, adicione a classe ao botão:
```html
<button class="filter-btn filter-color-nova-categoria" data-attr="valor">Rótulo</button>
```

## Cores Predefinidas

### Categorias (Cotidiano)
- **filmes**: `#e63946` (vermelho)
- **jogos**: `#457b9d` (azul)
- **boardgames**: `#2a9d8f` (teal)
- **livros**: `#e9c46a` (amarelo)
- **música**: `#9d4edd` (roxo)
- **dev-life**: `#7E8C54` (verde oliva)

### Galeria
- **setup**: `#f77f00` (laranja)
- **games**: `#457b9d` (azul)
- **viagens**: `#06a77d` (verde)
- **eventos**: `#d62828` (vermelho escuro)
- **projetos**: `#2a9d8f` (teal)

### Anos
- **2024**: `#a8dadc` (azul claro)
- **2023**: `#457b9d` (azul)
- **2022**: `#9d4edd` (roxo)

### Projetos
- **completed**: `#06a77d` (verde)
- **in-progress**: `#f77f00` (laranja)
- **featured**: `#d4a017` (ouro)

### Skills (Trajetória)
- **React**: `#61dafb` (azul ciano)
- **Vue**: `#42b983` (verde)
- **JavaScript**: `#f7df1e` (amarelo)
- **Leadership**: `#e63946` (vermelho)
- **TypeScript**: `#2b7a0b` (verde escuro)
- **Node**: `#339933` (verde)

## Comportamento Visual

### Estados
1. **Padrão** (inativo)
   - Fundo branco com borda colorida
   - Texto colorido

2. **Hover** (sem ativo)
   - Fundo muda para cor da categoria
   - Texto muda para branco
   - Translação vertical leve

3. **Active**
   - Fundo: cor da categoria
   - Texto: branco
   - Borda: cor da categoria
   - Sombra ao passar mouse

## Páginas Implementadas
- ✅ `pages/cotidiano.html` - Filtros por categoria
- ✅ `pages/galeria.html` - Filtros por categoria e ano
- ✅ `pages/projetos.html` - Filtros por status
- ✅ `pages/trajetoria.html` - Filtros por tipo e skills

## Vantagens
- ✅ Código DRY (não repetido)
- ✅ Fácil manutenção
- ✅ Consistência visual entre páginas
- ✅ Fácil adicionar novas categorias
- ✅ Performance otimizada com CSS custom properties
