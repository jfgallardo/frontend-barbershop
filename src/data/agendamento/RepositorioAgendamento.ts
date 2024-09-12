import Agendamento from './Agendamento'

export default interface RepositorioAgendamento {
    criar(agendamento: Agendamento): Promise<void>
    buscarPorTelefone(telefone: string): Promise<Agendamento[]>
    buscarPorProfissionalEData(profissional: number, data: Date): Promise<Agendamento[]>
    excluir(id: number): Promise<void>
}
