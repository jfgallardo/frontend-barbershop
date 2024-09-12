import { Profissional } from "@/data";
import Image from "next/image";
import useAPI from "@/data/hooks/useAPI";
import { useCallback, useEffect, useState } from "react";

export interface ProfissionalInputProps {
  profissional: Profissional | null;
  profissionalMudou: (profissional: Profissional) => void;
}

function Opcao(props: {
  profissional: Profissional;
  onClick: (p: Profissional) => void;
  selecionado?: boolean;
}) {
  return (
    <div
      className={`
                flex flex-col items-center cursor-pointer select-none rounded-lg border w-[150px] h-[180px]
                ${props.selecionado ? "border-green-400" : "border-none"} overflow-hidden
            `}
      onClick={() => props.onClick(props.profissional)}
    >
      <Image
        src={props.profissional.imagemUrl}
        alt={props.profissional.nome}
        width={150}
        height={150}
      />
      <div
        className={`
                    py-2 w-full h-full text-center text-xs
                    ${props.selecionado ? "text-black bg-green-400 font-semibold" : "text-zinc-400 font-light bg-zinc-900 "}
                `}
      >
        {props.profissional.nome.split(" ")[0]}
      </div>
    </div>
  );
}

export default function ProfissionalInput(props: ProfissionalInputProps) {
  const [profissionais, setProfissionais] = useState<Profissional[]>();
  const { httpGet } = useAPI();

  const carregarProfissionais = useCallback(async () => {
    const profissionais = await httpGet("profissionai");
    setProfissionais(profissionais);
  }, [httpGet]);

  useEffect(() => {
    carregarProfissionais();
  }, [carregarProfissionais]);

  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">
        Profissionais Disponíveis
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 self-start gap-5">
        {profissionais?.map((profissional) => (
          <Opcao
            key={profissional.id}
            profissional={profissional}
            onClick={props.profissionalMudou}
            selecionado={profissional.id === props.profissional?.id}
          />
        ))}
      </div>
    </div>
  );
}
