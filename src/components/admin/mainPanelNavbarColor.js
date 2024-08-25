import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { firestore } from "./firebase"; // Assuming firebase config is in firebase.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

function MainPanelNavbarColor() {
  const [navbarColors, setNavbarColors] = useState({
    bg: "#f12937",
    textColor: "#fff",
    textColorHover: "#3085c3",
  });

  useEffect(() => {
    const fetchNavbarColors = async () => {
      const docRef = doc(firestore, "textAndColor", "navbar");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNavbarColors(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchNavbarColors();
  }, []);

  const handleColorChange = (colorType, color) => {
    setNavbarColors((prevColors) => ({
      ...prevColors,
      [colorType]: color.hex,
    }));
  };

  const saveColorsToFirestore = async () => {
    try {
      const docRef = doc(firestore, "textAndColor", "navbar");
      await setDoc(docRef, navbarColors);
      Swal.fire({
        title: "Başarılı",
        text: "Renkler başarıyla güncellendi.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ padding: "20px" }}
    >
      <h2 className="text-xl font-bold mb-4">Navbar Renkleri Düzenle</h2>
      <div className="w-full lg:w-[50vw] bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div
            className="mx-4 flex flex-col items-center justify-center"
            style={{ marginBottom: "20px" }}
          >
            <label className="text-center">Arkaplan Rengi</label>
            <SketchPicker
              color={navbarColors.bg}
              onChangeComplete={(color) => handleColorChange("bg", color)}
            />
          </div>

          <div
            className="mx-4 flex flex-col items-center justify-center"
            style={{ marginBottom: "20px" }}
          >
            <label className="text-center">Yazı Rengi</label>
            <SketchPicker
              color={navbarColors.textColor}
              onChangeComplete={(color) =>
                handleColorChange("textColor", color)
              }
            />
          </div>

          <div
            className="mx-4 flex flex-col items-center justify-center"
            style={{ marginBottom: "20px" }}
          >
            <label className="text-center">Yazı Hover Rengi</label>
            <SketchPicker
              color={navbarColors.textColorHover}
              onChangeComplete={(color) =>
                handleColorChange("textColorHover", color)
              }
            />
          </div>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
          onClick={saveColorsToFirestore}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}

export default MainPanelNavbarColor;
