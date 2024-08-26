import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "../style/projectBox.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaPlay } from "react-icons/fa"; // Import play icon from react-icons

function ProjectBox({ video, name, coverImage }) {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        data-aos="zoom-in"
        className="projectbox rounded-lg p-3 flex items-center justify-center flex-col my-3 shadow-lg"
      >
        <div
          className="card projeBox flex flex-col items-center justify-center"
          onClick={handleShow}
        >
          <div className="image-container position-relative flex flex-col items-center justify-center">
            {coverImage !== undefined && (
              <img
                className="cover-image my-auto mx-auto w-full lg:w-[20vw]"
                src={coverImage}
                alt="Cover"
                style={{ objectFit: "cover" }}
              />
            )}

            <div className="play-icon-overlay">
              <FaPlay size={25} color="white" />
            </div>
          </div>
        </div>
        <h5 className="text-center text-xs lg:text-sm">{name}</h5>
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
            style={{ width: "100%", height: "100%" }}
          ></video>
          <h1 className="text-sm text-center my-3">{name}</h1>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ProjectBox;
