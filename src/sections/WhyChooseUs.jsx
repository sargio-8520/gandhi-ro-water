import "./WhyChooseUs.css";

const benefits = [
  {
    title: "Advanced RO Purification",
  },
  {
    title: "Quality Assured Water",
  },
  {
    title: "Trusted by Local Community",
  },
  {
    title: "Clean, Safe & Reliable Service",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-container">

        {/* Brand + Heading */}
        <div className="why-brand">
          <img
            src="/images/gallery/gro.png"
            alt="Gandhi RO Water"
            className="why-logo"
          />

          <div className="why-title">
            <h2>
              Why Choose
              <br />
              Gandhi RO Water?
            </h2>

            <span className="why-title-line"></span>
          </div>
        </div>

        {/* Benefits */}
        <div className="why-benefits">
          {benefits.map((benefit) => (
            <div className="why-benefit" key={benefit.title}>
              <div className="why-check">✓</div>

              <h3>{benefit.title}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;