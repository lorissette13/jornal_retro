# 🧪 TESTES - Guia de Execução

## 📊 Cobertura: 30% Essencial (22 testes consolidados)
**Arquivo único**: `tests/index.test.js`

**Testes inclusos**:
- ✅ Component loading (header, footer, error handling)
- ✅ Data loading (blog, projects, gallery, timeline)
- ✅ Visual elements (typewriter, hover effects, button colors)
- ✅ Navigation (filters, pagination, paging info)

## 🚀 Como Executar

### Opção 1: Via Query Parameter
```
http://localhost:8000/?debug=components
http://localhost:8000/?debug=navigation
```

### Opção 2: Via Console (F12 ou Cmd+Option+I)
```javascript
ComponentChecker.runAll()  // Validar componentes
NavigationChecker.runAll() // Validar navegação
```

### Opção 3: Via NPM
```bash
npm test  # Jest com 22 testes
```

## 📋 O Que É Testado

| Categoria | Testes | Validação |
|-----------|--------|-----------|
| **Componentes** | 3 | Header, footer, error handling |
| **Dados** | 4 | Blog, projects, gallery, timeline |
| **Visuais** | 8 | Typewriter, hover, cores botões |
| **Navegação** | 4 | Filtros, paginação, links |
| **Integração** | 3 | Setup, globals, renders |

## 📂 Arquivos de Teste

- `tests/index.test.js` → Único arquivo, 22 testes consolidados
- `assets/js/utils/component-checker.js` → Debug visual (?debug=components)
- `assets/js/utils/navigation-checker.js` → Debug navegação (?debug=navigation)

**Nota**: Remover TESTES_COMPONENTES.md e TESTES_SIMPLIFICACAO.md (redundantes, tudo documentado aqui)
