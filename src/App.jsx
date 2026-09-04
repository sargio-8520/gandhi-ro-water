import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEO from "./components/SEO";

import Hero from "./sections/Hero";
import Products from "./sections/Products";
import WhyChooseUs from "./sections/WhyChooseUs";
import Contact from "./sections/Contact";

import "./App.css";
import Order from "./components/Order";

function App() {
  return (
    <>
      <SEO />

      <div className="app">
        <Navbar />

        <main>
          <Hero />
          <Products />
          <Order/>
          <WhyChooseUs />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;