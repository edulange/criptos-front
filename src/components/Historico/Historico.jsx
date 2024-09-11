import React, { useEffect, useState } from "react";

const Historico = () => {
    const [historico, setHistorico] = useState([])

    useEffect(() => {
        //simulando o fetch dos dados do arquivo JSON
        fetch('/exemplos.json')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log('erro ao buscar o histórico: ', error))
    }, [])

  return (
    <div>
        <div className='criptoIcons'>
            <p>BTC</p>
            <p>ETH</p>
            <p>SOL</p>
        </div>

        <div>
            {/* aqui vai retornar o dado do banco de dados */}
        </div>
    </div>
  )
}

export default Historico