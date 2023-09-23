import React, { useEffect } from 'react';
import "aos/dist/aos.css";
import AOS from 'aos';
import { TypeAnimation } from 'react-type-animation';
import "../style/home.css";
import video from '../img/main.mp4'

function Home() {
  useEffect(() => {
    AOS.init({ duration: 2500 })
  }, [])

  return (
    <div className='generalDiv' id='anasayfa'>
        <video className='video' src={video} autoPlay loop muted style={{width:"100%",height:"100%"}}>
        </video>
            <h1 className='title'>Bilgiş Harita Mühendislik</h1> 
                <TypeAnimation
                className='typingText'
                sequence={[
                    'Kaliteli Harita Mühendislik',
                    2000,
                    'Profesyonel Harita Mühendislik',
                    2000,
                    'Tecrübeli Harita Mühendislik',
                    2000,
                    () => {},
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: '55px', display: 'inline-block', color: "#F6F1F1", fontWeight: "700" }}
                />
    </div>
  )
}

export default Home;
