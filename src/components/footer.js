import React from "react";
import "../style/footer.css";
import footerLogo from "../img/logow2.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="flex flex-col lg:flex-row footerRow py-3">
        <div
          className="col-lg-6 col-sm-12"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="footerImg" src={footerLogo}></img>
        </div>
        <div
          className="col-lg-6 col-sm-12"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="footerContact">
            <h5 className="my-2">İLETİŞİM</h5>
            <h6 className="my-2">
              <i class="fa-solid fa-location-dot"></i> Kılan-Fatih Mah. Şehit
              Süleyman Polat Sok. 2 Ulukışla 51920, Niğde
            </h6>
            <h6 className="my-2">
              <i class="fa-brands fa-whatsapp"></i> 0539 510 38 51
            </h6>
            <h6 className="my-2">
              <i class="fa-solid fa-envelope"></i>{" "}
              bilgisharitamuhendislik@gmail.com
            </h6>
            <h6 className="my-2">
              <i class="fa-solid fa-clock"></i> Çalışma saatleri : Pazartesi -
              Cumartesi 08:00 - 17:00
            </h6>
          </div>
        </div>
      </div>
      <div className=" footerCopy">
        <h6 className="footerBottom text-center">
          © Copyright 2024-2025 Tüm Hakları Saklıdır. Created by @bayramcinar.
        </h6>
      </div>
    </div>
  );
}

export default Footer;
