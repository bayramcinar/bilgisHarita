import React, { useState, useEffect } from "react";
import "../style/footer.css";
import footerLogo from "../img/logow2.png";
import { firestore } from "../components/admin/firebase"; // Adjust the import path as needed
import { doc, getDoc } from "firebase/firestore";

function Footer() {
  const [footerData, setFooterData] = useState({
    address: "",
    phone: "",
    email: "",
    workTime: "",
    bgColor: "",
    bgColor2: "",
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      const docRef = doc(firestore, "textAndColor", "footer");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFooterData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchFooterData();
  }, []);

  return (
    <div className="footer" style={{ backgroundColor: footerData.bgColor }}>
      <div className="flex flex-col lg:flex-row footerRow py-3">
        <div
          className="col-lg-6 col-sm-12"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="footerImg" src={footerLogo} alt="Footer Logo"></img>
        </div>
        <div
          className="col-lg-6 col-sm-12"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="footerContact">
            <h5 className="my-2">İLETİŞİM</h5>
            <h6 className="my-2">
              <i className="fa-solid fa-location-dot"></i> {footerData.address}
            </h6>
            <h6 className="my-2">
              <i className="fa-brands fa-whatsapp"></i> {footerData.phone}
            </h6>
            <h6 className="my-2">
              <i className="fa-solid fa-envelope"></i> {footerData.email}
            </h6>
            <h6 className="my-2">
              <i className="fa-solid fa-clock"></i> Çalışma saatleri :{" "}
              {footerData.workTime}
            </h6>
          </div>
        </div>
      </div>
      <div className="footerCopy">
        <h6
          className="footerBottom text-center"
          style={{ backgroundColor: footerData.bgColor2 }}
        >
          © Copyright 2024-2025 Tüm Hakları Saklıdır. Created by @bayramcinar.
        </h6>
      </div>
    </div>
  );
}

export default Footer;
