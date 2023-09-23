import React,{useEffect}from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../style/projectBox.css"
import "aos/dist/aos.css"
import AOS from 'aos'

function ProjectBox({video,name}) {
  useEffect(()=>{
    AOS.init({duration: 2500})
  },[])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (

    <>
    <div data-aos="zoom-in">
        <div class="card projeBox" onClick={handleShow}>
        <div class="image-container">
            <video className='video' src={video} loop muted style={{width:"100%",height:"100%",objectFit:"cover"}}>
            </video>
            </div>
            <div class="card-body">
                <h5 class="card-text" style={{width:"100%"}}>{name}</h5>
            </div>
        </div>
    </div>

    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <video className='video modalVideo' src={video} autoPlay loop muted style={{width:"100%",height:"100%"}}>
        </video>
      </Modal.Body>
    </Modal>
  </>
  )
}

export default ProjectBox
