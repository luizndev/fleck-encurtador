import React, { useEffect, useState } from 'react'
import "./Criador.css"
import { Link } from "react-router-dom"
import Icone from "../../assets/icon.svg"
import QrCodeGenerate from '../QrCodeGenerate/QrCodeGenerate'

const Criador = () => {
    const [url, setUrl] = useState("")
    const [url_curto, setUrlCurto] = useState("")
    const [step, setStep] = useState(0)
    const [dominio, setDominio] = useState("")

    useEffect(() => {
        console.log(window.location)
        const { protocol, hostname, port } = window.location;
        const dominioDoSite = port && port !== "80" && port !== "443" ? `${protocol}//${hostname}:${port}` : `${protocol}//${hostname}`
        setDominio(dominioDoSite)
    })

    const handleSendUrl = () => {
        // alert(link)
        fetch("https://encurta-api.vercel.app/gerar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ link: url })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(!data){
                console.log("Erro ao retornar")
            }else{
                setUrlCurto(data.url)
                setStep(1)
            }
        })
        .catch(error => {
            console.error(error)
        });
    }

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link)
    }

    const handleReturn = () => {
        setStep(0)
        setUrl("")
        setUrlCurto("")
    }

  return (
    <div className="criador-container">
        <div className="header-criador">
        <h1>🔗 Encurte o Link em um clique!</h1>
        <span>Administração de encurtadores de URL e monitoramento da infraestrutura do servidor pela Fleck, Inc.</span>
        </div>

        <div className="form-data">
            {step == 1 ?(
                <>
                <div className='output-geral'>
                    <div className="output-container">
                        <div className='top-output'>
                        <div className="output-url">
                            <span>Aqui está o seu link para análise:</span>
                            <div className="output">
                                <input type="text" value={`${dominio}/a/${url_curto}`} />
                                <button className='btn-copy' onClick={() => handleCopy(`${dominio}/a/${url_curto}`)}>Copiar</button>
                            </div>
                        </div>
                        <div className="output-url">
                            <span className='strong-span'>Para compartilhar este link, copie:</span>
                            <div className="output">
                                <input type="text" value={`${dominio}/${url_curto}`} />
                                <button className='btn-copy' onClick={() => handleCopy(`${dominio}/${url_curto}`)}>Copiar</button>
                            </div>
                        </div>
                        </div>
                        <button onClick={() => handleReturn()} className='return'>Recomeçar um Encurtador</button>
                    </div>
                    <QrCodeGenerate text={`${dominio}/${url_curto}`} />
                </div>
                </>
            ) : ""}

            {step == 0 ? (
                <>
                    <div className="input-url">
                        <img src={Icone} alt="" />
                        <input onChange={(e) => setUrl(e.target.value)} type="text" placeholder="Colar URL para encurtar" />
                        <button className="btn-confirm" onClick={() => handleSendUrl()}>Encurtar</button>
                    </div>
                    <p>Ao clicar em Encurtar, está a aceitar <Link>Termos de utilização</Link></p>
                </>
            ) : ""}
        </div>
    </div>
  )
}

export default Criador