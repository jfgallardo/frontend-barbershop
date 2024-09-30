import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import { AgendaUtils, DataUtils } from "@/data";
import useAgendamento from "@/data/hooks/useAgendamento";
import Loading from "../shared/Loading";

export interface HorariosInputProps {
  data: Date;
  qtdeHorarios: number;
  dataMudou(data: Date): void;
}

export default function HorariosInput(props: HorariosInputProps) {
  const [horaHover, setHoraHover] = useState<string | null>(null);
  const { horariosOcupados, loading } = useAgendamento();

  const { manha, tarde, noite } = AgendaUtils.horariosDoDia();

  const horaSelecionada = props.data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isSabado = props.data.getDay() === 6;

  function obterPeriodo(horario: string | null, qtde: number) {
    if (!horario) return [];
    const horarios = manha.includes(horario)
      ? manha
      : tarde.includes(horario)
      ? tarde
      : noite;
    const indice = horarios.findIndex((h) => horario == h);
    return horarios.slice(indice, indice + qtde);
  }

  function eliminateSpecificSchedules(hourCheck: string, data: Date) {
    const schedulesBeDeleted =
      process.env.NEXT_PUBLIC_SCHEDULES_ELIMINATED?.split(",").map((item) => {
        const [fecha, hora] = item.split("/");
        return { fecha, hora };
      });

    return schedulesBeDeleted?.some((h) => {
      return (
        h.fecha == data.toISOString().split("T")[0] && h.hora === hourCheck
      );
    });
  }

  function pastSchedules(hour: string, data: Date) {
    const hrAtual = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const dtAtual = new Date().getDate();
    return hrAtual > hour && dtAtual === data.getDate();
  }

  function renderizarHorario(horario: string) {
    if (
      (isSabado && horario > "17:00") ||
      eliminateSpecificSchedules(horario, props.data) ||
      pastSchedules(horario, props.data)
    ) {
      return [];
    }

    const periodo = obterPeriodo(horaHover, 1);
    const temHorarios = periodo.length === 1;
    const destacarHora = temHorarios && periodo.includes(horario);
    const periodoSelecionado = obterPeriodo(horaSelecionada, 1);

    const selecionado =
      periodoSelecionado.length === 1 && periodoSelecionado.includes(horario);
    const naoSelecionavel = !temHorarios && periodo.includes(horario);
    const periodoBloqueado =
      periodo.includes(horario) &&
      periodo.some((h) => horariosOcupados.includes(h));
    const ocupado = horariosOcupados.includes(horario);

    // Agregar condición para ocultar horarios ocupados
    if (ocupado) return null;

    return (
      <div
        key={horario}
        className={cn(
          "flex justify-center items-center cursor-pointer h-8 border border-zinc-800 rounded select-none",
          {
            "bg-yellow-400": destacarHora,
            "bg-red-500": naoSelecionavel || periodoBloqueado,
            "text-white bg-green-500": selecionado,
            "cursor-not-allowed bg-zinc-800 ": ocupado,
          }
        )}
        onMouseEnter={(_) => setHoraHover(horario)}
        onMouseLeave={(_) => setHoraHover(null)}
        onClick={() => {
          if (naoSelecionavel) return;
          if (ocupado || periodoBloqueado) return;
          props.dataMudou(DataUtils.aplicarHorario(props.data, horario));
        }}
      >
        <span
          className={cn("text-sm text-zinc-400", {
            "text-black font-semibold": destacarHora,
            "text-white font-semibold": selecionado,
            "text-zinc-400 font-semibold": ocupado,
          })}
        >
          {horario}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">
        Horários Disponíveis
      </span>
      {loading ? (
        <Loading text="Carregando horarios..." />
      ) : (
        <div className="flex flex-col gap-3 select-none">
          <span className="text-xs uppercase text-zinc-400">Manhã</span>
          <div className="grid grid-cols-8 gap-1">
            {manha.map(renderizarHorario)}
          </div>

          <span className="text-xs uppercase text-zinc-400">Tarde</span>
          <div className="grid grid-cols-8 gap-1">
            {tarde.map(renderizarHorario)}
          </div>

          <span className="text-xs uppercase text-zinc-400">Noite</span>
          <div className="grid grid-cols-8 gap-1">
            {noite.map(renderizarHorario)}
          </div>
        </div>
      )}
    </div>
  );
}
