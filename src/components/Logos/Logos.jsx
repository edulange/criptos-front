import { useState, useEffect, useContext } from 'react'
import './Logos.css'
import { HistoricoContext } from '../../contexts/HistoricoContext'

const Logos = () => {
	const { historico, error, loading, filteredLogos, setFilteredLogos } = useContext(HistoricoContext)
	const [logos, setLogos] = useState([])

	if (loading) return <div>Carregando...</div>
	if (error) return <div>Erro: {error}</div>

	// Fetch dos logos
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
			})
			.catch((error) => {
				setError(error.message)
			})
	}, [])

	// Função para filtrar o histórico com base no Logo clicado
	const handleFocusLogo = (logoClicked) => {
		const siglaClicada = historico.filter((item) => item.sigla === logoClicked)

		if (filteredLogos.length > 0) {
			setFilteredLogos([]) // Retorna ao estado original (mostra todos os logos)
		} else {
			setFilteredLogos(siglaClicada) // Atualiza o estado com os itens filtrados
		}
	}

	return (
		<div>
			<h3>MOEDAS</h3>
			<ul className='logos-wrapper'>
				{logos.map((logo, index) => (
					<li key={index} className='logos' onClick={() => handleFocusLogo(logo.sigla)}>
						<img src={logo.url} alt={logo.sigla} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default Logos
