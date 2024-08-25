import React, { useState, useEffect } from "react";
import { firestore } from "./firebase"; // Assuming firebase config is in firebase.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

function MainPanelContact() {
  const [aboutData, setAboutData] = useState({
    address: "",
    email: "",
    facebook: "",
    facebookAddress: "",
    instagram: "",
    instagramAddress: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prevState) => ({
      ...prevState,
      [name]: value,
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
      const docRef = doc(firestore, "textAndColor", "contactArea");
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
      <h2 className="text-xl font-bold mb-4">İletişim Alanı Düzenle</h2>
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
          <label className="block text-gray-700 mb-1">Facebook</label>
          <input
            type="text"
            name="facebook"
            value={aboutData.facebook}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Facebook Adresi</label>
          <input
            type="text"
            name="facebookAddress"
            value={aboutData.facebookAddress}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Instagram</label>
          <input
            type="text"
            name="instagram"
            value={aboutData.instagram}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Instagram Adresi</label>
          <input
            type="text"
            name="instagramAddress"
            value={aboutData.instagramAddress}
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

export default MainPanelContact;
