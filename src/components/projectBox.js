import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "../style/projectBox.css";
import "aos/dist/aos.css";
import AOS from "aos";

function ProjectBox({ video, name }) {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div data-aos="zoom-in">
        <div className="card projeBox" onClick={handleShow}>
          <div className="image-container">
            <video
              className="video"
              src={video}
              loop
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            ></video>
          </div>
          <div className="card-body">
            <h5 className="card-text" style={{ width: "100%" }}>
              {name}
            </h5>
          </div>
        </div>
      </div>

      <Modal centered isOpen={show} toggle={handleClose}>
        <ModalHeader className="text-center" toggle={handleClose}>
          Projemiz
        </ModalHeader>
        <ModalBody className="p-4">
          <video
            className="video modalVideo"
            src={video}
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "100%" }}
          ></video>
          <h1 className="text-xl text-center my-3">{name}</h1>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ProjectBox;
