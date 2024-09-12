"use client";
import { Servico, servicos } from "@/data";
import { useRouter } from "next/navigation";
import ServicoItem from "./ServicoItem";
import Titulo from "../shared/Titulo";
import useAPI from "@/data/hooks/useAPI";
import { useCallback, useEffect, useState } from "react";

export default function NossosServicos() {
  const router = useRouter();
  //const [servicos, setServicos] = useState<Servico[]>();
  const { httpGet } = useAPI();

/*   const carregarServicos = useCallback(async () => {
    try {
      const servicos = await httpGet("servico");
      setServicos(servicos);
    } catch (error) {
      console.error("Error al cargar profesionales:", error);
    }
  }, [httpGet]); */

/*   useEffect(() => {
    carregarServicos();
  }, [carregarServicos]); */

  function iniciarAgendamento() {
    router.push("/agendamento");
  }

  return (
    <div className="flex flex-col gap-16">
      <Titulo
        principal="Do Clássico ao Moderno"
        secundario="Cabelo afiado, barba de lenhador e estilo marcante, sempre com visual transformado!"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.isArray(servicos) ? ( 
          servicos.map((servico: Servico) => (
            <ServicoItem
              key={servico.id}
              servico={servico}
             /*  onClick={iniciarAgendamento} */
            />
          ))
        ) : (
          <p>Não há serviços disponíveis.</p>
        )}
      </div>
    </div>
  );
}
