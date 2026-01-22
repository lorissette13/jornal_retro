---
title: "App de Viagens Colaborativo"
description: "Rede social para viajantes compartilharem rotas autênticas"
date: "2024-01-15"
featured: true
status: "in-progress"
stack: ["Vue.js", "Python", "FastAPI", "Mapbox", "Machine Learning", "PostgreSQL"]
links: {
  "github": "https://github.com/lorissette13/travel-app",
  "live": "https://travel-collab.app"
}
---

## Descrição
Rede social para viajantes nômades compartilharem rotas autênticas, evitando turismo em massa. Sistema de recomendações baseado em IA aprende preferências e sugere destinos alinhados.

## Desafios
- Algoritmo de recomendação que funcione com dados esparsos
- Gerenciar dados de geolocalização com privacidade
- Mapas interativos que carregam rápido mesmo em conexões lentas
- Community moderation em escala

## Solução
- Collaborative filtering com matrix factorization
- GPX track encryption para privacidade do usuário
- Tile-based maps com lazy loading
- Sistema de flags automatizado + moderadores comunitários

## Resultados
- 5k+ usuários ativos
- 2k+ rotas compartilhadas
- Implementação em 12 cidades-piloto
- Feedback médio: 4.6/5 stars