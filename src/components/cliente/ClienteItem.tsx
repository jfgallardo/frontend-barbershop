export interface ClienteItemProps {
    nome: string
    testemunho: string
}

export default function ClienteItem(props: ClienteItemProps) {
    return (
        <div>
            <p className="font-bold text-4xl text-white">{props.nome}</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                {props.testemunho}
            </p>
        </div>
    )
}
