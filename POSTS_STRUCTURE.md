# 📁 Estrutura Modular - Posts System

## 🎯 Visão Geral

O sistema de posts agora é **completamente modular**. Você pode adicionar posts simplesmente criando arquivos Markdown na pasta correta, sem precisar mexer em nenhum código JavaScript.

```
assets/data/posts/
│
├── 📄 README.md                    # Instruções (você está aqui)
├── 📄 _template.md                 # Template para novos posts
│
└── 📅 Posts Ordenados por Data
    ├── 2024-01-15-nova-descoberta-musical.md
    ├── 2024-01-10-jogo-indie-surpreendeu.md
    ├── 2024-01-08-ritual-matinal.md
    ├── 2024-01-05-filme-inspira-codigo.md
    ├── 2024-01-03-boardgame-devs.md
    ├── 2023-12-28-livro-expandiu-horizontes.md
    ├── 2023-12-20-setup-otimizado.md
    └── 2023-12-15-trilha-codar.md
```

## 🔄 Fluxo de Trabalho

```
┌─────────────────────┐
│   Novo Post Idea    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  1. Copie _template.md              │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  2. Preencha YAML Front Matter       │
│     (title, category, date, tags)   │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  3. Escreva 3 Parágrafos            │
│     com títulos descritivos         │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  4. Nomeie: YYYY-MM-DD-slug.md      │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  5. Salve em assets/data/posts/     │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  6. Teste no Navegador              │
│     (posts carregam automaticamente) │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  7. Git: add . && commit && push    │
└─────────────────────────────────────┘
```

## 📝 Formato: YAML + Markdown

### Cabeçalho (YAML)

```yaml
---
title: "título descritivo em lowercase"
category: "categoria"
date: "YYYY-MM-DD"
favorite: true/false
tags: ["tag1", "tag2", "tag3"]
---
```

### Corpo (Markdown)

```markdown
## Título do Primeiro Parágrafo
Conteúdo com 2-3 frases de desenvolvimento.

## Título do Segundo Parágrafo
Continuação com mais reflexão ou detalhes.

## Título do Terceiro Parágrafo
Conclusão, recomendação ou insight final.
```

## 🏷️ Categorias

| Categoria | Ícone | Descrição |
|-----------|-------|-----------|
| `música` | 🎵 | Descobertas musicais, artistas, playlists |
| `jogos` | 🎮 | Video games, narrativa, análises |
| `filmes` | 🎬 | Cinema, análises, inspiração visual |
| `livros` | 📚 | Resenhas, reflexões sobre leitura |
| `boardgames` | 🎲 | Jogos de tabuleiro, estratégia |
| `dev-life` | 💻 | Rotina dev, produtividade, setups |
| `viagens` | ✈️ | Experiências, localidades, aventuras |

## 🚀 Exemplo Prático

### Arquivo: `2024-01-15-nova-descoberta-musical.md`

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

## ✅ Checklist para Novo Post

- [ ] **Copiar template** - Use `_template.md` como base
- [ ] **YAML correto** - title, category, date, favorite, tags
- [ ] **3 parágrafos** - Cada um com um título descritivo
- [ ] **Conteúdo valido** - 2-3 frases por parágrafo mínimo
- [ ] **Nome correto** - `YYYY-MM-DD-slug-descritivo.md`
- [ ] **Pasta correta** - `assets/data/posts/`
- [ ] **Teste** - Navegue até `/pages/cotidiano.html` e veja o post
- [ ] **Git** - Commit e push da mudança

## 💡 Dicas Profissionais

1. **Slug descritivo**: `2024-01-15-nova-descoberta-musical.md` é melhor que `2024-01-15-post.md`
2. **Datas reais**: Use datas verdadeiras ou futuras, nunca backdates aleatórias
3. **Categoría única**: Cada post tem apenas UMA categoria
4. **Tags coerentes**: Use tags que outros posts também usam para criar conexões
5. **Parágrafo introdutório**: O primeiro parágrafo apresenta o tema
6. **Parágrafo desenvolvimento**: O segundo aprofunda ou dá contexto
7. **Parágrafo conclusão**: O terceiro fecha com insight ou recomendação
8. **Favorite com critério**: Use apenas para posts realmente bons/importantes

## 📚 Posts de Referência

Use estes como exemplos de bom estilo:

- **Música**: `2024-01-15-nova-descoberta-musical.md`
- **Jogos**: `2024-01-10-jogo-indie-surpreendeu.md`
- **Filmes**: `2024-01-05-filme-inspira-codigo.md`
- **Dev-life**: `2024-01-08-ritual-matinal.md`
- **Livros**: `2023-12-28-livro-expandiu-horizontes.md`

## 🔗 Documentação Relacionada

- **PROMPT_CONSOLIDADO.md** - Instruções para o agent
- **POSTS_SYSTEM.md** - Documentação técnica completa
- **assets/data/posts/README.md** - Instruções práticas
- **CHANGELOG.md** - Histórico de mudanças (v2.4.0)

## 🎓 Próximos Passos

Depois de dominar o sistema:

1. Adicione seus posts reais
2. Organize por categorias/tags
3. Considere criar temas (series de posts)
4. Implemente sorting/filtering avançado
5. Exporte posts como JSON para reutilização

---

**Sistema Criado**: 21 de janeiro de 2026  
**Versão**: 2.4.0 - Sistema Modular de Posts  
**Status**: ✅ Pronto para Uso
