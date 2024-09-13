import DiaInput from './DiaInput'
import HorariosInput from './HorariosInput'

export interface DataInputProps {
    data: Date
    quantidadeDeSlots: number
    dataMudou: (data: Date) => void
}

export default function DataInput(props: DataInputProps) {
    const { data, quantidadeDeSlots, dataMudou } = props

    return (
        <div className="flex flex-col space-y-5 container">
            <DiaInput data={data} dataMudou={dataMudou} />
            <HorariosInput data={data} qtdeHorarios={quantidadeDeSlots} dataMudou={dataMudou} />
        </div>
    )
}
