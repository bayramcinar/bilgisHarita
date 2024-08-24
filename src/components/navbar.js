import React, { useState } from "react";
import logo from "../img/logo4.png";
import { Link } from "react-scroll";
import "../style/navbar.css";

function Navbar() {
  const [activeItem, setActiveItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsMenuOpen(false); // Close the menu when an item is clicked
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <img
          src={logo}
          alt="Logo"
          width="400"
          height="120"
          className="object-contain"
        />
        <button
          className="lg:hidden text-white"
          type="button"
          aria-controls="navbarMenu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu} // Toggle menu visibility on click
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
              } // Change icon based on menu state
            ></path>
          </svg>
        </button>
        <div className="hidden lg:flex flex-grow items-center justify-center space-x-6">
          <Link
            className={`nav-link ${
              activeItem === "anasayfa" ? "text-yellow-400" : ""
            }`}
            to="anasayfa"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("anasayfa")}
          >
            Ana Sayfa
          </Link>
          <Link
            className={`nav-link ${
              activeItem === "hakkımızda" ? "text-yellow-400" : ""
            }`}
            to="hakkımızda"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("hakkımızda")}
          >
            Hakkımızda
          </Link>
          <Link
            className={`nav-link ${
              activeItem === "hizmetlerimiz" ? "text-yellow-400" : ""
            }`}
            to="hizmetlerimiz"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("hizmetlerimiz")}
          >
            Hizmetlerimiz
          </Link>
          <Link
            className={`nav-link ${
              activeItem === "projelerimiz" ? "text-yellow-400" : ""
            }`}
            to="projelerimiz"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("projelerimiz")}
          >
            Projelerimiz
          </Link>
          <Link
            className={`nav-link ${
              activeItem === "iletişim" ? "text-yellow-400" : ""
            }`}
            to="iletişim"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("iletişim")}
          >
            İletişim
          </Link>
        </div>
        <div
          id="navbarMenu"
          className={`lg:hidden absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 p-4 ${
            isMenuOpen ? "block" : "hidden"
          }`} // Show or hide based on menu state
        >
          <Link
            className={`nav-link ${
              activeItem === "anasayfa" ? "text-yellow-400" : ""
            }`}
            to="anasayfa"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("anasayfa")}
          >
            Ana Sayfa
          </Link>
          <Link
            className={`nav-link ${
              activeItem === "hakkımızda" ? "text-yellow-400" : ""
            }`}
            to="hakkımızda"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("hakkımızda")}
          >
            Hakkımızda
          </Link>
          <Link
            className={`nav-link ${
              activeItem === "hizmetlerimiz" ? "text-yellow-400" : ""
            }`}
            to="hizmetlerimiz"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("hizmetlerimiz")}
          >
            Hizmetlerimiz
          </Link>
          <Link
            className={`nav-link ${
              activeItem === "projelerimiz" ? "text-yellow-400" : ""
            }`}
            to="projelerimiz"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("projelerimiz")}
          >
            Projelerimiz
          </Link>
          <Link
            className={`nav-link ${
              activeItem === "iletişim" ? "text-yellow-400" : ""
            }`}
            to="iletişim"
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleItemClick("iletişim")}
          >
            İletişim
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
