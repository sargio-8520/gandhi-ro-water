import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Business Information */}
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <img
              src="/images/gallery/gro.png"
              alt="Gandhi RO Water Enterprises"
              className="footer-logo-image"
            />
            <div className="footer-brand-name">
              <h2>Gandhi</h2>
              <h3>RO Water</h3>
              <span>— Enterprises —</span>
            </div>
          </a>

          <p>
            Pure RO water for homes, shops, offices,
            events and functions in Rajapakar.
          </p>

          <a
            href="https://wa.me/918521836703"
            target="_blank"
            rel="noreferrer"
            className="footer-whatsapp"
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#order">Order Water</a>
          <a href="#whychooseus">Why Choose Us</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>

          <a href="tel:+918521836703">
            📞 8521836703
          </a>

          <a
            href="https://wa.me/918521836703"
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp
          </a>

          <p>
            📍 Rajapakar Banghara,
            <br />
            Rajapakar, Vaishali,
            <br />
            Bihar - 844124
          </p>
        </div>

        {/* Delivery Hours */}
        <div className="footer-column">
          <h3>Delivery Hours</h3>

          <p>
            <strong>Morning</strong>
            <br />
            6:00 AM – 10:00 AM
          </p>

          <p>
            <strong>Evening</strong>
            <br />
            3:00 PM – 8:00 PM
          </p>

          <p className="footer-note">
            Same-day & emergency delivery available.
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            © {new Date().getFullYear()} Gandhi RO Water Enterprises.
          </p>

          <p>
            Rajapakar, Vaishali, Bihar
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;