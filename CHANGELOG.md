# CHANGELOG - Jornal Retro

## v2.1.0 - 21 de Janeiro de 2026

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
