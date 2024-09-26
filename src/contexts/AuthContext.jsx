import { createContext, useContext, useState } from 'react'

//criando o contexto da autenticação
const AuthContext = createContext()

//um hook para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	//função para fazer login e logout
	const login = () => setIsAuthenticated(true)
	const logout = () => setIsAuthenticated(falses)

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
