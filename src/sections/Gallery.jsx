import "./Gallery.css";

const galleryItems = [
  {
    title: "Our RO Water Plant",
    category: "Plant",
    image: "/images/gallery/plant.jpg",
  },
  {
    title: "20L RO Water Jars",
    category: "Jars",
    image: "/images/gallery/jars.jpg",
  },
  {
    title: "Bottled Drinking Water",
    category: "Bottles",
    image: "/images/gallery/bottles.jpg",
  },
  {
    title: "Water Delivery",
    category: "Delivery",
    image: "/images/gallery/delivery.jpg",
  },
  {
    title: "Event Water Supply",
    category: "Events",
    image: "/images/gallery/event.jpg",
  },
  {
    title: "Gandhi RO Water",
    category: "Business",
    image: "/images/gallery/business.jpg",
  },
];

function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">

        <div className="gallery-heading">
          <p className="section-eyebrow">OUR GALLERY</p>

          <h2>
            See Gandhi RO
            <span> in action.</span>
          </h2>

          <p>
            Take a look at our water plant, products, packaging and
            local delivery service.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div className="gallery-item" key={item.title}>

              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />

              <div className="gallery-overlay">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Gallery;