---
title: "Plataforma de Cursos"
description: "LMS para criar e compartilhar cursos online"
date: "2024-01-08"
featured: false
status: "in-progress"
stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Video.js"]
links: {
  "github": "https://github.com/lorissette13/course-platform"
}
---

## Descrição
Plataforma de learning management system para criadores compartilharem cursos. Sistema de certificados, progress tracking e comunidade de alunos.

## Desafios
- Streaming de video com CDN
- Gerenciar progresso de alunos complexo
- Implementar sistema de certificados verificáveis

## Solução
- Mux para video streaming otimizado
- PostgreSQL com stored procedures para analytics
- Certificados assinados digitalmente com JWT

## Resultados
- 200+ cursos publicados
- 15k+ alunos inscritos
- Receita: $120k no primeiro ano