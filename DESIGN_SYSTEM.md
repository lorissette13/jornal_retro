# Design System - Portfólio Lorissette13

Sistema centralizado de variáveis CSS para garantir consistência visual e facilitar manutenção do projeto.

## 📋 Índice

1. [Cores](#cores)
2. [Espaçamentos](#espaçamentos)
3. [Tipografia](#tipografia)
4. [Borders e Raios](#borders-e-raios)
5. [Transições](#transições)
6. [Z-Index](#z-index)
7. [Como Usar](#como-usar)
8. [Exemplos Práticos](#exemplos-práticos)

---

## Cores

### Primárias (Paleta Retro Jornal)

```css
--color-primary-brown: #8b4513;       /* Marrom principal */
--color-primary-tan: #a07850;         /* Marrom vintage */
--color-primary-dark: #654321;        /* Marrom escuro */
```

### Secundárias (Destaques)

```css
--color-accent-gold: #d4af37;         /* Dourado elegante */
--color-accent-olive: #556B2F;        /* Verde oliva */
--color-accent-olive-light: #6B8E23;  /* Verde oliva claro */
--color-accent-sage: #7E8C54;         /* Sage verde */
--color-accent-sage-light: #95A568;   /* Sage claro */
--color-accent-sand: #d2b48c;         /* Areia/bege */
```

### Categorias de Posts

```css
--color-cat-filmes: #e63946;          /* Filmes - Vermelho */
--color-cat-jogos: #457b9d;           /* Jogos - Azul */
--color-cat-boardgames: #2a9d8f;      /* Boardgames - Teal */
--color-cat-livros: #e9c46a;          /* Livros - Amarelo */
--color-cat-musica: #9d4edd;          /* Música - Roxo */
--color-cat-devlife: #7E8C54;         /* Dev Life - Sage */
```

### Neutras

```css
--color-text-primary: #000000;        /* Texto principal */
--color-text-secondary: #3a3a3a;      /* Texto secundário */
--color-text-muted: #657043;          /* Texto silenciado */
--color-text-light: #a09080;          /* Texto claro */

--color-bg-white: #ffffff;            /* Fundo branco */
--color-bg-cream: #faf5eb;            /* Fundo creme */
--color-bg-light: #f5f5f5;            /* Fundo claro */
--color-bg-lighter: #f0ebe3;          /* Fundo mais claro */

--color-dark-text: #2a2018;           /* Texto muito escuro */
--color-dark-text-medium: #3a2c1e;    /* Texto escuro médio */
```

### Borders

```css
--color-border-primary: #95A568;      /* Border principal */
--color-border-secondary: #d2b48c;    /* Border secundária */
--color-border-brown: #8b4513;        /* Border marrom */
```

---

## Espaçamentos

### Sistema Base (8px)

```css
--spacing-2xs: 4px;        /* Extra pequeno */
--spacing-xs: 8px;         /* Muito pequeno */
--spacing-sm: 12px;        /* Pequeno */
--spacing-md: 16px;        /* Médio */
--spacing-lg: 24px;        /* Grande */
--spacing-xl: 30px;        /* Extra grande */
--spacing-2xl: 40px;       /* Muito grande */
--spacing-3xl: 50px;       /* Gigante */
--spacing-4xl: 60px;       /* Extremo */
--spacing-5xl: 80px;       /* Muito extremo */
```

### Container

```css
--container-padding-x: 40px;          /* Padding horizontal */
--container-padding-y: 50px;          /* Padding vertical */
--container-margin-y: 50px;           /* Margin vertical */
--container-margin-bottom: 80px;      /* Margin bottom (footer) */
--container-max-width: 1200px;        /* Max width */
--page-content-max-width: 1000px;     /* Max width page */
```

### Seções

```css
--section-margin-bottom: 60px;        /* Margin padrão */
--section-margin-bottom-small: 40px;  /* Margin pequeno */
--section-margin-bottom-xs: 30px;     /* Margin extra pequeno */
--section-padding: 25px;              /* Padding padrão */
--section-padding-lg: 30px;           /* Padding grande */
```

### Gaps (Flexbox/Grid)

```css
--gap-xs: 8px;
--gap-sm: 12px;
--gap-md: 16px;
--gap-lg: 20px;
--gap-xl: 30px;
--gap-2xl: 50px;
```

### Padding de Elementos

```css
--padding-btn: 8px 16px;              /* Botões */
--padding-card: 25px;                 /* Cards */
--padding-card-lg: 30px;              /* Cards grandes */
--padding-section: 30px;              /* Seções */
--padding-header: 15px 0;             /* Headers */
```

---

## Tipografia

### Famílias de Fonts

```css
--font-family-serif: 'Times New Roman', serif;
--font-family-mono: 'Special Elite', monospace;
```

### Tamanhos

```css
--font-size-xs: 0.8rem;     /* Extra pequeno */
--font-size-sm: 0.9rem;     /* Pequeno */
--font-size-md: 1rem;       /* Médio (base) */
--font-size-base: 1.05rem;  /* Base */
--font-size-lg: 1.1rem;     /* Grande */
--font-size-xl: 1.2rem;     /* Extra grande */
--font-size-2xl: 1.5rem;    /* Muito grande */
--font-size-3xl: 2rem;      /* Gigante */
--font-size-4xl: 2.2rem;    /* Muito gigante */
--font-size-5xl: 3rem;      /* Extremo */
--font-size-6xl: 3.5rem;    /* Muito extremo */
```

### Line Height

```css
--line-height-tight: 1.15;   /* Compacto */
--line-height-normal: 1.6;   /* Normal (body) */
--line-height-relaxed: 1.7;  /* Relaxado */
--line-height-loose: 1.8;    /* Solto */
```

### Letter Spacing

```css
--letter-spacing-normal: 0;        /* Normal */
--letter-spacing-wide: 1px;        /* Amplo */
--letter-spacing-wider: 1.5px;     /* Mais amplo */
--letter-spacing-widest: 2px;      /* Muito amplo */
```

---

## Borders e Raios

### Widths

```css
--border-width-thin: 1px;      /* Fino */
--border-width-normal: 2px;    /* Normal */
--border-width-thick: 3px;     /* Grosso */
--border-width-very-thick: 4px; /* Muito grosso */
```

### Radius

```css
--border-radius-small: 2px;    /* Pequeno */
--border-radius-medium: 4px;   /* Médio */
--border-radius-large: 12px;   /* Grande */
```

### Alturas Específicas

```css
--height-btn-small: 45px;      /* Botão pequeno */
--height-btn-normal: 50px;     /* Botão normal */
--height-divider: 2px;         /* Divider fino */
--height-divider-thick: 3px;   /* Divider grosso */
```

---

## Transições

```css
--transition-fast: 0.2s ease;                              /* Rápido */
--transition-normal: 0.3s ease;                            /* Normal */
--transition-slow: 0.4s ease;                              /* Lento */
--transition-slower: 0.6s ease;                            /* Mais lento */
--transition-slowest: 0.7s ease;                           /* Muito lento */
--transition-cubic-ease: cubic-bezier(0.175, 0.885, ...); /* Easing avançado */
```

---

## Z-Index

```css
--z-background: -2;    /* Fundo */
--z-texture: -1;       /* Textura */
--z-base: 1;           /* Base */
--z-elevated: 2;       /* Elevado */
--z-dropdown: 10;      /* Dropdown */
--z-modal: 100;        /* Modal */
```

---

## Como Usar

### 1. Importar Tokens (Automático)

Os tokens.css são automaticamente importados no `style.css`, que é incluído em todos os HTMLs:

```html
<link rel="stylesheet" href="style.css">
```

### 2. Usar Variáveis nos CSS

Em qualquer arquivo CSS, use as variáveis sem necessidade de nova importação:

```css
.btn {
    padding: var(--padding-btn);
    background: var(--color-accent-olive);
    color: var(--color-bg-white);
    font-size: var(--font-size-base);
    border-radius: var(--border-radius-small);
    transition: all var(--transition-normal);
    border: var(--border-width-thin) solid var(--color-border-primary);
}
```

### 3. Adicionar Novas Variáveis

Se precisar adicionar uma nova cor ou espaçamento:

1. Abra `assets/css/tokens.css`
2. Adicione a variável na seção apropriada
3. Use em qualquer CSS file

```css
:root {
    /* Suas novas variáveis aqui */
    --color-new-highlight: #FF6B6B;
    --spacing-custom: 35px;
}
```

---

## Exemplos Práticos

### Exemplo 1: Criar um Card

```css
.card {
    background: var(--color-bg-light);
    padding: var(--padding-card);
    border: var(--border-width-normal) solid var(--color-border-primary);
    border-radius: var(--border-radius-medium);
    margin-bottom: var(--spacing-lg);
    transition: all var(--transition-normal);
}

.card:hover {
    box-shadow: 0 8px 16px var(--shadow-medium);
    transform: translateY(-4px);
}
```

### Exemplo 2: Botão com Variações

```css
.btn-primary {
    padding: var(--padding-btn);
    background: var(--color-accent-olive);
    color: var(--color-bg-white);
    font-size: var(--font-size-base);
    border-radius: var(--border-radius-small);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.btn-primary:hover {
    background: var(--color-accent-sage);
    box-shadow: 0 4px 12px var(--shadow-olive);
}
```

### Exemplo 3: Tipografia Consistente

```css
h1 {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-5xl);
    color: var(--color-text-primary);
    letter-spacing: var(--letter-spacing-widest);
    margin-bottom: var(--spacing-2xl);
    line-height: var(--line-height-tight);
}

p {
    font-family: var(--font-family-serif);
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--spacing-md);
}
```

### Exemplo 4: Categorias de Posts

```css
.post-filmes { border-left: 4px solid var(--color-cat-filmes); }
.post-jogos { border-left: 4px solid var(--color-cat-jogos); }
.post-livros { border-left: 4px solid var(--color-cat-livros); }
.post-musica { border-left: 4px solid var(--color-cat-musica); }
```

---

## Benefícios

✅ **Consistência Visual**: Todas as cores, espaçamentos e tipografia seguem o mesmo padrão  
✅ **Manutenção Facilitada**: Alterar cores/espaçamentos em um único lugar  
✅ **Escalabilidade**: Fácil adicionar novas variáveis conforme necessário  
✅ **Temas Futuros**: Base pronta para modo escuro ou variações de marca  
✅ **Documentação**: Visão completa do design system do projeto  
✅ **Performance**: Reutilização de valores evita duplicação  

---

## Próximas Etapas

- [ ] Criar variáveis para efeitos de sombra mais complexos
- [ ] Adicionar media queries para espaçamentos responsivos
- [ ] Implementar CSS custom properties dinamicamente via JavaScript (temas)
- [ ] Documentar padrões de nomenclatura para novos componentes
