import { clientes } from '@/data'
import { LayoutGrid } from '../ui/layout-grid'
import ClienteItem from './ClienteItem'
import Titulo from '@/components/shared/Titulo'

export default function NossosClientes() {
    const classes = ['md:col-span-2', 'col-span-1', 'col-span-1', 'md:col-span-2', 'md:col-span-2']
    const cards = clientes.map((cliente, i) => {
        return {
            id: cliente.id,
            content: <ClienteItem nome={cliente.nome} testemunho={cliente.testemunho} />,
            className: classes[i],
            thumbnail: cliente.imagemURL,
        }
    })

    return (
        <div className="container flex flex-col items-center gap-16">
            <Titulo
                principal="Quem Manda Aqui"
                secundario="Nossos clientes são os chefes! Aqui, eles mandam, desmandam e ainda saem com estilo de rockstar!"
            />
            <div className="h-[900px] w-full">
                <LayoutGrid cards={cards} />
            </div>
        </div>
    )
}
