import { useState } from "react"

// Função para validar a data no formato dd/mm/yyyy
const isValidDate = (date) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!date.match(regex)) return false;

    const [day, month, year] = date.split('/').map(Number);

    // Verifica se a data é válida
    const dateObject = new Date(year, month - 1, day);
    return (
        dateObject.getFullYear() === year &&
        dateObject.getMonth() === month - 1 &&
        dateObject.getDate() === day
    );
}

const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');  // Formata o dia com dois dígitos
    const month = String(today.getMonth() + 1).padStart(2, '0');  // Formata o mês com dois dígitos (janeiro = 0)
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;  // Retorna a data no formato dd/mm/yyyy
}

const AdcCompra = () => {
    const [compra, setCompra] = useState({
        cripto: '',
        sigla: '',
        dataCompra: getTodayDate(),
        quantidade: '',
        valorPago: ''
    });

    const clearState = () => {
        setCompra({
            cripto: '',
            sigla: '',
            dataCompra: '',
            quantidade: '',
            valorPago: ''
        });
    }

    const handleEdit = (e) => {
        const { name, value } = e.target;

        // Validação simples para o campo de data
        if (name === 'dataCompra' && value.length > 10) {
            return;  // Limita a entrada a 10 caracteres (dd/mm/yyyy)
        }

        setCompra(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        if (!isValidDate(compra.dataCompra)) {
            alert("Por favor, insira uma data válida no formato dd/mm/yyyy");
            return;
        }

        // Conversão da data de dd/mm/yyyy para yyyy-mm-dd
        const [day, month, year] = compra.dataCompra.split('/');
        const formattedDate = `${year}-${month}-${day}`;  // Formato para enviar ao backend

        // Enviar dados para o backend ou fazer a lógica que precisa
        console.log({
            ...compra,
            dataCompra: formattedDate  // Data formatada para envio
        });
    }

    return (
        <div className="AdcCompra">
            Adicionar compra
            <input 
                type="text" 
                name="cripto" 
                value={compra.cripto} 
                onChange={handleEdit} 
                placeholder="Cripto"
            />
            <input 
                type="text" 
                name="sigla" 
                value={compra.sigla} 
                onChange={handleEdit} 
                placeholder="Sigla"
            />
            <input 
                type="text" 
                name="dataCompra" 
                value={compra.dataCompra} 
                onChange={handleEdit} 
                placeholder="dd/mm/yyyy"
            />
            <input 
                type="number" 
                name="quantidade" 
                value={compra.quantidade} 
                onChange={handleEdit} 
                placeholder="Quantidade"
            />
            <input 
                type="number" 
                name="valorPago" 
                value={compra.valorPago} 
                onChange={handleEdit} 
                placeholder="Valor Pago"
            />
            <button onClick={clearState}>Limpar</button>
            <button onClick={handleSubmit}>Salvar</button>
        </div>
    );
}

export default AdcCompra;
