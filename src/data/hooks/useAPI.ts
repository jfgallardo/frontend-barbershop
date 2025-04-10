import { useCallback } from "react";
import useSessao from "./useSessao";

const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;

export default function useAPI() {
  const { token } = useSessao();

  const httpGet = useCallback(
    async function (uri: string): Promise<any> {
      const path = uri.startsWith("/") ? uri : `/${uri}`;

      const resp = await fetch(`${URL_BASE}${path}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      });
      return extrairDados(resp);
    },
    [token]
  );

  const httpPost = useCallback(
    async function (uri: string, body: any): Promise<any> {
      const path = uri.startsWith("/") ? uri : `/${uri}`;
      const resp = await fetch(`${URL_BASE}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
        body: JSON.stringify(body),
      });
      return extrairDados(resp);
    },
    [token]
  );
  const httpDelete = useCallback(
    async function (uri: string): Promise<any> {
      const path = uri.startsWith("/") ? uri : `/${uri}`;
      const resp = await fetch(`${URL_BASE}${path}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return extrairDados(resp);
    },
    [token]
  );

  async function extrairDados(resp: Response) {
    let conteudo = "";
    try {
      conteudo = await resp.text();
      return JSON.parse(conteudo);
    } catch (e) {
      return conteudo;
    }
  }

  return { httpGet, httpPost, httpDelete };
}
