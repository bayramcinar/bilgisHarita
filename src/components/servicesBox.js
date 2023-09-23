import React from 'react'
import "../style/servicesBox.css"

function ServicesBox({img,name}) {
  return (
    <div>
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
