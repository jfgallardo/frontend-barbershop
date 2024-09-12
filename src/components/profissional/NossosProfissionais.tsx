"use client";
import { profissionais, Profissional } from "@/data";
import ProfissionalItem from "@/components/profissional/ProfissionalItem";
import Titulo from "@/components/shared/Titulo";
import { useCallback, useEffect, useState } from "react";
import useAPI from "@/data/hooks/useAPI";

export default function NossosProfissionais() {
  //const [profissionais, setProfissionais] = useState<Profissional[]>();
  const { httpGet } = useAPI();

  /* const carregarProfissionais = useCallback(async () => {
    try {
      const profissionais = await httpGet("profissionai");
      setProfissionais(profissionais);
    } catch (error) {
      console.error("Error al cargar profesionales:", error);
    }
  }, [httpGet]);

  useEffect(() => {
    carregarProfissionais();
  }, [carregarProfissionais]); */

  return (
    <div className="container flex flex-col items-center gap-y-16">
      <Titulo
        principal="Nossos Brutos"
        secundario="Só os mais brabos estão aqui!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 ">
        {Array.isArray(profissionais) ? (
          profissionais?.map((profissional: Profissional) => (
            <ProfissionalItem
              key={profissional.id}
              profissional={profissional}
            />
          ))
        ) : (
          <p>Não há profissionais disponíveis.</p>
        )}
      </div>
    </div>
  );
}
