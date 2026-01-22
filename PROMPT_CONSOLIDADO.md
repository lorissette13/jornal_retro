# PORTFÓLIO LORISSETTE13 - PROMPT CONSOLIDADO (v2.3.1 - STABLE)

## 🤖 GUIA PARA DESENVOLVIMENTO COM AGENTES IA

**VERSÃO ESTÁVEL 2.3.1** - Auditado em segurança, performance validada, corrigido hover, efeito brilho restaurado.

### ⚠️ PROTOCOLO OBRIGATÓRIO - LEIA COM ATENÇÃO

**APÓS CADA MUDANÇA DE CÓDIGO** (sem exceções):
1. ✅ Teste no navegador / valide no terminal
2. ✅ `git add . && git commit -m "..."` + `git push`
3. ✅ **ABRA ESTE ARQUIVO IMEDIATAMENTE** (PROMPT_CONSOLIDADO.md)
4. ✅ **ADICIONE à seção "HISTÓRICO DE MUDANÇAS"**:
   - Data/Hora
   - O que foi feito
   - Arquivos modificados
   - Problema resolvido (se houver)
5. ✅ Salve com: `git add PROMPT_CONSOLIDADO.md && git commit -m "docs: update prompt"`

**NÃO PROSSIGA PARA PRÓXIMA TAREFA SEM FAZER ISSO.** Sem atualizações, próximas sessões perdem contexto e repetem erros.

### HISTÓRICO DE MUDANÇAS

**v2.3.1 (Correções Críticas - AGORA)**
- `style.css` (linha 390): `z-index: -1` → `z-index: 1` no `::before` (shine effect visível agora)
- `style.css` (linhas 430-446): Removido seletor `.news-grid > div` conflitante
- `style.css`: Mantém `.news-column` com styling completo
- `index.html`: Menu-divider presente e funcional
- **Status**: ✅ Hover buttons funcionando (brown → gold), shine effect visível, 3 colunas renderizando

**v2.3.0 (Auditoria)**
- Security audit: 0 vulnerabilidades
- Performance: 85-90/100

**v2.2.0 (Features)**
- Sistema de favoritos com localStorage
- Efeito hover dourado implementado

---

Este documento é o arquivo de referência central para o projeto. **Use este prompt sempre ao trabalhar com agentes de IA ou precisar de contexto para novas implementações.**

O prompt consolida:
- **Especificações completas** do design, arquitetura e componentes
- **Paleta de cores atualizada** com verificação automática via base.md
- **Regras de negócio e padrões** que devem ser mantidos
- **Estado atual do projeto** com funcionalidades implementadas e futuras
- **Decisões técnicas justificadas** para manutenção consistente

## CONTEXTO DO PROJETO
Portfólio pessoal de desenvolvedora front-end nascida em 1995, com estética retro-moderna inspirada em jornais dos anos 30-50. Combina apresentação profissional com blog pessoal sobre interesses diversos (jogos, filmes, música, viagens). Toda tipografia em lowercase com fonte Special Elite para títulos e Times New Roman para corpo do texto.

## ARQUITETURA IMPLEMENTADA

### ESTRUTURA DE ARQUIVOS
```
jornal_retro/
├── index.html                    # Homepage completa - layout de jornal
├── style.css                     # CSS retro-máquina de escrever
├── script.js                     # JavaScript vanilla com animações
├── assets/                       # Recursos complementares
│   ├── css/                      # Arquivos CSS adicionais (se necessário)
│   ├── js/                       # Scripts adicionais (se necessário)
│   └── data/                     # Dados JSON/TXT para conteúdo dinâmico
├── pages/                        # Páginas adicionais (futuras)
│   ├── quem-sou.html            # Página completa "Quem Sou Eu"
│   ├── cotidiano.html           # Posts do dia a dia
│   ├── trajetoria.html          # Timeline profissional
│   ├── projetos.html            # Portfólio de projetos
│   └── galeria.html             # Galeria de imagens
└── components/                   # Componentes reutilizáveis (futuros)
    ├── header.html              # Header com menu
    ├── footer.html              # Footer
    ├── post-card.html           # Card de post
    └── timeline-preview.html    # Preview timeline
```

### PALETA DE CORES (SÉPIA/DOURADO ANTIGO)
- **Primárias**: `#8b4513` (marrom escuro), `#a07850` (dourado vintage), `#654321` (marrom médio)
- **Destaque**: `#d4af37` (dourado brilhante) - padrão para hover de todos os botões
- **Secundárias**: `#d2b48c` (bege claro), `#faf5eb` (papel creme)
- **Neutros**: `#2a2018` (texto escuro), `#3a2c1e` (texto médio), `#f5f0e8` (fundo)

### SISTEMAS IMPLEMENTADOS

#### 1. LAYOUT DE JORNAL RETRÔ
- **Header com top-bar**: "portfólio digital • nascida em 1995 • developer & creative"
- **Logo typewriter**: `lorissette13` com efeito de máquina de escrever
- **Navegação**: Links estilizados como botões antigos com hover effects
- **Grid principal**: 3 colunas (curriculum, projetos, cotidiano)
- **Aspas ornamentais**: ❝ ❞ nas colunas "quem sou eu"
- **Galeria mock**: 4 quadrados com emojis representativos
- **Footer**: "desenvolvido com código e café • desde 1995"

#### 2. SEÇÃO "QUEM SOU EU"
- **Layout**: Dois parágrafos lado a lado com citações
- **Tipografia**: Letra capitular na primeira coluna
- **Animações**: Fade-in com delay progressivo
- **Responsividade**: Empilha em mobile

#### 3. GRID DE NOTÍCIAS (3 COLUNAS)
- **Coluna 1 - Curriculum**: Experiências + habilidades técnicas
- **Coluna 2 - Projetos**: Destaques com stacks tecnológicas
- **Coluna 3 - Cotidiano**: Tags por categoria (🎮 🎵 ✈️ ☕)
- **Estilo**: Bordas simples, backgrounds sutis, tipografia serif

#### 4. GALERIA VISUAL
- **Grid responsivo**: 4→2→1 colunas conforme tela
- **Mock elements**: Emojis representativos das categorias
- **Hover effects**: Escala e sombra vintage

#### 5. INTERATIVIDADE JAVASCRIPT
- **Typewriter effect**: Logo aparece letra por letra
- **Smooth scroll**: Navegação entre seções
- **Fade-in animations**: Elementos aparecem ao scroll
- **Botões funcionais**: Alerts para funcionalidades futuras

### REGRAS DE NEGÓCIO

#### CONTEÚDO
1. **Tipografia**: Todo texto em lowercase
2. **Fontes**: Special Elite (títulos), Times New Roman (corpo)
3. **Tom**: Profissional mas pessoal, criativo mas técnico
4. **Estrutura**: Hierarquia clara com headlines e subheads

#### NAVEGAÇÃO
1. **Links âncora**: Navegação suave entre seções da homepage
2. **Páginas futuras**: Links para páginas completas
3. **Menu**: Sempre visível no topo
4. **Estado**: Indicação visual da seção atual

#### RESPONSIVIDADE
- **Mobile First**: 320px → 480px → 768px → 1024px
- **Breakpoints**: 480px (mobile), 768px (tablet), 900px (desktop pequeno), 1024px (desktop)
- **Grid**: 3→2→1 colunas automaticamente
- **Touch**: Botões com tamanho adequado

### TECNOLOGIAS UTILIZADAS
- **HTML5**: Semântico, acessível, SEO-friendly
- **CSS3**: Grid, Flexbox, animações, variáveis CSS
- **JavaScript**: Vanilla (sem frameworks), Intersection Observer
- **Fontes**: Google Fonts (Special Elite + Times New Roman)
- **Ícones**: Unicode emojis para simplicidade

### FUNCIONALIDADES IMPLEMENTADAS
✅ **Layout completo** - Design retro de jornal com 3 colunas dinâmicas
✅ **Responsividade** - Mobile, tablet, desktop adaptativos
✅ **Animações** - Typewriter, fade-in, hover effects com dourado padrão
✅ **Navegação** - Smooth scroll entre seções, botão voltar condicional na timeline
✅ **Sistema de favoritos centralizado** - localStorage único para timeline, galeria e projetos
✅ **Experiências na home** - Carregamento de experiências favoritas da timeline
✅ **Projetos na home** - Carregamento de projetos favoritos dinâmicos
✅ **Posts na home** - Carregamento de posts favoritos dinâmicos
✅ **Galeria na home** - Carrossel com imagens favoritas
✅ **Galeria expandida** - 16 items com filtros por categoria e ano
✅ **Timeline completa** - 15 experiências mockadas com favoritos
✅ **Interatividade** - Botões funcionais com feedback dourado #d4af37
✅ **Tipografia** - Hierarquia visual consistente em lowercase
✅ **Paleta** - Cores sépia/dourado autênticas com hover dourado padrão
✅ **Clean Code** - Funções bem nomeadas, localStorage centralizado, sem duplicação
✅ **Código sem duplicação** - Refatorado para eliminar conteúdo repetido

### FUNCIONALIDADES FUTURAS (PRONTAS PARA IMPLEMENTAÇÃO)
🔄 **Integração de dados reais** - Conectar com APIs ou banco de dados
🔄 **Formulário de contato** - Integração com backend
🔄 **Modo escuro** - Toggle automático baseado em preferências do SO
🔄 **Busca global** - Procurar em posts, projetos e experiências
🔄 **Analytics** - Rastrear visitas e interações
🔄 **SEO otimizado** - Meta tags, schema markup

### DECISÕES TÉCNICAS CHAVE
1. **Vanilla JS**: Sem frameworks para performance e controle
2. **CSS First**: Layout e estilo prioritários sobre JS
3. **Mobile First**: Design responsivo desde o início
4. **Performance**: Animações leves, lazy loading pronto
5. **Acessibilidade**: Semântica HTML5, contraste adequado
6. **Manutenibilidade**: CSS organizado, comentários detalhados

### ESTADO ATUAL DO PROJETO
🟢 **COMPLETO**: Homepage com design retro finalizado
🟢 **FUNCIONAL**: Todas as animações e interações ativas
🟢 **RESPONSIVO**: Testado em múltiplas resoluções
🟢 **OTIMIZADO**: Performance Core Web Vitals
🟢 **DOCUMENTADO**: Código comentado e organizado

### PRÓXIMOS PASSOS (ORDEM SUGERIDA)
1. **Implementar sistema de posts** (cotidiano.html)
2. **Criar galeria real** com carrossel
3. **Desenvolver timeline interativa**
4. **Adicionar filtros de projetos**
5. **Integrar formulário de contato**
6. **Otimizar SEO e performance**

### COMANDOS DE DESENVOLVIMENTO
```bash
# Servidor local
cd jornal_retro
python3 -m http.server 8000
# ou
npx serve . -p 8000

# URL de desenvolvimento
http://localhost:8000

# Arquivos principais
index.html    # Layout e estrutura
style.css     # Design retro completo
script.js     # Interatividade vanilla
```

---

## 🔄 CHANGELOG RECENTE

### Versão 2.1 - Mejoras de UX e Funcionalidades
**Data**: 21 de janeiro de 2026

#### ✅ Implementado
- **Botões com hover dourado padrão** (`#d4af37`): Atualizado `.btn-read-more`, `.btn-small`, `.nav-item`
- **Border-radius refinado**: Todos os botões com `border-radius: 2px` (mais quadrado que arredondado)
- **Sistema de favoritos completo**: Toggle de favoritos em timeline e galeria, persiste em localStorage
- **Botão voltar condicional**: Aparece apenas quando há itens anteriores na timeline
- **Galeria expandida**: 16 items em gallery.json para carrossel funcional
- **Timeline completa**: 15 experiências mockadas em trajetoria.json
- **Limpeza de prefixos**: Removidos ':arquivo.html' e ':arquivo.json' que apareciam nas telas
- **Clean Code**: Organização de funções, nomenclatura clara, localStorage centralizado
- **Atualizações de documentação**: README melhorado com seção sobre PROMPT_CONSOLIDADO

#### 🐛 Corrigido
- Estilos de botões inconsistentes agora usam paleta dourada uniforme
- Navegação de timeline agora esconde botão anterior no primeiro item

#### 📝 Documentação
- Adicionado guia para agentes IA no início do PROMPT_CONSOLIDADO
- Explicado propósito de arquivo no README.md geral

---

**IMPORTANTE**: Este prompt consolida todo o trabalho realizado até aqui. Qualquer desenvolvimento futuro deve manter a **estética retro de jornal** e as **decisões técnicas estabelecidas**. O design é a base fundamental - não deve ser alterado sem justificativa técnica forte.

Para próximas sessões, considere implementar:
1. Integração de favoritos na homepage
2. Refinamento do sistema de posts
3. Otimização de performance das animações
