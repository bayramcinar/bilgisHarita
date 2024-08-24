import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../components/admin/firebase";
import ProjectBox from "../components/projectBox";
import "../style/services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "proje"));
        const fetchedServices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div id="hizmetlerimiz">
      <h1 className="hizmetler text-2xl">Projelerimiz</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "80%",
          margin: "0 auto",
        }}
      >
        {loading ? (
          <p>Loading...</p> // Or a spinner/loader
        ) : (
          services.map((service) => (
            <ProjectBox
              key={service.id}
              video={service.fileMetadata.url}
              name={service.title}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Services;
