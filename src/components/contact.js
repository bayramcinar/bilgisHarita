import React, { useState, useEffect } from "react";
import "../style/contact.css";
import ContactBox from "./contactBox";
import phone from "../img/phone.png";
import adress from "../img/adress.png";
import mail from "../img/mail.png";
import ig from "../img/ig.png";
import fb from "../img/fb.png";
import ContactForm from "./contacForm";
import { firestore } from "../components/admin/firebase";
import { doc, getDoc } from "firebase/firestore";

function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [aboutData, setAboutData] = useState({
    address: "",
    email: "",
    facebook: "",
    facebookAddress: "",
    instagram: "",
    instagramAddress: "",
    phone: "",
  });
  useEffect(() => {
    const fetchAboutData = async () => {
      const docRef = doc(firestore, "textAndColor", "contactArea");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAboutData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchAboutData();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div id="iletişim">
      <div className="">
        <h1 className="contactTitle text-base lg:text-2xl my-4">
          İletişim & Adres
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-[60%] mb-8">
            <div
              className=" logoArea"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: !isMobile ? "80%" : "",
                margin: "0 auto",
              }}
            >
              <ContactBox
                logo={adress}
                name={"Adres"}
                text={aboutData.address}
              />
              <ContactBox
                logo={phone}
                name={"Telefon"}
                text={aboutData.phone}
              />
              <ContactBox logo={mail} name={"E-mail"} text={aboutData.email} />
              <ContactBox
                logo={ig}
                link={aboutData.instagramAddress}
                name={"Instagram"}
                text={aboutData.instagram}
              />
              <ContactBox
                logo={fb}
                link={aboutData.facebookAddress}
                name={"Facebook"}
                text={aboutData.facebook}
              />
            </div>
            <ContactForm />
          </div>
          <div className="haritaArea lg:w-[40%] flex flex-row items-center justify-center">
            <iframe
              className="harita rounded-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.083206969936!2d34.4673654!3d37.4823628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d7dfab5a1622e5%3A0x5a09662c1154e0b0!2sBilgi%C5%9F%20Harita%20M%C3%BChendislik%20B%C3%BCrosu!5e0!3m2!1str!2str!4v1695459295421!5m2!1str!2str"
              width="30vw"
              height="40vh"
              style={{
                border: "0",
                width: !isMobile ? "38vw" : "350px",
                height: !isMobile ? "75vh" : "300px",
              }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
