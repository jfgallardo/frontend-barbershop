import { Agendamento, DataUtils } from "@/data";
import {
  IconBrandWhatsapp,
  IconCalendar,
  IconTrash,
} from "@tabler/icons-react";

export interface AgendaProfissionalItemProps {
  agendamento: Agendamento;
  excluir: (id: number) => void;
}

export default function AgendaProfissionalItem(
  props: AgendaProfissionalItemProps
) {
  const { agendamento } = props;
 

  function open(phone: number) {
    const whatsappUrl = `https://wa.me/55${phone}`;
    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-zinc-800 rounded-md p-4 sm:p-7">
      <IconCalendar size={60} stroke={1} />
      <div className="flex-1 flex flex-col gap-2">
        <span className="text-lg sm:text-xl">{agendamento.usuario.nome}</span>
        <div
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={() => open(+agendamento.usuario.telefone)}
        >
          <IconBrandWhatsapp stroke={1} />
          <span className="text-zinc-400 text-xs sm:text-sm">
            {agendamento.usuario.telefone}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IconCalendar stroke={1} />

          <span className="text-zinc-400 text-xs sm:text-sm">
            {DataUtils.formatarDataEHora(new Date(agendamento.data))}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <span className="font-semibold">Servicios:</span>
        <ul className="list-disc list-inside text-zinc-400">
          {agendamento.servicos.map((servicio, index) => (
            <li className="text-sm" key={index}>
              {servicio.nome}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xl font-black">0h 45m</span>
        <span className="text-zinc-400">
          R${" "}
          {agendamento.servicos.reduce(
            (acc, servico) => acc + servico.preco,
            0
          )}
        </span>
      </div>
      <div>
        <button
          className="button bg-red-500"
          onClick={() => props.excluir(agendamento.id)}
        >
          <IconTrash size={24} stroke={1.5} />
        </button>
      </div>
    </div>
  );
}
