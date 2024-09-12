import Usuario from "./Usuario";
import RepositorioUsuario from "./RepositorioUsuario";
import ProvedorCriptografia from "./ProvedorCriptografia";

export default class LoginUsuario {
  constructor(
    private readonly repo: RepositorioUsuario,
    private readonly cripto: ProvedorCriptografia
  ) {}

  async executar(telefone: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.repo.buscarPorTelefone(telefone);
    if (!usuario) throw new Error("Usuário não encontrado");

    const senhaUsuario = usuario.senha || "";
    const senhaCorreta = await this.cripto.comparar(senha, senhaUsuario);
    if (!senhaCorreta) throw new Error("Senha incorreta");

    delete usuario.senha;
    return usuario;
  }
}
