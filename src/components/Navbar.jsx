import { useState } from "react";
import "./Navbar.css";
import logo from "../assets/gro.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo + Brand */}
        <a href="#home" className="navbar-brand">
          <img
            src={logo}
            alt="Gandhi RO Water Enterprises"
            className="navbar-logo"
          />

          <div className="brand-text">
            <span className="brand-name">GANDHI RO WATER</span>
            <span className="brand-sub">ENTERPRISES</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#order">Orders</a>
          <a href="#process">Process</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Desktop Order Button */}
        <a href="#contact" className="navbar-button">
          💧 Order Water
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          

          <a href="#products" onClick={closeMenu}>
            Products
          </a>

          <a href="#process" onClick={closeMenu}>
            Process
          </a>
          <a href="#order" onClick={closeMenu}>
            Order
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#gallery" onClick={closeMenu}>
            Gallery
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <a
            href="#contact"
            className="mobile-order-button"
            onClick={closeMenu}
          >
            💧 Order Water
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;