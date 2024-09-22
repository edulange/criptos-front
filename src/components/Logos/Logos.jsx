import { useState, useEffect } from 'react';
import './Logos.css';

const Logos = ({ handleFocusLogo }) => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dos logos
  useEffect(() => {
    fetch('/logos.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar o logo: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setLogos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando logos...</div>;
  if (error) return <div>Erro: {error}</div>;

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
  );
};

export default Logos;
