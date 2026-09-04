import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Products from "./sections/Products";
import Order from "./components/Order";
import WhyChooseUs from "./sections/WhyChooseUs";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import "./App.css";

function App() {
  return (
    <>
      <SEO />

      <div className="app">
        <Navbar />

        <main>
          <Hero />
          <Products />
          <Order />
          <WhyChooseUs />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;