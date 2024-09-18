import { useState, useEffect } from 'react'
import './Historico.css'

const Historico = () => {
	const [historico, setHistorico] = useState([])
	const [logos, setLogos] = useState([])
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
				setHistorico(historicoFiltrado)
				setLoading(false) // Concluiu o carregamento
			})
			.catch((error) => {
				setError(error.message)
				setLoading(false)
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



    const handleFocus = ( logoClicked ) => {
        console.log(logoClicked) //funcionou passou a sigla
        console.log(historico) //é um array de objetos
  
    
        function filtrarPorSilga(elemento) {
            return elemento.sigla === logoClicked
        }
        const result = historico.filter(filtrarPorSilga)
        setHistorico(result)


        //aqui eu criei um problema, eu estou manipulando DIRETAMENTE o estado do historico.
        //ler novamente ultimo chatgpt pra entender melhor.
    }

	return (
		<div>
			<h2>Histórico de Compras</h2>

			<h3>MOEDAS</h3>
			<div>
				<ul className='logos-wrapper'>
					{logos.map((logo, index) => (
						<li key={index} className='logos' onClick={() => handleFocus(logo.sigla)}>
							<img src={logo.url} alt={logo.sigla} />
						</li>
					))}
				</ul>
			</div>
			<ul>
				{historico.map((item, index) => (
					<li key={index}>
						{/* Exemplo de renderização de dados do histórico */}
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
