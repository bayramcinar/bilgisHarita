import React, { useState, useEffect } from "react";
import logo from "../img/logo4.png";
import { Link } from "react-scroll";
import { firestore } from "../components/admin/firebase";
import { doc, getDoc } from "firebase/firestore";
import "../style/navbar.css";

function Navbar() {
  const [activeItem, setActiveItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarColors, setNavbarColors] = useState({
    bg: "#2c3d55", // Default values
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

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsMenuOpen(false); // Close the menu when an item is clicked
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ backgroundColor: navbarColors.bg }}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <img
          src={logo}
          alt="Logo"
          className="object-contain w-28 lg:w-64"
          width="400"
          height="120"
        />
        <button
          className="lg:hidden"
          style={{ color: navbarColors.textColor }}
          type="button"
          aria-controls="navbarMenu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>
        <div className="hidden lg:flex flex-grow items-center justify-center space-x-6">
          {[
            "anasayfa",
            "hakkımızda",
            "hizmetlerimiz",
            "projelerimiz",
            "iletişim",
          ].map((item) => (
            <Link
              key={item}
              className={`nav-link ${
                activeItem === item ? "text-yellow-400" : ""
              }`}
              to={item}
              spy={true}
              smooth={true}
              duration={100}
              style={{
                color: navbarColors.textColor,
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = navbarColors.textColorHover)
              }
              onMouseLeave={(e) =>
                (e.target.style.color = navbarColors.textColor)
              }
              onClick={() => handleItemClick(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
        <div
          id="navbarMenu"
          style={{ backgroundColor: navbarColors.bg }}
          className={`lg:hidden absolute top-16 left-0 w-full text-white flex flex-col items-center space-y-4 p-4 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {[
            "anasayfa",
            "hakkımızda",
            "hizmetlerimiz",
            "projelerimiz",
            "iletişim",
          ].map((item) => (
            <Link
              key={item}
              className={`nav-link ${
                activeItem === item ? "text-yellow-400" : ""
              }`}
              to={item}
              spy={true}
              smooth={true}
              duration={100}
              style={{
                color: navbarColors.textColor,
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = navbarColors.textColorHover)
              }
              onMouseLeave={(e) =>
                (e.target.style.color = navbarColors.textColor)
              }
              onClick={() => handleItemClick(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
