import { useState } from "react";
import "./Order.css";

const products = [
  {
    id: "20l-jar",
    image: "/images/gallery/20l-jar.png",
    name: "20L RO Water Jar",
   
    price: 20,
    unit: "per jar",
  },
  {
    id: "1l-bottle",
    image: "/images/gallery/1l-bottle.png",
    name: "1L Water Bottle",
    
    price: 15,
    unit: "per bottle",
  },
  {
    id: "500ml-bottle",
    image: "/images/gallery/500ml-bottle.png",
    name: "500ml Water Bottle",
    
    price: 8,
    unit: "per bottle",
  },
  {
    id: "500l-event",
    image: "/images/gallery/500l-tank.png",
    name: "500L Small Event Water",
    
    price: 450,
    unit: "per 500L",
  },
  {
    id: "1000l-event",
    image: "/images/gallery/event_function.png",
    name: "1000L Event Water",
    
    price: 800,
    unit: "per 1000L",
  },
];

function Order() {
  const [quantities, setQuantities] = useState({
    "20l-jar": 0,
    "1l-bottle": 0,
    "500ml-bottle": 0,
    "500l-event": 0,
    "1000l-event": 0,
  });

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    area: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [productsError, setProductsError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQuantity = (id, value) => {
    const quantity = Math.max(0, Number(value) || 0);

    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));

    if (quantity > 0) {
      setProductsError("");
    }

    setOrderPlaced(false);
  };

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));

    setProductsError("");
    setOrderPlaced(false);
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] - 1),
    }));

    setOrderPlaced(false);
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setOrderPlaced(false);
  };

  const selectedProducts = products.filter(
    (product) => quantities[product.id] > 0
  );

  const totalItems = selectedProducts.reduce(
    (total, product) => total + quantities[product.id],
    0
  );

  const grandTotal = selectedProducts.reduce(
    (total, product) =>
      total + quantities[product.id] * product.price,
    0
  );

  const validateOrder = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(customer.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!customer.area.trim()) {
      newErrors.area = "Please enter your area.";
    }

    if (!customer.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    }

    if (selectedProducts.length === 0) {
      setProductsError("Please select at least one product.");
    } else {
      setProductsError("");
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0 &&
      selectedProducts.length > 0
    );
  };

  const orderOnWhatsApp = () => {
    if (!validateOrder()) {
      return;
    }

    const productLines = selectedProducts
      .map((product) => {
        const quantity = quantities[product.id];
        const total = quantity * product.price;

        return `${product.name}
Quantity: ${quantity}
Price: ₹${product.price} ${product.unit}
Total: ₹${total}`;
      })
      .join("\n\n");

    const message = `Hello Gandhi RO Water Enterprises,

I would like to place an order.

CUSTOMER DETAILS
Name: ${customer.name}
Phone: ${customer.phone}
Area: ${customer.area}
Address: ${customer.address}${
      customer.note.trim()
        ? `\nNote: ${customer.note}`
        : ""
    }

ORDER DETAILS
${productLines}

Total Items: ${totalItems}
Grand Total: ₹${grandTotal}

Please confirm my order and delivery.`;

    const whatsappUrl =
      "https://wa.me/918521836703?text=" +
      encodeURIComponent(message);

    setOrderPlaced(true);

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const resetOrder = () => {
    setQuantities({
      "20l-jar": 0,
      "1l-bottle": 0,
      "500ml-bottle": 0,
      "500l-event": 0,
      "1000l-event": 0,
    });

    setCustomer({
      name: "",
      phone: "",
      area: "",
      address: "",
      note: "",
    });

    setErrors({});
    setProductsError("");
    setOrderPlaced(false);
  };

  return (
    <section className="order-section" id="order">
      <div className="order-container">

        {/* Heading */}
        <div className="order-heading">
          <h2 className="section-eyebrow">
            Order Water
          </h2>
        </div>

        <div className="order-layout">

          {/* ================= PRODUCTS ================= */}
          <div className="order-products">

            {products.map((product) => (
              <div
                className="order-product-card"
                key={product.id}
              >
                <div className="order-product-top">

                  <div className="order-product-icon">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="order-product-image"
                    />
                  </div>

                  <div className="order-product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>

                </div>

                <div className="order-product-bottom">

                  <div className="order-product-price">
                    <strong>₹{product.price}</strong>
                    <span>{product.unit}</span>
                  </div>

                  <div className="quantity-control">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                      aria-label={`Decrease ${product.name} quantity`}
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min="0"
                      value={quantities[product.id]}
                      onChange={(e) =>
                        updateQuantity(
                          product.id,
                          e.target.value
                        )
                      }
                      aria-label={`${product.name} quantity`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                      aria-label={`Increase ${product.name} quantity`}
                    >
                      +
                    </button>

                  </div>

                </div>
              </div>
            ))}

            {productsError && (
              <div className="products-error">
                {productsError}
              </div>
            )}

          </div>

          {/* ================= CUSTOMER DETAILS ================= */}
          <div className="customer-details">

            <div className="customer-details-heading">
              <h2 className="section-eyebrow">
                CUSTOMER DETAILS
              </h2>
            </div>

            <div className="customer-details-grid">

              {/* Name */}
              <div className="customer-field">
                <label htmlFor="name">
                  Name <span>*</span>
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  placeholder="Your name"
                  className={
                    errors.name ? "input-error" : ""
                  }
                />

                {errors.name && (
                  <div className="field-error">
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="customer-field">
                <label htmlFor="phone">
                  Phone <span>*</span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  placeholder="8521836703"
                  className={
                    errors.phone ? "input-error" : ""
                  }
                />

                {errors.phone && (
                  <div className="field-error">
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Area */}
              <div className="customer-field">
                <label htmlFor="area">
                  Area <span>*</span>
                </label>

                <input
                  id="area"
                  type="text"
                  name="area"
                  value={customer.area}
                  onChange={handleCustomerChange}
                  placeholder="Rajapakar"
                  className={
                    errors.area ? "input-error" : ""
                  }
                />

                {errors.area && (
                  <div className="field-error">
                    {errors.area}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="customer-field customer-field-full">
                <label htmlFor="address">
                  Delivery Address <span>*</span>
                </label>

                <input
                  id="address"
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  placeholder="House / shop / office address"
                  className={
                    errors.address ? "input-error" : ""
                  }
                />

                {errors.address && (
                  <div className="field-error">
                    {errors.address}
                  </div>
                )}
              </div>

              {/* Note */}
              <div className="customer-field customer-field-full">
                <label htmlFor="note">
                  Note
                </label>

                <textarea
                  id="note"
                  name="note"
                  value={customer.note}
                  onChange={handleCustomerChange}
                  placeholder="Any special delivery instructions?"
                />
              </div>

            </div>

            {/* ================= ORDER SUMMARY ================= */}
            <div className="order-summary">

              <div className="order-summary-header">

                <div>
                  <div className="section-eyebrow">
                    YOUR ORDER
                  </div>

                  <h3>Order Summary</h3>
                </div>

                <span className="order-item-count">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "Item"
                    : "Items"}
                </span>

              </div>

              {/* Empty state */}
              {selectedProducts.length === 0 ? (
                <div className="order-summary-empty">
                  Select products to see your order.
                </div>
              ) : (
                <div className="order-summary-items">

                  {selectedProducts.map((product) => {
                    const quantity =
                      quantities[product.id];

                    const itemTotal =
                      quantity * product.price;

                    return (
                      <div
                        className="order-summary-item"
                        key={product.id}
                      >

                        <div className="order-summary-product">

                          <div className="order-summary-icon">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="order-summary-image"
                            />
                          </div>

                          <div>
                            <h4>
                              {product.name}
                            </h4>

                            <p>
                              {quantity} × ₹
                              {product.price}
                            </p>
                          </div>

                        </div>

                        <strong>
                          ₹{itemTotal}
                        </strong>

                      </div>
                    );
                  })}

                </div>
              )}

              {/* Total */}
              <div className="order-summary-total">
                <span>Grand Total</span>
                <strong>
                  ₹{grandTotal}
                </strong>
              </div>

              {/* WhatsApp button */}
              <button
                type="button"
                className="order-whatsapp-button"
                onClick={orderOnWhatsApp}
                disabled={orderPlaced}
              >
                <span>💬</span>

                {orderPlaced
                  ? "Order Sent"
                  : "Place Order on WhatsApp"}
              </button>

              {/* Success */}
              {orderPlaced && (
                <div className="order-success">

                  <div className="order-success-icon">
                    ✓
                  </div>

                  <div className="order-success-content">
                    <h4>
                      Order details prepared!
                    </h4>

                    <p>
                      WhatsApp has been opened.
                      Please send the message
                      to confirm your order.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="new-order-button"
                    onClick={resetOrder}
                  >
                    New Order
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Order;