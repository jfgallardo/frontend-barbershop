import Usuario from './Usuario'

export default interface RepositorioUsuario {
    salvar(usuario: Usuario): Promise<void>
    buscarPorTelefone(telefone: string): Promise<Usuario>
}
