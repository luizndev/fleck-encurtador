import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Logotipo from "../../assets/logotipo.svg"
import { PiGithubLogo } from "react-icons/pi";
import { IoMdBook } from "react-icons/io";
import { RiMenuFill } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";

import "./Header.css"

const Header = () => {
  const [ menu, setMenu ] = useState(false)

  useEffect(() => {
    console.log(menu)
  }, [menu])
  const handleHome = () => {
      window.location.href = "/"
  }
  return (
    <header>
       <div onClick={() => handleHome()} className="logotipo-fle">
            <img src={Logotipo} alt="" />
       </div>

       <ul className="more-links">
        <li className='menu-burger-li' onClick={() => setMenu(!menu)}>
            {menu}
            <RiMenuFill className='menu-burger' />
        </li>
        <li className='li-option'>
            <Link to="https://github.com/luizndev">
                <PiGithubLogo />
                GitHub
            </Link>
         </li>
        <li className='li-option'>
            <Link to="https://www.linkedin.com/in/luiseduardo-andrade/">
                <CiLinkedin />
                Linkedin
            </Link>
         </li>
        <li className='li-option'>
            <Link to="https://luizndev.vercel.app/">
                <IoMdBook />
                Portifolio
            </Link>
         </li>
       </ul>

       {menu ? (
        <ul className='mobile-menu'>
            <li>
                <Link to="https://github.com/luizndev">
                    <PiGithubLogo />
                    GitHub
                </Link>
            </li>
            <li>
                <Link to="https://www.linkedin.com/in/luiseduardo-andrade/">
                    <CiLinkedin />
                    Linkedin
                </Link>
            </li>
            <li>
                <Link to="https://luizndev.vercel.app/">
                    <IoMdBook />
                    Portifolio
                </Link>
            </li>
        </ul>
       ) : ""}

    </header>
  )
}

export default Header