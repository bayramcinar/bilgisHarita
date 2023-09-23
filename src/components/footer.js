import React from 'react'
import "../style/footer.css"
import footerLogo from "../img/logow2.png"
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className='footer'>
      <div className='row footerRow' >
        <div className='col-lg-6 col-sm-12'>
            <img className='footerImg' src={footerLogo}></img>
        </div>
        <div className='col-lg-6 col-sm-12'>
            <div className='footerContact'>
                <h5>İLETİŞİM</h5>
                <h6><i class="fa-solid fa-location-dot"></i> Kılan-Fatih Mah. Şehit Süleyman Polat Sok. 2 Ulukışla 51920, Niğde</h6>
                <h6><i class="fa-brands fa-whatsapp"></i> 0539 510 38 51</h6>
                <h6><i class="fa-solid fa-envelope"></i> bilgisharitamuhendislik@gmail.com</h6>
                <h6><i class="fa-solid fa-clock"></i> Çalışma saatleri : Pazartesi - Cumartesi 08:00 - 17:00</h6>
            </div>
        </div>
      </div>
      <div className='row footerCopy'>
        <h6 className='footerBottom'>© Copyright 2023-2024 Tüm Hakları Saklıdır. Created by @bayramcinar.</h6>
      </div>
    </div>
  )
}

export default Footer
