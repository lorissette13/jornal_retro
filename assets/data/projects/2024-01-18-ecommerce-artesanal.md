---
title: "E-commerce Artesanal"
description: "Plataforma para pequenos produtores com carrinho dinâmico e pagamentos"
date: "2024-01-18"
featured: true
status: "completed"
stack: ["React", "Node.js", "MongoDB", "Stripe API", "AWS S3"]
links: {
  "github": "https://github.com/lorissette13/ecommerce-artesanal",
  "live": "https://ecommerce-artesanal.vercel.app",
  "case-study": "https://lorissette13.dev/case-study/ecommerce"
}
---

## Descrição
Plataforma e-commerce completa para pequenos produtores e artesãos venderem seus produtos online. Sistema de carrinho dinâmico, múltiplas formas de pagamento e dashboard administrativo.

## Desafios
- Gerenciar estado complexo do carrinho sem Redux
- Integração segura com múltiplos gateways de pagamento
- Upload e otimização de imagens de produtos
- Dashboard intuitivo para produtores não-técnicos

## Solução
- Context API para gerenciar carrinho e autenticação
- Webhook handling para confirmar pagamentos assincronamente
- Sharp.js para otimizar imagens no backend
- UI/UX focada em simplicidade, testada com produtores reais

## Resultados
- 150+ produtores cadastrados
- $50k em vendas no primeiro ano
- Taxa de conversão: 3.2% (acima da média de e-commerce)
- NPS: 8.7/10 dos usuários