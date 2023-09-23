import React, { useState } from 'react';
import logo from "../img/logo2.png"
import { Link } from 'react-scroll';
import "../style/navbar.css"

function Navbar() {
    const [activeItem, setActiveItem] = useState(""); 

    const handleItemClick = (item) => {
        setActiveItem(item);
    };
  return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <img src={logo} alt="Logo" width="400" height="120" class="d-inline-block align-text-top navbarLogo"></img>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bar" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="bar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link
                            className='nav-link'
                            activeClass="active"
                            to="anasayfa"
                            spy={true}
                            smooth={true}
                            duration={100}
                            onClick={() => handleItemClick('anasayfa')}
                        >
                            Ana Sayfa
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link
                            className='nav-link'
                            activeClass="active"
                            to="hakkımızda"
                            spy={true}
                            smooth={true}
                            duration={100}
                            onClick={() => handleItemClick('hakkımızda')}
                        >
                            Hakkımızda
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link
                            className='nav-link'
                            activeClass="active"
                            to="hizmetlerimiz"
                            spy={true}
                            smooth={true}
                            duration={100}
                            onClick={() => handleItemClick('hizmetlerimiz')}
                        >
                            Hizmetlermiz
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link
                            className='nav-link'
                            activeClass="active"
                            to="projelerimiz"
                            spy={true}
                            smooth={true}
                            duration={100}
                            onClick={() => handleItemClick('projelerimiz')}
                        >
                            Projelerimiz
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link
                            className='nav-link last'
                            activeClass="active"
                            to="iletişim"
                            spy={true}
                            smooth={true}
                            duration={100}
                            onClick={() => handleItemClick('iletişim')}
                        >
                            İletişim
                    </Link>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
  )
}

export default Navbar
