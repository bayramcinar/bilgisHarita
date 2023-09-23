import React,{useEffect}from 'react'
import "../style/contactBox.css";
import { Link } from 'react-router-dom';
import "aos/dist/aos.css"
import AOS from 'aos'

function ContactBox({ logo, text, name, link }) {
  useEffect(()=>{
    AOS.init({duration: 1500})
  },[])
  const content = link ? (
    <Link data-aos="zoom-in" target='_blank' to={link} className='contactBox'>
      <div className='orta'>
        <div className='contactBoxLogo'>
          <img src={logo} id='logo' alt={name} />
          <h4 style={{ fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>{name}</h4>
        </div>
        <div className='contactBoxTextArea'>
          <h4 className='contactBoxText'>{text}</h4>
        </div>
      </div>
    </Link>
  ) : (
    <div data-aos="zoom-in" className='contactBox'>
      <div className='orta'>
        <div className='contactBoxLogo'>
          <img src={logo} id='logo' alt={name} />
          <h4 style={{ fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>{name}</h4>
        </div>
        <div className='contactBoxTextArea'>
          <h4 className='contactBoxText'>{text}</h4>
        </div>
      </div>
    </div>
  );

  return (
    <div>{content}</div>
  );
}

export default ContactBox;
