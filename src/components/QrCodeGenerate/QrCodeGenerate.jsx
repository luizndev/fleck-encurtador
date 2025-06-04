import React, { useState, useRef } from 'react'
import { QRCodeCanvas } from "qrcode.react"
import logo from "./logo.png"
import "./QrCodeGenerate.css"

const QrCodeGenerate = ({ text }) => {
  const downloadCanvas = useRef(null)

  const handleDownload = () =>{
    const canvas = downloadCanvas.current
    if (canvas){
        const url = canvas.toDataURL('image/png')
        const link = document.createElement('a');
        link.download = 'qrcode.png'
        link.href = url 
        link.click();
    }
  }
  return (
    <div className='qrcodeContainer' style={{ marginTop: '20px' }}>
        <QRCodeCanvas  className='qrcode'
        ref={downloadCanvas}
        value={text}
        size={1024}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
        marginSize={2}
        imageSettings={{
            src: logo,
            x: undefined,
            y: undefined,
            height: 224,
            width: 224,
            opacity: 1,
            excavate: true,
        }}
        />
        <button className='btn-confirm' onClick={() => handleDownload()}>
            Baixar o código QR 
        </button>
      </div>
  )
}

export default QrCodeGenerate