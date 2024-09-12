"use client";
import { usePathname, useRouter } from "next/navigation";
import useUsuario from "@/data/hooks/useUsuario";
import { useEffect } from "react";
import Loading from "./Loading";

export default function ForcarUsuario(props: any) {
  const { carregando, usuario } = useUsuario();
  const caminho = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!usuario?.telefone && !carregando) {
      router.push(`/entrar?destino=${caminho}`);
    }
  }, [usuario, carregando, caminho, router]);

  if (carregando)
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  if (!usuario?.telefone) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return props.children;
}
