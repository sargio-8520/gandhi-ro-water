import "./Events.css";

function Events() {
  return (
    <section className="events-section" id="events">
      <div className="events-container">

        <div className="events-content">
          <p className="section-eyebrow">EVENT & FUNCTION WATER</p>

          <h2>
            Water supply for
            <span> your special events.</span>
          </h2>

          <p className="events-description">
            Planning a party, function or small event in Rajapakar?
            We provide bulk RO water with delivery to your venue.
          </p>

          <div className="event-pricing">

            <div className="event-card">
              <div className="event-card-header">
                <span className="event-icon">🎉</span>
                <span className="event-label">SMALL EVENT</span>
              </div>

              <h3>500L Water</h3>

              <div className="event-price">
                <strong>₹450</strong>
                <span>per 500L</span>
              </div>

              <p>
                Suitable for small parties, gatherings and events.
              </p>
            </div>

            <div className="event-card featured">
              <div className="event-card-header">
                <span className="event-icon">🎊</span>
                <span className="event-label">FUNCTION</span>
              </div>

              <h3>1000L Water</h3>

              <div className="event-price">
                <strong>₹800</strong>
                <span>per 1000L</span>
              </div>

              <p>
                Suitable for larger functions, gatherings and events.
              </p>
            </div>

          </div>

          <div className="event-features">
            <div>
              <span>✓</span>
              <p>Venue delivery included</p>
            </div>

            <div>
              <span>✓</span>
              <p>Book at least 1 day in advance</p>
            </div>

            <div>
              <span>✓</span>
              <p>More than 1000L available</p>
            </div>

            <div>
              <span>✓</span>
              <p>Rajapakar service area</p>
            </div>
          </div>

          <a href="#contact" className="event-button">
            Enquire for Your Event
          </a>
        </div>

        <div className="events-visual">
          <div className="event-visual-card">
            <div className="event-water-icon">💧</div>

            <span>EVENT WATER SUPPLY</span>

            <h3>
              Stay hydrated.
              <br />
              Enjoy your event.
            </h3>

            <div className="event-location">
              📍 Rajapakar, Vaishali
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Events;