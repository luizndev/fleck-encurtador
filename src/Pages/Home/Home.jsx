import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Criador from "../../components/Criador/Criador"
import "./Home.css"

const Home = () => {
  return (
    <div className="fleck">
      <Header />
      <Criador />
      <Footer />
    </div>
  )
}

export default Home
