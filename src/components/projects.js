import React from 'react'
import "../style/projects.css"
import ProjectBox from './projectBox'
import video1 from '../img/1.mp4'
import video2 from '../img/2.mp4'
import video3 from '../img/3.mp4'
import video4 from '../img/4.mp4'
import video5 from '../img/5.mp4'
import video6 from '../img/6.mp4'
import video7 from '../img/7.mp4'
import video8 from '../img/8.mp4'
import video9 from '../img/fidan.jpeg'

function Projects() {
  return (
    <div id='projelerimiz'>
      <h1 className='projeler'>Projelerimiz</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "80%", margin: "0 auto" }}>
            <ProjectBox video={video1} name={"Çiftlik, Çardak Köyü hisseye göre tarla bölme işlemi."}/>
            <ProjectBox video={video2} name={"Hüsniye köyünde devam eden tavuk çiftliği projesi için kazı dolgu hesabını yaptık ve çiftlik köşelerini aplike ettik."}/>
            <ProjectBox video={video3} name={"Kaba inşaatını ve projesini üstlendiğimiz Gökhan abimin inşaatının bina köşelerini aplike ettik. Bodrum ve temel kazısını gerçekleştirdik. "}/>
            <ProjectBox video={video4} name={"#darboğaz köyünde İnşaat projesi için kot alımı gerçekleştirdik. #ulukışla #haritamühendisliği #inşaat #plan #proje #plankote"}/>
            <ProjectBox video={video5} name={"Altay Köyü'ne yapılacak olan tavuk çiftliği projesi için kot alımı gerçekleştirdik."}/>
            <ProjectBox video={video6} name={"Çiftlik, Çardak Köyü hisseye göre tarla bölme işlemi."}/>
            <ProjectBox video={video7} name={"Erdemli Çanakçı Köyü'nde yerinde alım yaparak arazinin kullanımına uygun şekilde böldük ve 2400 m2 alan üzerindeki mevcut havuza ek 1500 m2 havuz yeri ayırdık."}/>
            <ProjectBox video={video8} name={"Altay Köyü'ne yapılacak olan tavuk çiftliği projesi için kot alımı gerçekleştirdik. "}/>
             <ProjectBox video={video9} name={"Fidan dikim yeri işaretleme "}/>
      </div>
    </div>
  )
}

export default Projects
