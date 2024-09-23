import { useContext } from 'react'
import Logos from '../Logos/Logos'
import { useNavigate } from 'react-router-dom'
import { HistoricoContext } from '../../contexts/HistoricoContext'

import './Dashboard.css'

const Dashboard = () => {
	const { historico, loading, error } = useContext(HistoricoContext)
	if (loading) return <div>Carregando...</div>
	if (error) return <div>Erro: {error}</div>

	//como eu faço o preço médio?
	//eu faço o somatório de um numero / numero de vezes que fora somado

	const moedasAgrupadas = historico.reduce((compras, curr) => {
		const moedaExiste = compras.find(item => item.sigla === curr.sigla);
		if (moedaExiste) {
		  moedaExiste.quantidade += curr.quantidade;
		  moedaExiste.totalPreco += curr.preco; // Acumula o total do preço
		  moedaExiste.compras += 1; // Conta o número de vezes que foi comprado
		  moedaExiste.precoMedio = moedaExiste.totalPreco / moedaExiste.compras; // Calcula o preço médio
		} else {
		  compras.push({
			moeda: curr.moeda,
			sigla: curr.sigla,
			quantidade: curr.quantidade,
			totalPreco: curr.preco, // Inicia o total do preço
			compras: 1, // Inicia o contador de compras
			precoMedio: curr.preco // Define o preço médio inicial
		  });
		}
		return compras;
	  }, []);

	  console.log(moedasAgrupadas)

	const navigate = useNavigate()

	return (
		//na realidade aqui não é o main
		<main>
			<Logos />
			<div>
				{moedasAgrupadas.map((compra, index) => (
					<li key={index}>
						<p>
							Cripto: {compra.moeda} - Sigla: {compra.sigla} - Preço M:{compra.precoMedio} - {compra.quantidade} - {compra.preco}
						</p>
					</li>
				))}
			</div>

			<button onClick={() => navigate('/historico')}>Historico</button>
		</main>
	)
}

export default Dashboard
