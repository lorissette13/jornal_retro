# 📸 Galeria Modular

## Como Funciona

A galeria agora segue o mesmo padrão dos posts! Cada imagem é um arquivo JSON independente que fica em `assets/data/gallery/`.

## Adicionar Nova Imagem

### 1️⃣ Criar arquivo JSON de metadata

Copie o template `_template.json` e crie um novo arquivo:

**Nomenclatura**: `YYYY-ID-slug.json`
- `YYYY`: ano da imagem
- `ID`: identificador (ex: gallery-029)
- `slug`: nome descritivo em minúsculas com hífens

**Exemplo**: `2024-gallery-029-meu-setup.json`

```json
{
  "title": "meu novo setup",
  "category": "setup",
  "year": "2024",
  "description": "descrição da imagem com detalhes",
  "favorite": false,
  "tags": ["setup", "workspace", "produtividade"],
  "image": "meu-setup.jpg",
  "thumbnail": "meu-setup-thumb.jpg",
  "credit": "foto própria"
}
```

### 2️⃣ Adicionar imagem

Coloque o arquivo de imagem em `assets/images/gallery/`:
- `meu-setup.jpg` (imagem grande)
- `meu-setup-thumb.jpg` (miniatura)

### 3️⃣ Fazer commit

```bash
git add assets/data/gallery/2024-gallery-029-meu-setup.json
git add assets/images/gallery/meu-setup.jpg
git commit -m "feat: adicionar nova imagem 'meu setup' à galeria"
git push
```

## Resultado

A imagem aparece automaticamente no site! Sem editar lists, arrays ou configurações.

## Campos do JSON

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `title` | string | Título da imagem | "meu setup" |
| `category` | string | Categoria | setup, games, viagens, eventos, projetos, livros, hobbies, cotidiano |
| `year` | string | Ano | "2024" |
| `description` | string | Descrição (1-2 frases) | "meu ambiente de trabalho" |
| `favorite` | boolean | Marcar como favorita | true / false |
| `tags` | array | Tags para filtro | ["setup", "workspace"] |
| `image` | string | Nome do arquivo (grande) | "meu-setup.jpg" |
| `thumbnail` | string | Nome do arquivo (thumb) | "meu-setup-thumb.jpg" |
| `credit` | string | Crédito da foto | "foto própria" ou "crédito da pessoa" |

## Categorias Disponíveis

- **setup**: Ambiente de trabalho, equipamentos
- **games**: Videogames, consoles, coleções
- **viagens**: Viagens, aventuras, localidades
- **eventos**: Conferências, workshops, meetups
- **projetos**: Screenshots de projetos, design, código
- **livros**: Estantes, coleções de leitura
- **hobbies**: Hobbies e interesses pessoais
- **cotidiano**: Rotina diária, momentos

## Filtros Automáticos

O site carrega automaticamente:
- ✅ Botões de filtro por categoria
- ✅ Filtros por ano
- ✅ Carrossel de imagens favoritas na home
- ✅ Modal de visualização fullscreen
- ✅ Sistema de favoritos com localStorage

## Exemplo Completo

Arquivo: `2024-gallery-029-gaming-setup.json`
```json
{
  "title": "gaming setup rgb",
  "category": "setup",
  "year": "2024",
  "description": "setup gaming com RGB customizado e periféricos mecânicos.",
  "favorite": true,
  "tags": ["gaming", "rgb", "periféricos", "setup"],
  "image": "gaming-setup-2024.jpg",
  "thumbnail": "gaming-setup-2024-thumb.jpg",
  "credit": "foto própria"
}
```

✨ Pronto! A imagem aparece no site na próxima carregamento.
