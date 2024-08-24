import React from "react";
import { Link } from "react-router-dom";
import About from "./about";
import Contact from "./contact";
import Footer from "./footer";
import Home from "./home";
import Navbar from "./navbar";
import Projects from "./projects";
import Services from "./services";
import wp from "../img/whatsapp.png";

function MainHomepage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Home />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
      <Link target="_blank" to={"https://wa.me/05395103851"}>
        <img
          className="whatsapp fixed w-16 h-16 bottom-4 right-4 z-30"
          src={wp}
          alt="WhatsApp"
        />
      </Link>
    </div>
  );
}

export default MainHomepage;
