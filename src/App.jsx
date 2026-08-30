import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Products from "./sections/Products";
import Process from "./sections/Process";
import WhyChooseUs from "./sections/WhyChooseUs";
import Events from "./sections/Events";
import Gallery from "./sections/Gallery";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import Order from "./components/Order";
import SEO from "./components/SEO";
import "./App.css";

function App() {
  return (
    <>
      <SEO/>
    <div className="app">
      <Navbar />

      <main>
        <Hero />
        <Products />
        <Order/>
        <Process/>
        <Events/>
        <About />
        <WhyChooseUs/>
        <Gallery/>
        <Contact/>

      </main>
      <Footer/>
    </div>
    </>
  );
}

export default App;