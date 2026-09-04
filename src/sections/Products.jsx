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

const bulkProducts = [
  {
    image: "/images/gallery/500l-tank.png",
    label: "500L BULK WATER",
    name: "500L RO Water Tank",
    description:
      "Bulk RO water supply for events, functions and large requirements.",
    price: "₹450",
    unit: "per 500L",
  },
  {
    image: "/images/gallery/event_function.png",
    label: "1000L BULK WATER",
    name: "Event & Function Water",
    description:
      "RO water supply for weddings, parties, functions and events.",
    price: "₹800",
    unit: "per 1000L",
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

        {/* Bulk Water Supply */}
        <div className="bulk-heading">
          <span></span>
          <h2>Bulk Water Supply</h2>
          <span></span>
        </div>

        <div className="bulk-grid">
          {bulkProducts.map((product) => (
            <article className="bulk-product" key={product.name}>

              <div className="bulk-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bulk-image"
                />
              </div>

              <div className="bulk-info">
                <p className="bulk-label">{product.label}</p>

                <h3>{product.name}</h3>

                <p className="bulk-description">
                  {product.description}
                </p>

                <div className="bulk-price">
                  <strong>{product.price}</strong>
                  <span>{product.unit}</span>
                </div>

                <a href="#contact" className="bulk-button">
                  Enquire Now
                </a>
              </div>

            </article>
          ))}
        </div>

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