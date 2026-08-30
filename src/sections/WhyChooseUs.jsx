import "./WhyChooseUs.css";

const benefits = [
  {
    icon: "📍",
    title: "Local Rajapakar Service",
    description:
      "We serve customers in Rajapakar and nearby local areas.",
  },
  {
    icon: "🚚",
    title: "Free Local Delivery",
    description:
      "Get your water delivered to your home, shop, office or venue.",
  },
  {
    icon: "⚡",
    title: "Same-Day Delivery",
    description:
      "Regular jar and bottle orders can be delivered on the same day.",
  },
  {
    icon: "🚨",
    title: "Emergency Delivery",
    description:
      "Need water urgently? Emergency delivery is available in our service area.",
  },
  {
    icon: "📦",
    title: "No Minimum Order",
    description:
      "There is no minimum quantity requirement for regular jar and bottle orders.",
  },
  {
    icon: "🎉",
    title: "Event & Function Supply",
    description:
      "Bulk RO water is available for parties, functions and other events.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-container">

        <div className="why-heading">
          <p className="section-eyebrow">WHY CHOOSE US</p>

          <h2>
            Water service built
            <span> around you.</span>
          </h2>

          <p>
            We make it convenient for local customers to get RO drinking
            water when and where they need it.
          </p>
        </div>

        <div className="why-grid">
          {benefits.map((benefit) => (
            <div className="why-card" key={benefit.title}>

              <div className="why-icon">
                {benefit.icon}
              </div>

              <div>
                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;