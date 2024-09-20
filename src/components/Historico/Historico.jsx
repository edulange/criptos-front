import { useState, useEffect } from 'react'
import './Historico.css'

const Historico = () => {
	const [historico, setHistorico] = useState([])
	const [logos, setLogos] = useState([])
	const [filteredLogos, setFilteredLogos] = useState([])
	const [loading, setLoading] = useState(true) // Para indicar o estado de carregamento
	const [error, setError] = useState(null) // Para armazenar erros, se houver

	const userOnline = 'edulange'

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

	useEffect(() => {
		fetch('/logos.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Erro ao buscar o logo: ' + response.statusText)
				}
				return response.json()
			})
			.then((data) => {
				setLogos(data)
				setLoading(false)
			})
			.catch((error) => {
				setError(error.message)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return <p>Carregando...</p>
	}

	if (error) {
		return <p>Erro: {error}</p>
	}

	// Função para filtrar o histórico com base no Logo clicado
	const handleFocusLogo = (logoClicked) => {
		const siglaClicada = historico.filter((item) => item.sigla === logoClicked) // Filtra pelo histórico da logo.sigla clicada
		
		if (filteredLogos.length > 0) {  //se o filteredLogo.lenght > 0 (ou seja, já foi clicado)
			setFilteredLogos([]) //retornar como filteredLogo = vazio, fazendo com que seja renderizado o historico.
		} else {
			setFilteredLogos(siglaClicada) // Atualiza o estado com os itens filtrados
		}
	}

	// Define qual histórico será mostrado (todo ou filtrado)
	const historicoParaMostrar = filteredLogos.length > 0 ? filteredLogos : historico

	return (
		<div>
			<h2>Histórico de Compras</h2>

			<h3>MOEDAS</h3>
			<div>
				<ul className='logos-wrapper'>
					{logos.map((logo, index) => (
						<li key={index} className='logos' onClick={() => handleFocusLogo(logo.sigla)}>
							<img src={logo.url} alt={logo.sigla} />
						</li>
					))}
				</ul>
			</div>

			<h3>Compras</h3>
			<ul>
				{historicoParaMostrar.map((item, index) => (
					<li key={index}>
						<p>
							{item.moeda} - {item.sigla} - {item.data} - {item.quantidade} - {item.preco}
						</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Historico
