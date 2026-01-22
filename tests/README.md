# Testes - Jornal Retro

Testes automatizados com Jest. Cobertura mínima: 30% em branches, functions, lines, statements.

## Setup

```bash
npm install
npm test
npm run test:coverage  # Com cobertura
npm run test:watch    # Modo watch
```

## Testes

- `main.test.js`: loadFeaturedExperiences, loadFeaturedProjects, loadComponent, initTypewriter, initConnectButton, initFadeInAnimations
- `navigation.test.js`: loadComponent, getCurrentPage, saveScrollPosition, restoreScrollPosition, updateNavigationLinks, navigateToPage