import Servico from "../servico/Servico";

const servicos: Servico[] = [
  {
    id: 1,
    nome: "CORTE MASCULINO",
    descricao:
      "Venha receber um corte impecável, com lâmina precisa e estilo de guerreiro. Saia pronto para enfrentar qualquer desafio com um visual que impõe respeito.",
    preco: 30,
    qtdeSlots: 1,
    imagemURL: "/servicos/corte-de-cabelo.jpg",
    profissionais: [],
  },
  {
    id: 2,
    nome: "BARBA",
    descricao:
      "Venha dar um trato na sua barba de lenhador, com aparo preciso e estilo de macho raiz. Saia com uma barba que impõe respeito e faz tremer até as árvores.",
    preco: 20,
    qtdeSlots: 1,
    imagemURL: "/servicos/corte-de-barba.jpg",
    profissionais: [],
  },
  {
    id: 3,
    nome: "SOBRANCELHA",
    descricao:
      "Sobrancelhas que definem sua expressão. Dê um toque de precisão ao seu visual com nosso serviço especializado de sobrancelhas.",
    preco: 10,
    qtdeSlots: 1,
    imagemURL: "/servicos/sobrancelha.jpg",
    profissionais: [],
  },
  {
    id: 4,
    nome: "PEZINHO",
    descricao:
      'O "Pezinho" é o toque final para um visual impecável, com linhas precisas que realçam o contorno da nuca e laterais, deixando o corte alinhado e elegante.',
    preco: 10,
    qtdeSlots: 1,
    imagemURL: "/servicos/sobrancelha.jpg",
    profissionais: [],
  },
  {
    id: 5,
    nome: "BARBA + PIGMENTAÇÃO",
    descricao:
      "Barba bem definida com pigmentação para realçar o contorno e garantir um visual mais cheio e uniforme.",
    preco: 30,
    qtdeSlots: 1,
    imagemURL: "/servicos/combo.jpg",
    profissionais: [],
  },
  {
    id: 6,
    nome: "CORTE + BARBA + PIGMENTAÇÃO",
    descricao:
      "Corte impecável, barba definida e pigmentação para um visual completo e marcante.",
    preco: 60,
    qtdeSlots: 1,
    imagemURL: "/servicos/combo.jpg",
    profissionais: [],
  },
  {
    id: 7,
    nome: "CORTE + BARBA + SOBRANCELHA",
    descricao:
      "Corte preciso, barba alinhada e sobrancelhas definidas para um visual impecável.",
    preco: 50,
    qtdeSlots: 1,
    imagemURL: "/servicos/dia-de-noivo.jpg",
    profissionais: [],
  },
];

export default servicos;
