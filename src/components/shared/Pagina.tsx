import Loading from './Loading'
import Rodape from './Rodape'

export interface PaginaProps {
    children: React.ReactNode
}
export default function Pagina(props: PaginaProps) {
    return (
        <div className="flex flex-col min-h-screen w-screen">
            <main>{props.children}</main>
            <Rodape />
        </div>
    )
}
