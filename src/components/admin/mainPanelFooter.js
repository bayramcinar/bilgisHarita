import React, { useState, useEffect } from "react";
import { firestore } from "./firebase"; // Assuming firebase config is in firebase.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { SketchPicker } from "react-color"; // Import the color picker

function MainPanelFooter() {
  const [aboutData, setAboutData] = useState({
    address: "",
    bgColor: "",
    bgColor2: "",
    email: "",
    phone: "",
    workTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [colorPicker, setColorPicker] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      const docRef = doc(firestore, "textAndColor", "footer");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAboutData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchAboutData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleColorChange = (color, field) => {
    setAboutData((prevState) => ({
      ...prevState,
      [field]: color.hex,
    }));
  };

  const saveToFirestore = async () => {
    Swal.fire({
      icon: "info",
      title: "Düzenleme Yapılıyor...",
      html: "Lütfen bekleyin.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setLoading(true);
    try {
      const docRef = doc(firestore, "textAndColor", "footer");
      await setDoc(docRef, aboutData);
      Swal.close();
      Swal.fire({
        title: "Başarılı",
        text: "Bilgiler başarıyla güncellendi.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      Swal.fire({
        title: "Hata",
        text: "Bir hata oluştu, lütfen tekrar deneyin.",
        icon: "error",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Footer Alanı Düzenle</h2>
      <div className="w-full lg:w-[50vw] bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Adres</label>
          <input
            type="text"
            name="address"
            value={aboutData.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={aboutData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Telefon</label>
          <input
            type="text"
            name="phone"
            value={aboutData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Çalışma Saatleri</label>
          <input
            type="text"
            name="workTime"
            value={aboutData.workTime}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="m-4">
            <label className="block text-gray-700 mb-1">
              Arka Plan Rengi 1
            </label>

            <SketchPicker
              color={aboutData.bgColor}
              onChangeComplete={(color) => handleColorChange(color, "bgColor")}
            />
          </div>
          <div className="m-4">
            <label className="block text-gray-700 mb-1">
              Arka Plan Rengi 2
            </label>
            <SketchPicker
              color={aboutData.bgColor2}
              onChangeComplete={(color) => handleColorChange(color, "bgColor2")}
            />
          </div>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
          onClick={saveToFirestore}
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </div>
  );
}

export default MainPanelFooter;
