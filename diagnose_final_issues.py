#!/usr/bin/env python3
"""
Diagnóstico de Problemas Finais
- Cor da seção trajetória
- Botão "ver cotidiano completo" gigante
"""

import re
from pathlib import Path

root = Path("/Users/loris/Documents/GitHub/github_pages/jornal_retro")
css_dir = root / "assets/css"
html_file = root / "index.html"

print("\n" + "="*80)
print("🔍 DIAGNÓSTICO - PROBLEMAS FINAIS")
print("="*80 + "\n")

# 1. Analisa o botão "ver cotidiano completo"
print("📍 BOTÃO: 'ver cotidiano completo'\n")

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Encontra o contexto
match = re.search(r'(<article class="news-column" id="daily">.*?</article>)', html, re.DOTALL)
if match:
    daily_section = match.group(1)
    
    # Procura pelo botão
    btn_match = re.search(r'<a[^>]*class="btn-read-more"[^>]*>ver cotidiano completo</a>', daily_section)
    if btn_match:
        print("✓ Encontrado no HTML")
        print(f"  HTML: {btn_match.group(0)}\n")
        
        # Verifica contexto
        before_btn = daily_section[:daily_section.find(btn_match.group(0))]
        
        # Procura por tags-section
        if '<div class="tags-section">' in before_btn:
            print("✓ Dentro de .tags-section")
        
        # Procura por btn-container
        if '<div class="btn-container">' in before_btn and before_btn.rfind('<div class="btn-container">') > before_btn.rfind('</div>'):
            print("✓ Dentro de .btn-container")
        else:
            print("✗ NÃO está em .btn-container (ou o container fecha antes)")
        
        # Procura pelo pai direto
        parent_divs = re.findall(r'<div class="([^"]*)"[^>]*>', before_btn)
        if parent_divs:
            print(f"  Parent direto: .{parent_divs[-1]}")

print("\n" + "="*80)
print("🎨 ANÁLISE CSS DO BOTÃO")
print("="*80 + "\n")

# Lê buttons.css
with open(css_dir / "buttons.css", 'r', encoding='utf-8') as f:
    buttons_css = f.read()

# Remove comentários
buttons_clean = re.sub(r'/\*.*?\*/', '', buttons_css, flags=re.DOTALL)

# Procura por regra de .btn-read-more (que é a classe do botão)
match = re.search(r'\.btn-primary,\s*\.btn-read-more\s*\{([^}]+)\}', buttons_clean, re.DOTALL)
if match:
    props = match.group(1)
    print("Regra base .btn-read-more:")
    
    # Extrai principais propriedades
    padding_m = re.search(r'padding:\s*([^;]+);', props)
    fontsize_m = re.search(r'font-size:\s*([^;]+);', props)
    
    print(f"  padding: {padding_m.group(1) if padding_m else 'N/A'}")
    print(f"  font-size: {fontsize_m.group(1) if fontsize_m else 'N/A'}")

print("\nVerificando se há regras específicas para o contexto...")

# Procura por alguma regra que possa estar expandindo o botão
for pattern in [
    r'\.tags-section\s*\{([^}]+)\}',
    r'\.news-column#daily\s*\{([^}]+)\}',
    r'#daily\s*\{([^}]+)\}',
    r'\.tags-section\s*.+?\.btn-read-more\s*\{([^}]+)\}',
]:
    match = re.search(pattern, buttons_clean, re.DOTALL)
    if match:
        print(f"✓ Encontrado: {pattern[:40]}...")
        print(f"  CSS: {match.group(1)[:100]}...\n")

# Lê style.css para ver rules de tags-section
with open(css_dir / "style.css", 'r', encoding='utf-8') as f:
    style_css = f.read()

style_clean = re.sub(r'/\*.*?\*/', '', style_css, flags=re.DOTALL)

print("\nVerificando style.css para .tags-section:")
match = re.search(r'\.tags-section\s*\{([^}]+)\}', style_clean, re.DOTALL)
if match:
    props = match.group(1)
    print(f"CSS: {props.strip()[:200]}...")
    
    # Verifica se há width: 100% ou similar
    if 'width' in props:
        width_m = re.search(r'width:\s*([^;]+);', props)
        print(f"⚠️  width: {width_m.group(1) if width_m else 'N/A'}")
    
    if 'flex' in props or 'display' in props:
        display_m = re.search(r'display:\s*([^;]+);', props)
        print(f"⚠️  display: {display_m.group(1) if display_m else 'N/A'}")

print("\n" + "="*80)
print("🎯 PROBLEMA IDENTIFICADO")
print("="*80 + "\n")

print("ANÁLISE:")
print("  1. Botão 'ver cotidiano completo' é .btn-read-more")
print("  2. Está dentro de .tags-section (que é flex-column)")
print("  3. Está dentro de .news-column#daily")
print("  4. Tamanho padrão: 15px 35px, 1.05rem")
print("\nPOSSÍVEL CAUSA:")
print("  - Se .btn-read-more tem width: 100% em algum contexto")
print("  - Se .tags-section ou .news-column tem width: 100%")
print("  - Se há margin/padding excessivo\n")

print("SOLUÇÃO ESPERADA:")
print("  - Remover ou reduzir width do botão")
print("  - OU manter tamanho padrão de .btn-read-more (15px 35px)\n")

print("="*80)
print("🎨 PROBLEMA DE COR - SEÇÃO TRAJETÓRIA")
print("="*80 + "\n")

# Procura pela seção curriculum (trajetória)
match = re.search(r'<article class="news-column" id="curriculum">.*?</article>', html, re.DOTALL)
if match:
    curriculum_html = match.group(0)
    print("✓ Seção trajetória encontrada em HTML")
    
    # Procura por classe de cor
    color_classes = re.findall(r'class="([^"]*)"', curriculum_html)
    print(f"  Classes encontradas: {color_classes}\n")

print("Verificando CSS para .news-column:")
match = re.search(r'\.news-column\s*\{([^}]+)\}', style_clean, re.DOTALL)
if match:
    props = match.group(1)
    print("Propriedades base de .news-column:")
    
    # Procura por background
    bg_m = re.search(r'background:\s*([^;]+);', props)
    if bg_m:
        print(f"  background: {bg_m.group(1)[:80]}...")
    
    # Procura por border
    border_m = re.search(r'border:\s*([^;]+);', props)
    if border_m:
        print(f"  border: {border_m.group(1)}")
    
    # Procura por color
    color_m = re.search(r'color:\s*([^;]+);', props)
    if color_m:
        print(f"  color: {color_m.group(1)}")

print("\n⚠️  POSSÍVEL PROBLEMA:")
print("  - Todas as .news-column têm mesmo CSS (background, border, color)")
print("  - Se precisa de cor diferente para trajetória, precisa de classe específica")
print("  - OU modificar .news-column#curriculum especificamente\n")
