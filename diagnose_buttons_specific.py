#!/usr/bin/env python3
"""
Script de Diagnóstico Específico - Botões Quebrados na Home
Foca nos botões: cotidiano, trajetória e galeria
"""

import re
from pathlib import Path
from collections import defaultdict

class ButtonSpecificDiagnostics:
    def __init__(self, root_path="/Users/loris/Documents/GitHub/github_pages/jornal_retro"):
        self.root = Path(root_path)
        self.css_dir = self.root / "assets/css"
        self.index_html = self.root / "index.html"
        
    def analyze(self):
        print("\n" + "="*80)
        print("🔍 DIAGNÓSTICO ESPECÍFICO - BOTÕES QUEBRADOS NA HOME")
        print("="*80 + "\n")
        
        # Lê o HTML da home
        with open(self.index_html, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        print("📍 BOTÕES IDENTIFICADOS NA HOME:\n")
        
        # Encontra os botões específicos
        buttons = {
            "ler mais sobre mim": r'<a[^>]*class="btn-read-more"[^>]*>ler mais sobre mim</a>',
            "ver todos os projetos": r'<a[^>]*class="btn-read-more"[^>]*>ver todos os projetos</a>',
            "ver cotidiano completo": r'<a[^>]*class="btn-read-more"[^>]*>ver cotidiano completo</a>',
            "linha do tempo (trajetória)": r'<a[^>]*class="btn-small"[^>]*>linha do tempo</a>',
            "stack completo": r'<a[^>]*class="btn-small"[^>]*>stack completo</a>',
            "ver galeria completa": r'<a[^>]*class="btn-read-more"[^>]*>ver galeria completa</a>'
        }
        
        button_matches = {}
        for name, pattern in buttons.items():
            match = re.search(pattern, html_content)
            if match:
                html_tag = match.group(0)
                button_matches[name] = html_tag
                print(f"✓ {name}")
                print(f"  HTML: {html_tag}\n")
            else:
                print(f"✗ NÃO ENCONTRADO: {name}\n")
        
        # Analisa contexto de cada botão
        print("\n" + "="*80)
        print("📋 ANÁLISE DE CONTEXTO (Seção e Container)")
        print("="*80 + "\n")
        
        sections_to_check = [
            ("ver cotidiano completo", "cotidiano", ".tag-category", ".tags-section"),
            ("linha do tempo", "trajetória", ".news-item", ".news-column"),
            ("ver galeria completa", "galeria", ".gallery-section", None)
        ]
        
        for button_text, section_name, expected_parent, expected_grandparent in sections_to_check:
            print(f"🔎 Botão: '{button_text}'")
            print(f"   Seção: {section_name}")
            
            # Procura pelo botão e seu contexto
            pattern = rf'(?P<context>.{{200}}){re.escape(button_text)}.{{200}}'
            match = re.search(pattern, html_content, re.DOTALL)
            
            if match:
                context = match.group('context')
                # Procura pelos seletores CSS esperados
                if expected_parent:
                    if expected_parent in context:
                        print(f"   ✓ Dentro de {expected_parent}")
                    else:
                        print(f"   ✗ NÃO está em {expected_parent}")
                
                if expected_grandparent:
                    if expected_grandparent in context:
                        print(f"   ✓ Dentro de {expected_grandparent}")
                    else:
                        print(f"   ✗ NÃO está em {expected_grandparent}")
            
            print()
        
        # Analisa CSS específico
        print("="*80)
        print("🎨 ANÁLISE DE CSS APLICADO")
        print("="*80 + "\n")
        
        css_rules = self.analyze_css_rules()
        
        print("Regras CSS para .btn-read-more (botões grandes da home):")
        for rule in css_rules.get(".btn-read-more", []):
            print(f"  • {rule}")
        
        print("\nRegras CSS para .btn-small (botões pequenos da home):")
        for rule in css_rules.get(".btn-small", []):
            print(f"  • {rule}")
        
        print("\nRegras CSS para .btn-container:")
        for rule in css_rules.get(".btn-container", []):
            print(f"  • {rule}")
        
        # Verifica cores específicas
        print("\n" + "="*80)
        print("🎭 ANÁLISE DE CORES")
        print("="*80 + "\n")
        
        self.check_color_inheritance()
        
        # Verifica layout específico
        print("\n" + "="*80)
        print("📐 ANÁLISE DE LAYOUT (news-column, gallery-section, tags-section)")
        print("="*80 + "\n")
        
        self.check_layout_issues()
    
    def analyze_css_rules(self):
        """Extrai regras CSS relevantes para os botões"""
        rules = defaultdict(list)
        
        css_files = [
            "buttons.css",
            "home.css",
            "layout.css",
            "style.css"
        ]
        
        for css_file in css_files:
            filepath = self.css_dir / css_file
            if filepath.exists():
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Remove comentários
                content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
                
                # Procura por regras de .btn-read-more, .btn-small, etc
                for selector in [".btn-read-more", ".btn-small", ".btn-container"]:
                    # Encontra todos os blocos CSS para este seletor
                    pattern = rf'{re.escape(selector)}(?:::[^\s]*|:[^\s]*)*\s*\{{([^}}]*)\}}'
                    matches = re.finditer(pattern, content)
                    
                    for match in matches:
                        properties = match.group(1)
                        # Extrai propriedades importantes
                        props_clean = re.findall(r'(\w+-?\w*)\s*:\s*([^;]+);', properties)
                        for prop_name, prop_value in props_clean:
                            rules[selector].append(f"{prop_name}: {prop_value.strip()[:60]}")
        
        return rules
    
    def check_color_inheritance(self):
        """Verifica herança de cores"""
        tokens_file = self.css_dir / "tokens.css"
        
        if tokens_file.exists():
            with open(tokens_file, 'r', encoding='utf-8') as f:
                tokens_content = f.read()
            
            # Procura por variáveis de cor
            color_vars = re.findall(
                r'--color-accent-\w+\s*:\s*(#[0-9a-f]{6}|rgba?\([^)]+\))',
                tokens_content,
                re.IGNORECASE
            )
            
            print("Variáveis de cor disponíveis:")
            for var_match in re.finditer(
                r'(--color-accent-\w+)\s*:\s*(#[0-9a-f]{6}|rgba?\([^)]+\))',
                tokens_content,
                re.IGNORECASE
            ):
                var_name, var_value = var_match.groups()
                print(f"  ${var_name}: {var_value}")
            
            print("\n⚠️  POSSÍVEIS PROBLEMAS DE COR:")
            
            # Verifica se há override de cores para .btn-small
            buttons_css = self.css_dir / "buttons.css"
            if buttons_css.exists():
                with open(buttons_css, 'r', encoding='utf-8') as f:
                    btn_content = f.read()
                
                # Procura por definição de .btn-small
                btn_small_match = re.search(
                    r'\.btn-secondary,\s*\.btn-small\s*\{([^}]+)\}',
                    btn_content,
                    re.DOTALL
                )
                
                if btn_small_match:
                    btn_small_css = btn_small_match.group(1)
                    
                    # Procura por background
                    bg_match = re.search(r'background:\s*([^;]+);', btn_small_css)
                    if bg_match:
                        bg_value = bg_match.group(1)
                        print(f"  .btn-small background: {bg_value}")
                        
                        # Verifica se usa var() diferente de .btn-primary
                        if "color-accent-olive" in bg_value:
                            print(f"    ✗ Usa cores olive (igual a .btn-read-more)")
                        else:
                            print(f"    ⚠️  Possível cor diferente detectada")
    
    def check_layout_issues(self):
        """Verifica problemas de layout específicos"""
        home_css = self.css_dir / "home.css"
        layout_css = self.css_dir / "layout.css"
        
        print("Verificando .news-column (seções da home):")
        if layout_css.exists():
            with open(layout_css, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Procura por .news-column
            match = re.search(r'\.news-column\s*\{([^}]+)\}', content, re.DOTALL)
            if match:
                properties = match.group(1)
                print(f"  CSS: {properties[:200]}...")
            
            # Procura por .gallery-section
            print("\nVerificando .gallery-section:")
            match = re.search(r'\.gallery-section\s*\{([^}]+)\}', content, re.DOTALL)
            if match:
                properties = match.group(1)
                print(f"  CSS: {properties[:200]}...")
        
        # Verifica se há CSS em home.css que pode estar conflitando
        if home_css.exists():
            with open(home_css, 'r', encoding='utf-8') as f:
                home_content = f.read()
            
            if "btn" in home_content.lower():
                print("\n⚠️  home.css CONTÉM REGRAS DE BOTÕES:")
                btn_rules = re.findall(r'(\.[\w-]*btn[\w-]*\s*\{[^}]+\})', home_content, re.DOTALL)
                for rule in btn_rules[:3]:  # Mostra apenas 3 primeiras
                    print(f"  {rule[:100]}...")
            else:
                print("\n✓ home.css não sobrescreve regras de botões")
        
        # Verifica .btn-container alignment
        print("\nVerificando .btn-container (centralização):")
        buttons_css = self.css_dir / "buttons.css"
        if buttons_css.exists():
            with open(buttons_css, 'r', encoding='utf-8') as f:
                content = f.read()
            
            match = re.search(r'\.btn-container\s*\{([^}]+)\}', content, re.DOTALL)
            if match:
                properties = match.group(1)
                print(f"  CSS: {properties.strip()}")
                
                # Verifica se usa justify-content
                if "justify-content" in properties:
                    align_match = re.search(r'justify-content:\s*([^;]+);', properties)
                    if align_match:
                        align = align_match.group(1)
                        print(f"  Align: {align}")


def main():
    diag = ButtonSpecificDiagnostics()
    diag.analyze()


if __name__ == "__main__":
    main()
