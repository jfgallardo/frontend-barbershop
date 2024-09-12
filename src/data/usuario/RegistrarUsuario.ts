import Usuario from "./Usuario";
import ProvedorCriptografia from "./ProvedorCriptografia";
import RepositorioUsuario from "./RepositorioUsuario";

export default class RegistrarUsuario {
  constructor(
    private readonly repo: RepositorioUsuario,
    private readonly cripto: ProvedorCriptografia
  ) {}

  async executar(usuario: Usuario): Promise<void> {
    const usuarioExistente = await this.repo.buscarPorTelefone(
      usuario.telefone
    );
    if (usuarioExistente) throw new Error("Usuário já existe");

    const senhaUsuario = usuario.senha || "";

    const senhaCriptografada = await this.cripto.criptografar(senhaUsuario);
    const novoUsuario: Usuario = {
      ...usuario,
      senha: senhaCriptografada,
      barbeiro: false,
    };
    await this.repo.salvar(novoUsuario);
  }
}
