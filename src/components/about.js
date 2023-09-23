import React from 'react'
import "../style/about.css"
import aboutLogo from "../img/logo.png"

function About() {
  return (
    <div id='hakkımızda'>
      <div className='row aboutDiv'>
        <div className='aboutPhotoArea col-lg-6 col-sm-12'>
            <img src={aboutLogo} className='aboutPhoto'></img>
        </div>
        <div className='aboutTextArea col-lg-6 col-sm-12'>
            <h1 className='hakkımızda'>Hakkımızda</h1>
            <p className='aboutText'>İnşaat mülki idarelere, kamu kuruluşlarına, mühendislik firmalarına ve haritacılıkla ilgili hizmetlere ihtiyaç duyan diğer tüm müşterilere hizmet ve ürünler sunmak amacıyla kurulmuştur.
            Her ölçekte sayısal halihazır harita yapımı, imar planı, imar uygulaması, kamulaştırma planları, sayısal kadastral haritalar, arazi toplulaştırma projeleri, kent bilgi sistemleri, coğrafi bilgi sistemleri, fotogrametri gibi harita mühendislik, danışmanlık hizmetleri şirketimizin ana faaliyet alanlarıdır.
            Üstlendiğimiz projelerde hızlı, güvenilir, ve ekonomik çözümler üretmek temel ilkemizdir.</p>
        </div>
      </div>
    </div>
  )
}

export default About
