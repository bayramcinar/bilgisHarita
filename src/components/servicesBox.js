import React,{useEffect}from 'react'
import "../style/servicesBox.css"
import "aos/dist/aos.css"
import AOS from 'aos'

function ServicesBox({img,name}) {
  useEffect(()=>{
    AOS.init({duration: 2000})
  },[])
  return (
    <div data-aos="zoom-in">
      <div class="card" >
      <div class="image-container">
        <img class="card-img-top" src={img} />
        </div>
        <div class="card-body">
            <h5 class="card-title">{name}</h5>
        </div>
        </div>
    </div>
  )
}

export default ServicesBox
