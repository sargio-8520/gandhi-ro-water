import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Products from "./sections/Products";
import Order from "./components/Order";
import WhyChooseUs from "./sections/WhyChooseUs";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import SEO from "./components/SEO";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

import "./App.css";

function App() {
  const [adminToken, setAdminToken] = useState(
    () => sessionStorage.getItem("adminToken")
  );

  const isAdminPage =
    window.location.pathname.startsWith("/admin");

  const handleLogin = (token) => {
    setAdminToken(token);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setAdminToken(null);
  };

  if (isAdminPage) {
    if (adminToken) {
      return (
        <AdminDashboard
          token={adminToken}
          onLogout={handleLogout}
        />
      );
    }

    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <>
      <SEO />

      <div className="app">
        <Navbar />

        <main>
          <Hero />
          <Products />
          <Order />
          <Contact />
          <WhyChooseUs />
          
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;