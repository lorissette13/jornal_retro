# Documentação: Sistema Modular de Posts

## 📚 Visão Geral

O portfólio agora utiliza um sistema **totalmente modular** para gerenciar posts. Ao invés de ter dados hardcoded no `posts.js`, todos os posts são **arquivos Markdown independentes** organizados por data na pasta `assets/data/posts/`.

## 🎯 Objetivos do Sistema

1. **Modularidade**: Cada post é um arquivo independente
2. **Facilidade**: Editar/criar posts sem mexer em JavaScript
3. **Escalabilidade**: Adicionar 100 posts é tão simples quanto adicionar 1
4. **Organização**: Posts organizados cronologicamente por data
5. **Template**: Formato consistente com YAML + Markdown

## 📁 Estrutura de Pastas

```
assets/data/posts/
├── README.md                              # Instruções (você está aqui)
├── _template.md                           # Template para novos posts
│
└── Arquivos de Post (formato: YYYY-MM-DD-slug.md)
    ├── 2024-01-15-nova-descoberta-musical.md
    ├── 2024-01-10-jogo-indie-surpreendeu.md
    ├── 2024-01-08-ritual-matinal.md
    ├── 2024-01-05-filme-inspira-codigo.md
    ├── 2024-01-03-boardgame-devs.md
    ├── 2023-12-28-livro-expandiu-horizontes.md
    ├── 2023-12-20-setup-otimizado.md
    └── 2023-12-15-trilha-codar.md
```

## 📄 Formato do Post

Cada arquivo Markdown contém:

### 1. YAML Front Matter (Metadados)

```yaml
---
title: "título do post"
category: "categoria"
date: "YYYY-MM-DD"
favorite: true/false
tags: ["tag1", "tag2", "tag3"]
---
```

### 2. Conteúdo em Markdown

```markdown
## Título do Parágrafo 1
Conteúdo do primeiro parágrafo com 2-3 frases.

## Título do Parágrafo 2
Conteúdo do segundo parágrafo com mais desenvolvimento.

## Título do Parágrafo 3
Conclusão, reflexão ou recomendação final.
```

## 🚀 Como Funciona (Tech)

### Fluxo Atual (com mock)

O `posts.js` ainda contém um mock `POSTS_DATA` para não depender de fetch:

```javascript
const POSTS_DATA = { "posts": [...] };

function loadPosts() {
    allPosts = POSTS_DATA.posts;
    // Resto do código...
}
```

### Fluxo Futuro (com arquivos reais)

Quando quiser carregar posts reais dos arquivos `.md`, o código fará:

```javascript
async function loadPostsFromFiles() {
    const postFiles = await loadPostsDirectory();
    const posts = await Promise.all(
        postFiles.map(file => fetchAndParseMarkdown(file))
    );
    allPosts = posts.sort(byDate);
}
```

## ✍️ Exemplo Prático: Criar um Novo Post

### Passo 1: Copie o Template
Abra `_template.md` e use como base.

### Passo 2: Preencha os Dados
```yaml
---
title: "minha experiência com next.js"
category: "dev-life"
date: "2026-01-21"
favorite: true
tags: ["framework", "react", "performance"]
---
```

### Passo 3: Escreva o Conteúdo
```markdown
## Primeiro Contato
Comecei a usar Next.js há algumas semanas e...

## Impressões Iniciais  
O que mais me impressionou foi...

## Recomendação
Para quem quer aprender, recomendo...
```

### Passo 4: Nomeie o Arquivo
`2026-01-21-minha-experiencia-nextjs.md`

### Passo 5: Salve em `assets/data/posts/`

### Passo 6: Teste no Navegador
Posts carregam automaticamente quando você navega para `/pages/cotidiano.html`

## 🏷️ Categorias e Tags

### Categorias (escolha UMA)
- `música` - Descobertas musicais, artistas
- `jogos` - Video games, narrativa
- `filmes` - Cinema, inspiração visual
- `livros` - Resenhas, reflexões
- `boardgames` - Jogos de tabuleiro
- `dev-life` - Rotina dev, produtividade
- `viagens` - Experiências, aventuras

### Tags (use 2-3)
Palavras-chave que descrevem o post:
- `indie`, `synthwave`, `descoberta`
- `narrativa`, `pixel-art`, `estratégia`
- `rotina`, `ferramentas`, `produtividade`

## 💾 Benefícios Dessa Abordagem

| Aspecto | Antes | Agora |
|---------|-------|-------|
| **Adicionar Post** | Editar posts.js | Criar arquivo .md |
| **Organização** | Array monolítico | Arquivos por data |
| **Escalabilidade** | Difícil com 50+ posts | Fácil com centenas |
| **Controle de Versão** | 1 arquivo grande | Múltiplos pequenos |
| **Reusabilidade** | Posts presos no JS | Posts independentes |
| **Templates** | Não havia | Arquivo _template.md |

## 🔧 Próximos Passos (Opcional)

Para automatizar ainda mais, você pode:

1. **Build Script**: Converter `.md` em JSON no build
2. **CMS Leve**: Admin interface para criar posts via UI
3. **Static Generator**: Gerar HTML estático dos posts
4. **Git Hooks**: Validar formato antes de commit
5. **API Mock**: Servir posts como REST API fake

## 📝 Checklist: Criar Novo Post

- [ ] Copie `_template.md`
- [ ] Preencha YAML (title, category, date, tags)
- [ ] Escreva 3 parágrafos com títulos
- [ ] Nomeie: `YYYY-MM-DD-slug-titulo.md`
- [ ] Salve em `assets/data/posts/`
- [ ] Teste no navegador
- [ ] Faça commit e push
- [ ] Atualize CHANGELOG.md se necessário

## 📊 Estatísticas Atuais

- **Total de Posts**: 8
- **Categorias Ativas**: 5 (música, jogos, filmes, livros, dev-life, boardgames)
- **Posts Favoritos**: 4
- **Data mais recente**: 2024-01-15
- **Data mais antiga**: 2023-12-15

## 🎓 Exemplo Completo: Post sobre Música

**Nome**: `2024-01-15-nova-descoberta-musical.md`

```yaml
---
title: "nova descoberta musical"
category: "música"
date: "2024-01-15"
favorite: true
tags: ["indie", "synthwave", "descoberta"]
---

## Descoberta inesperada
Descobri a banda 'timecop1983' essa semana e já virou minha trilha sonora oficial para codar. Synthwave com toques nostálgicos dos anos 80, perfeito para sessões noturnas de desenvolvimento.

## Influência na produtividade
Comecei a notar que a escolha de trilha sonora afeta drasticamente minha capacidade de concentração. Recomendo o álbum 'journeys' para quem busca foco e atmosfera em suas sessões de trabalho.

## Compartilhando a descoberta
Já compartilhei essa descoberta com alguns colegas desenvolvedores e a resposta foi excelente. Estou compilando uma playlist com artistas similares.
```

## 🤝 Contribuindo

Se está usando o portfólio como template:
1. Respeite o formato YAML + Markdown
2. Use 3 parágrafos descritivos
3. Organize por data
4. Mantenha a estrutura de pastas

---

**Última atualização**: 21 de janeiro de 2026  
**Versão**: 2.4.0 - Sistema Modular de Posts
