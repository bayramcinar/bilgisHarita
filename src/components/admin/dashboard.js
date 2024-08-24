import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./sidebar";
import HizmetTable from "./hizmetlerTable";
import ProjelerTable from "./projelerTable";
import ContactTable from "./iletişimTable";

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking authentication
  }

  const handleSidebarClick = (component) => {
    console.log(component);
    setSelectedComponent(component);
  };

  return (
    <div className="flex">
      <DashboardSidebar onSidebarClick={handleSidebarClick} />
      {selectedComponent !== "" && (
        <div className="flex-1 p-4">
          {selectedComponent === "HizmetTable" && <HizmetTable />}
          {selectedComponent === "ProjeTable" && <ProjelerTable />}
          {selectedComponent === "ContactTable" && <ContactTable />}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
