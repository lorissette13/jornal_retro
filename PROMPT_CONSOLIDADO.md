# PORTFÓLIO LORISSETTE13 - PROMPT CONSOLIDADO (v2.3.15)

## 🤖 PROTOCOLO OBRIGATÓRIO

**APÓS CADA MUDANÇA DE CÓDIGO**:
1. Teste no navegador / valide no terminal
2. `git add . && git commit` + `git push`
3. Atualizar HISTÓRICO DE MUDANÇAS
4. Documentação é parte da tarefa

## HISTÓRICO DE MUDANÇAS

**v2.3.15** - Gallery Carousel & Content Loading Fixes
**v2.3.14** - Content Expansion & Visual Refinement
**v2.3.13** - Visual Polish & Content Reliability
**v2.3.12** - Navigation & Content Fixes
**v2.3.11** - Final Implementation & Testing
**v2.3.10** - Typewriter & Connect Button
**v2.3.9** - Dynamic Data Loading
**v2.3.8** - Component Architecture
**v2.3.7** - Galeria, news items, dividers, estilos finais
**v2.3.6** - Menu e botão restaurados
**v2.3.5** - Padronização de botões
**v2.3.4** - Z-index e seletores CSS

---

## PROJETO

**Portfólio retro**: desenvolvedora front-end, estética jornal 30-50s, lowercase, Special Elite + Times New Roman.

### ESTRUTURA
```
index.html | style.css | script.js
assets/
├── css/ | js/ | data/
pages/
├── quem-sou.html | cotidiano.html | galeria.html
├── projetos.html | trajetoria.html
```

### PALETA CORES
- **Primárias**: `#8b4513` (marrom), `#a07850` (vintage), `#654321` (médio)
- **Destaque**: `#d4af37` (dourado)
- **Secundárias**: `#d2b48c` (bege), `#faf5eb` (creme)
- **Neutros**: `#2a2018` (escuro), `#3a2c1e` (médio)

### COMPONENTES CHAVE

**Layout**:
- Header com top-bar: "portfólio digital • since 1995 • developer & creative"
- Logo typewriter: `lorissette13`
- Grid 3 colunas: curriculum | projetos | cotidiano
- Footer: "desenvolvido com código e café • desde 1995"

**Estilo**:
- Animações: typewriter, fade-in, hover effects, carousel transitions
- Responsivo: 3→2→1 colunas (480px, 768px, 1024px)
- Buttons: olive green (#556B2F, #6B8E23) + shine effect, 20% smaller than original
- Gallery: Interactive carousel showing 4 items with navigation buttons
- News-items: emoji 📄, underline animation
- Dividers: separadores padrão (sem duplicatas)

**JavaScript Vanilla**:
- Gallery carousel with 4 visible items and smooth navigation
- Dynamic content loading with fallback for text, experiences, and projects
- Intersection Observer para fade-in
- localStorage para favoritos
- Smooth scroll navegação
- Carrossel com emoji placeholders

### FUNCIONALIDADES
✅ Gallery carousel with 4 visible items and olive green navigation buttons
✅ Dynamic content loading with fallback for text, experiences, and projects
✅ News-items with emojis + animations
✅ Timeline + projetos + posts
✅ Sistema favoritos
✅ Responsivo mobile-first
✅ Performance otimizada

### TECNOLOGIAS
- HTML5 semântico | CSS3 grid/flexbox | JS vanilla
- Google Fonts | Unicode emojis | Sem frameworks

---

**IMPORTANTE**: Manter estética retro, decisões técnicas. Qualquer mudança precisa justificativa técnica.
