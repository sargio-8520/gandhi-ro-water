import "./Contact.css";

const phoneNumber = "918521836703";

const whatsappMessage = encodeURIComponent(
  "Hello Gandhi RO Water Enterprises, I would like to order RO water."
);

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* Heading */}
        <div className="contact-heading">
          
          <h2>Contact Us</h2>
        </div>

        {/* Four Column Contact Bar */}
        <div className="contact-bar">

          {/* Column 1 */}
          <div className="contact-column">
            <div className="contact-round-icon">📍</div>

            <h3>Delivery Areas</h3>

            <p>
              Rajapakar <b>•</b> Vaishali <b>•</b> Nearby Areas
            </p>
          </div>

          {/* Column 2 */}
          <div className="contact-column">
            <div className="contact-round-icon whatsapp-round">
              💬
            </div>

            <h3>Need Water Supply?</h3>

            <p className="whatsapp-label">
              Order now on WhatsApp
            </p>

            <a
              href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-contact"
            >
              <span>💬</span>
              <strong>8521836703</strong>
            </a>
          </div>

          {/* Column 3 */}
          <div className="contact-column">
            <div className="contact-round-icon shop-round">
              🏪
            </div>

            <h3>Shop Location</h3>

            <p>
              Banghara, Rajapakar,
              <br />
              Vaishali, Bihar - 844124
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Gandhi+RO+Water+Enterprises+Banghara+Rajapakar+Vaishali+Bihar+844124"
              target="_blank"
              rel="noopener noreferrer"
              className="direction-button"
            >
              📍 Get Directions
            </a>
          </div>

          {/* Column 4 */}
          <a href="#home" className="contact-brand">
            <img
              src="/images/gallery/gro.png"
              alt="Gandhi RO Water Enterprises"
            />

            <div className="contact-brand-text">
              <h3>Gandhi</h3>
              <strong>RO Water</strong>
              <span>— Enterprises —</span>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}

export default Contact;