# Sistema de Posts

Posts em Markdown com metadados YAML, organizados por data: `YYYY-MM-DD-slug-titulo.md`

## 📁 Estrutura

```
posts/
├── _template.md           # Template para novos posts
└── YYYY-MM-DD-*.md        # Posts individuais
```

## 📝 Formato

```yaml
---
title: "título descritivo em minúsculas"
category: "categoria"
date: "YYYY-MM-DD"
favorite: true/false
tags: ["tag1", "tag2", "tag3"]
---

## Parágrafo 1
Conteúdo...

## Parágrafo 2
Conteúdo...

## Parágrafo 3
Conclusão...
```

## 📂 Categorias

`música`, `jogos`, `filmes`, `livros`, `boardgames`, `dev-life`, `viagens`

## 🏷️ Tags

Use 2-3 tags para classificação. Exemplos: `indie`, `synthwave`, `descoberta`, `pixel-art`, `narrativa`, `rotina`, `produtividade`, `ferramentas`

## 📋 Checklist

- [ ] Título descritivo
- [ ] Data YYYY-MM-DD
- [ ] Categoria única
- [ ] 2-3 tags
- [ ] 3 parágrafos com títulos
- [ ] Arquivo nomeado corretamente
- [ ] Arquivo em pasta `posts/`
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
