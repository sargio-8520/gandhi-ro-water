import "./Contact.css";

const phoneNumber = "918521836703";

const whatsappMessage = encodeURIComponent(
  "Hello Gandhi RO Water Enterprises, I would like to order RO water."
);

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* Delivery Areas */}
        <div className="contact-block delivery-block">
          <div className="contact-icon">🏢</div>

          <div className="contact-text">
            <h2>Delivery Areas</h2>

            <h5>
              Rajapakar <span>•</span> Vaishali <span>•</span> Nearby Areas
            </h5>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="contact-block whatsapp-block">
          <div className="whatsapp-text">
            <h2>Need Water Supply?</h2>
            
            <h3>Order on WhatsApp</h3>
          </div>

          <a
            href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-contact-button"
          >
            <span className="whatsapp-icon">💬</span>
            <strong>8521836703</strong>
          </a>
        </div>

        {/* G-RO Logo */}
        <div className="contact-block brand-block">
          <img
            src="/images/gallery/gro.png"
            alt=" Gandhi RO Water"
            className="contact-logo"
          />
          <div className="contact-brand-text">
            <h2>Gandhi</h2>
            <strong>RO Water</strong>
            <span>— Enterprises —</span>
          </div>
        </div>
        

      </div>
    </section>
  );
}

export default Contact;