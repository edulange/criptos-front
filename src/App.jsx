import Historico from './components/Historico/Historico'
import Dashboard from './components/Dashboard/Dashboard'
import { useState, useEffect } from 'react'

const App = () => {
	const [historico, setHistorico] = useState([]) //para armazenar o estado do histórico
  const [loading, setLoading] = useState(true) // Para indicar o estado de carregamento
	const [error, setError] = useState(null) // Para armazenar erros, se houver

	useEffect(() => {
		// Simulando o fetch dos dados do arquivo JSON
		fetch('/exemplos.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Erro ao buscar o histórico: ' + response.statusText)
				}
				return response.json()
			})
			.then((data) => {
				const historicoFiltrado = data.filter((item) => item.user === userOnline)
				setHistorico(historicoFiltrado) //altera o estado do histórico para o array filtrado com os usuários online
				setLoading(false) // Concluiu o carregamento
			})
			.catch((error) => {
				setError(error.message) //retorna mensagem de erro
				setLoading(false) // Concluiu o carregamento
			})
	}, [])

	return (  //agora preciso fazer as parada de router, link e path
		<>
			<Dashboard />
			<Historico historico={historico}/>
		</>
	)
}

export default App
