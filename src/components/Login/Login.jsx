import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { login } = useAuth()  //chama a função de login (setIsAuthenticated(True))

    const navigate = useNavigate()

    const handleLogin = () => {
        //simulando uma autenticação de login bem sucedida
        login()

        //redireciona para o dashboard '/'
        navigate('/')
    }

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login