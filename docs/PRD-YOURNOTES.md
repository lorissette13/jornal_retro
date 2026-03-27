# PRD — YourNotes: Mural de Recortes

## 1. Visão Geral
- **Nome:** YourNotes
- **Conceito:** "Mural de Recortes" — notas como recortes de jornal em mural vintage
- **Stack:** HTML5, CSS3, JavaScript vanilla, localStorage
- **Deploy:** GitHub Pages (estático, sem backend)
- **Descrição:** Sistema de notas pessoais onde cada nota se transforma num recorte de jornal vintage. As notas são salvas localmente no navegador e organizadas visualmente num mural estilo anos 30-50.

## 2. Motivação
- Extensão natural do portfólio com estética de jornal retrô
- Demonstração de habilidades front-end (localStorage, CSS avançado, vanilla JS)
- Funcionalidade útil e interativa para visitantes do portfólio
- Zero dependência de backend — 100% client-side

## 3. Funcionalidades Core (MVP)

### 3.1 Criar Nota
- Modal/formulário com campos: título (headline), conteúdo (corpo da nota), categoria
- Categorias pré-definidas: "editorial", "classificado", "coluna", "última hora", "nota pessoal"
- Data automática no formato vintage: "27 de março de 2026"
- Salva no localStorage como JSON

### 3.2 Mural de Recortes
- Layout CSS Grid/Masonry com notas em tamanhos variados
- Notas estilizadas como recortes de jornal com:
  - Bordas irregulares/rasgadas (CSS clip-path ou border-image)
  - Textura de papel envelhecido (background gradient sutil)
  - Sombra de papel colado
  - Font: Special Elite (mesma do portfólio)
- Tamanho da nota baseado no comprimento do conteúdo:
  - Curta (< 50 chars) → "classificado" (pequena)
  - Média (50-200 chars) → "coluna" (média)
  - Longa (> 200 chars) → "artigo" (grande)

### 3.3 Visualizar/Editar Nota
- Clicar na nota abre modal de leitura/edição
- Animação de "papel sendo puxado do mural"
- Opção de editar inline ou via modal

### 3.4 Excluir Nota
- Botão de excluir com confirmação
- Animação de "papel sendo amassado" ou "rasgado"

### 3.5 Persistência
- Todas as notas salvas em localStorage
- Chave: `yournotes_data`
- Formato: Array de objetos JSON
  ```json
  {
    "id": "uuid",
    "title": "string",
    "content": "string",
    "category": "string",
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
  ```
- Contador automático: "seu mural contém X recortes"

## 4. Design Visual

### 4.1 Paleta de Cores
- Usar TODOS os tokens existentes de `tokens.css`
- Fundo do mural: textura de cortiça/quadro (CSS gradients, sem imagens)
- Recortes: variações de papel envelhecido (tons de creme/bege)
- Categorias diferenciadas por cor de "carimbo":
  - editorial → `var(--color-accent-olive)`
  - classificado → `var(--color-accent-gold)`
  - coluna → `var(--color-accent-sage)`
  - última hora → vermelho vintage (`#8b0000`)
  - nota pessoal → `var(--color-border-brown)`

### 4.2 Tipografia
- Herdar 100% do body (Special Elite via `--font-family-mono`)
- Títulos em uppercase simulando manchete de jornal
- Corpo em lowercase (padrão do portfólio)

### 4.3 Elementos Visuais
- Carimbo de data no canto (rotacionado, estilo "RECEBIDO")
- "Alfinete" ou "fita adesiva" CSS no topo do recorte
- Efeito hover: nota levanta levemente do mural (translateY + sombra maior)
- Animação de entrada: nota "cai" no mural com leve rotação

### 4.4 Responsividade
- Desktop: mural com 3-4 colunas masonry
- Tablet: 2 colunas
- Mobile: 1 coluna (stack vertical)

## 5. Arquitetura Técnica

### 5.1 Arquivos a Criar
```
pages/yournotes.html          — Página principal
assets/css/yournotes.css       — Estilos do mural e recortes
assets/js/yournotes-app.js     — Lógica principal (CRUD + renderização)
assets/js/yournotes-data.js    — Gerenciamento de localStorage
```

### 5.2 Integração com Projeto Existente
- Nova entrada no menu de navegação: "yournotes" (em `components/nav-menu.html`)
- Seguir mesmo padrão de carregamento de componentes (header/footer via `component-loader.js`)
- CSS importado com cache busting: `?v=2.0`
- Skip-link de acessibilidade presente
- `<main>` com `role="main"` e `id="main-content"`

### 5.3 Padrões a Seguir
- Mesmo padrão de inicialização via `DOMContentLoaded`
- TypeWriter no logo (como todas as outras páginas)
- Filtros por categoria (reusar padrão visual de `filters.css`)
- Navegação/paginação se > 12 notas (reusar `posts-navigation`)

## 6. User Stories

1. **Como visitante**, quero criar uma nota rápida para lembrar de algo
2. **Como visitante**, quero ver minhas notas organizadas como recortes num mural
3. **Como visitante**, quero editar uma nota existente
4. **Como visitante**, quero excluir notas que não preciso mais
5. **Como visitante**, quero filtrar notas por categoria
6. **Como visitante**, quero que minhas notas persistam entre visitas ao site
7. **Como visitante**, quero ver um contador de quantas notas tenho

## 7. Critérios de Aceite

- [ ] Página acessível via menu de navegação
- [ ] CRUD completo de notas (Create, Read, Update, Delete)
- [ ] Notas persistem em localStorage
- [ ] Layout mural responsivo (desktop/tablet/mobile)
- [ ] Visual consistente com estética vintage do portfólio
- [ ] Animações suaves de criação/exclusão
- [ ] 100% dos tokens CSS usados (zero cores hardcoded)
- [ ] Filtro por categoria funcional
- [ ] Validação CI/CD passa (workflow existente)
- [ ] Funciona offline (sem dependências externas além de Google Fonts)

## 8. Fora de Escopo (v1)
- Sync entre dispositivos (requer backend)
- Export/import de notas
- Compartilhamento de notas
- Editor rich text (markdown ou WYSIWYG)
- Drag & drop para reorganizar notas
- Temas/skins alternativos

## 9. Métricas de Sucesso
- Feature funcional no GitHub Pages
- Zero erros no console do browser
- Lighthouse Performance > 90
- Acessibilidade: skip-link, aria-labels, keyboard navigation
