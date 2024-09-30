"use client";

import Link from "next/link";
import Logo from "./Logo";
import MenuUsuario from "./MenuUsuario";
import useUsuario from "@/data/hooks/useUsuario";
import Image from "next/image";

export default function MenuSuperior() {
  const { usuario } = useUsuario();

  return (
    <header className="self-stretch flex justify-center items-center h-24 bg-black/60">
      <nav className="flex items-center justify-between container">
        <Logo />

        {/* <div className="flex items-center gap-3">
          {usuario ? (
            <MenuUsuario usuario={usuario} />
          ) : (
            <Link href="/entrar">Entrar</Link>
          )}
        </div> */}
      </nav>
    </header>
  );
}
