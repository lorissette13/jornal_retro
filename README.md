# Portfólio Lorissette13

Portfólio pessoal com estética retro-moderna (jornal 30-50s). Sistema modular com blog pessoal, galeria visual, timeline interativa, favoritos e navegação responsiva.

## 🚀 Quick Start

```bash
# Clone, instale e rode localmente
npm install
python -m http.server 8000  # ou: npx serve .
```

## 📁 Estrutura

- `index.html | pages/` - páginas
- `assets/css/tokens.css` - variáveis centralizadas
- `assets/data/` - conteúdo em Markdown (posts, projetos, trajetória)
- `assets/js/` - carregamento e renderização dinâmica
- `components/` - header, footer, cards reutilizáveis

## 📝 Adicionar Conteúdo

Crie arquivos Markdown em:
- **Posts**: `assets/data/posts/YYYY-MM-DD-slug.md`
- **Projetos**: `assets/data/projects/YYYY-MM-DD-slug.md`
- **Trajetória**: `assets/data/trajectory/YYYY-MM-DD-slug.md`

**Referência completa**: veja [PROMPT_CONSOLIDADO.md](PROMPT_CONSOLIDADO.md)

## 🎨 Customização

- **Cores/Espaços**: editar `assets/css/tokens.css`
- **Conteúdo**: arquivos Markdown em `assets/data/`
- **Layout/Estrutura**: HTML em `pages/` e `components/`

## 🛠️ Stack

HTML5, CSS3 (variáveis), JavaScript ES6+, Markdown, localStorage

## 📄 Licença

Projeto pessoal - uso livre para referência e estudo