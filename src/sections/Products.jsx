import "./Products.css";

const products = [
  {
    icon: "🫙",
    name: "20L RO Water Jar",
    price: "₹20",
    unit: "per jar",
    description: "RO purified drinking water for homes, shops and offices.",
    badge: "Popular",
  },
  {
    icon: "💧",
    name: "1L Water Bottle",
    price: "₹15",
    unit: "per bottle",
    description: "Convenient drinking water for everyday use and travel.",
    badge: "Daily Use",
  },
  {
    icon: "💧",
    name: "500ml Water Bottle",
    price: "₹8",
    unit: "per bottle",
    description: "A convenient option for individuals, shops and gatherings.",
    badge: "Convenient",
  },
  {
    icon: "🎉",
    name: "500L Small Event Water",
    price: "₹450",
    unit: "per 500L",
    description:
        "RO water supply for small events and functions with venue delivery in Rajapakar.",
    badge: "Small Event",
  },
  {
    icon: "🎉",
    name: "Event & Function Water",
    price: "₹800",
    unit: "per 1000L",
    description:
      "Bulk RO water supply for parties and functions with venue delivery in Rajapakar.",
    badge: "Bulk Supply",
  },
];

function Products() {
  return (
    <section className="products-section" id="products">
      <div className="products-container">
        <div className="products-heading">
          <p className="section-eyebrow">OUR PRODUCTS</p>

          <h2>
            Quality water for
            <span> every need.</span>
          </h2>

          <p>
            Choose from our regular drinking water products or book bulk
            RO water for your next event or function.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-card-top">
                <div className="product-icon">{product.icon}</div>
                <span className="product-badge">{product.badge}</span>
              </div>

              <h3>{product.name}</h3>

              <p className="product-description">
                {product.description}
              </p>

              <div className="product-price">
                <strong>{product.price}</strong>
                <span>{product.unit}</span>
              </div>

              <a href="#contact" className="product-button">
                Enquire Now
              </a>
            </article>
          ))}
        </div>

        <div className="jar-policy">
          <div className="jar-policy-icon">ℹ️</div>

          <div>
            <h3>20L Jar Security Deposit</h3>

            <p>
              Blue jar security deposit: <strong>₹200</strong>
              <br />
              Thermoplastic jar security deposit: <strong>₹400</strong>
            </p>

            <p>
              If the applicable security deposit is not paid, the empty
              jar will be collected back.
            </p>
          </div>
        </div>

        <div className="delivery-note">
          <span>🚚</span>
          <p>
            <strong>Free local delivery</strong> in Rajapakar and nearby
            areas. No minimum order quantity.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Products;