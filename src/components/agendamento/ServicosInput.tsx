import { Profissional, Servico } from "@/data";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useAPI from "@/data/hooks/useAPI";
import Loading from "../shared/Loading";

export interface ServicosInputProps {
  servicos: Servico[];
  servicosMudou: (servicos: Servico[]) => void;
  profissional: Profissional | null;
}

function Opcao(props: {
  servico: Servico;
  onClick: (s: Servico) => void;
  selecionado?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer select-none border rounded-lg overflow-hidden
            ${props.selecionado ? "border-green-400" : "border-none"}`}
      onClick={() => props.onClick(props.servico)}
    >
      <Image
        src={props.servico.imagemURL}
        alt={props.servico.nome}
        width={150}
        height={120}
      />
      <div
        className={`
                    py-2 w-full h-full text-center text-xs
                    ${
                      props.selecionado
                        ? "text-black bg-green-400 font-semibold"
                        : "text-zinc-400 font-light bg-zinc-900 "
                    }
                `}
      >
        {props.servico.nome}
      </div>
    </div>
  );
}

export default function ServicosInput(props: ServicosInputProps) {
  const { servicosMudou } = props;
  const [servicos, setServicos] = useState<Servico[]>();
  const { httpGet } = useAPI();
  const [loading, setLoading] = useState(false);

  const carregarServicos = useCallback(async () => {
    setLoading(true);
    const idProfissional = props.profissional?.id;

    const servicos = await httpGet(`servico/por-profesional/${idProfissional}`);
    setServicos(servicos);
    setLoading(false);
  }, [httpGet, props.profissional?.id]);

  useEffect(() => {
    carregarServicos();
  }, [carregarServicos]);

  function alternarMarcacaoServico(servico: Servico) {
    const servicoSelecionado = props.servicos.find((s) => s.id === servico.id);
    servicosMudou(
      servicoSelecionado
        ? props.servicos.filter((s) => s.id !== servico.id)
        : [...props.servicos, servico]
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">
        Serviços Disponíveis
      </span>
      {loading ? (
        <Loading text="Carregando os serviços..." />
      ) : (
        <div className="grid grid-cols-3 self-start gap-5">
          {servicos?.map((servico) => (
            <Opcao
              key={servico.id}
              servico={servico}
              onClick={alternarMarcacaoServico}
              selecionado={props.servicos.some(
                (serv) => serv.id === servico.id
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
