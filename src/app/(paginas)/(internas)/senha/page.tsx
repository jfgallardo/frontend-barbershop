"use client";
import Cabecalho from "@/components/shared/Cabecalho";
import Loading from "@/components/shared/Loading";
import { notifyError, notifySuccess } from "@/components/shared/Notify";
import useAPI from "@/data/hooks/useAPI";
import useUsuario from "@/data/hooks/useUsuario";
import { useState } from "react";

export default function PaginaSenha() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [loading, setLoading] = useState(false);

  const { httpPost } = useAPI();
  const { usuario } = useUsuario();

  async function changePassword() {
    setLoading(true);
    const response = await httpPost("usuario/modificar-senha", {
      telefone: usuario?.telefone,
      senhaAntiga: senhaAtual,
      novaSenha: senhaNova,
    });
    setLoading(false);
    if (response.statusCode === 500) {
      notifyError(response.message);
      return;
    }
    notifySuccess(response.message);
    clear();
  }

  function clear() {
    setSenhaAtual("");
    setSenhaNova("");
  }

  return (
    <div className="flex flex-col bg-zinc-900">
      <Cabecalho
        titulo="Atualizar Sua Senha"
        descricao="Por favor, insira sua senha atual e crie uma nova senha para atualizar sua conta com segurança."
      />

      <div className="flex flex-col gap-10 py-16 h-screen mx-auto">
        <form>
          <fieldset>
            <div className="flex flex-col p-4 space-y-2">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="senha_atual"
              >
                Senha Atual:
              </label>
              <input
                type="text"
                id="senha_atual"
                name="senha_atual"
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-4 space-y-2">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="senha_nova"
              >
                Nova Senha:
              </label>
              <input
                type="text"
                id="senha_nova"
                name="senha_nova"
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={senhaNova}
                onChange={(e) => setSenhaNova(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center mt-10">
              {loading ? (
                <Loading text="Mudando senha, aguarde..." />
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={changePassword}
                >
                  Mudar Senha
                </button>
              )}
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
