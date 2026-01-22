# PORTFÓLIO LORISSETTE13 - PROMPT CONSOLIDADO (v2.3.5)

## 🤖 PROTOCOLO OBRIGATÓRIO

**APÓS CADA MUDANÇA DE CÓDIGO**:
1. Teste no navegador / valide no terminal
2. `git add . && git commit` + `git push`
3. Atualizar HISTÓRICO DE MUDANÇAS
4. Documentação é parte da tarefa

## HISTÓRICO DE MUDANÇAS

**v2.3.5** - Galeria, news items, dividers, estilos finais
**v2.3.4** - Menu e botão restaurados
**v2.3.3** - Padronização de botões
**v2.3.2** - Z-index e seletores CSS

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
- Animações: typewriter, fade-in, hover effects
- Responsivo: 3→2→1 colunas (480px, 768px, 1024px)
- Buttons: marrom + shine effect (sem mudança cor no hover)
- News-items: emoji 📄, underline animation
- Dividers: separadores padrão (sem duplicatas)

**JavaScript Vanilla**:
- Intersection Observer para fade-in
- localStorage para favoritos
- Smooth scroll navegação
- Carrossel com emoji placeholders

### FUNCIONALIDADES
✅ Galeria com emoji + carrossel
✅ News-items com emojis + animations
✅ Timeline + projetos + posts
✅ Sistema favoritos
✅ Responsivo mobile-first
✅ Performance otimizada

### TECNOLOGIAS
- HTML5 semântico | CSS3 grid/flexbox | JS vanilla
- Google Fonts | Unicode emojis | Sem frameworks

---

**IMPORTANTE**: Manter estética retro, decisões técnicas. Qualquer mudança precisa justificativa técnica.
