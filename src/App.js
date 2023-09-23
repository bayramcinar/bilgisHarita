import { Link } from 'react-router-dom';
import './App.css';
import About from './components/about';
import Contact from './components/contact';
import Footer from './components/footer';
import Home from './components/home';
import Navbar from './components/navbar';
import Projects from './components/projects';
import Services from './components/services';
import wp from "../src/img/whatsapp.png"

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Home/>
        <About/>
        <Services/>
        <Projects/>
        <Contact/>
        <Footer/>
        <Link target='_blank' to={"https://wa.me/05395103851"}><img className='whatsapp' src={wp}></img></Link>
    </div>
  );
}

export default App;
