# Testes - Jornal Retro

Testes automatizados com Jest. **Cobertura mínima: 30%** focada em funcionalidades críticas.

## 📋 Setup

```bash
npm install
npm test                 # Executa todos os testes
npm run test:watch     # Modo watch
npm run test:coverage  # Relatório de cobertura
```

## 🎯 Estratégia: 30% Essencial

Cobertura **focada nas funcionalidades críticas** que precisam ser mantidas em futuras iterações:

### ✅ Testado (Essencial)
- **Component Loading**: Header, Footer, componentes dinâmicos
- **Data Loading**: Blog (posts), Projects, Gallery, Timeline carregam do `assets/content/`
- **Visual Elements**: 
  - Typewriter effect (logo animado)
  - Hover effects (blocos de projetos)
  - Button colors (tokens CSS aplicados)
- **Navigation**: Filtros por categoria, paginação
- **Favorites**: Salvamento/carregamento de favoritos em localStorage

### ❌ Removido (Redundante/Não Essencial)
- Testes de `initTypewriter()` (já coberto em Visual Elements)
- Testes de `initConnectButton()` (button não crítico)
- Testes de `initFadeInAnimations()` (CSS animation, não necessário testar em JS)
- Testes de `scrollTo()` (não essencial para cobertura)
- Testes de `DOMParser` (não usado no projeto)
- Testes de `sessionStorage` (não usado no projeto)
- Testes de `setTimeout/setInterval` (timing tests redundantes)

## 📊 Estrutura

**Arquivo único consolidado**: `tests/index.test.js`

```javascript
// Organização por seção:
describe('Component Loading')        // header, footer
describe('Data Loading')             // blog, projects, gallery, timeline
describe('Visual Elements')          // typewriter, hover, buttons
describe('Navigation and Filters')   // filtros, paginação
describe('Favorites Management')     // localStorage
```

## 🧪 Rodando Testes

```bash
# Todos
npm test

# Apenas cobertura
npm run test:coverage

# Watch mode (ótimo durante desenvolvimento)
npm run test:watch

# Specific test
npm test -- tests/index.test.js
```

## 📈 Cobertura Esperada

```
Statements   : 30%+
Branches     : 30%+
Functions    : 30%+
Lines        : 30%+
```

Mantém o essencial sem overhead de testes redundantes.

## 🔄 Integrando novos testes

Adicione ao final de `tests/index.test.js`:

```javascript
describe('New Feature', () => {
    test('deve fazer algo', () => {
        // Arrange, Act, Assert
    });
});
```

## 📝 Referência

- [Jest Docs](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/)
- [30% Coverage Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
