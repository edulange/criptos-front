import { useContext } from 'react'
import Logos from '../Logos/Logos'
import { useNavigate } from 'react-router-dom'
import { HistoricoContext } from '../../contexts/HistoricoContext'

const Dashboard = () => {
	const { historico, loading, error } = useContext(HistoricoContext)
	if (loading) return <div>Carregando...</div>
	if (error) return <div>Erro: {error}</div>
	//na realidade aqui não é o main

	const navigate = useNavigate()

	return (
		<main>
			<Logos />

			<button onClick={() => navigate('/historico')}>Historico</button>
		</main>
	)
}

export default Dashboard
