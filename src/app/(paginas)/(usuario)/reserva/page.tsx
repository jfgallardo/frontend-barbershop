"use client";
import useUsuarioAgenda from "@/data/hooks/useUsuarioAgenda";
import DiaInput from "@/components/agendamento/DiaInput";
import Cabecalho from "@/components/shared/Cabecalho";
import { IconCalendarCancel } from "@tabler/icons-react";
import AgendaUsuarioItem from "@/components/agendamento/AgendaUsuarioItem";

export default function PaginaReserva() {
  const { data, agendas, excluirAgendamento, alterarData } = useUsuarioAgenda();

  return (
    <div className="flex flex-col bg-zinc-900">
      <Cabecalho
        titulo="Minhas Reservas"
        descricao="Veja e gerencie suas reservas."
      />
      {
        <div className="container flex flex-col gap-10 py-16">
          <DiaInput data={data} dataMudou={alterarData} />

          {agendas.length > 0 ? (
            <div className="flex flex-col gap-4">
              {agendas.map((agendas) => (
                <AgendaUsuarioItem
                  key={agendas.id}
                  agendamento={agendas}
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
      }
    </div>
  );
}
