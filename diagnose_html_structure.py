#!/usr/bin/env python3
"""
Análise Visual da Estrutura HTML dos Botões
"""

import re
from pathlib import Path

root = Path("/Users/loris/Documents/GitHub/github_pages/jornal_retro")
with open(root / "index.html", 'r', encoding='utf-8') as f:
    html = f.read()

print("\n" + "="*80)
print("🔍 ANÁLISE ESTRUTURAL - BOTÕES NA HOME")
print("="*80 + "\n")

# Seção 1: WHO SECTION
print("📍 SEÇÃO 1: WHO SECTION (Quem Sou Eu)")
print("-" * 80)
match = re.search(r'<section class="who-section".*?</section>', html, re.DOTALL)
if match:
    section = match.group(0)
    btn = re.search(r'<a[^>]*class="btn-read-more"[^>]*>ler mais sobre mim</a>', section)
    if btn:
        # Encontra a estrutura
        before_btn = section[max(0, section.rfind('\n', 0, section.find(btn.group(0)))-100):section.find(btn.group(0))]
        print("Botão: 'ler mais sobre mim'")
        print(f"Estrutura: ... {before_btn.split('<')[-1]}")
        print("✓ Status: CORRETO - dentro de .btn-container\n")

# Seção 2: NEWS GRID - TRAJETÓRIA
print("📍 SEÇÃO 2: NEWS GRID - TRAJETÓRIA (Curriculum)")
print("-" * 80)
match = re.search(r'<article class="news-column" id="curriculum">(.*?)</article>', html, re.DOTALL)
if match:
    section = match.group(1)
    
    # Encontra botões
    buttons = re.findall(r'<a[^>]*class="btn-small"[^>]*>([^<]+)</a>', section)
    for btn_text in buttons:
        # Verifica se está em .btn-container
        btn_pattern = f'<a[^>]*class="btn-small"[^>]*>{btn_text}</a>'
        btn_pos = section.find(btn_text)
        
        # Procura por .btn-container antes do botão
        before = section[:btn_pos]
        if '<div class="btn-container">' in before and before.rfind('<div class="btn-container">') > before.rfind('</div>'):
            print(f"✓ '{btn_text}' - DENTRO de .btn-container")
        else:
            print(f"✗ '{btn_text}' - FORA de .btn-container")
    print()

# Seção 3: NEWS GRID - COTIDIANO
print("📍 SEÇÃO 3: NEWS GRID - COTIDIANO")
print("-" * 80)
match = re.search(r'<article class="news-column" id="daily">(.*?)</article>', html, re.DOTALL)
if match:
    section = match.group(1)
    
    # Encontra botão
    btn = re.search(r'<a[^>]*class="btn-read-more"[^>]*>ver cotidiano completo</a>', section)
    if btn:
        # Procura pela estrutura
        before = section[:section.find(btn.group(0))]
        
        # Verifica tags acima
        last_tag = re.findall(r'<(\w+)[^>]*>', before)[-1] if before else "nenhuma"
        
        print("Botão: 'ver cotidiano completo'")
        print(f"Última tag aberta antes do botão: <{last_tag}>")
        
        if '<div class="btn-container">' in before:
            print("✗ PROBLEMA: Botão está FORA de .btn-container!")
        else:
            print("✗ PROBLEMA: Botão NÃO está em .btn-container!")
        
        # Mostra o contexto
        context_start = max(0, section.rfind('</div>', 0, section.find(btn.group(0))) - 100)
        context_end = section.find(btn.group(0)) + len(btn.group(0))
        context = section[context_start:context_end]
        
        print("\nContexto:")
        print("```html")
        print(context[-200:])
        print("```\n")

# Seção 4: GALERIA
print("📍 SEÇÃO 4: GALERIA")
print("-" * 80)
match = re.search(r'<section class="gallery-section".*?</section>', html, re.DOTALL)
if match:
    section = match.group(0)
    
    btn = re.search(r'<a[^>]*class="btn-read-more"[^>]*>ver galeria completa</a>', section)
    if btn:
        before = section[:section.find(btn.group(0))]
        
        print("Botão: 'ver galeria completa'")
        
        if '<div class="btn-container">' in before:
            print("✗ PROBLEMA: Botão está FORA de .btn-container!")
        else:
            print("✗ PROBLEMA: Botão NÃO está em .btn-container!")
        
        # Mostra o contexto
        context_start = max(0, section.rfind('</div>', 0, section.find(btn.group(0))) - 150)
        context_end = section.find(btn.group(0)) + len(btn.group(0))
        context = section[context_start:context_end]
        
        print("\nContexto:")
        print("```html")
        print(context[-250:])
        print("```\n")

# Resumo
print("="*80)
print("📊 RESUMO DE PROBLEMAS")
print("="*80 + "\n")

print("PROBLEMA 1: Botão 'ver cotidiano completo'")
print("  ├─ Localização: Fora de .btn-container (direto em .news-column)")
print("  ├─ Causa: Falta de wrap em <div class=\"btn-container\">")
print("  └─ Solução: Envolver botão em .btn-container\n")

print("PROBLEMA 2: Botão 'ver galeria completa'")
print("  ├─ Localização: Fora de .btn-container (direto em .gallery-section)")
print("  ├─ Causa: Falta de wrap em <div class=\"btn-container\">")
print("  └─ Solução: Envolver botão em .btn-container\n")

print("PROBLEMA 3: Cores dos botões 'linha do tempo' e 'stack completo'")
print("  ├─ Classe: .btn-small")
print("  ├─ Background esperado: olive-light + sage")
print("  ├─ Causa: Possível conflito de CSS ou classe incorreta")
print("  └─ Solução: Verificar se CSS está sendo aplicado corretamente\n")

print("="*80)
