/**
 * Dados de "Quem Sou Eu"
 * 7 parágrafos no total: 2 aparecem na home, 5 no restante da página
 */

const ABOUT_ME_DATA = {
  "full_name": "loris",
  "bio_short": "developer, designer e eterno aprendiz",
  "paragraphs": [
    {
      "id": "para-001",
      "content": "sou um desenvolvedor com paixão por criação. comecei aos 12 anos mexendo em css e html, evoluindo para javascript, typescript, react e tudo que faz sentido no caminho. mas desenvolvimento web é só a metade da história. também faço design, penso sobre user experience, e gasto tempo demais pensando em detalhes que ninguém mais percebe.",
      "show_on_home": true,
      "order": 1
    },
    {
      "id": "para-002",
      "content": "acredito que bom código é como um poema - tem ritmo, tem propósito e desaparece no uso. estou constantemente buscando ser melhor, estudando novos padrões, testando arquiteturas. mas também acredito que a vida é feita de muito mais que código: filmes, livros, músicas, jogos e conversas interessantes moldam minha forma de pensar e criar.",
      "show_on_home": true,
      "order": 2
    },
    {
      "id": "para-003",
      "content": "meu setup inclui vscode com customizações obsessivas, um teclado mecânico que faz barulho demais, xícara de café sempre presente e playlist de synthwave tocando ao fundo. trabalho melhor à noite, prefiro código limpo a código rápido, e tenho uma opinião muito forte sobre espaços vs tabs (espaços, claramente).",
      "show_on_home": false,
      "order": 3
    },
    {
      "id": "para-004",
      "content": "trabalho em projetos que me excitam, seja em startups ou projetos pessoais. não tenho interesse em bullshit corporativo ou tech por tech. o que me move é resolver problemas reais, melhorar experiência de usuários e aprender no processo. cada projeto é uma oportunidade de descobrir algo novo.",
      "show_on_home": false,
      "order": 4
    },
    {
      "id": "para-005",
      "content": "fora da codificação, você me encontra em um cafe lendo sci-fi, assistindo filmes que exploram ética e tecnologia, jogando boardgames cooperativos com amigos ou descobrindo artistas indies obscuros no spotify. essas atividades não são distrações do trabalho - são o combustível que o mantém interessante.",
      "show_on_home": false,
      "order": 5
    },
    {
      "id": "para-006",
      "content": "mantenho este espaço como um diário público de minhas descobertas e obsessões. posts sobre filmes que me inspiraram, jogos que me ensinaram algo, livros que expandiram minha perspectiva e experiências que me tornaram melhor desenvolvedor. é um reflexo honesto do meu dia a dia.",
      "show_on_home": false,
      "order": 6
    },
    {
      "id": "para-007",
      "content": "se você chegou até aqui, espero que tenha achado algo interessante. se quiser conversar sobre code, design, filmes ou qualquer outra obsessão compartilhada, adoraria saber. a web é melhor quando construída por pessoas que realmente se importam com o que fazem.",
      "show_on_home": false,
      "order": 7
    }
  ]
};

/**
 * Função para obter parágrafos da home
 * @returns {Array} Parágrafos que aparecem na home
 */
function getHomeAboutMeParagraphs() {
    return ABOUT_ME_DATA.paragraphs
        .filter(p => p.show_on_home)
        .sort((a, b) => a.order - b.order);
}

/**
 * Função para obter todos os parágrafos
 * @returns {Array} Todos os parágrafos em ordem
 */
function getAllAboutMeParagraphs() {
    return ABOUT_ME_DATA.paragraphs.sort((a, b) => a.order - b.order);
}
