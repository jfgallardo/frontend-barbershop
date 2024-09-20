import { createContext, useCallback, useEffect, useState } from "react";
import { AgendaUtils, Profissional, Servico, Usuario, DataUtils } from "@/data";
import useUsuario from "../hooks/useUsuario";
import useAPI from "../hooks/useAPI";

interface ContextoAgendamentoProps {
  profissional: Profissional | null;
  servicos: Servico[];
  data: Date;
  horariosOcupados: string[];
  reservas: string[];
  loading: boolean;
  duracaoTotal(): string;
  precoTotal(): number;
  quantidadeDeSlots(): number;
  selecionarProfissional(profissional: Profissional): void;
  selecionarServicos(servicos: Servico[]): void;
  selecionarData(data: Date): void;
  agendar(): Promise<void>;
}

export const ContextoAgendamento = createContext(
  {} as ContextoAgendamentoProps
);

export function ProvedorAgendamento({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [data, setData] = useState<Date>(DataUtils.hoje());
  const [loading, setLoading] = useState(false);

  const { usuario } = useUsuario();
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [reservas, setReservas] = useState<string[]>([]);
  const { httpGet, httpPost } = useAPI();

  function selecionarProfissional(profissional: Profissional) {
    setProfissional(profissional);
  }

  function selecionarServicos(servicos: Servico[]) {
    setServicos(servicos);
  }

  function duracaoTotal() {
    return AgendaUtils.duracaoTotal(servicos);
  }

  function precoTotal() {
    return servicos.reduce((acc, atual) => {
      return (acc += atual.preco);
    }, 0);
  }

  const selecionarData = useCallback(function (hora: Date) {
    setData(hora);
  }, []);

  function quantidadeDeSlots() {
    const totalDeSlots = servicos.reduce((acc, servico) => {
      return (acc += servico.qtdeSlots);
    }, 0);

    return totalDeSlots;
  }

  async function agendar() {
    if (!usuario?.telefone) return;

    await httpPost("agendamentos", {
      usuario: usuario,
      data: data!,
      profissional: profissional!,
      servicos: servicos,
    });

    limpar();
  }

  function limpar() {
    setData(DataUtils.hoje());
    setHorariosOcupados([]);
    setProfissional(null);
    setServicos([]);
    setReservas([]);
  }

  const obterHorariosOcupados = useCallback(
    async function (data: Date, profissional: Profissional): Promise<string[]> {
      setLoading(true);
      try {
        if (!data || !profissional) return [];
        const dtString = `${data.getFullYear()}-${String(
          data.getMonth() + 1
        ).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`;
        const ocupacao = await httpGet(
          `agendamentos/ocupacao/${profissional!.id}/${dtString}`
        );
        setLoading(false);
        return ocupacao ?? [];
      } catch (e) {
        return [];
      }
    },
    [httpGet]
  );

  const obterAgendamentosPorUsuario = useCallback(
    async function (usuario: Usuario): Promise<string[]> {
      try {
        if (!usuario) return [];
        const reservas = await httpGet(
          `/agendamentos/usuario/reservas/${usuario!.id}`
        );
        return reservas ?? [];
      } catch (e) {
        return [];
      }
    },
    [httpGet]
  );

  useEffect(() => {
    if (!usuario) return;
    obterAgendamentosPorUsuario(usuario).then(setReservas);
  }, [usuario, obterAgendamentosPorUsuario]);

  useEffect(() => {
    if (!data || !profissional) return;
    obterHorariosOcupados(data, profissional).then(setHorariosOcupados);
  }, [data, profissional, obterHorariosOcupados]);

  return (
    <ContextoAgendamento.Provider
      value={{
        data,
        profissional,
        servicos,
        horariosOcupados,
        reservas,
        loading,
        duracaoTotal,
        precoTotal,
        selecionarData,
        selecionarProfissional,
        quantidadeDeSlots,
        selecionarServicos,
        agendar,
      }}
    >
      {children}
    </ContextoAgendamento.Provider>
  );
}
