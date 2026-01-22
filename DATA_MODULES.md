# 📚 Sistema Modular de Trajetória e Projetos

## Visão Geral

Implementado um sistema **totalmente modularizado** para gerenciar trajetória profissional e projetos. Assim como o sistema de posts, todos os dados são **arquivos Markdown independentes** organizados por data.

## ✨ Benefícios

- ✅ **Modularidade**: Cada experiência/projeto é um arquivo independente
- ✅ **Facilidade**: Adicionar novo item sem mexer em JavaScript
- ✅ **Escalabilidade**: Adicionar 100 itens é tão simples quanto 1
- ✅ **Organização**: Ordenados cronologicamente
- ✅ **Dinâmico**: A home carrega automaticamente os 2 mais recentes

## 📁 Estrutura

```
assets/data/
├── trajectory/
│   ├── README.md
│   ├── 2024-01-20-frontend-senior.md
│   ├── 2024-01-15-fullstack-startup.md
│   ├── 2024-01-10-frontend-junior.md
│   └── 2024-01-05-bootcamp.md
│
├── projects/
│   ├── README.md
│   ├── 2024-01-20-jornal-retro.md
│   ├── 2024-01-18-ecommerce-artesanal.md
│   ├── 2024-01-15-travel-app.md
│   ├── 2024-01-12-analytics-dashboard.md
│   ├── 2024-01-10-productivity-app.md
│   └── 2024-01-08-course-platform.md
│
└── posts/
    └── (já existente)
```

## 📄 Formato de Arquivo

### Trajetória

```yaml
---
title: "Cargo/Título"
position: "Posição específica"
company: "Empresa"
period: "Jan 2020 - Dez 2021"
date: "YYYY-MM-DD"
featured: true/false
skills: ["skill1", "skill2", "skill3"]
---

## Contexto
Descrição do cenário e contexto da experiência.

## Realizações
- Realização 1
- Realização 2
- Realização 3

## Aprendizados
Principais aprendizados dessa fase.
```

### Projetos

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
- Desafio 1
- Desafio 2

## Solução
Como foram resolvidos os desafios.

## Resultados
Impacto, métricas ou resultados.
```

## 🔧 Funções Disponíveis

### Para Trajetória

```javascript
getTrajectoryByFeatured(featured = true)      // Filtrar por featured
getTrajectoryByCompany(company)               // Filtrar por empresa
getTrajectoryBySkill(skill)                   // Filtrar por skill
getRecentTrajectory(limit = 2)                // Últimas N experiências
```

### Para Projetos

```javascript
getProjectsByFeatured(featured = true)        // Filtrar por featured
getProjectsByStatus(status)                   // Filtrar por status
getProjectsByStack(tech)                      // Filtrar por tecnologia
getRecentProjects(limit = 3)                  // Últimos N projetos
getFeaturedProjects(limit = 3)                // Projetos destacados
```

### Renderização

```javascript
renderTrajectoryHTML(experience)              // HTML pronto para experiência
renderProjectHTML(project)                    // HTML pronto para projeto
formatDate(dateString)                        // Formata data (dd mês yyyy)
```

## 📊 Dados Carregados na Home

A página `index.html` carrega automaticamente:

- **Trajetória**: 2 experiências mais recentes (por data)
- **Projetos**: 2 projetos mais recentes (por data)
- **Cotidiano**: Tags/categorias estáticas (não dinâmicas)

### Como Funciona

```javascript
// No index.html
document.addEventListener('DOMContentLoaded', function() {
  // Carrega 2 experiências mais recentes
  const recentTrajectory = getRecentTrajectory(2);
  const experienceContainer = document.getElementById('featured-experiences');
  experienceContainer.innerHTML = recentTrajectory.map(renderTrajectoryHTML).join('');
  
  // Carrega 2 projetos mais recentes
  const recentProjects = getRecentProjects(2);
  const projectContainer = document.getElementById('featured-projects');
  projectContainer.innerHTML = recentProjects.map(renderProjectHTML).join('');
});
```

## 🎨 Estilos Disponíveis

```css
.trajectory-item        /* Container de experiência */
.project-item          /* Container de projeto */
.news-subtitle         /* Subtitle da experiência (cargo • empresa) */
.skills-tags           /* Container de tags de skill */
.skill-tag             /* Tag individual de skill */
.project-link          /* Link do projeto */
```

## ➕ Adicionar Nova Experiência

1. Crie um arquivo: `assets/data/trajectory/2024-MM-DD-slug.md`
2. Use o template do README.md da pasta
3. Preencha com seus dados
4. Salve
5. Pronto! Aparecerá automaticamente na home se for um dos 2 mais recentes

## ➕ Adicionar Novo Projeto

1. Crie um arquivo: `assets/data/projects/2024-MM-DD-slug.md`
2. Use o template do README.md da pasta
3. Preencha com seus dados
4. Salve
5. Pronto! Aparecerá automaticamente na home se for um dos 2 mais recentes

## 🔄 Integração com Posts

O sistema já existe para posts (`assets/js/posts-parser.js`) e segue o mesmo padrão. Os 3 sistemas funcionam de forma independente mas integrada.

## 📝 Exemplo Prático

### Adicionar Nova Experiência

Arquivo: `assets/data/trajectory/2024-02-01-remote-lead.md`

```yaml
---
title: "Liderança Técnica"
position: "Tech Lead"
company: "RemoteCompany"
period: "Jan 2024 - Presente"
date: "2024-02-01"
featured: true
skills: ["Leadership", "Mentorship", "Architecture", "React", "TypeScript"]
---

## Contexto
Promovido para liderar time técnico de 8 desenvolvedores em ambiente 100% remoto.

## Realizações
- Estruturado processo de code review que reduziu bugs em 50%
- Mentoria de 3 juniores que evoluíram para mid-level
- Implementação de arquitetura de micro-frontend escalável

## Aprendizados
Liderança remota exige clareza ainda maior. Documentação não é luxo, é necessidade.
```

Após salvar, esse item aparecerá automaticamente na home se for um dos 2 mais recentes!

## ✅ Checklist de Implementação

- ✅ Pastas criadas: `trajectory/` e `projects/`
- ✅ Templates e READMEs criados
- ✅ 4 experiências adicionadas
- ✅ 6 projetos adicionados
- ✅ Parser JS implementado (`data-parser.js`)
- ✅ index.html atualizado para carregar dados
- ✅ CSS com estilos dos novos elementos
- ✅ Sistema pronto para usar e escalar
