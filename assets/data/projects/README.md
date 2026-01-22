# Sistema Modular de Projetos

## Estrutura

Cada arquivo representa um projeto realizado ou em desenvolvimento.

**Formato do arquivo**: `YYYY-MM-DD-slug-titulo.md`

## Formato do Arquivo

```yaml
---
title: "Nome do Projeto"
description: "Descrição curta (1-2 linhas)"
date: "YYYY-MM-DD"
featured: true/false
status: "completed|in-progress|archived"
stack: ["tech1", "tech2", "tech3"]
links: {
  "github": "https://...",
  "live": "https://...",
  "case-study": "https://..."
}
---

## Descrição
Visão geral do projeto, objetivo e contexto.

## Desafios
Principais desafios enfrentados durante o desenvolvimento.

## Solução
Como foram resolvidos os desafios, decisões técnicas tomadas.

## Resultados
Impacto, métricas ou resultados alcançados.
```

## Exemplo

```yaml
---
title: "Jornal Retro"
description: "Portfólio pessoal com design vintage de jornal anos 30-50"
date: "2024-01-20"
featured: true
status: "in-progress"
stack: ["HTML5", "CSS3", "JavaScript Vanilla", "Markdown"]
links: {
  "github": "https://github.com/lorissette13/jornal_retro",
  "live": "https://lorissette13.github.io"
}
---

## Descrição
Um experimento front-end completo com design vintage anos 30-50, totalmente responsivo e funcional.

## Desafios
- Criar design retro que funcione responsivo em 2024
- Estrutura modular com Markdown para posts e conteúdo

## Solução
- CSS Grid com media queries estratégicas
- Sistema de parser Markdown para separar conteúdo de código

## Resultados
- Site totalmente funcional e escalável
- Demonstra habilidades de design + frontend moderno
```

## Adicionar Novo Projeto

1. Crie um arquivo com nome: `2024-01-20-novo-projeto.md`
2. Copie o template acima
3. Preencha os campos
4. Salve na pasta `/assets/data/projects/`

Pronto! O sistema detectará automaticamente.
