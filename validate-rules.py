#!/usr/bin/env python3
"""
Script de Validação de Regras Permanentes
Verifica se as decisões técnicas fundamentais estão sendo respeitadas
"""

import re
import sys
import json

def check_rules():
    issues = []
    
    print('\n=== VALIDAÇÃO DE REGRAS PERMANENTES ===\n')
    
    # 1. Verificar botões
    print('1. Verificando botões...')
    with open('./index.html', 'r') as f:
        index_html = f.read()
    
    # Procurar por classes obsoletas
    if 'news-btn' in index_html:
        issues.append('❌ Classe "news-btn" ainda presente em index.html')
    else:
        print('   ✅ Sem classe "news-btn"')
    
    # Verificar btn-read-more
    btn_read_more = re.findall(r'<a[^>]*class="[^"]*btn-read-more[^"]*"[^>]*>', index_html)
    if len(btn_read_more) >= 3:
        print(f'   ✅ {len(btn_read_more)} botões .btn-read-more encontrados')
    else:
        issues.append(f'❌ Apenas {len(btn_read_more)} botões .btn-read-more (esperado: >=3)')
    
    # 2. Verificar parágrafos "quem sou"
    print('\n2. Verificando layout dos parágrafos...')
    who_grid_match = re.search(r'<div class="who-grid([^"]*)">', index_html)
    if who_grid_match and 'two-columns' in who_grid_match.group(1):
        print('   ✅ Classe "two-columns" presente em .who-grid')
    else:
        issues.append('❌ Classe "two-columns" NÃO presente em .who-grid')
    
    # 3. Verificar CSS dos botões
    print('\n3. Verificando CSS dos botões...')
    with open('./assets/css/buttons.css', 'r') as f:
        buttons_css = f.read()
    
    # Verificar gradiente de cores
    if 'var(--color-accent-olive)' in buttons_css:
        print('   ✅ Cores tokens corretas nos botões')
    else:
        issues.append('❌ Cores dos botões sem usar tokens')
    
    # Verificar efeito shine
    if 'linear-gradient(90deg' in buttons_css:
        print('   ✅ Efeito shine presente')
    else:
        issues.append('❌ Efeito shine não encontrado')
    
    # 4. Verificar que CSS obsoleto foi removido
    print('\n4. Verificando CSS obsoleto...')
    with open('./assets/css/style.css', 'r') as f:
        style_css = f.read()
    
    if '.news-btn' not in style_css:
        print('   ✅ Sem CSS .news-btn em style.css')
    else:
        issues.append('❌ CSS .news-btn ainda em style.css')
    
    # 5. Verificar que style.css da raiz foi removido
    print('\n5. Verificando arquivos obsoletos...')
    try:
        with open('./style.css', 'r') as f:
            issues.append('❌ Arquivo style.css duplicado ainda existe na raiz')
    except FileNotFoundError:
        print('   ✅ Arquivo style.css obsoleto removido')
    
    # 6. Verificar header
    print('\n6. Verificando componentes obrigatórios...')
    if '<div id="header-container"></div>' in index_html:
        print('   ✅ Header container presente')
    else:
        issues.append('❌ Header container não encontrado')
    
    # 7. Verificar footer
    if 'footer.html' in index_html or '<footer' in index_html:
        print('   ✅ Footer presente')
    else:
        issues.append('❌ Footer não encontrado')
    
    # Resultado final
    print('\n' + '='*40)
    if issues:
        print('\n⚠️  PROBLEMAS ENCONTRADOS:\n')
        for issue in issues:
            print(f'  {issue}')
        print('\n')
        return False
    else:
        print('\n✅ TODAS AS REGRAS PERMANENTES RESPEITADAS!\n')
        return True

if __name__ == '__main__':
    success = check_rules()
    sys.exit(0 if success else 1)
