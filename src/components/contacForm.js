import React, { useState } from "react";
import { db, collection, addDoc } from "../components/admin/firebase";
import Swal from "sweetalert2";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === "" || email === "" || message === "" || phone === "") {
      Swal.fire({
        title: "Hata",
        text: "Lütfen tüm alanları doldurun.",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Mesaj gönderiliyor...",
        html: "Lütfen bekleyin.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        await addDoc(collection(db, "messages"), {
          name,
          email,
          phone,
          message,
          timestamp: new Date(),
        });
        Swal.close();
        Swal.fire({
          title: "Başarılı",
          text: "Mesajınız başarılı bir şekilde gönderildi en kısa sürede sizinle iletişime geçeceğiz.",
          icon: "success",
          showConfirmButton: false,
          timer: 4000,
        });
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } catch (e) {
        setError("Form gönderilirken bir hata oluştu.");
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">İletişim Formu</h2>
      {success && (
        <p className="text-green-500 mb-4">Mesajınız başarıyla gönderildi!</p>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Adınız:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-posta:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Telefon Numarası:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Mesajınız:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
