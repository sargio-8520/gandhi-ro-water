import "./About.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <p className="section-eyebrow">ABOUT US</p>

          <h2>
            Pure water for
            <span> Rajapakar & nearby areas.</span>
          </h2>

          <p className="about-description">
            Gandhi RO Water Enterprises is a local RO drinking water
            business serving homes, shops, market areas, offices, events
            and functions in Rajapakar and nearby villages.
          </p>

          <p className="about-description">
            We focus on providing convenient access to purified drinking
            water with local delivery, same-day service and support for
            regular as well as event requirements.
          </p>

          <div className="about-highlights">
            <div className="about-highlight">
              <div className="highlight-icon">📍</div>
              <div>
                <h3>Rajapakar</h3>
                <p>Serving the local community</p>
              </div>
            </div>

            <div className="about-highlight">
              <div className="highlight-icon">🚚</div>
              <div>
                <h3>Local Delivery</h3>
                <p>Morning & evening delivery</p>
              </div>
            </div>

            <div className="about-highlight">
              <div className="highlight-icon">💧</div>
              <div>
                <h3>RO Purified Water</h3>
                <p>For homes and businesses</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-visual">
          <div className="about-card">
            <div className="about-card-icon">💧</div>

            <p className="about-card-label">GANDHI RO</p>

            <h3>Water You Can Rely On</h3>

            <p>
              Serving Rajapakar, Vaishali and nearby local areas.
            </p>

            <div className="about-card-location">
              <span>📍</span>
              <span>Rajapakar Banghara, Vaishali</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;