# CHANGELOG - Jornal Retro

## v2.2.0 - 21 de Janeiro de 2026 (Tarde)

### 🔧 Correções Críticas
- **Removido código duplicado**: index.html tinha conteúdo repetido (duas seções news-grid)
- **Eliminado divisor extra do footer**: `.divider-footer` que aparecia horrível acima do rodapé
- **Refatoração da homepage**: Agora carrega conteúdo dinâmico da timeline, projetos e posts

### ✨ Novas Funcionalidades
- **Experiências favoritas na home**: Carrega experiências marcadas como favorita da timeline
- **Sistema unificado de favoritos**: localStorage centralizado compartilha dados entre páginas
- **Função `loadFeaturedExperiences()`**: Carrega experiências da home com preview customizado
- **Estilos para preview de experiências**: `.experience-preview` com ícones, período, skills

### 🧹 Limpeza de Código
- Removida duplicação HTML em index.html
- Refatorada seção news-grid para usar carregamento dinâmico
- Componente footer agora centralizado em `components/footer.html`
- Todos os scripts atualizados para usar footer via `loadComponent()`

### 📝 Documentação
- PROMPT_CONSOLIDADO atualizado com v2.2 estável
- Funcionalidades agora refletem estado real do sistema
- Próximas 3 iterações vão atualizar CHANGELOG em todas

### 🔍 Verificações Realizadas
- Procura por código duplicado em todos os HTML/JS
- Validação de JSON em gallery.json, trajetoria.json, config.json
- Limpeza de prefixos ':arquivo' em 23 arquivos
- Teste de renderização sem erros

### 📊 Estatísticas
- 0 linhas de código duplicado em index.html
- 4 divisores desnecessários removidos
- 3 novas funções adicionadas para favoritos

---

## v2.1.0 - 21 de Janeiro de 2026 (Manhã)

### 🎨 Melhorias de Design
- **Hover dourado padrão**: Todos os botões usam `#d4af37` no hover
- **Border-radius refinado**: Botões com `2px` para manter aspecto quadrado
- **Consistência visual**: Paleta de cores atualizada com destaque dourado

### ✨ Novas Funcionalidades
- **Sistema de favoritos completo**:
  - Toggle de favoritos em timeline e galeria
  - Persistência em localStorage
  - Ícones dinâmicos (☆ vazio / ★ preenchido)
  
- **Botão voltar condicional na timeline**:
  - Aparece apenas quando há itens anteriores
  - Desaparece no primeiro item
  
- **Galeria expandida**:
  - 16 items (antes havia 10)
  - Carrossel funcional
  - Filtros por categoria e ano

- **Timeline completa**:
  - 15 experiências (antes havia 8)
  - Mocks de educação, trabalho, certificações e projetos

### 🧹 Limpeza de Código
- Removidos prefixos ':arquivo' dos arquivos
- localStorage centralizado
- Nomenclatura clara de variáveis
- Clean code aplicado

### 📝 Documentação
- Seção "Guia para Agentes IA" no PROMPT_CONSOLIDADO
- README.md atualizado
- CHANGELOG.md criado

### 🔧 Arquivos Modificados
- style.css: Botões com novo hover dourado
- gallery.css: Sistema de favoritos atualizado
- timeline.js: Botão condicional e favoritos
- gallery.js: Integração de favoritos
- page.css: Estilos dos botões de navegação
- timeline.css: Novo estilo de botão favoritar
- PROMPT_CONSOLIDADO.md: Atualizado com mudanças

---

## v2.0.0 - Base Inicial

- Design retro de jornal
- Responsividade total
- Sistema de galeria
- Timeline interativa
- Navegação completa
