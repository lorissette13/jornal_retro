# Testes - Jornal Retro

Este diretório contém os testes automatizados para o projeto Jornal Retro.

## Estrutura dos Testes

```
tests/
├── main.test.js          # Testes para main.js
├── navigation.test.js    # Testes para navigation.js
└── README.md            # Este arquivo
```

## Configuração

Os testes usam Jest como framework de testes. A configuração está no `package.json`:

```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "collectCoverageFrom": [
      "assets/js/**/*.js",
      "!assets/js/**/test-*.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 30,
        "functions": 30,
        "lines": 30,
        "statements": 30
      }
    }
  }
}
```

## Executando os Testes

### Instalar dependências
```bash
npm install
```

### Executar todos os testes
```bash
npm test
```

### Executar testes com cobertura
```bash
npm run test:coverage
```

### Executar testes em modo watch
```bash
npm run test:watch
```

## Cobertura dos Testes

O objetivo é manter pelo menos 30% de cobertura em:
- Branches
- Functions
- Lines
- Statements

## Testes Implementados

### main.test.js
- `loadFeaturedExperiences`: Testa carregamento de experiências
- `loadFeaturedProjects`: Testa carregamento de projetos
- `loadComponent`: Testa carregamento de componentes HTML
- `initTypewriter`: Testa inicialização do efeito máquina de escrever
- `initConnectButton`: Testa inicialização do botão conectar
- `initFadeInAnimations`: Testa inicialização das animações fade-in

### navigation.test.js
- `loadComponent`: Testa carregamento e tratamento de erros
- `getCurrentPage`: Testa obtenção da página atual
- `saveScrollPosition`: Testa salvamento da posição do scroll
- `restoreScrollPosition`: Testa restauração da posição do scroll
- `updateNavigationLinks`: Testa atualização dos links de navegação
- `navigateToPage`: Testa navegação básica entre páginas

## Notas

- Os testes usam mocks para `fetch`, `document`, `window` e outras APIs do navegador
- A cobertura atual foca nas funções principais e caminhos críticos
- Novos testes devem ser adicionados conforme novas funcionalidades são implementadas