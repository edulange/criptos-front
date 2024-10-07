import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Logos from '../Logos/Logos'
import { HistoricoContext } from '../../contexts/HistoricoContext'
import './Historico.css'

const Historico = () => {
	const { historico, filteredLogos } = useContext(HistoricoContext)
	const [compraSelecionadaModal, setCompraSelecionadaModal] = useState(false) //controla se o modal aparece ou não
	const [compraSelecionada, setCompraSelecionada] = useState({}) //o estado da compra selecioanda
	const [adicionarCompra, setAdicionarCompra] = useState(false)

	const navigate = useNavigate()

	// Define qual histórico será mostrado (todo ou filtrado)
	const historicoParaMostrar = filteredLogos.length > 0 ? filteredLogos : historico

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

	const handleAdicionarCompra = () => {
		setAdicionarCompra(true)
	}

	return (
		<div>
			<h2>Histórico de Compras</h2>

			<Logos />

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
			<button onClick={handleAdicionarCompra}>Adicionar Compra</button>
		</div>
	)
}

export default Historico
