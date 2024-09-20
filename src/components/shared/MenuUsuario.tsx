"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Usuario } from "@/data";
import useUsuario from "@/data/hooks/useUsuario";
import { useRouter } from "next/navigation";
import DialogComponent from "./Dialog";

export interface MenuUsuarioProps {
  usuario: Usuario;
}

export default function MenuUsuario(props: MenuUsuarioProps) {
  const { usuario, sair } = useUsuario();
  const router = useRouter();

  function footer() {
    return (
      <button className="bg-blue-500 hover:bg-blue-700 px-3 py-2">Mudar</button>
    );
  }

  return props.usuario ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-2 items-center">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold leading-5">
              {props.usuario.nome}
            </span>
            <span className="text-xs text-zinc-400">
              {props.usuario.telefone}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {!usuario?.barbeiro && (
          <DropdownMenuItem onClick={() => router.push("/reserva")}>
            Minha Agenda
          </DropdownMenuItem>
        )}
        {usuario?.barbeiro && (
          <DropdownMenuItem onClick={() => router.push("/agenda")}>
            Minha Agenda
          </DropdownMenuItem>
        )}
        {usuario?.barbeiro && (
          <DropdownMenuItem onClick={() => router.push("/servicios")}>
            Meus Servicios
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => router.push("/senha")}>
          Mudar Senha
        </DropdownMenuItem>
        <DropdownMenuItem onClick={sair}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
}
