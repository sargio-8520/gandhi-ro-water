import "./Hero.css";

function Hero() {
  const whatsappMessage = encodeURIComponent(
    "Hello Gandhi RO Water Enterprises, I would like to order RO water."
  );

  const whatsappUrl = `https://wa.me/918521836703?text=${whatsappMessage}`;

  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <div className="hero-badge">
            PURE • MINERALS • SAFE • HEALTHY
          </div>

          <p className="hero-business-name">
            GANDHI RO WATER ENTERPRISES
          </p>

          <h1>
            Pure RO Water
            <span>for a Healthy Life</span>
          </h1>

          <p className="hero-description">
            Gandhi RO Water Enterprises provides pure, safe and hygienic
            drinking water in Rajapakar, Vaishali, Bihar.
          </p>

          <div className="hero-actions">

            <a
              href={whatsappUrl}
              className="hero-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="whatsapp-icon">◉</span>
              Order on WhatsApp
            </a>

            <a
              href="tel:+918521836703"
              className="hero-call"
            >
              📞 Call Us
            </a>

          </div>

          {/* TRUST FEATURES */}
          <div className="hero-trust">

            <div className="hero-trust-item">
              <div className="trust-icon">✓</div>
              <strong>100%</strong>
              <span>RO Purified</span>
            </div>

            <div className="hero-trust-item">
              <div className="trust-icon">✓</div>
              <strong>Safe</strong>
              <span>Hygienic</span>
            </div>

            <div className="hero-trust-item">
              <div className="trust-icon">✓</div>
              <strong>Healthy</strong>
              <span>Choice</span>
            </div>

            <div className="hero-trust-item">
              <div className="trust-icon">✓</div>
              <strong>Fast</strong>
              <span>Delivery</span>
            </div>

          </div>
        </div>

        {/* RIGHT PRODUCT VISUAL */}
        <div className="hero-visual">

          <div className="hero-water-glow"></div>

          <img
            src="/images/gallery/website_image.png"
            alt="Gandhi RO Water drinking water products"
            className="hero-product-image"
          />

          <div className="hero-location">
            📍 Rajapakar, Vaishali, Bihar
          </div>

        </div>

      </div>

      
    </section>
  );
}

export default Hero;