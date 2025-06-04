import React from 'react'
import { useParams } from 'react-router-dom';
import Icone from '../../assets/icon.svg'

import "./Redirect.css"
import { useEffect } from 'react';

const Redirect = () => {
    const { link } = useParams(); 

    useEffect(() => {
        fetch(`https://encurta-api.vercel.app/redirect`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ hashGet: link })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.location.href = data.url_longa;
        })
        .catch(error => {
            console.error(error)
        });
    }, [])
  return (
    <div className="container-redirect">
        <img src={Icone} alt="" />
        <h1>Você será redirecionado em breve..</h1>
    </div>
  )
}

export default Redirect