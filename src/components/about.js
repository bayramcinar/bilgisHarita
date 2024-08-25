import React, { useState, useEffect } from "react";
import "../style/about.css";
import { firestore } from "../components/admin/firebase";
import { doc, getDoc } from "firebase/firestore";

function About() {
  const [aboutContent, setaboutContent] = useState({
    aboutImg: "",
    aboutText: "",
  });

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const docRef = doc(firestore, "textAndColor", "aboutArea");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setaboutContent(docSnap.data());
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
    <div id="hakkımızda">
      <div className="flex flex-col lg:flex-row items-center justify-center aboutDiv">
        <div className="aboutPhotoArea col-lg-6 col-sm-12">
          <img src={aboutContent.aboutImg} className="aboutPhoto"></img>
        </div>
        <div className="aboutTextArea col-lg-6 col-sm-12">
          <h1 className="hakkımızda">Hakkımızda</h1>
          <p className="aboutText">{aboutContent.aboutText}</p>
        </div>
      </div>
    </div>
  );
}

export default About;
