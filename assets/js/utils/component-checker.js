/**
 * Component Checker
 * Testes para verificar que todos os componentes necessários estão carregados
 * 
 * USO:
 * Executar manualmente no console ou integrar com test runner
 */

const ComponentChecker = {
    /**
     * Verifica se header está presente e carregado
     */
    checkHeader() {
        const header = document.querySelector('header.header');
        if (!header) {
            return { pass: false, error: '❌ Header não encontrado' };
        }
        
        const logo = header.querySelector('.logo');
        const nav = header.querySelector('.nav-menu');
        
        if (!logo || !nav) {
            return { pass: false, error: '❌ Header incompleto (faltam logo ou menu)' };
        }
        
        return { pass: true, message: '✓ Header OK' };
    },

    /**
     * Verifica se footer está presente
     */
    checkFooter() {
        const footer = document.querySelector('footer.footer');
        if (!footer) {
            return { pass: false, error: '❌ Footer não encontrado' };
        }
        
        const text = footer.querySelector('.footer-text');
        if (!text) {
            return { pass: false, error: '❌ Footer incompleto' };
        }
        
        return { pass: true, message: '✓ Footer OK' };
    },

    /**
     * Verifica se menu de navegação está acessível
     */
    checkNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems.length === 0) {
            return { pass: false, error: '❌ Nenhum item de navegação encontrado' };
        }
        
        return { pass: true, message: `✓ Navegação OK (${navItems.length} itens)` };
    },

    /**
     * Verifica se funções globais necessárias existem
     */
    checkGlobalFunctions() {
        const required = ['loadComponent'];
        const missing = [];
        
        required.forEach(fn => {
            if (typeof window[fn] !== 'function') {
                missing.push(fn);
            }
        });
        
        if (missing.length > 0) {
            return { pass: false, error: `❌ Funções faltando: ${missing.join(', ')}` };
        }
        
        return { pass: true, message: '✓ Funções globais OK' };
    },

    /**
     * Verifica se CSS foi carregado
     */
    checkCSS() {
        const styles = document.styleSheets;
        if (styles.length === 0) {
            return { pass: false, error: '❌ Nenhum CSS carregado' };
        }
        
        return { pass: true, message: `✓ CSS carregado (${styles.length} folhas)` };
    },

    /**
     * Executa todos os testes
     */
    runAll() {
        console.log('🔍 Executando testes de componentes...\n');
        
        const tests = [
            this.checkHeader(),
            this.checkFooter(),
            this.checkNavigation(),
            this.checkCSS(),
            this.checkGlobalFunctions()
        ];
        
        let passed = 0;
        let failed = 0;
        
        tests.forEach(test => {
            if (test.pass) {
                console.log(test.message);
                passed++;
            } else {
                console.error(test.error);
                failed++;
            }
        });
        
        console.log(`\n📊 Resultado: ${passed} passou, ${failed} falhou`);
        
        return {
            total: tests.length,
            passed: passed,
            failed: failed,
            success: failed === 0
        };
    }
};

// Exporta globalmente
window.ComponentChecker = ComponentChecker;

// Executa automaticamente ao carregar se em página de debug
if (window.location.search.includes('debug=components')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => ComponentChecker.runAll(), 500);
    });
}
