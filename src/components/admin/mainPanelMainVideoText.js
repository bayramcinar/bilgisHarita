import React, { useState, useEffect } from "react";
import { firestore, storage } from "./firebase"; // Assuming firebase config is in firebase.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

function MainPanelMainVideoText() {
  const [navbarColors, setNavbarColors] = useState({
    bgVideo: "",
    MainText: "",
    changeTextes: [],
  });

  const [videoFile, setVideoFile] = useState(null);
  const [changeTextInput, setChangeTextInput] = useState("");

  useEffect(() => {
    const fetchNavbarColors = async () => {
      const docRef = doc(firestore, "textAndColor", "mainArea");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNavbarColors(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchNavbarColors();
  }, []);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
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
    try {
      let videoURL = navbarColors.bgVideo;

      if (videoFile) {
        const storageRef = ref(storage, `videos/${videoFile.name}`);
        await uploadBytes(storageRef, videoFile);
        videoURL = await getDownloadURL(storageRef);
      }

      const docRef = doc(firestore, "textAndColor", "mainArea");
      await setDoc(docRef, {
        bgVideo: videoURL,
        MainText: navbarColors.MainText,
        changeTextes: navbarColors.changeTextes,
      });
      Swal.close();
      Swal.fire({
        title: "Başarılı",
        text: "Veriler başarıyla güncellendi.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleChangeTextAdd = () => {
    setNavbarColors((prevColors) => ({
      ...prevColors,
      changeTextes: [...prevColors.changeTextes, changeTextInput],
    }));
    setChangeTextInput("");
  };

  const handleTextChange = (index, event) => {
    const updatedTexts = navbarColors.changeTextes.map((text, i) =>
      i === index ? event.target.value : text
    );
    setNavbarColors((prevColors) => ({
      ...prevColors,
      changeTextes: updatedTexts,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Ana Alanı Düzenle</h2>
      <div className="w-full mx-auto lg:w-[50vw] bg-white shadow-md rounded-lg p-6">
        <div className=" h-full mx-auto flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full flex flex-col items-center justify-between p-2 m-4 videoArea">
            <div className="w-full flex items-center justify-between mt-3">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-700"
                  htmlFor="file_input"
                >
                  Arkaplan Videosu
                </label>
                <input
                  id="file_input"
                  label="Main Alan Video"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
                <video
                  className="video mt-4"
                  src={navbarColors.bgVideo}
                  autoPlay
                  loop
                  muted
                  style={{ width: "350px", height: "250px" }}
                ></video>
              </div>
            </div>

            <div className="mb-4 w-full">
              <label className="text-center block mb-2">Ana Metin</label>
              <textarea
                value={navbarColors.MainText}
                onChange={(e) =>
                  setNavbarColors((prevColors) => ({
                    ...prevColors,
                    MainText: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="p-2 m-4 h-full detailArea flex items-center justify-center flex-col w-full">
            <label className="text-center block mb-2">Değişen Metinler</label>
            <div className="flex flex-col space-y-2 w-full">
              {navbarColors.changeTextes.map((text, index) => (
                <textarea
                  key={index}
                  value={text}
                  onChange={(e) => handleTextChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ))}
            </div>
            <input
              type="text"
              value={changeTextInput}
              onChange={(e) => setChangeTextInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            <button
              className="bg-gray-200 text-gray-600 py-2 px-5 rounded-lg mt-2"
              onClick={handleChangeTextAdd}
            >
              Değişen Metin Ekle
            </button>
          </div>
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
          onClick={saveToFirestore}
        >
          {"Kaydet"}
        </button>
      </div>
    </div>
  );
}

export default MainPanelMainVideoText;
