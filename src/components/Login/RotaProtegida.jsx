import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const RotaProtegida = ({ element: Element }) => {
	const { isAuthenticated } = useAuth()
	console.log('isAuthenticated, RotaProtegida :>> ', isAuthenticated)


	return isAuthenticated ? <Element /> : <Navigate to='/login' />
}

export default RotaProtegida
