# Sistema Modular de Posts

Este é o sistema de posts do portfólio lorissette13. Todos os posts são armazenados como arquivos Markdown com metadados YAML.

## 📁 Estrutura

```
posts/
├── _template.md                                # Template para novos posts
├── 2024-01-15-nova-descoberta-musical.md       # Exemplo: música
├── 2024-01-10-jogo-indie-surpreendeu.md        # Exemplo: jogos
├── 2024-01-08-ritual-matinal.md                # Exemplo: dev-life
├── 2024-01-05-filme-inspira-codigo.md          # Exemplo: filmes
├── 2024-01-03-boardgame-devs.md                # Exemplo: boardgames
├── 2023-12-28-livro-expandiu-horizontes.md     # Exemplo: livros
├── 2023-12-20-setup-otimizado.md               # Exemplo: dev-life
└── 2023-12-15-trilha-codar.md                  # Exemplo: música
```

## 📝 Como Criar um Post

### 1. Copie o template
Use `_template.md` como base para seu novo post.

### 2. Preencha os metadados (YAML)

```yaml
---
title: "título descritivo em minúsculas"
category: "categoria"
date: "YYYY-MM-DD"
favorite: true/false
tags: ["tag1", "tag2", "tag3"]
---
```

### 3. Escreva o conteúdo

```markdown
## Primeiro Parágrafo
Primeiro parágrafo com desenvolvimento da ideia principal.

## Segundo Parágrafo  
Segundo parágrafo com mais detalhes e reflexão.

## Terceiro Parágrafo
Conclusão, insight ou recomendação.
```

### 4. Nomeie o arquivo

Format: `YYYY-MM-DD-slug-descritivo.md`

Exemplos:
- `2024-01-15-nova-descoberta-musical.md`
- `2024-01-08-ritual-matinal.md`
- `2024-01-05-filme-inspira-codigo.md`

## 📂 Categorias

| Categoria | Descrição | Emoji |
|-----------|-----------|-------|
| `música` | Descobertas musicais, playlists, artistas | 🎵 |
| `jogos` | Video games, narrativa interativa | 🎮 |
| `filmes` | Análise de filmes, inspiração visual | 🎬 |
| `livros` | Resenhas, reflexões sobre leitura | 📚 |
| `boardgames` | Jogos de tabuleiro, estratégia | 🎲 |
| `dev-life` | Rotina dev, setups, produtividade | 💻 |
| `viagens` | Experiências, localidades, aventuras | ✈️ |

## 🏷️ Tags

Use tags para classificação secundária. Exemplos:
- Música: `indie`, `synthwave`, `descoberta`
- Jogos: `indie`, `pixel-art`, `narrativa`
- Dev-life: `rotina`, `produtividade`, `ferramentas`

## ⭐ Campo Favorite

- `true` - Post destaque, aparece em listas de favoritos
- `false` - Post normal

## 📋 Checklist para um bom post

- [ ] Título descritivo mas não muito longo
- [ ] Data correta (YYYY-MM-DD)
- [ ] Categoria única e relevante
- [ ] 2-3 tags específicas
- [ ] 3 parágrafos com títulos
- [ ] Cada parágrafo tem 2-3 frases no mínimo
- [ ] Conteúdo autêntico e pessoal
- [ ] Arquivo nomeado corretamente: `YYYY-MM-DD-slug.md`
- [ ] Arquivo na pasta `posts/`

## 🔄 Fluxo de Edição

1. Crie o arquivo `.md` nesta pasta
2. Siga o formato YAML + Markdown
3. Teste no navegador (posts carregam automaticamente)
4. Faça commit e push
5. Atualize CHANGELOG.md se necessário

## 💡 Dicas

- **Slug descritivo**: Use o título ou tema principal para o slug
- **Datas reais**: Sempre use datas reais ou futuras
- **Conteúdo autêntico**: Escreva como você realmente pensa
- **Organize cronologicamente**: Arquivos são ordenados por data automaticamente
- **Reutilize tags**: Coerência nas tags facilita descoberta

## 📖 Exemplos de Posts

Veja os arquivos de exemplo para padrões de escrita e estrutura:
- `2024-01-15-nova-descoberta-musical.md`
- `2024-01-10-jogo-indie-surpreendeu.md`
- `2024-01-05-filme-inspira-codigo.md`

---

**Última atualização**: 21 de janeiro de 2026
