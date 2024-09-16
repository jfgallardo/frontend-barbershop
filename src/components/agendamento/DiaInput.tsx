import { DataUtils } from "@/data";
import React from "react";

export interface DiaInputProps {
  data: Date;
  dataMudou(data: Date): void;
}

export default function DiaInput(props: DiaInputProps) {
  function renderizarDia(data: Date) {
    const selecionado = props.data?.getDate() === data.getDate(); // Usar el estado para determinar si está seleccionado

    return (
      <div
        onClick={() => props.dataMudou(data)}
        className={`
                    flex-1 flex flex-col items-center gap-1 py-4 cursor-pointer
                    ${
                      selecionado ? "bg-yellow-400 text-black" : "text-zinc-400"
                    }
                `}
      >
        <div className="flex items-center p-1">
          <span className="md:text-2xl text-xl font-black">
            {data.getDate()}
          </span>
          <span className="text-xs font-light uppercase">
            {data.toLocaleDateString("pt-BR", { month: "short" }).slice(0, 3)}
          </span>
        </div>
        <div
          className={`
                        text-center text-xs font-light uppercase 
                        ${selecionado ? "bg-black/10" : "bg-white/10"}
                        py-0.5 px-3 rounded-full mx-1 
                    `}
        >
          {data.toLocaleDateString("pt-BR", { weekday: "short" }).slice(0, 3)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm uppercase text-zinc-400">Dias Disponíveis</span>
      <div className="flex flex-nowrap gap-3 px-1 bg-zinc-950 rounded-lg overflow-x-auto touch-pan-x">
        {Array.from({ length: 7 })
          .map(
            (_, i) => new Date(DataUtils.hoje().getTime() + 86400000 * (i + 1))
          )
          .filter((date) => date.getDay() !== 0)
          .map((date) => (
            <React.Fragment key={date.toISOString()}>
              {renderizarDia(date)}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
