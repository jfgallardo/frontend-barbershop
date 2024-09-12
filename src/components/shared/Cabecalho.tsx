import Image from "next/image";
import MenuSuperior from "@/components/shared/MenuSuperior";

export interface CabecalhoProps {
  titulo: string;
  descricao: string;
}

export default function Cabecalho(props: CabecalhoProps) {
  return (
    <div className="py-10 relative h-[180px]">
      <Image
        src="/banners/principal.webp"
        fill
        alt="Barbearia"
        className="object-cover"
      />
      <div
        className="
                    flex flex-col items-center
                    absolute top-0 left-0 w-full h-full
                    bg-black/80 md:bg-transparent md:bg-gradient-to-r from-black/30 via-black/90 to-black/30
                "
      >
        <MenuSuperior />
        <div className="container flex-1 flex flex-col justify-center items-center p-2">
          <h1 className="text-3xl font-black text-white/70">{props.titulo}</h1>
          <p className="text-xs font-light text-white/60">{props.descricao}</p>
        </div>
      </div>
    </div>
  );
}
