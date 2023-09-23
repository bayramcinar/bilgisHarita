import React from 'react';
import "../style/contactBox.css";
import { Link } from 'react-router-dom';

function ContactBox({ logo, text, name, link }) {
  const content = link ? (
    <Link target='_blank' to={link} className='contactBox'>
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
    <div className='contactBox'>
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
