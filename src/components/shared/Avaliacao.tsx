import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react'

export interface AvaliacaoProps {
    valor: number
    quantidade: number
}

export default function Avaliacao(props: AvaliacaoProps) {
    const { valor: avaliacao, quantidade } = props

    const estrelas = Array.from({ length: 5 }, (_, index) => {
        const valor = index + 1
        if (avaliacao >= valor) {
            return <IconStarFilled key={index} size={18} />
        }
        if (avaliacao + 1 > valor) {
            return <IconStarHalfFilled key={index} size={18} />
        }
        return <IconStar key={index} size={18} />
    })

    return (
        <div className="flex items-end gap-2">
            <div className="flex items-center gap-1 text-yellow-400">{estrelas}</div>
           {/*  <div className="flex text-xs text-zinc-300">({quantidade})</div> */}
        </div>
    )
}
