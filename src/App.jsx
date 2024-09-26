import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Historico from './components/Historico/Historico'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import RotaProtegida from './components/Login/RotaProtegida'
import { HistoricoProvider } from './contexts/HistoricoContext'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
	return (
		<AuthProvider>
			<HistoricoProvider>
				<Router>
					<Routes>
						<Route path='/login' element={<Login />} />

						<Route path='/' element={<RotaProtegida element={Dashboard} />} />
						<Route path='/historico' element={<RotaProtegida element={Historico} />} />
					</Routes>
				</Router>
			</HistoricoProvider>
		</AuthProvider>
	)
}

export default App
