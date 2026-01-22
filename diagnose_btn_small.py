#!/usr/bin/env python3
"""
Diagnóstico de Problemas com .btn-small
- Cores aplicadas
- Sublinhado (text-decoration)
- Tamanho (padding/font-size)
"""

import re
from pathlib import Path

root = Path("/Users/loris/Documents/GitHub/github_pages/jornal_retro")
css_dir = root / "assets/css"

print("\n" + "="*80)
print("🔍 DIAGNÓSTICO - PROBLEMAS COM .btn-small")
print("="*80 + "\n")

# 1. Procura por rules de .btn-small em todos os arquivos
print("📋 RASTREANDO TODAS AS REGRAS CSS PARA .btn-small\n")

css_files = list(css_dir.glob("*.css"))

btn_small_rules = {}

for css_file in sorted(css_files):
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove comentários
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Procura por rules de .btn-small
    # Pattern: .btn-small ou .btn-secondary, .btn-small (combinados)
    patterns = [
        r'\.btn-small\s*(?:,|\{)',
        r'\.btn-secondary,\s*\.btn-small',
        r'\.btn-small:[:\w-]*\s*\{',
    ]
    
    for pattern in patterns:
        matches = list(re.finditer(pattern, content))
        if matches:
            for match in matches:
                # Encontra o bloco CSS completo
                start = match.start()
                # Procura pela abertura da chave
                brace_start = content.find('{', start)
                if brace_start != -1:
                    # Encontra a chave de fechamento correspondente
                    brace_count = 1
                    pos = brace_start + 1
                    while pos < len(content) and brace_count > 0:
                        if content[pos] == '{':
                            brace_count += 1
                        elif content[pos] == '}':
                            brace_count -= 1
                        pos += 1
                    
                    if brace_count == 0:
                        rule = content[start:pos]
                        
                        # Extrai o seletor
                        selector_match = re.match(r'([^{]+)\{', rule)
                        if selector_match:
                            selector = selector_match.group(1).strip()
                            
                            if selector not in btn_small_rules:
                                btn_small_rules[selector] = []
                            
                            btn_small_rules[selector].append({
                                'file': css_file.name,
                                'content': rule[:300]
                            })

# Mostra os rules encontrados
for selector in sorted(btn_small_rules.keys()):
    print(f"📍 Seletor: {selector}")
    for rule in btn_small_rules[selector]:
        print(f"   Arquivo: {rule['file']}")
        print(f"   CSS: {rule['content'].replace(chr(10), ' ')[:100]}...")
        print()

# 2. Verifica a estrutura HTML dos botões
print("\n" + "="*80)
print("📝 ANÁLISE HTML DOS BOTÕES .btn-small")
print("="*80 + "\n")

with open(root / "index.html", 'r', encoding='utf-8') as f:
    html = f.read()

# Encontra os botões .btn-small
btn_small_matches = re.finditer(
    r'<a[^>]*class="btn-small"[^>]*>([^<]+)</a>',
    html
)

for match in btn_small_matches:
    btn_text = match.group(1)
    full_html = match.group(0)
    
    print(f"Botão: '{btn_text}'")
    print(f"HTML: {full_html}")
    
    # Procura pelo contexto
    start_pos = max(0, match.start() - 200)
    before = html[start_pos:match.start()]
    
    # Verifica se está em .btn-container
    if '<div class="btn-container">' in before:
        print("✓ Dentro de .btn-container")
    else:
        print("✗ Fora de .btn-container")
    
    # Procura por parent
    parent_match = re.search(r'<(article|div|section)[^>]*class="([^"]*)"[^>]*>', before[::-1])
    if parent_match:
        parent_class = parent_match.group(2)[::-1]
        print(f"Parent: .{parent_class.split()[0]}")
    
    print()

# 3. Verifica o CSS aplicado
print("="*80)
print("🎨 ANÁLISE DE CSS APLICADO AOS .btn-small")
print("="*80 + "\n")

buttons_css = css_dir / "buttons.css"
with open(buttons_css, 'r', encoding='utf-8') as f:
    btn_css_content = f.read()

# Remove comentários
btn_css_clean = re.sub(r'/\*.*?\*/', '', btn_css_content, flags=re.DOTALL)

# Encontra a definição principal de .btn-secondary, .btn-small
match = re.search(r'\.btn-secondary,\s*\.btn-small\s*\{([^}]+)\}', btn_css_clean, re.DOTALL)
if match:
    properties = match.group(1)
    print("Propriedades base de .btn-small:")
    
    # Extrai propriedades
    props = re.findall(r'(\w+-?\w*)\s*:\s*([^;]+);', properties)
    for prop, value in props:
        print(f"  {prop}: {value.strip()}")
    
    # Verifica especificamente
    print("\n⚠️  POSSÍVEIS PROBLEMAS:")
    
    if 'text-decoration' in properties:
        td_match = re.search(r'text-decoration:\s*([^;]+);', properties)
        if td_match:
            print(f"  ✓ text-decoration: {td_match.group(1)} (OK)")
    else:
        print(f"  ✗ Nenhuma text-decoration definida (pode herdar)")
    
    if 'color' in properties:
        color_match = re.search(r'color:\s*([^;]+);', properties)
        if color_match:
            print(f"  ✓ color: {color_match.group(1)}")
    
    if 'background' in properties:
        bg_match = re.search(r'background:\s*([^;]+);', properties)
        if bg_match:
            bg_value = bg_match.group(1)[:60]
            print(f"  ✓ background: {bg_value}...")

# 4. Verifica hover state
print("\n\nHover state de .btn-small:")
match = re.search(r'\.btn-secondary:hover,\s*\.btn-small:hover\s*\{([^}]+)\}', btn_css_clean, re.DOTALL)
if match:
    properties = match.group(1)
    
    if 'text-decoration' in properties:
        td_match = re.search(r'text-decoration:\s*([^;]+);', properties)
        if td_match:
            print(f"  text-decoration:hover: {td_match.group(1)}")
    
    if 'color' in properties:
        color_match = re.search(r'color:\s*([^;]+);', properties)
        if color_match:
            print(f"  color:hover: {color_match.group(1)}")

# 5. Verifica links <a> com .btn-small
print("\n" + "="*80)
print("⚠️  PROBLEMAS IDENTIFICADOS")
print("="*80 + "\n")

print("1. SUBLINHADO:")
print("   └─ Links <a> herdam text-decoration: underline por padrão do navegador")
print("   └─ Solução: Adicionar 'text-decoration: none !important;' aos links .btn-small\n")

print("2. COR:")
print("   └─ .btn-small usa: linear-gradient(olive-light, sage)")
print("   └─ Mas pode estar herdando cor de <a> (azul padrão)")
print("   └─ Solução: Garantir que color está definida corretamente\n")

print("3. TAMANHO:")
print("   └─ .btn-small: padding 12px 28px, font-size 0.95rem")
print("   └─ Pode estar herdando width: 100% de algum parent")
print("   └─ Solução: Verificar se há flex-grow ou width em .btn-container\n")
