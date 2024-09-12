import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'

export interface PassosProps {
    labels: string[]
    children: any
    permiteProximoPasso: boolean
    permiteProximoPassoMudou(valor: boolean): void
}

export default function Passos(props: PassosProps) {
    const [passoAtual, setPassoAtual] = useState(0)

    function passoAnterior() {
        setPassoAtual(passoAtual - 1)
        props.permiteProximoPassoMudou(true)
    }

    function proximoPasso() {
        setPassoAtual(passoAtual + 1)
        props.permiteProximoPassoMudou(false)
    }

    function renderizarPassos() {
        return (
            <div className="flex flex-col md:flex-row gap-4 md:gap-7">
                {props.labels.map((label, i) => {
                    return (
                        <div key={i} className="flex items-center gap-2">
                            <span
                                key={i}
                                className={`
                                    flex justify-center items-center w-9 h-9 p-1 rounded-full font-bold
                                    ${i === passoAtual ? 'bg-white text-black' : 'text-zinc-500 bg-zinc-700'} 
                                `}
                            >
                                {i + 1}
                            </span>
                            <span className={i === passoAtual ? 'text-white' : 'text-zinc-700'}>
                                {label}
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 items-center lg:items-stretch">
            <div>{renderizarPassos()}</div>
            <div>{props.children?.[passoAtual] ?? props.children}</div>
            <div className="flex gap-3 select-none">
                <button
                    onClick={passoAnterior}
                    disabled={passoAtual === 0}
                    className="flex gap-1 items-center bg-zinc-700 text-sm text-white px-4 py-1.5 rounded-md disabled:opacity-30"
                >
                    <IconChevronLeft size={20} />
                    <span>Anterior</span>
                </button>
                <button
                    onClick={proximoPasso}
                    disabled={
                        passoAtual === (props.children?.length ?? 0) - 1 ||
                        !props.permiteProximoPasso
                    }
                    className="flex gap-1 items-center bg-zinc-700 text-sm text-white px-4 py-1.5 rounded-md disabled:opacity-30"
                >
                    <span>Próximo</span>
                    <IconChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}
