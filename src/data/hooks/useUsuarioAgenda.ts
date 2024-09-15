import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";
import useUsuario from "./useUsuario";
import { Agendamento } from "@/data";

export default function useUsuarioAgenda() {
  const { usuario } = useUsuario();
  const { httpGet, httpDelete } = useAPI();
  const [data, setData] = useState<Date>(new Date());
  const [agendas, setAgendas] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarAgendas = useCallback(async () => {
    if (!usuario) return;
    setLoading(true);
    setAgendas([]);
    const dtString = data.toISOString().slice(0, 10);
    const agendas = await httpGet(
      `agendamentos/usuario/${usuario.id}/${dtString}`
    );
    setAgendas(agendas);
    setLoading(false);
  }, [httpGet, usuario, data]);

  useEffect(() => {
    carregarAgendas();
  }, [carregarAgendas]);

  async function excluirAgendamento(id: number) {
    await httpDelete(`agendamentos/${id}`);
    setAgendas(agendas.filter((a) => a.id !== id));
  }

  return {
    data,
    agendas,
    alterarData: setData,
    excluirAgendamento,
    loading,
  };
}
