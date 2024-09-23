import { createContext, useState, useEffect } from 'react'

export const HistoricoContext = createContext()

export const HistoricoProvider = ({ children }) => {
	const [historico, setHistorico] = useState([])
	const [loading, setLoading] = useState(true) // Para indicar o estado de carregamento
	const [error, setError] = useState(null) // Para armazenar erros, se houver
	const [filteredLogos, setFilteredLogos] = useState([]) // Adicionando o estado dos logos filtrados

	const userOnline = 'edulange' //para simular um usuário

	// Função para atualizar o historico
	const updateHistorico = (newHistorico) => {
		setHistorico(newHistorico)
	}

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

	if (loading) return <div>Carregando...</div>
	if (error) return <div>Erro: {error}</div>

	return (
		<HistoricoContext.Provider value={{ historico, loading, error, filteredLogos, setFilteredLogos }}>
			{children}
		</HistoricoContext.Provider>
	)
}
