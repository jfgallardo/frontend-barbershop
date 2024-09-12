"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Usuario } from "@/data";
import cookie from "js-cookie";

interface ContextoSessaoProps {
  carregando: boolean;
  token: string | null;
  usuario: Usuario | null;
  criarSessao: (jwt: string) => void;
  limparSessao: () => void;
}

const ContextoSessao = createContext<ContextoSessaoProps>({} as any);

export function ProvedorSessao(props: any) {
  const nomeCookie = "barba-authorization";

  const [carregando, setCarregando] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const carregarSessao = useCallback(function () {
    try {
      setCarregando(true);
      const estado = obterEstado();
      setToken(estado?.token ?? null);
      setUsuario(estado?.usuario ?? null);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarSessao();
  }, [carregarSessao]);

  function criarSessao(jwt: string) {
    cookie.set(nomeCookie, jwt, {
      expires: 1,
      sameSite: "None",
      secure: true,
    });
    carregarSessao();
  }

  function limparSessao() {
    setToken(null);
    setUsuario(null);
    cookie.remove(nomeCookie);
  }

  function obterEstado(): { token: string; usuario: Usuario } | null {
    const jwt = cookie.get(nomeCookie);
    if (!jwt) return null;

    try {
      const decoded: any = jwtDecode(jwt);
      const expired = decoded.exp < Date.now() / 1000;
      if (expired) {
        cookie.remove(nomeCookie);
        return null;
      }

      return {
        token: jwt,
        usuario: {
          id: decoded.id,
          nome: decoded.nome,
          telefone: decoded.telefone,
          barbeiro: decoded.barbeiro,
        },
      };
    } catch (error) {
      cookie.remove(nomeCookie);
      return null;
    }
  }

  return (
    <ContextoSessao.Provider
      value={{
        carregando,
        token,
        usuario,
        criarSessao,
        limparSessao,
      }}
    >
      {props.children}
    </ContextoSessao.Provider>
  );
}

export default ContextoSessao;
