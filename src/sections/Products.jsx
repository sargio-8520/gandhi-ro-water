import "./Products.css";

const products = [
  {
    image: "/images/gallery/20l-jar.png",
    name: "20L RO Water Jar",
    description: "Perfect for home, office & businesses",
    price: "₹20",
    unit: "per jar",
  },
  {
    image: "/images/gallery/1l-bottle.png",
    name: "1L Water Bottle",
    description: "Convenient for daily use",
    price: "₹15",
    unit: "per bottle",
  },
  {
    image: "/images/gallery/500ml-bottle.png",
    name: "500ml Water Bottle",
    description: "Lightweight & easy to carry",
    price: "₹8",
    unit: "per bottle",
  },
];

function Products() {
  return (
    <section className="products-section" id="products">
      <div className="products-container">

        {/* Section Title */}
        <div className="products-title">
          <span className="title-line"></span>
          <span>Our Products</span>
          <span className="title-line"></span>
        </div>

        {/* Regular Products */}
        <div className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>

              <div className="product-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <div className="product-price">
                  <strong>{product.price}</strong>
                  <span>{product.unit}</span>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Event Water Supply */}
        <article className="event-product">

          <div className="event-image-wrap">
            <img
              src="/images/gallery/event_function.png"
              alt="Event and Function Water Supply"
            />
          </div>

          <div className="event-info">
            <p className="event-label">BULK WATER SUPPLY</p>

            <h3>Event & Function Water</h3>

            <p>
              RO water supply for weddings, parties, functions and events.
            </p>

            <div className="event-price">
              <strong>₹800</strong>
              <span>per 1000L</span>
            </div>

            <a href="#contact" className="event-button">
              Enquire Now
            </a>
          </div>

        </article>
        {/* Delivery Note */}
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