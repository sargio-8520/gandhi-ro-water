import "./Hero.css";

function Hero() {
  const whatsappMessage = encodeURIComponent(
    "Hello Gandhi RO Water Enterprises, I would like to order RO water."
  );

  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* Hero Content */}
        <div className="hero-content">

          <div className="hero-location-badge">
            <span>●</span>
            Serving Rajapakar & nearby areas
          </div>

          <p className="hero-eyebrow">
            GANDHI RO WATER ENTERPRISES
          </p>

          <h1>
            Pure & Mineral Water.
            <span>Trusted Quality.</span>
          </h1>

          <p className="hero-description">
            Quality RO purified drinking water for homes, shops,
            offices, businesses, events and functions in Rajapakar
            and nearby areas.
          </p>

          <div className="hero-actions">

            <a
              href={`https://wa.me/918521836703?text=${whatsappMessage}`}
              className="hero-primary-button"
              target="_blank"
              rel="noreferrer"
            >
              <span>💬</span>
              Order on WhatsApp
            </a>

            <a
              href="tel:+918521836703"
              className="hero-secondary-button"
            >
              <span>📞</span>
              Call Us
            </a>

          </div>

          <div className="hero-features">

            <div>
              <strong>✓</strong>
              <span>Same-Day Delivery</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>Free Local Delivery</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>Quality RO Water</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>Emergency Delivery</span>
            </div>

          </div>

        </div>

        {/* Hero Visual */}
        <div className="hero-visual">

          <div className="water-card">

            <div className="water-card-glow"></div>

            <div className="water-drop">
              💧
            </div>

            <p>PURE RO WATER</p>

            <h2>
              Clean.
              <br />
              Fresh.
              <br />
              Reliable.
            </h2>

            <div className="water-card-location">
              <span>📍</span>
              Rajapakar, Vaishali
            </div>

            <div className="water-card-badge">
              RO Purified Drinking Water
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;