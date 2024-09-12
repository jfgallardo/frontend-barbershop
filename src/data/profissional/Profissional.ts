import { Servico } from "../servico";

export default interface Profissional {
  id: number;
  nome: string;
  descricao: string;
  imagemUrl: string;
  avaliacao: number;
  quantidadeAvaliacoes: number;
  hasWhatsapp?: string;
  hasYoutube?: string;
  hasTik?: string;
  hasInstagram?: string;
  servicos: Servico[];
}
