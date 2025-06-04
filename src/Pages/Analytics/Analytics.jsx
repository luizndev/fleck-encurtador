import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Icone from '../../assets/icon.svg';
import Render from "../../assets/render.png"

import './Analytics.css';

const Redirect = () => {
  const { link } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({});
  const [dominio, setDominio] = useState('');
  const [urlCurto, setUrlCurto] = useState('');

  useEffect(() => {
    const { protocol, hostname, port } = window.location;
    const dominioDoSite = port && port !== "80" && port !== "443"
      ? `${protocol}//${hostname}:${port}`
      : `${protocol}//${hostname}`;
    setDominio(dominioDoSite);
  }, []);

  useEffect(() => {
    fetch("https://encurta-api.vercel.app/consulta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setDados(data);
          setUrlCurto(data.url_curta || ''); // garantir que não quebre
          setLoading(false);
        }
      })
      .catch(error => {
        console.error("Erro ao consultar link:", error);
        setLoading(false);
      });
  }, [link]);

  return (
    <div className='fleck'>
      <Header />
      <div className="analise">
        {loading ? (
          <div className="container-redirect">
            <img src={Icone} alt="" />
            <h1>Estamos consultando o seu link...</h1>
          </div>
        ) : (
          <div className='mockup-info'>
            <div className="left-mockup">
            <div className="output-url">
              <span>Link consultado:</span>
              <div className="output">
                <input type="text" value={`${dominio}/${urlCurto}`} readOnly />
              </div>
            </div>
            <div className="output-url">
              <span>Link original:</span>
              <div className="output">
                <input type="text" value={`${dados.url_longa}`} readOnly />
              </div>
            </div>
            <div className="output-url">
              <span>Data de criação:</span>
              <div className="output">
                <input type="text" value={dados.data_criacao} readOnly />
              </div>
            </div>
            <div className="output-url">
              <span>Data de expiração:</span>
              <div className="output">
                <input type="text" value={dados.data_expiracao} readOnly />
              </div>
            </div>
            <div className="output-url">
              <span>Total de cliques:</span>
              <div className="output">
                <input type="text" value={`${dados.click} Clique(s)`} readOnly />
              </div>
            </div>
            </div>
            <img className='imageRender' src={Render} alt="" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Redirect;
