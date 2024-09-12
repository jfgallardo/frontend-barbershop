import { Servico } from '@/data'
import Image from 'next/image'

export interface ServicoItemProps {
    servico: Servico
    onClick?: (servico: Servico) => void
}

export default function ServicoItem(props: ServicoItemProps) {
    return (
        <div
            className={`
                flex rounded-xl overflow-hidden bg-zinc-800 
                ${props.onClick && 'cursor-pointer'} select-none
            `}
            onClick={() => props.onClick?.(props.servico)}
        >
            <Image
                src={props.servico.imagemURL}
                width={150}
                height={150}
                alt={props.servico.nome}
                className="object-cover"
            />
            <div className="flex flex-col p-5 gap-2">
                <span className="text-xl font-black">{props.servico.nome}</span>
                <span className="text-xs text-zinc-400 flex-1">{props.servico.descricao}</span>
                <span className="text-lg font-bold">R$ {props.servico.preco.toFixed(2)}</span>
            </div>
        </div>
    )
}
