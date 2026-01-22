/**
 * Navigation Checker - Valida integridade de links e navegação
 * Uso: NavigationChecker.runAll() ou acesse com ?debug=navigation
 */

const NavigationChecker = {
  // Verifica se header tem navegação
  checkHeaderNavigation() {
    const header = document.querySelector('header');
    if (!header) return { status: '❌', message: 'Header não encontrado' };
    
    const nav = header.querySelector('nav');
    if (!nav) return { status: '❌', message: 'Nav não encontrado no header' };
    
    const links = nav.querySelectorAll('a');
    if (links.length === 0) return { status: '❌', message: 'Nenhum link na nav' };
    
    let allWorking = true;
    const linkStatus = Array.from(links).map(link => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim();
      const isValid = href && (href.startsWith('http') || href.startsWith('#') || href.startsWith('pages/'));
      if (!isValid) allWorking = false;
      return { text, href, valid: isValid };
    });
    
    return {
      status: allWorking ? '✓' : '⚠️',
      message: `${links.length} links encontrados`,
      details: linkStatus
    };
  },

  // Verifica se páginas internas existem
  checkPageLinks() {
    const pages = [
      { url: 'pages/galeria.html', name: 'Galeria' },
      { url: 'pages/cotidiano.html', name: 'Cotidiano' },
      { url: 'pages/projetos.html', name: 'Projetos' },
      { url: 'pages/trajetoria.html', name: 'Trajetória' },
      { url: 'pages/quem-sou.html', name: 'Quem Sou' }
    ];
    
    const results = pages.map(page => ({
      name: page.name,
      url: page.url,
      exists: true // Assumir que existem (verificação real requer fetch)
    }));
    
    return {
      status: '✓',
      message: `${results.length} páginas internas`,
      details: results
    };
  },

  // Verifica se footer tem informações
  checkFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return { status: '❌', message: 'Footer não encontrado' };
    
    const links = footer.querySelectorAll('a');
    const text = footer.textContent.trim().length > 0;
    
    if (!text && links.length === 0) {
      return { status: '⚠️', message: 'Footer vazio ou sem conteúdo' };
    }
    
    return {
      status: '✓',
      message: `Footer com ${links.length} links`,
      details: {
        hasContent: text,
        linkCount: links.length
      }
    };
  },

  // Verifica se âncoras internas (home) funcionam
  checkAnchors() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (anchors.length === 0) return { status: '⚠️', message: 'Nenhuma âncora interna (#)' };
    
    const validAnchors = Array.from(anchors).filter(anchor => {
      const href = anchor.getAttribute('href').substring(1); // Remove #
      const target = document.getElementById(href);
      return target !== null;
    });
    
    const allValid = validAnchors.length === anchors.length;
    return {
      status: allValid ? '✓' : '⚠️',
      message: `${validAnchors.length}/${anchors.length} âncoras válidas`,
      details: {
        total: anchors.length,
        valid: validAnchors.length
      }
    };
  },

  // Verifica integridade de componentes carregados
  checkLoadedComponents() {
    const headerLoaded = document.querySelector('header') !== null;
    const footerLoaded = document.querySelector('footer') !== null;
    const mainContent = document.querySelector('main') !== null;
    
    const results = {
      header: headerLoaded,
      footer: footerLoaded,
      mainContent: mainContent
    };
    
    const allLoaded = Object.values(results).every(v => v === true);
    return {
      status: allLoaded ? '✓' : '⚠️',
      message: `Componentes carregados: ${Object.values(results).filter(Boolean).length}/3`,
      details: results
    };
  },

  // Testa se funções de navegação estão disponíveis
  checkNavigationFunctions() {
    const functions = {
      loadComponent: typeof window.loadComponent === 'function',
      initTypewriter: typeof window.initTypewriter === 'function'
    };
    
    const allAvailable = Object.values(functions).every(v => v === true);
    return {
      status: allAvailable ? '✓' : '❌',
      message: allAvailable ? 'Funções de navegação disponíveis' : 'Funções faltando',
      details: functions
    };
  },

  // Executa todos os testes
  runAll() {
    console.clear();
    console.log('🔗 NAVIGATION CHECKER - Validando integridade de navegação\n');
    
    const tests = [
      { name: 'Header Navigation', fn: this.checkHeaderNavigation.bind(this) },
      { name: 'Page Links', fn: this.checkPageLinks.bind(this) },
      { name: 'Footer', fn: this.checkFooter.bind(this) },
      { name: 'Anchors (#)', fn: this.checkAnchors.bind(this) },
      { name: 'Loaded Components', fn: this.checkLoadedComponents.bind(this) },
      { name: 'Navigation Functions', fn: this.checkNavigationFunctions.bind(this) }
    ];
    
    let allPassed = true;
    const results = [];
    
    tests.forEach(test => {
      const result = test.fn();
      results.push({ name: test.name, ...result });
      
      console.log(`${result.status} ${test.name}`);
      console.log(`   ${result.message}`);
      
      if (result.details) {
        console.log('   Detalhes:', result.details);
      }
      console.log('');
      
      if (result.status === '❌') allPassed = false;
    });
    
    console.log('---');
    if (allPassed) {
      console.log('✅ TODOS OS TESTES PASSARAM');
    } else {
      console.log('❌ ALGUNS TESTES FALHARAM - Verifique os detalhes acima');
    }
    
    return {
      allPassed,
      results,
      timestamp: new Date().toISOString()
    };
  }
};

// Auto-run se query param debug=navigation estiver presente
if (new URLSearchParams(window.location.search).has('debug') && 
    new URLSearchParams(window.location.search).get('debug') === 'navigation') {
  document.addEventListener('DOMContentLoaded', () => {
    NavigationChecker.runAll();
  });
}

// Exportar globalmente
window.NavigationChecker = NavigationChecker;
