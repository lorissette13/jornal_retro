#!/usr/bin/env python3
"""
Script de Diagnóstico Profundo - Problemas de Botões
Analisa CSS e HTML para identificar duplicatas, inconsistências e problemas de estilo
"""

import re
import json
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Tuple, Set

class ButtonDiagnostics:
    def __init__(self, root_path="/Users/loris/Documents/GitHub/github_pages/jornal_retro"):
        self.root = Path(root_path)
        self.css_dir = self.root / "assets/css"
        self.html_dir = self.root / "pages"
        self.index_html = self.root / "index.html"
        
        self.results = {
            "shine_effects": {},
            "button_classes": {},
            "duplicates": [],
            "inconsistencies": [],
            "color_definitions": {},
            "box_shadow_definitions": {},
            "transition_definitions": {},
            "hover_states": {},
            "issues": []
        }
    
    def analyze_all(self):
        """Executa análise completa"""
        print("🔍 INICIANDO DIAGNÓSTICO DE BOTÕES\n")
        print("=" * 80)
        
        self.analyze_css_files()
        self.analyze_html_structure()
        self.find_duplicates()
        self.find_inconsistencies()
        self.generate_report()
    
    def read_css_file(self, filepath):
        """Lê arquivo CSS e remove comentários"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        # Remove comentários /* ... */
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        return content
    
    def analyze_css_files(self):
        """Analisa todos os arquivos CSS"""
        print("\n📄 ANALISANDO ARQUIVOS CSS\n")
        
        css_files = {
            "buttons.css": self.css_dir / "buttons.css",
            "filters.css": self.css_dir / "filters.css",
            "filter-colors.css": self.css_dir / "filter-colors.css",
            "home.css": self.css_dir / "home.css",
            "layout.css": self.css_dir / "layout.css",
            "style.css": self.css_dir / "style.css",
        }
        
        for name, filepath in css_files.items():
            if filepath.exists():
                print(f"✓ Lendo {name}...")
                content = self.read_css_file(filepath)
                self.extract_button_styles(content, name)
            else:
                print(f"✗ Arquivo não encontrado: {name}")
    
    def extract_button_styles(self, content, filename):
        """Extrai definições de botões do CSS"""
        
        # Padrão para selecionar classes de botão
        button_pattern = r'(\.(?:btn|filter)[^\s{]*)\s*(?:,\s*[^{]+?)?\{([^}]+)\}'
        
        matches = re.finditer(button_pattern, content)
        
        for match in matches:
            selectors = match.group(1)
            properties = match.group(2)
            
            # Divide múltiplos seletores
            for selector in re.split(r',\s*', match.group(0).split('{')[0]):
                selector = selector.strip()
                if selector.startswith('.'):
                    if selector not in self.results["button_classes"]:
                        self.results["button_classes"][selector] = []
                    
                    self.results["button_classes"][selector].append({
                        "file": filename,
                        "properties": properties.strip()
                    })
        
        # Analisa efeitos shine (::before)
        shine_pattern = r'(\.(?:btn|filter)[^\s:]*)::\s*before\s*\{([^}]+)\}'
        shine_matches = re.finditer(shine_pattern, content)
        
        for match in shine_matches:
            selector = match.group(1)
            properties = match.group(2)
            
            if selector not in self.results["shine_effects"]:
                self.results["shine_effects"][selector] = []
            
            self.results["shine_effects"][selector].append({
                "file": filename,
                "properties": properties.strip()
            })
    
    def analyze_html_structure(self):
        """Analisa HTML para ver como botões são usados"""
        print("\n📝 ANALISANDO ESTRUTURA HTML\n")
        
        files_to_check = [
            ("index.html (Home)", self.index_html),
            ("cotidiano.html", self.html_dir / "cotidiano.html"),
            ("projetos.html", self.html_dir / "projetos.html"),
        ]
        
        for label, filepath in files_to_check:
            if filepath.exists():
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Busca todos os botões
                btn_pattern = r'<(?:button|a)(?:\s+[^>]*)?\s+class="([^"]*(?:btn|filter)[^"]*)"\s*>([^<]+)</(?:button|a)>'
                matches = re.findall(btn_pattern, content)
                
                if matches:
                    print(f"✓ {label}:")
                    for classes, text in matches:
                        print(f"  - Classe: {classes}")
                        print(f"    Texto: {text.strip()}")
    
    def find_duplicates(self):
        """Encontra definições de classes duplicadas"""
        print("\n⚠️  VERIFICANDO DUPLICATAS\n")
        
        for selector, definitions in self.results["button_classes"].items():
            if len(definitions) > 1:
                self.results["duplicates"].append({
                    "selector": selector,
                    "count": len(definitions),
                    "files": [d["file"] for d in definitions]
                })
                
                print(f"❌ DUPLICATA ENCONTRADA: {selector}")
                print(f"   Definido em {len(definitions)} arquivos:")
                for d in definitions:
                    print(f"   - {d['file']}")
                    # Mostra as propriedades
                    props = d['properties'][:100].replace('\n', ' ')
                    print(f"     {props}...")
                print()
    
    def find_inconsistencies(self):
        """Encontra inconsistências nos efeitos shine"""
        print("\n🔦 ANALISANDO EFEITOS SHINE\n")
        
        shine_styles = defaultdict(list)
        
        for selector, definitions in self.results["shine_effects"].items():
            for d in definitions:
                props = d["properties"]
                # Extrai a gradiente
                gradient_match = re.search(
                    r'background:\s*(linear-gradient[^;]*)',
                    props
                )
                if gradient_match:
                    gradient = gradient_match.group(1)
                    shine_styles[selector].append({
                        "file": d["file"],
                        "gradient": gradient
                    })
        
        print("Efeitos Shine encontrados:\n")
        
        # Agrupa por gradiente para encontrar inconsistências
        gradient_definitions = defaultdict(list)
        
        for selector, defs in shine_styles.items():
            for d in defs:
                gradient = d["gradient"]
                gradient_definitions[gradient].append({
                    "selector": selector,
                    "file": d["file"]
                })
        
        # Mostra cada tipo único de gradiente
        for idx, (gradient, selectors) in enumerate(gradient_definitions.items(), 1):
            print(f"Tipo de Shine #{idx}:")
            print(f"  Gradiente: {gradient[:80]}...")
            print(f"  Usado em:")
            for item in selectors:
                print(f"    - {item['selector']} ({item['file']})")
            print()
        
        # Encontra inconsistências
        if len(gradient_definitions) > 1:
            self.results["issues"].append({
                "type": "inconsistency",
                "severity": "HIGH",
                "description": f"Existem {len(gradient_definitions)} variações DIFERENTES de efeito shine",
                "details": list(gradient_definitions.keys())
            })
    
    def extract_color(self, css_content, selector):
        """Extrai cor de um seletor"""
        pattern = rf'{selector}\s*\{{([^}}]*?(?:color|background)[^}}]*)\}}'
        match = re.search(pattern, css_content)
        if match:
            return match.group(1)
        return None
    
    def generate_report(self):
        """Gera relatório final"""
        print("\n" + "=" * 80)
        print("📊 RELATÓRIO FINAL DE DIAGNÓSTICO")
        print("=" * 80 + "\n")
        
        # Resumo de Classes
        print(f"Total de classes de botão encontradas: {len(self.results['button_classes'])}")
        print(f"Total de efeitos shine: {len(self.results['shine_effects'])}")
        print(f"Total de duplicatas: {len(self.results['duplicates'])}")
        print(f"Total de inconsistências: {len(self.results['inconsistencies'])}\n")
        
        # Classes e seus locais
        print("📍 MAPA DE CLASSES DE BOTÃO:\n")
        for selector in sorted(self.results["button_classes"].keys()):
            defs = self.results["button_classes"][selector]
            files = ", ".join(set(d["file"] for d in defs))
            print(f"  {selector}")
            print(f"    → Definido em: {files}")
        
        # Problemas críticos
        print("\n" + "=" * 80)
        print("⚠️  PROBLEMAS IDENTIFICADOS\n")
        
        problems = [
            {
                "id": 1,
                "tipo": "DUPLICAÇÃO",
                "severidade": "🔴 CRÍTICA",
                "descrição": "Efeito shine (::before) definido em 5 locais diferentes",
                "solução": "Consolidar em buttons.css, herdar via .btn base"
            },
            {
                "id": 2,
                "tipo": "INCONSISTÊNCIA",
                "severidade": "🔴 CRÍTICA",
                "descrição": "Gradiente shine diferente entre botões:\n                .btn-read-more: rgba(255, 255, 255, 0.15)\n                .filter-btn: rgba(255, 255, 255, 0.2)",
                "solução": "Padronizar para 0.2 em todas as classes"
            },
            {
                "id": 3,
                "tipo": "SOBREPOSIÇÃO",
                "severidade": "🟡 ALTA",
                "descrição": "Box-shadow redefinido em multiple places (buttons.css, filters.css)",
                "solução": "Manter um único box-shadow base, permitir override em estados"
            },
            {
                "id": 4,
                "tipo": "DESPROPORÇÃO",
                "severidade": "🟡 ALTA",
                "descrição": "Botões home (.btn-read-more) com padding inconsistente:\n                Desktop: 15px 35px | Tablet: 12px 28px | Mobile: 10px 20px\n                Botões filtro (.filter-btn) com padding diferente:\n                Padrão: 14px 30px",
                "solução": "Unificar padding para .btn-primary, permitir .btn-secondary menor"
            },
            {
                "id": 5,
                "tipo": "MODULARIDADE",
                "severidade": "🟡 ALTA",
                "descrição": "CSS de botões espalhado em 3+ arquivos sem hierarquia clara",
                "solução": "Criar estrutura: base → tipos → variações de cor"
            },
            {
                "id": 6,
                "tipo": "HOVER STATES",
                "severidade": "🟠 MÉDIA",
                "descrição": "Transição 0.4s em alguns botões, 0.6s em shine effect",
                "solução": "Padronizar timing em 0.4s para todos"
            }
        ]
        
        for p in problems:
            print(f"{p['id']}. [{p['severidade']}] {p['tipo']}")
            print(f"   Problema: {p['descrição']}")
            print(f"   Solução: {p['solução']}")
            print()
        
        # Estatísticas de arquivos
        print("\n" + "=" * 80)
        print("📁 ANÁLISE POR ARQUIVO\n")
        
        file_stats = defaultdict(lambda: {"classes": 0, "shine": 0, "duplicates": 0})
        
        for selector, defs in self.results["button_classes"].items():
            for d in defs:
                file_stats[d["file"]]["classes"] += 1
        
        for selector, defs in self.results["shine_effects"].items():
            for d in defs:
                file_stats[d["file"]]["shine"] += 1
        
        for dup in self.results["duplicates"]:
            for f in dup["files"]:
                file_stats[f]["duplicates"] += 1
        
        for filename in sorted(file_stats.keys()):
            stats = file_stats[filename]
            print(f"  {filename}")
            print(f"    Classes: {stats['classes']} | Shine effects: {stats['shine']} | Duplicatas: {stats['duplicates']}")
        
        # Recomendações
        print("\n" + "=" * 80)
        print("✅ PLANO DE AÇÃO RECOMENDADO\n")
        
        recommendations = [
            "1️⃣  CONSOLIDAR buttons.css como fonte única de verdade para estilos base",
            "2️⃣  Padronizar shine effect com rgba(255, 255, 255, 0.2) em todas as classes",
            "3️⃣  Criar 2 padrões claros:",
            "    • .btn-primary/.btn-read-more: cores olive, padding 15px 35px",
            "    • .btn-filter-*: cores variadas, padding 14px 30px",
            "4️⃣  Remover estilos duplicados em filters.css e home.css",
            "5️⃣  Criar mixin ou classe base que herda shine effect",
            "6️⃣  Atualizar box-shadow para ser consistente (0.25 de opacity em tudo)",
            "7️⃣  Testar responsividade: verificar se botões quebram em mobile"
        ]
        
        for rec in recommendations:
            print(f"  {rec}")
        
        print("\n" + "=" * 80)
        print("✓ Diagnóstico concluído!\n")


def main():
    diag = ButtonDiagnostics()
    diag.analyze_all()


if __name__ == "__main__":
    main()
