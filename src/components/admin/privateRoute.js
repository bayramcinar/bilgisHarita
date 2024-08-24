import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    setUserToken(token);
    setLoading(false); // Set loading to false once token is checked
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking token
  }

  return userToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
