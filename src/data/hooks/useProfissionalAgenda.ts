import { Agendamento } from '@/data'
import { useCallback, useEffect, useState } from 'react'
import useUsuario from './useUsuario'
import useAPI from './useAPI'

export default function useProfissionalAgenda() {
    const { usuario } = useUsuario()
    const { httpGet, httpDelete } = useAPI()
    const [data, setData] = useState<Date>(new Date())
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

    const carregarAgendamentos = useCallback(async () => {
        if (!usuario) return
        const dtString = data.toISOString().slice(0, 10)
        const agendamentos = await httpGet(`agendamentos/${usuario.id}/${dtString}`)
        setAgendamentos(agendamentos)
    }, [httpGet, usuario, data])

    useEffect(() => {
        carregarAgendamentos()
    }, [carregarAgendamentos])

    async function excluirAgendamento(id: number) {
        await httpDelete(`agendamentos/${id}`)
        setAgendamentos(agendamentos.filter((a) => a.id !== id))
    }

    return {
        data,
        agendamentos,
        alterarData: setData,
        excluirAgendamento,
    }
}
