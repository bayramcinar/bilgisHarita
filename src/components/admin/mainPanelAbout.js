import React, { useState, useEffect } from "react";
import { firestore, storage } from "./firebase"; // Assuming firebase config is in firebase.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

function MainPanelAbout() {
  const [aboutData, setAboutData] = useState({
    aboutImg: "",
    aboutText: "",
  });
  const [newAboutImg, setNewAboutImg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      const docRef = doc(firestore, "textAndColor", "aboutArea");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAboutData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchAboutData();
  }, []);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewAboutImg(e.target.files[0]);
    }
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
      let imageURL = aboutData.aboutImg;

      // If a new image is uploaded, upload it to Firebase Storage
      if (newAboutImg) {
        const storageRef = ref(storage, `aboutImages/${newAboutImg.name}`);
        await uploadBytes(storageRef, newAboutImg);
        imageURL = await getDownloadURL(storageRef);
      }

      // Save updated aboutImg and aboutText to Firestore
      const docRef = doc(firestore, "textAndColor", "aboutArea");
      await setDoc(docRef, {
        aboutImg: imageURL,
        aboutText: aboutData.aboutText,
      });
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
      <h2 className="text-xl font-bold mb-4">Hakkımızda Alanı Düzenle</h2>
      <div className="w-full mx-auto lg:w-[50vw] bg-white shadow-md rounded-lg p-6">
        <div className=" h-full mx-auto flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full flex items-center justify-between p-2 m-4 aboutImage">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="file_input"
              >
                Hakkında Görseli
              </label>
              <input
                id="file_input"
                label="Main Alan Video"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {aboutData.aboutImg && (
                <img
                  src={aboutData.aboutImg}
                  alt="About Image"
                  className="mt-4 w-full h-auto rounded-lg"
                />
              )}
            </div>
          </div>

          <div className="p-2 m-4 w-full h-full aboutText">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hakkında Metni
            </label>
            <textarea
              value={aboutData.aboutText}
              onChange={(e) =>
                setAboutData({ ...aboutData, aboutText: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              rows="25"
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

export default MainPanelAbout;
