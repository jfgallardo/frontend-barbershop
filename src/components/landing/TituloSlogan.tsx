"use client";
import Image from "next/image";
import MenuSuperior from "@/components/shared/MenuSuperior";
import useUsuario from "@/data/hooks/useUsuario";
import { useRouter } from "next/navigation";

export default function TituloSlogan() {
  const { usuario } = useUsuario();
  const router = useRouter();

  function open() {
    const whatsappUrl =
      "https://wa.me/5562996132360?text=Olá,%20gostaria%20de%20reservar%20um%20horário";
    window.open(whatsappUrl, "_blank");
  }
  return (
    <div className="py-10 relative h-[700px]">
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
        <div className="container flex-1 flex flex-col justify-center items-center gap-5 z-50">
          <h1 className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin tracking-wider">
              Transformações
            </span>
            <span className="text-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black pb-2">
              Lendárias
            </span>
          </h1>
          <p className="w-96 text-center text-zinc-400 text-base sm:text-lg font-extralight">
            Transformamos visual, definimos estilo!
          </p>

          {/* {!usuario?.barbeiro && (
            <button
              onClick={() => router.push("/agendamento")}
              className="
                          bg-gradient-to-r from-green-500 to-green-600
                          text-white font-semibold text-base md:text-lg
                          py-2 px-4 rounded-md hover:from-green-600 hover:to-green-700
                      "
            >
              Agendar Agora
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
//() => router.push("/agendamento")
