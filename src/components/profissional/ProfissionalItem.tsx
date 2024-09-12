import {
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { Profissional } from "@/data";
import Image from "next/image";
import Avaliacao from "../shared/Avaliacao";

export interface ProfissionalItemProps {
  profissional: Profissional;
}

export default function ProfissionalItem(props: ProfissionalItemProps) {
  function open(socialNetworks: number): void {
    /**
     * 1. Youtube
     * 2. Instagram
     * 3. Tiktok
     * 4. Whatsapp
     */

    switch (socialNetworks) {
      case 1:
        window.open(props.profissional.hasYoutube, "_blank");
        break;
      case 2:
        window.open(props.profissional.hasInstagram, "_blank");
        break;
      case 3:
        window.open(props.profissional.hasTik, "_blank");
        break;
      default:
        const whatsappUrl = `https://wa.me/${props.profissional.hasWhatsapp?.replace(/\D/g, "")}`;
        window.open(whatsappUrl, "_blank");
    }
  }

  return (
    <div
      className="
                flex flex-col items-center p-1
                bg-zinc-800 rounded-lg
            "
    >
      <div className="relative h-72 w-full">
        <Image
          src={props.profissional.imagemUrl}
          fill
          alt={props.profissional.nome}
          className="object-cover object-top rounded-t-lg"
        />
      </div>
      <div className="flex flex-col p-4 gap-5">
        <span className="text-2xl font-black">{props.profissional.nome}</span>
        <span className="text-sm text-zinc-400">
          {props.profissional.descricao}
        </span>

        <div className="flex gap-3 flex-wrap">
          {props.profissional.avaliacao > 0 && (
            <Avaliacao
              valor={props.profissional.avaliacao}
              quantidade={props.profissional.quantidadeAvaliacoes}
            />
          )}
        </div>

        <div className="flex gap-3 text-zinc-300">
          {props.profissional.hasYoutube && (
            <IconBrandYoutube
              stroke={1}
              className="cursor-pointer"
              onClick={() => open(1)}
            />
          )}
          {props.profissional.hasInstagram && (
            <IconBrandInstagram
              stroke={1}
              className="cursor-pointer"
              onClick={() => open(2)}
            />
          )}
          {props.profissional.hasTik && (
            <IconBrandTiktok
              stroke={1}
              className="cursor-pointer"
              onClick={() => open(3)}
            />
          )}
          {props.profissional.hasWhatsapp && (
            <IconBrandWhatsapp
              stroke={1}
              className="cursor-pointer"
              onClick={() => open(4)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
