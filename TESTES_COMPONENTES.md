# 🧪 Testes de Componentes - lorissette13

Guia para validar que todos os componentes necessários estão carregados e funcionando corretamente.

## 🚀 Como Executar Testes

### Opção 1: Via Query Parameter (Automático)
Abra qualquer página com `?debug=components`:

```
http://localhost:8000/?debug=components
http://localhost:8000/pages/galeria.html?debug=components
http://localhost:8000/pages/projetos.html?debug=components
```

O teste rodará automaticamente ao carregar a página e exibirá os resultados no console.

### Opção 2: Via Console (Manual)
1. Abra qualquer página do portfólio
2. Abra o Developer Console (F12 ou Cmd+Option+I)
3. Execute:

```javascript
ComponentChecker.runAll()
```

Para testes específicos:
```javascript
ComponentChecker.checkHeader()
ComponentChecker.checkFooter()
ComponentChecker.checkNavigation()
ComponentChecker.checkLoadedComponents()
ComponentChecker.checkCSS()
ComponentChecker.checkGlobalFunctions()
```

## 🔗 Teste de Navegação

Para validar que todos os links estão funcionando:

```
http://localhost:8000/?debug=navigation
http://localhost:8000/pages/galeria.html?debug=navigation
```

Ou no console:
```javascript
NavigationChecker.runAll()
```

Testes incluem:
- Header navigation (links no menu)
- Links para páginas internas
- Âncoras internas (#)
- Footer
- Funções de navegação disponíveis

## ✅ Checklist de Componentes

Cada página DEVE ter:

- ✅ **Header** 
  - Logo com efeito typewriter (home apenas)
  - Menu de navegação com links funcionais
  - Localizado no topo

- ✅ **Footer**
  - Informações de contato/copyright
  - Links funcionais
  - Localizado na base

- ✅ **Navegação**
  - Menu acessível (não coberto por outros elementos)
  - Links apontam para URLs corretas
  - Âncoras internas funcionam

- ✅ **CSS Carregado**
  - style.css (estilos globais)
  - page.css (páginas internas)
  - CSS específico da página (gallery.css, filters.css, etc.)
  - Cores e layout aparecem corretamente

- ✅ **Funções Globais**
  - `window.loadComponent()` disponível
  - `window.initTypewriter()` disponível
  - `window.ComponentChecker` disponível
  - `window.NavigationChecker` disponível

## 📝 Páginas com Testes Integrados

Todas as páginas abaixo incluem os utilitários de teste:

- ✅ `index.html` - Home
- ✅ `pages/galeria.html` - Galeria
- ✅ `pages/cotidiano.html` - Blog de Posts
- ✅ `pages/projetos.html` - Projetos
- ✅ `pages/trajetoria.html` - Timeline
- ✅ `pages/quem-sou.html` - Sobre

## 🔍 Diagnóstico Rápido

Se algo não estiver funcionando:

### 1. Header não aparece
```javascript
ComponentChecker.checkHeader()
```
- Verifica se header.html foi carregado
- Verifica se tem logo e menu

### 2. Footer não aparece
```javascript
ComponentChecker.checkFooter()
```
- Verifica se footer.html foi carregado
- Verifica se tem conteúdo

### 3. Links não funcionam
```javascript
NavigationChecker.runAll()
```
- Verifica URLs dos links
- Verifica se âncoras internas existem

### 4. CSS não está aplicado
```javascript
ComponentChecker.checkCSS()
```
- Lista stylesheets carregados
- Verifica se tokens, layout, page CSS estão presentes

### 5. Função loadComponent não funciona
```javascript
ComponentChecker.checkGlobalFunctions()
```
- Verifica se `loadComponent` está disponível em window
- Verifica se utilitários estão carregados

## 📊 Exemplo de Saída Esperada

```
🧩 COMPONENT CHECKER - Validando integridade de componentes

✓ Header
   Header presente com logo e menu
   
✓ Footer
   Footer presente com conteúdo

✓ Navigation
   4 itens de navegação encontrados
   
✓ Loaded Components
   Componentes carregados: 3/3

✓ CSS
   5 stylesheets carregados

✓ Global Functions
   loadComponent: true
   initTypewriter: true
   
---
✅ TODOS OS TESTES PASSARAM
```

## 🛠️ Troubleshooting

**Problema**: "Header não encontrado"
- **Causa**: `components/header.html` não foi carregado
- **Solução**: Verifique se `component-loader.js` está carregado, cheque console para erros de fetch

**Problema**: "Nenhuma função global disponível"
- **Causa**: Scripts não foram carregados na ordem correta
- **Solução**: Verifique se `component-checker.js` está incluído ANTES do DOMContentLoaded

**Problema**: "CSS não está aplicado"
- **Causa**: Caminhos relativos incorretos para arquivos CSS
- **Solução**: Abra DevTools → Network, procure por 404s nos arquivos CSS

**Problema**: "Links não funcionam"
- **Causa**: Caminhos relativos incorretos (especialmente em páginas em `/pages/`)
- **Solução**: Use `../components/` para páginas em `/pages/`, `components/` para home

## 📚 Referências

- [PROMPT_CONSOLIDADO.md](PROMPT_CONSOLIDADO.md) - Arquitetura geral
- [README.md](README.md) - Quick start
- [assets/js/utils/component-checker.js](assets/js/utils/component-checker.js) - Código do checker
- [assets/js/utils/navigation-checker.js](assets/js/utils/navigation-checker.js) - Código do navigation checker

## ✨ Próximos Passos

Após validar que todos os componentes estão carregando:

1. Testar responsividade em diferentes tamanhos de tela
2. Verificar performance (DevTools → Performance)
3. Validar acessibilidade (WCAG 2.1 AA)
4. Testar em navegadores diferentes
