'use client'
import { ProvedorSessao } from '@/data/contexts/ContextoSessao'
import { ProvedorUsuario } from '@/data/contexts/ContextoUsuario'

export default function Layout({ children }: any) {
    return (
        <ProvedorSessao>
            <ProvedorUsuario>{children}</ProvedorUsuario>
        </ProvedorSessao>
    )
}
