import React, { useState, useEffect } from "react";
import "../style/contact.css";
import ContactBox from "./contactBox";
import phone from "../img/phone.png";
import adress from "../img/adress.png";
import mail from "../img/mail.png";
import ig from "../img/ig.png";
import fb from "../img/fb.png";
import ContactForm from "./contacForm";

function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
                text={
                  "Kılan-Fatih Mah. Şehit Süleyman Polat Sok. 2 Ulukışla 51920, Niğde"
                }
              />
              <ContactBox
                logo={phone}
                name={"Telefon"}
                text={"0539 510 38 51"}
              />
              <ContactBox
                logo={mail}
                name={"E-mail"}
                text={"bilgisharitamuhendislik@gmail.com"}
              />
              <ContactBox
                logo={ig}
                link={"https://www.instagram.com/bilgisharitamuhendislik/"}
                name={"Instagram"}
                text={"@bilgisharitamuhendislik"}
              />
              <ContactBox
                logo={fb}
                link={"https://www.facebook.com/rb5161"}
                name={"Facebook"}
                text={"Bilgiş Harita"}
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
