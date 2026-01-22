#!/usr/bin/env python3
"""
Script de Análise de Código - Limpeza Clean Code
Analisa código duplicado, funções não usadas e importações desnecessárias
"""

import os
import re
from collections import defaultdict, Counter
import json

class CodeAnalyzer:
    def __init__(self, project_root):
        self.project_root = project_root
        self.js_files = []
        self.css_files = []
        self.html_files = []
        self.function_definitions = defaultdict(list)
        self.function_calls = defaultdict(list)
        self.css_rules = defaultdict(list)

    def scan_files(self):
        """Escaneia todos os arquivos do projeto"""
        for root, dirs, files in os.walk(self.project_root):
            # Ignorar node_modules, .git, etc
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', '__pycache__']]

            for file in files:
                filepath = os.path.join(root, file)
                if file.endswith('.js'):
                    self.js_files.append(filepath)
                elif file.endswith('.css'):
                    self.css_files.append(filepath)
                elif file.endswith('.html'):
                    self.html_files.append(filepath)

    def analyze_js_functions(self):
        """Analisa funções JavaScript - definições e chamadas"""
        for filepath in self.js_files:
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Encontra definições de função
                func_defs = re.findall(r'(?:function\s+(\w+)|(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|function))', content)
                for match in func_defs:
                    func_name = match[0] or match[1]
                    if func_name:
                        self.function_definitions[func_name].append(filepath)

                # Encontra chamadas de função
                func_calls = re.findall(r'\b(\w+)\s*\(', content)
                for func_name in func_calls:
                    if func_name not in ['if', 'for', 'while', 'switch', 'catch', 'try']:  # Ignorar keywords
                        self.function_calls[func_name].append(filepath)

            except Exception as e:
                print(f"Erro analisando {filepath}: {e}")

    def analyze_css_duplicates(self):
        """Analisa regras CSS duplicadas"""
        for filepath in self.css_files:
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Remove comentários
                content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)

                # Encontra regras CSS
                rules = re.findall(r'([^{]+)\s*\{([^}]+)\}', content)
                for selector, properties in rules:
                    selector = selector.strip()
                    properties = re.sub(r'\s+', ' ', properties.strip())
                    key = (selector, properties)
                    self.css_rules[key].append(filepath)

            except Exception as e:
                print(f"Erro analisando CSS {filepath}: {e}")

    def find_unused_functions(self):
        """Encontra funções definidas mas não chamadas"""
        unused = []
        for func_name, def_files in self.function_definitions.items():
            if func_name not in self.function_calls:
                # Verifica se é exportada globalmente (window.)
                exported = False
                for def_file in def_files:
                    try:
                        with open(def_file, 'r', encoding='utf-8') as f:
                            if f'window.{func_name}' in f.read():
                                exported = True
                                break
                    except:
                        pass

                if not exported:
                    unused.append((func_name, def_files))

        return unused

    def find_duplicate_css_rules(self):
        """Encontra regras CSS duplicadas em arquivos diferentes"""
        duplicates = []
        for rule_key, files in self.css_rules.items():
            if len(files) > 1:
                duplicates.append((rule_key, files))

        return duplicates

    def analyze_file_sizes(self):
        """Analisa tamanhos dos arquivos para identificar candidatos a limpeza"""
        sizes = []
        for filepath in self.js_files + self.css_files:
            try:
                size = os.path.getsize(filepath)
                sizes.append((filepath, size))
            except:
                pass

        return sorted(sizes, key=lambda x: x[1], reverse=True)

    def generate_report(self):
        """Gera relatório completo"""
        report = {
            'unused_functions': self.find_unused_functions(),
            'duplicate_css_rules': self.find_duplicate_css_rules(),
            'file_sizes': self.analyze_file_sizes(),
            'total_js_files': len(self.js_files),
            'total_css_files': len(self.css_files),
            'total_html_files': len(self.html_files)
        }

        return report

def main():
    analyzer = CodeAnalyzer('/Users/loris/Documents/GitHub/github_pages/jornal_retro')
    analyzer.scan_files()
    analyzer.analyze_js_functions()
    analyzer.analyze_css_duplicates()

    report = analyzer.generate_report()

    print("=== RELATÓRIO DE ANÁLISE DE CÓDIGO ===\n")

    print(f"📁 Total de arquivos: {report['total_js_files']} JS, {report['total_css_files']} CSS, {report['total_html_files']} HTML\n")

    print("🔍 FUNÇÕES NÃO UTILIZADAS:")
    if report['unused_functions']:
        for func_name, files in report['unused_functions'][:10]:  # Top 10
            print(f"  - {func_name} (definida em: {', '.join(files)})")
        if len(report['unused_functions']) > 10:
            print(f"  ... e mais {len(report['unused_functions']) - 10}")
    else:
        print("  Nenhuma função não utilizada encontrada")

    print("\n🎨 REGRAS CSS DUPLICADAS:")
    if report['duplicate_css_rules']:
        for (selector, properties), files in report['duplicate_css_rules'][:5]:  # Top 5
            print(f"  - '{selector}' em {len(files)} arquivos: {', '.join(files)}")
        if len(report['duplicate_css_rules']) > 5:
            print(f"  ... e mais {len(report['duplicate_css_rules']) - 5}")
    else:
        print("  Nenhuma regra CSS duplicada encontrada")

    print("\n📊 ARQUIVOS MAIS PESADOS:")
    for filepath, size in report['file_sizes'][:10]:
        print(f"  - {os.path.basename(filepath)}: {size} bytes")

    # Salva relatório completo
    with open('/Users/loris/Documents/GitHub/github_pages/jornal_retro/code_analysis_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print("\n📄 Relatório completo salvo em: code_analysis_report.json")

if __name__ == '__main__':
    main()