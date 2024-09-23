import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Historico from './components/Historico/Historico'
import Dashboard from './components/Dashboard/Dashboard'
import { HistoricoProvider } from './contexts/HistoricoContext'

const App = () => {
	return (
		<HistoricoProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/historico' element={<Historico />} />
				</Routes>
			</Router>
		</HistoricoProvider>
	)
}

export default App
