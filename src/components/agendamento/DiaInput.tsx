import { DataUtils } from "@/data";
import React, { useState, useEffect } from "react";

export interface DiaInputProps {
  data: Date;
  dataMudou(data: Date): void;
}

export default function DiaInput(props: DiaInputProps) {
  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null); // Estado para el día seleccionado

  useEffect(() => {
    const primerDiaVisible = Array.from({ length: 7 })
      .map((_, i) => new Date(DataUtils.hoje().getTime() + 86400000 * i))
      .find((date) => date.getDay() !== 0); // Encontrar el primer día visible
    if (primerDiaVisible) {
      setDiaSelecionado(primerDiaVisible); // Establecer el primer día visible como seleccionado
    }
  }, []);

  function renderizarDia(data: Date) {
    const selecionado = diaSelecionado?.getDate() === data.getDate(); // Usar el estado para determinar si está seleccionado

    return (
      <div
        onClick={() => {
          setDiaSelecionado(data); // Actualizar el estado al hacer clic
          props.dataMudou(data); // Llamar a la función de cambio de datos
        }}
        className={`
                    flex-1 flex flex-col items-center gap-2 py-4 cursor-pointer
                    ${selecionado ? "bg-yellow-400 text-black" : "text-zinc-400"}
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
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">Dias Disponíveis</span>
      <div className="flex flex-nowrap gap-3 bg-zinc-950 rounded-lg overflow-hidden">
        {Array.from({ length: 7 })
          .map((_, i) => new Date(DataUtils.hoje().getTime() + 86400000 * i))
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
