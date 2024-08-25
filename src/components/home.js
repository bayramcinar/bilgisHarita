import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { TypeAnimation } from "react-type-animation";
import { firestore } from "../components/admin/firebase";
import { doc, getDoc } from "firebase/firestore";
import "../style/home.css";

function Home() {
  const [homeContent, setHomeContent] = useState({
    bgVideo: "",
    MainText: "",
    changeTextes: [],
  });

  useEffect(() => {
    AOS.init({ duration: 2500 });

    const fetchHomeContent = async () => {
      try {
        const docRef = doc(firestore, "textAndColor", "mainArea");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHomeContent(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };

    fetchHomeContent();
  }, []);

  return (
    <div className="generalDiv" id="anasayfa">
      {homeContent.bgVideo && (
        <video
          className="video"
          src={homeContent.bgVideo}
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%" }}
        ></video>
      )}
      <h1 className="title">
        {homeContent.MainText || "Bilgis Harita Mühendislik"}
      </h1>
      {homeContent.changeTextes.length > 0 && (
        <TypeAnimation
          className="typingText"
          sequence={[
            ...homeContent.changeTextes.flatMap((text) => [text, 2000]),
            () => {}, // Callback to repeat
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{
            fontSize: "55px",
            display: "inline-block",
            color: "#F6F1F1",
            fontWeight: "700",
          }}
        />
      )}
    </div>
  );
}

export default Home;
