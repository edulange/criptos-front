import { useState, useEffect } from 'react'
import Logos from '../Logos/Logos'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ historico }) => {
	//na realidade aqui não é o main

	const navigate = useNavigate()
  console.log(historico)

	return (
		<main>
			<Logos />
			{/* precido ajustar o handleFocusLogos (está no Historico) */}

			<button onClick={() => navigate('/historico')}>Historico</button>
		</main>
	)
}

export default Dashboard
