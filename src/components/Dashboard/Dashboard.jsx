import { useState, useEffect } from 'react'
import Logos from "../Logos/Logos"
import Historico from '../Historico/Historico'


const Dashboard = () => {  //na realidade aqui não é o main

    const [historico, setHistorico] = useState([]) //para armazenar o estado do histórico



  return (
   <main>
        <Logos />   
        {/* precido ajustar o handleFocusLogos (está no Historico) */}

   </main>
  )
}

export default Dashboard