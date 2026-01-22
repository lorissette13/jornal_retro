#!/usr/bin/env python3
"""
Script para diagnóstico de cores dos botões na seção trajetória
"""
import re

# Ler o arquivo CSS de buttons.css
with open('assets/css/buttons.css', 'r', encoding='utf-8') as f:
    buttons_css = f.read()

# Ler o arquivo CSS de style.css
with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    style_css = f.read()

# Ler tokens.css para ver as cores
with open('assets/css/tokens.css', 'r', encoding='utf-8') as f:
    tokens_css = f.read()

print("=" * 80)
print("DIAGNÓSTICO DE CORES DOS BOTÕES - SEÇÃO TRAJETÓRIA")
print("=" * 80)

# Procurar por definições de .btn-small
print("\n📋 Definições de .btn-small encontradas:\n")

# Base
match = re.search(r'\.btn-small\s*\{([^}]+)\}', buttons_css, re.DOTALL)
if match:
    print("1. BASE (.btn-small):")
    styles = match.group(1)
    if 'background' in styles:
        bg = re.search(r'background:([^;]+);', styles)
        if bg:
            print(f"   Background: {bg.group(1).strip()}")
    if 'color' in styles:
        color = re.search(r'color:\s*([^;]+);', styles)
        if color:
            print(f"   Color: {color.group(1).strip()}")

# Hover
match = re.search(r'\.btn-small:hover\s*\{([^}]+)\}', buttons_css, re.DOTALL)
if match:
    print("\n2. HOVER (.btn-small:hover):")
    styles = match.group(1)
    if 'background' in styles:
        bg = re.search(r'background:([^;]+);', styles)
        if bg:
            print(f"   Background: {bg.group(1).strip()}")
    if 'color' in styles:
        color = re.search(r'color:\s*([^;]+);', styles)
        if color:
            print(f"   Color: {color.group(1).strip()}")

# Active
match = re.search(r'\.btn-small:active\s*\{([^}]+)\}', buttons_css, re.DOTALL)
if match:
    print("\n3. ACTIVE (.btn-small:active):")
    styles = match.group(1)
    if 'background' in styles:
        bg = re.search(r'background:([^;]+);', styles)
        if bg:
            print(f"   Background: {bg.group(1).strip()}")
    if 'color' in styles:
        color = re.search(r'color:\s*([^;]+);', styles)
        if color:
            print(f"   Color: {color.group(1).strip()}")

# Procurar por cores definidas em tokens
print("\n\n🎨 CORES DEFINIDAS EM TOKENS:")
print("\n--color-accent-olive-light (começando com esta):")
match = re.search(r'--color-accent-olive-light:\s*([^;]+);', tokens_css)
if match:
    print(f"   {match.group(1).strip()}")

print("\n--color-accent-sage:")
match = re.search(r'--color-accent-sage:\s*([^;]+);', tokens_css)
if match:
    print(f"   {match.group(1).strip()}")

print("\n--color-accent-gold (usado no hover):")
match = re.search(r'--color-accent-gold:\s*([^;]+);', tokens_css)
if match:
    print(f"   {match.group(1).strip()}")

print("\n--color-accent-sage-light:")
match = re.search(r'--color-accent-sage-light:\s*([^;]+);', tokens_css)
if match:
    print(f"   {match.group(1).strip()}")

print("\n\n⚠️  RESUMO:")
print("- .btn-small (estado normal): gradiente de verde oliva claro (#6B8E23) para sage (#7E8C54)")
print("- .btn-small:hover: gradiente de DOURADO (#d4af37) para sage-light (#95A568)")
print("\n❓ Se os botões estão amarelos NO ESTADO NORMAL (não hover):")
print("   1. Verificar se há classe adicional sendo aplicada via JavaScript")
print("   2. Verificar se há override em outro arquivo CSS")
print("   3. Verificar se está sempre em estado :hover")
print("   4. Verificar se há uma classe como 'filter-color-livros' ou similar")

# Procurar por qualquer referência aos botões na seção curriculum em CSS
print("\n\n🔍 Procurando por estilos específicos para #curriculum:")
if '#curriculum' in style_css:
    print("   ✓ Encontrado #curriculum no style.css")
    match = re.search(r'#curriculum[^{]*\{([^}]+)\}', style_css, re.DOTALL)
    if match:
        print(f"   Conteúdo: {match.group(1).strip()[:100]}...")
else:
    print("   ✗ Nenhum estilo específico para #curriculum encontrado")

if 'news-column#curriculum' in style_css:
    print("   ✓ Encontrado .news-column#curriculum no style.css")
    match = re.search(r'\.news-column#curriculum[^{]*\{([^}]+)\}', style_css, re.DOTALL)
    if match:
        print(f"   Conteúdo: {match.group(1).strip()[:100]}...")
else:
    print("   ✗ Nenhum estilo específico para .news-column#curriculum encontrado")

print("\n" + "=" * 80)
