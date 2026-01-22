# Portfólio Lorissette13

Portfólio pessoal e rede social minimalista com estética retro-moderna. Combina apresentação profissional com compartilhamento de interesses pessoais (filmes, jogos, música, viagens).

## 📋 Arquivo PROMPT_CONSOLIDADO.md

O arquivo `PROMPT_CONSOLIDADO.md` é um documento essencial para o desenvolvimento do projeto com agentes IA. Ele contém:

- **Contexto completo do projeto**: Arquitetura, paleta de cores, regras de negócio
- **Especificações técnicas**: Stack, componentes, funcionalidades implementadas
- **Guias de desenvolvimento**: Padrões de código, decisões técnicas, responsividades
- **Estado do projeto**: O que foi concluído, o que está em progresso, próximos passos
- **Funcionalidades documentadas**: Cada sistema foi detalhado para facilitar extensões futuras

**Use este arquivo sempre que precisar de contexto para implementações, refatorações ou novas features.** Ele é mantido atualizado e serve como fonte única de verdade para o desenvolvimento.

## ✨ Funcionalidades

- **Portfólio profissional**: Trajetória, projetos e habilidades
- **Blog pessoal**: Posts sobre interesses diversos (140 caracteres/parágrafo)
- **Galeria visual**: Carrossel de imagens favoritas com filtros
- **Sistema de favoritos**: Marque items para destaque na home, persiste em localStorage
- **Timeline interativa**: Navegação por períodos profissionais com botão de voltar condicional
- **Navegação responsiva**: Adaptado para todos os dispositivos
- **Conteúdo dinâmico**: Arquivos de texto separados para fácil edição

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript ES6+
- **Estilo**: Fonte Special Elite, paleta de cores sépia/dourado
- **Estrutura**: Arquitetura modular com componentes reutilizáveis
- **Dados**: JSON para conteúdo estruturado, localStorage para favoritos

## 🚀 Instalação Local

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/lorissette13-portfolio.git
   cd lorissette13-portfolio

2. **Estrutura básica**

lorissette13-portfolio/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── data/
└── pages/

3. **Servidor local(opcional)**

# Com Python
python -m http.server 8000

# Ou com Node.js
npx serve .

4. **Acesse no navegador**
http://localhost:8000

## Estrutura de arquivos

.
├── index.html              # Página inicial
├── pages/                  # Páginas completas
│   ├── quem-sou.html
│   ├── cotidiano.html
│   ├── trajetoria.html
│   └── projetos.html
├── assets/css/            # Estilos organizados
├── assets/js/             # Scripts modulares
├── assets/data/           # Conteúdo editável
└── README.md

## Customização

1. Editar conteúdos

    Textos: Modifique os arquivos em assets/data/

    Posts: Edite posts.json para adicionar novos conteúdos

    Projetos: Atualize projects.json

2. Personalizar estilo

    Cores: Edite as variáveis CSS em assets/css/style.css

    Tipografia: Altere a fonte no @import do Google Fonts

    Layout: Ajuste os breakpoints em assets/css/responsive.css

3. Adicionar imagens

    Coloque imagens em assets/images/

    Atualize os caminhos no JSON correspondente

    Execute otimização (recomendado: compressão para web)

## Próximas features

    Integração com Spotify API

    Modo escuro automático

    Botão que muda site para inglês

## Licença

Projeto pessoal - Uso livre para referência e estudo

## Autor

lorissette13 (by loris)
Desenvolvedor front-end nascido em 1995
GitHub | LinkedIn | Portfólio