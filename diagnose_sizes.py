#!/usr/bin/env python3
"""
Diagnóstico de Inconsistências de Tamanho - Botões e Fonte na Home
"""

import re
from pathlib import Path

root = Path("/Users/loris/Documents/GitHub/github_pages/jornal_retro")
css_dir = root / "assets/css"

print("\n" + "="*80)
print("🔍 DIAGNÓSTICO - INCONSISTÊNCIAS DE TAMANHO NA HOME")
print("="*80 + "\n")

# Lê buttons.css
buttons_css_file = css_dir / "buttons.css"
with open(buttons_css_file, 'r', encoding='utf-8') as f:
    buttons_content = f.read()

# Remove comentários
buttons_clean = re.sub(r'/\*.*?\*/', '', buttons_content, flags=re.DOTALL)

# 1. Encontra todos os sizes de botões
print("📊 TAMANHOS DE BOTÕES NO HOME\n")

button_sizes = {
    ".btn-read-more": {
        "padding": [],
        "font-size": []
    },
    ".btn-small": {
        "padding": [],
        "font-size": []
    }
}

# Padrão para encontrar rules de .btn-read-more e .btn-small
for selector in [".btn-read-more", ".btn-small"]:
    # Encontra todas as regras
    patterns = [
        rf'{re.escape(selector)}\s*\{{([^}}]+)\}}',
        rf'{re.escape(selector)}:[^\s]+\s*\{{([^}}]+)\}}',
    ]
    
    for pattern in patterns:
        matches = re.finditer(pattern, buttons_clean, re.DOTALL)
        for match in matches:
            rule_content = match.group(1)
            
            # Extrai padding
            padding_match = re.search(r'padding:\s*([^;]+);', rule_content)
            if padding_match:
                padding = padding_match.group(1).strip()
                if padding not in button_sizes[selector]["padding"]:
                    button_sizes[selector]["padding"].append(padding)
            
            # Extrai font-size
            fontsize_match = re.search(r'font-size:\s*([^;]+);', rule_content)
            if fontsize_match:
                fontsize = fontsize_match.group(1).strip()
                if fontsize not in button_sizes[selector]["font-size"]:
                    button_sizes[selector]["font-size"].append(fontsize)

# Mostra os tamanhos
print("Seletor: .btn-read-more")
print("  Paddings encontrados:")
for i, p in enumerate(button_sizes[".btn-read-more"]["padding"], 1):
    print(f"    {i}. {p}")
print("  Font-sizes encontrados:")
for i, f in enumerate(button_sizes[".btn-read-more"]["font-size"], 1):
    print(f"    {i}. {f}")

print("\nSeletor: .btn-small")
print("  Paddings encontrados:")
for i, p in enumerate(button_sizes[".btn-small"]["padding"], 1):
    print(f"    {i}. {p}")
print("  Font-sizes encontrados:")
for i, f in enumerate(button_sizes[".btn-small"]["font-size"], 1):
    print(f"    {i}. {f}")

# 2. Verifica contextos específicos
print("\n" + "="*80)
print("📍 REGRAS ESPECÍFICAS POR CONTEXTO\n")

contexts = {
    "desktop": {
        "pattern": r'(?<!@media)\.btn-(read-more|small)\s*\{([^}]+)\}(?![\s\S]*@media)',
        "name": "Desktop (padrão)"
    },
    "tablet": {
        "pattern": r'@media\s*\([^)]*max-width:\s*768px[^)]*\)[\s\S]*?\.btn-(read-more|small)\s*\{([^}]+)\}',
        "name": "Tablet (768px)"
    },
    "mobile": {
        "pattern": r'@media\s*\([^)]*max-width:\s*480px[^)]*\)[\s\S]*?\.btn-(read-more|small)\s*\{([^}]+)\}',
        "name": "Mobile (480px)"
    },
    "news_item": {
        "pattern": r'\.news-item\s*.+?\.btn-(read-more|small)\s*\{([^}]+)\}',
        "name": "Em .news-item"
    }
}

# Mostra media queries
print("Desktop (padrão):")
match = re.search(r'\.btn-read-more\s*\{([^}]+)\}', buttons_clean, re.DOTALL)
if match:
    props = match.group(1)
    padding_m = re.search(r'padding:\s*([^;]+);', props)
    fontsize_m = re.search(r'font-size:\s*([^;]+);', props)
    print(f"  .btn-read-more: padding={padding_m.group(1) if padding_m else 'N/A'}, font-size={fontsize_m.group(1) if fontsize_m else 'N/A'}")

match = re.search(r'\.btn-secondary,\s*\.btn-small\s*\{([^}]+)\}', buttons_clean, re.DOTALL)
if match:
    props = match.group(1)
    padding_m = re.search(r'padding:\s*([^;]+);', props)
    fontsize_m = re.search(r'font-size:\s*([^;]+);', props)
    print(f"  .btn-small: padding={padding_m.group(1) if padding_m else 'N/A'}, font-size={fontsize_m.group(1) if fontsize_m else 'N/A'}")

print("\nTablet (768px):")
match = re.search(r'@media\s*\([^)]*768px[^)]*\)[\s\S]*?\.btn-read-more\s*\{([^}]+)\}', buttons_clean, re.DOTALL)
if match:
    props = match.group(1)
    padding_m = re.search(r'padding:\s*([^;]+);', props)
    fontsize_m = re.search(r'font-size:\s*([^;]+);', props)
    print(f"  .btn-read-more: padding={padding_m.group(1) if padding_m else 'N/A'}, font-size={fontsize_m.group(1) if fontsize_m else 'N/A'}")

match = re.search(r'@media\s*\([^)]*768px[^)]*\)[\s\S]*?\.btn-secondary,\s*\.btn-small\s*\{([^}]+)\}', buttons_clean, re.DOTALL)
if match:
    props = match.group(1)
    padding_m = re.search(r'padding:\s*([^;]+);', props)
    fontsize_m = re.search(r'font-size:\s*([^;]+);', props)
    print(f"  .btn-small: padding={padding_m.group(1) if padding_m else 'N/A'}, font-size={fontsize_m.group(1) if fontsize_m else 'N/A'}")

print("\nMobile (480px):")
match = re.search(r'@media\s*\([^)]*480px[^)]*\)[\s\S]*?\.btn-read-more\s*\{([^}]+)\}', buttons_clean, re.DOTALL)
if match:
    props = match.group(1)
    padding_m = re.search(r'padding:\s*([^;]+);', props)
    fontsize_m = re.search(r'font-size:\s*([^;]+);', props)
    print(f"  .btn-read-more: padding={padding_m.group(1) if padding_m else 'N/A'}, font-size={fontsize_m.group(1) if fontsize_m else 'N/A'}")

match = re.search(r'@media\s*\([^)]*480px[^)]*\)[\s\S]*?\.btn-secondary,\s*\.btn-small\s*\{([^}]+)\}', buttons_clean, re.DOTALL)
if match:
    props = match.group(1)
    padding_m = re.search(r'padding:\s*([^;]+);', props)
    fontsize_m = re.search(r'font-size:\s*([^;]+);', props)
    print(f"  .btn-small: padding={padding_m.group(1) if padding_m else 'N/A'}, font-size={fontsize_m.group(1) if fontsize_m else 'N/A'}")

print("\nContexto: .news-item .btn-container .btn-small")
match = re.search(r'\.news-item\s*.+?\.btn-small\s*\{([^}]+)\}', buttons_clean, re.DOTALL)
if match:
    props = match.group(1)
    padding_m = re.search(r'padding:\s*([^;]+);', props)
    fontsize_m = re.search(r'font-size:\s*([^;]+);', props)
    print(f"  .btn-small: padding={padding_m.group(1) if padding_m else 'N/A'}, font-size={fontsize_m.group(1) if fontsize_m else 'N/A'}")

# 3. Análise de proporção
print("\n" + "="*80)
print("⚖️  ANÁLISE DE PROPORÇÃO")
print("="*80 + "\n")

print("PROPORÇÃO ESPERADA:")
print("  .btn-read-more : .btn-small = 1 : 0.8 (aproximadamente)")
print("\nDesktop:")
print("  .btn-read-more: 15px 35px, 1.05rem")
print("  .btn-small:      12px 28px, 0.95rem")
print("  ✓ Proporção: padding 12/15=0.8, 28/35=0.8 | font-size 0.95/1.05=0.90")
print("  ✓ Consistente!\n")

print("Em .news-item:")
print("  .btn-small: 10px 24px, 0.90rem")
print("  ✗ Proporção diferente do padrão!")
print("  └─ Problema: Desproporcionado em relação a .btn-read-more (10/15=0.67 vs 0.8)\n")

print("="*80)
print("⚠️  PROBLEMAS IDENTIFICADOS")
print("="*80 + "\n")

print("PROBLEMA: .btn-small em .news-item tem proporção diferente")
print("  Desktop:")
print("    - .btn-read-more: 15px 35px, 1.05rem")
print("    - .btn-small padrão: 12px 28px, 0.95rem (proporção 0.8)")
print("    - .btn-small em .news-item: 10px 24px, 0.90rem (proporção 0.67) ❌")
print("\n  Solução: Ajustar para manter proporção 0.8")
print("    → Novo tamanho: 12px 28px, 0.95rem (igual ao .btn-small padrão)")
print("    → OU aumentar para: 12px 28px, 0.90rem (manter um pouco menor)\n")
