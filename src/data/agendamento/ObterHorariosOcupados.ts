import { TEMPO_SLOT } from '../constants'
import RepositorioAgendamento from './RepositorioAgendamento'

export default class ObterHorariosOcupados {
    constructor(private readonly repo: RepositorioAgendamento) {}

    async executar(profissionalId: number, data: Date): Promise<string[]> {
        const agendamentos = await this.repo.buscarPorProfissionalEData(profissionalId, data)
        const dados = agendamentos
            .map((agendamento) => {
                return {
                    data: agendamento.data,
                    slots: agendamento.servicos.reduce((total, s) => total + s.qtdeSlots, 0),
                }
            })
            .reduce((horariosOcupados: Date[], dados: any) => {
                const horario = dados.data
                const slots = dados.slots
                const horarios = Array.from({ length: slots }, (_, i) =>
                    this.somarMinutos(horario, i * TEMPO_SLOT)
                )
                return [...horariosOcupados, ...horarios]
            }, [])
            .map((d) => d.toTimeString().slice(0, 5))

        return dados // [ '10:00', '10:15', '10:30', '10:45', '14:15' ]
    }

    private somarMinutos(data: Date, minutos: number): Date {
        return new Date(data.getTime() + minutos * 60000)
    }
}
