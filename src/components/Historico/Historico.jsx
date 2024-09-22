import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Historico.css'
import Logos from '../Logos/Logos'

const Historico = () => {
	const [historico, setHistorico] = useState([]) //para armazenar o estado do histórico
	const [filteredLogos, setFilteredLogos] = useState([]) //Para armazenar o estado dos logos filtrados
	const [loading, setLoading] = useState(true) // Para indicar o estado de carregamento
	const [error, setError] = useState(null) // Para armazenar erros, se houver
	const [compraSelecionadaModal, setCompraSelecionadaModal] = useState(false) //controla se o modal aparece ou não
	const [compraSelecionada, setCompraSelecionada] = useState({}) //o estado da compra selecioanda

	const userOnline = 'edulange' //para simular um usuário
	
	const navigate = useNavigate()

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

	// ----------------------------------- terei que migrar issso aqui para o LOGOS, no entanto, o historico ainda não está no dashboard

	// Função para filtrar o histórico com base no Logo clicado
	const handleFocusLogo = (logoClicked) => {
		const siglaClicada = historico.filter((item) => item.sigla === logoClicked) // Filtra pelo histórico da logo.sigla clicada

		if (filteredLogos.length > 0) {
			//se o filteredLogo.lenght > 0 (ou seja, já foi clicado)
			setFilteredLogos([]) //retornar como filteredLogo = vazio, fazendo com que seja renderizado o historico.
		} else {
			setFilteredLogos(siglaClicada) // Atualiza o estado com os itens filtrados
		}
	}

	// Define qual histórico será mostrado (todo ou filtrado)
	const historicoParaMostrar = filteredLogos.length > 0 ? filteredLogos : historico

	// ------------------------------------ terei que migrar issso aqui para o LOGOS, no entanto, o historico ainda não está no dashboard

	const handleEditModal = (item) => {
		setCompraSelecionadaModal(!compraSelecionadaModal) //altera o estado do CompraModal
		setCompraSelecionada(item)
		console.log(compraSelecionada)
	}

	const handleEdit = (e) => {
		// cria uma cópia do estado anterior e altera o valor novo.
		const { name, value } = e.target
		setCompraSelecionada((prevState) => ({
			...prevState, // Copia os valores atuais da compra selecionada
			[name]: value, // Atualiza apenas o campo que foi alterado
		}))
	}

	const handleSubmit = () => {
		//enviando para salvar a edição  //preciso fazer depois o handle
		console.log(compraSelecionada)
	}

	return (
		<div>
			<h2>Histórico de Compras</h2>

			<Logos handleFocusLogo={handleFocusLogo} />

			<h3>Compras</h3>
			<div>
				{compraSelecionadaModal && ( //se compraselecionada &&(AND) renderiza o restante
					<div className='modal'>
						//depois fazer um map disso com Object.Keys()
						<input
							type='text'
							name='moeda'
							value={compraSelecionada.moeda}
							onChange={handleEdit}
						/>
						<input
							type='text'
							name='sigla'
							value={compraSelecionada.sigla}
							onChange={handleEdit}
						/>
						<input type='text' name='data' value={compraSelecionada.data} onChange={handleEdit} />
						<input
							type='number'
							name='quantidade'
							value={compraSelecionada.quantidade}
							onChange={handleEdit}
						/>
						<input
							type='number'
							name='preco'
							value={compraSelecionada.preco}
							onChange={handleEdit}
						/>
						<button onClick={handleSubmit}>Salvar</button>
						<button onClick={() => setCompraSelecionadaModal(false)}>Cancelar</button>
					</div>
				)}
			</div>
			<ul>
				{historicoParaMostrar.map((item, index) => (
					<li key={index} onClick={() => handleEditModal(item)}>
						<p>
							{item.moeda} - {item.sigla} - {item.data} - {item.quantidade} - {item.preco}
						</p>
					</li>
				))}
			</ul>

			<button onClick={() => navigate('/')}>Retornar</button>
		</div>
	)
}

export default Historico
