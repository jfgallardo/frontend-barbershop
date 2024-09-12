"use client";
import { IconCalendarCancel } from "@tabler/icons-react";
import useProfissionalAgenda from "@/data/hooks/useProfissionalAgenda";
import DiaInput from "@/components/agendamento/DiaInput";
import Cabecalho from "@/components/shared/Cabecalho";
import AgendaProfissionalItem from "@/components/agendamento/AgendaProfissionalItem";
import useAPI from "@/data/hooks/useAPI";
import useUsuario from "@/data/hooks/useUsuario";
import { Agendamento } from "@/data";

export interface Events {
  title: string;
  startDate: string;
  endDate: string;
  details: string;
}

export default function PaginaAgenda() {
  const { data, agendamentos, alterarData, excluirAgendamento } =
    useProfissionalAgenda();

  const { usuario } = useUsuario();
  const { httpGet } = useAPI();

  function convertirFecha(fecha: Date) {
    const date = new Date(fecha);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Mes empieza en 0
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }

  function downloadICS(events: Events[]) {
    let calendar = "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n";

    events.forEach((event) => {
      calendar += `BEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${event.startDate}\nDTEND:${event.endDate}\nDESCRIPTION:${event.details}\nEND:VEVENT\n`;
    });

    calendar += "END:VCALENDAR";
    const blob = new Blob([calendar], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.ics";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  async function getAllEvents() {
    const agendas = await httpGet(`agendamentos/getAll/${usuario?.id}`);

    const events = agendas.map((item: Agendamento) => {
      const fechaConvertida = convertirFecha(item.data);
      const servicios = item.servicos.map((item) => item.nome).join(", ");

      return {
        title: `Agenda para ${item.usuario.nome}`,
        startDate: fechaConvertida,
        endDate: fechaConvertida,
        details: servicios,
      };
    });

    downloadICS(events);
  }

  return (
    <div className="flex flex-col bg-zinc-900">
      <Cabecalho
        titulo="Minha Agenda"
        descricao="Veja e gerencie seus agendamentos."
      />
      <div className="container flex flex-col gap-10 py-16">
        <div className="flex items-center w-full justify-end">
          <button
            onClick={getAllEvents}
            className="bg-blue-500 hover:bg-blue-700 px-2.5 py-1 rounded-full"
          >
            Download ICS
          </button>
        </div>
        <DiaInput data={data} dataMudou={alterarData} />

        {agendamentos.length > 0 ? (
          <div className="flex flex-col gap-4">
            {agendamentos.map((agendamento) => (
              <AgendaProfissionalItem
                key={agendamento.id}
                agendamento={agendamento}
                excluir={excluirAgendamento}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <IconCalendarCancel
              size={150}
              stroke={0.5}
              className="text-zinc-400"
            />
            <span className="text-xl text-zinc-500 font-extralight w-64 text-center">
              Nenhum agendamento para esta data.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
