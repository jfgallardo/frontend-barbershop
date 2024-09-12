import { useContext } from 'react'
import ContextoUsuario from '../contexts/ContextoUsuario'

const useUsuario = () => useContext(ContextoUsuario)
export default useUsuario
