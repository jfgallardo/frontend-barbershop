"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TelefoneUtils } from "@/data";
import useUsuario from "@/data/hooks/useUsuario";
import Logo from "@/components/shared/Logo";
import Image from "next/image";

export default function FormUsuario() {
  const [modo, setModo] = useState<"entrar" | "cadastrar">("entrar");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { usuario, entrar, registrar } = useUsuario();

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (usuario?.telefone) {
      const dest = params.get("destino") as string;
      router.push(dest ? dest : "/");
    }
  }, [usuario, router, params]);

  async function submeter() {
    setLoading(true);
    if (modo === "entrar") {
      await entrar({ telefone, senha });
    } else {
      await registrar({ nome, telefone, senha });
    }
    limparFormulario();
  }

  function limparFormulario() {
    setNome("");
    setTelefone("");
    setSenha("");
    setModo("entrar");
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-screen relative">
      <Image
        src="/banners/principal.webp"
        fill
        alt="Barbearia"
        className="object-cover"
      />
      <div
        className="
                    flex flex-col justify-center items-center gap-10
                    absolute top-0 left-0 w-full h-full
                    bg-black/80 md:bg-transparent md:bg-gradient-to-r from-black/30 via-black/90 to-black/30
                "
      >
        <Logo />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 rounded">
            {modo === "cadastrar" && (
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                className="bg-zinc-900 px-4 py-2 rounded"
              />
            )}
            <input
              type="tel"
              value={TelefoneUtils.formatar(telefone)}
              onChange={(s) =>
                setTelefone(TelefoneUtils.desformatar(s.target.value))
              }
              placeholder="Telefone"
              className="bg-zinc-900 px-4 py-2 rounded"
            />
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              className="bg-zinc-900 px-4 py-2 rounded"
            />
            <div className="flex gap-5">
              <button
                onClick={submeter}
                className={`button bg-green-600 flex-1 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading
                  ? "Cargando..."
                  : modo === "entrar"
                  ? "Entrar"
                  : "Cadastrar"}
              </button>
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="button flex-1"
              >
                Cancelar
              </button>
            </div>
            <div className="flex gap-5 justify-center">
              {modo === "entrar" ? (
                <button
                  onClick={() => setModo("cadastrar")}
                  className="text-zinc-300 hover:text-white"
                >
                  Ainda não tem conta? Cadastre-se!
                </button>
              ) : (
                <button
                  onClick={() => setModo("entrar")}
                  className="text-zinc-300 hover:text-white"
                >
                  Já tem conta? Entre na plataforma!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
