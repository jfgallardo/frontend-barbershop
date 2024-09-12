'use client'
import useUsuario from '@/data/hooks/useUsuario'
import { useRouter } from 'next/navigation'

export default function Layout(props: any) {
    const { usuario } = useUsuario()
    const router = useRouter()

    if (!usuario) {
        return null
    }

    if (!usuario?.barbeiro) {
        return router.push('/')
    }

    return props.children
}
