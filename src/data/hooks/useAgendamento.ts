import { useContext } from 'react'
import { ContextoAgendamento } from '@/data/contexts/ContextoAgendamento'

const useAgendamento = () => useContext(ContextoAgendamento)
export default useAgendamento
