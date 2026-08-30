import "./Contact.css";

const phoneNumber = "918521836703";

function Contact() {
  const whatsappMessage = encodeURIComponent(
    "Hello Gandhi RO Water Enterprises, I would like to enquire about RO water."
  );

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-heading">
          <p className="section-eyebrow">CONTACT US</p>

          <h2>
            Need water?
            <span> We're here to help.</span>
          </h2>

          <p>
            Order drinking water, enquire about delivery, or contact us
            for your event and function water requirements.
          </p>
        </div>

        <div className="contact-grid">

          <div className="contact-info">

            <a
              href={`tel:+${phoneNumber}`}
              className="contact-card"
            >
              <div className="contact-icon">📞</div>

              <div>
                <span>CALL US</span>
                <h3>8521836703</h3>
                <p>Speak directly with us</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">💬</div>

              <div>
                <span>WHATSAPP</span>
                <h3>Chat With Us</h3>
                <p>Order or enquire through WhatsApp</p>
              </div>
            </a>

            <div className="contact-card">
              <div className="contact-icon">📍</div>

              <div>
                <span>OUR LOCATION</span>
                <h3>Rajapakar</h3>
                <p>
                  Rajapakar Banghara, Rajapakar,
                  Vaishali, Bihar - 844124
                </p>
              </div>
            </div>

          </div>

          <div className="contact-action">

            <div className="contact-action-icon">
              💧
            </div>

            <h3>
              Order your water
              <br />
              with just a message.
            </h3>

            <p>
              Tell us what you need and we'll help you with your
              water order or delivery enquiry.
            </p>

            <a
              href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-button"
            >
              💬 Order on WhatsApp
            </a>

            <a
              href={`tel:+${phoneNumber}`}
              className="call-button"
            >
              📞 Call 8521836703
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;