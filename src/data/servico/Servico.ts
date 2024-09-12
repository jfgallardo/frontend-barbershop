import { Profissional } from "../profissional";

export default interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  qtdeSlots: number;
  imagemURL: string;
  profissionais: Profissional[];
}
