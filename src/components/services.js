import React from 'react'
import "../style/services.css"
import ServicesBox from './servicesBox'
import aplikasyon from "../img/aplikasyon.jpg"
import hazine from "../img/hazine.jpg"
import ifraz from "../img/ifraz.jpg"
import insaat from "../img/insaat.jpg"
import kadastro from "../img/cins.jpeg"
import kamulastirma from "../img/kamulastirma.jpeg"
import parselasyon from "../img/parselasyon.webp"
import yolaTerk from "../img/yolaTerk.jpg"
import fidan from '../img/fidan.jpeg'

function Services() {
  return (
    <div id='hizmetlerimiz'>
        <h1 className='hizmetler'>Hizmetlerimiz</h1>
        <div className='' style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "80%", margin: "0 auto" }}>
            <ServicesBox img={aplikasyon} name={"Yapı Aplikasyon"}/>
            <ServicesBox img={hazine} name={"Hazine Arazileri Danışmanlık"}/>
            <ServicesBox img={ifraz} name={"İfraz-Tevhid"}/>
            <ServicesBox img={insaat} name={"İnsaat"}/>
            <ServicesBox img={kadastro} name={"18.madde İmar Uygulaması"}/>
            <ServicesBox img={kamulastirma} name={"Kamulaştırma"}/>
            <ServicesBox img={parselasyon} name={"Parselasyon"}/>
            <ServicesBox img={yolaTerk} name={"Yola Terk"}/>
            <ServicesBox img={fidan} name={"Fidan Dikim Yeri İşaretleme"}/>
        </div>
    </div>
  )
}

export default Services
