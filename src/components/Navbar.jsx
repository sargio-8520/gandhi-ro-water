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

        {/* Brand */}
        <a href="#home" className="navbar-brand" onClick={closeMenu}>
          <img
            src={logo}
            alt="Gandhi RO Water Enterprises"
            className="navbar-logo"
          />

          <div className="brand-text">
            <span className="brand-name">GANDHI</span>
            <span className="brand-ro">RO Water</span>
            <span className="brand-sub">Enterprises</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#products">Products</a>
          <a href="#order">Order Water</a>
          <a href="#process">Process</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Desktop WhatsApp Button */}
        <a
          href="https://wa.me/918521836703"
          className="navbar-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="whatsapp-icon">☏</span>
          Order on WhatsApp
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span>{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">

          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#about" onClick={closeMenu}>
            About Us
          </a>

          <a href="#products" onClick={closeMenu}>
            Products
          </a>

          <a href="#order" onClick={closeMenu}>
            Order Water
          </a>

          <a href="#process" onClick={closeMenu}>
            Process
          </a>

          <a href="#gallery" onClick={closeMenu}>
            Gallery
          </a>

          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>

          <a
            href="https://wa.me/918521836703"
            className="mobile-order-button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <span className="whatsapp-icon">☏</span>
            Order on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;