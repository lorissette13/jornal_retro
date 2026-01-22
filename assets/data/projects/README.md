# Sistema de Projetos

Cada arquivo representa um projeto: `YYYY-MM-DD-slug-titulo.md`

## Formato

```yaml
---
title: "Nome do Projeto"
description: "Descrição curta (1-2 linhas)"
date: "YYYY-MM-DD"
featured: true/false
status: "completed|in-progress|archived"
stack: ["tech1", "tech2"]
links: {
  "github": "https://...",
  "live": "https://..."
}
---

## Descrição
Visão geral do projeto.

## Desafios
Principais desafios.

## Solução
Como foram resolvidos.

## Resultados
Impacto ou métricas.
```

## Adicionar Projeto

1. Crie arquivo: `YYYY-MM-DD-slug.md`
2. Preencha os campos
3. Salve em `/assets/data/projects/`
