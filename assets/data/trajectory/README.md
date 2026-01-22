# Sistema Modular de Trajetória

## Estrutura

Cada arquivo representa uma experiência ou conquista na trajetória profissional.

**Formato do arquivo**: `YYYY-MM-DD-slug-titulo.md`

## Formato do Arquivo

```yaml
---
title: "Título da Experiência"
position: "Cargo/Título"
company: "Empresa"
period: "Período (ex: Jan 2020 - Dez 2021)"
date: "YYYY-MM-DD"
featured: true/false
skills: ["skill1", "skill2", "skill3"]
---

## Contexto
Descrição do cenário e contexto da experiência.

## Realizações
Principais conquistas e resultados obtidos.

## Aprendizados
O que foi aprendido durante essa fase.
```

## Exemplo

```yaml
---
title: "Desenvolvimento de Plataforma Escalável"
position: "Senior Frontend Engineer"
company: "TechCorp"
period: "Jan 2022 - Presente"
date: "2022-01-15"
featured: true
skills: ["React", "TypeScript", "Architecture", "Mentorship"]
---

## Contexto
Liderada a arquitetura de uma plataforma web para gerenciar 500k+ usuários ativos simultaneamente.

## Realizações
- Arquitetura modular escalável com 15+ componentes base
- Performance otimizada: 2.3s → 0.8s de load time
- Mentoria de 5 desenvolvedores júnior

## Aprendizados
Design system é mais que CSS, é linguagem entre times.
```

## Adicionar Nova Experiência

1. Crie um arquivo com nome: `2024-01-20-novo-titulo.md`
2. Copie o template acima
3. Preencha os campos
4. Salve na pasta `/assets/data/trajectory/`

Pronto! O sistema detectará automaticamente.
