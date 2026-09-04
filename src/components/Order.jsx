import { useState } from "react";
import "./Order.css";

const products = [
  {
    id: "20l-jar",
    icon: "🫙",
    name: "20L RO Water Jar",
    price: 20,
    unit: "per jar",
    description: "For home, office & shops.",
  },
  {
    id: "1l-bottle",
    icon: "💧",
    name: "1L Water Bottle",
    price: 15,
    unit: "per bottle",
    description: "For daily use & travel.",
  },
  {
    id: "500ml-bottle",
    icon: "💧",
    name: "500ml Water Bottle",
    price: 8,
    unit: "per bottle",
    description: "Easy to carry.",
  },
  {
    id: "500l-event",
    icon: "🎉",
    name: "500L Small Event Water",
    price: 450,
    unit: "per 500L",
    description: "For small events.",
  },
  {
    id: "1000l-event",
    icon: "🚚",
    name: "1000L Event Water",
    price: 800,
    unit: "per 1000L",
    description: "For parties & functions.",
  },
];

function Order() {
  const [quantities, setQuantities] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    area: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  // -----------------------------
  // Customer Details
  // -----------------------------

  const handleCustomerDetailsChange = (event) => {
    const { name, value } = event.target;

    setCustomerDetails((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // -----------------------------
  // Quantity Controls
  // -----------------------------

  const increaseQuantity = (productId) => {
    setQuantities((previous) => ({
      ...previous,
      [productId]: Number(previous[productId] || 0) + 1,
    }));

    setErrors((previous) => ({
      ...previous,
      products: "",
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((previous) => ({
      ...previous,
      [productId]: Math.max(0, Number(previous[productId] || 0) - 1),
    }));
  };

  const handleQuantityChange = (productId, value) => {
    if (value === "") {
      setQuantities((previous) => ({
        ...previous,
        [productId]: "",
      }));
      return;
    }

    if (!/^\d+$/.test(value)) {
      return;
    }

    setQuantities((previous) => ({
      ...previous,
      [productId]: Number(value),
    }));

    setErrors((previous) => ({
      ...previous,
      products: "",
    }));
  };

  const handleQuantityBlur = (productId) => {
    setQuantities((previous) => ({
      ...previous,
      [productId]:
        previous[productId] === "" ||
        previous[productId] === undefined
          ? 0
          : previous[productId],
    }));
  };

  // -----------------------------
  // Selected Products
  // -----------------------------

  const selectedProducts = products.filter(
    (product) => Number(quantities[product.id] || 0) > 0
  );

  const grandTotal = selectedProducts.reduce(
    (total, product) =>
      total +
      product.price * Number(quantities[product.id] || 0),
    0
  );

  // -----------------------------
  // Validation
  // -----------------------------

  const validateOrder = () => {
    const newErrors = {};

    const name = customerDetails.name.trim();
    const phone = customerDetails.phone.trim();
    const area = customerDetails.area.trim();
    const address = customerDetails.address.trim();

    if (selectedProducts.length === 0) {
      newErrors.products = "Select at least one product.";
    }

    if (!name) {
      newErrors.name = "Enter your name.";
    } else if (name.length < 2) {
      newErrors.name = "Enter a valid name.";
    }

    if (!phone) {
      newErrors.phone = "Enter your phone number.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit number.";
    }

    if (!area) {
      newErrors.area = "Enter your area.";
    }

    if (!address) {
      newErrors.address = "Enter your delivery address.";
    } else if (address.length < 5) {
      newErrors.address = "Enter a complete address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // WhatsApp Order
  // -----------------------------

  const orderOnWhatsApp = () => {
    if (!validateOrder() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    let message =
      "Hello Gandhi RO Water Enterprises,\n\n" +
      "I would like to order:\n\n";

    selectedProducts.forEach((product) => {
      const quantity = Number(quantities[product.id] || 0);
      const itemTotal = product.price * quantity;

      message += `${product.name}\n`;
      message += `Quantity: ${quantity}\n`;
      message += `Price: ₹${itemTotal}\n\n`;
    });

    message += `Grand Total: ₹${grandTotal}\n\n`;

    message += "Customer Details:\n";
    message += `Name: ${customerDetails.name.trim()}\n`;
    message += `Phone: ${customerDetails.phone.trim()}\n`;
    message += `Area: ${customerDetails.area.trim()}\n`;
    message += `Address: ${customerDetails.address.trim()}\n`;

    if (customerDetails.note.trim()) {
      message += `Note: ${customerDetails.note.trim()}\n`;
    }

    message += "\nPlease confirm my order.";

    const whatsappUrl =
      "https://wa.me/918521836703?text=" +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setOrderSubmitted(true);
    setIsSubmitting(false);
  };

  // -----------------------------
  // New Order
  // -----------------------------

  const startNewOrder = () => {
    setQuantities({});

    setCustomerDetails({
      name: "",
      phone: "",
      area: "",
      address: "",
      note: "",
    });

    setErrors({});
    setOrderSubmitted(false);
  };

  // -----------------------------
  // JSX
  // -----------------------------

  return (
    <section className="order-section" id="order">
      <div className="order-container">

        {/* Heading */}
        <div className="order-heading">
          <p className="section-eyebrow">ORDER WATER</p>

          <h2>
            Choose your{" "}
            <span>water requirement.</span>
          </h2>

          <p>
            Select your water and quantity.
          </p>
        </div>

        <div className="order-layout">

          {/* Products */}
          <div className="order-products">

            {products.map((product) => {
              const quantity = quantities[product.id] ?? 0;

              return (
                <article
                  className="order-product-card"
                  key={product.id}
                >
                  <div className="order-product-top">

                    <div className="order-product-icon">
                      {product.icon}
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
                        aria-label={`Decrease ${product.name}`}
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={quantity}
                        onChange={(event) =>
                          handleQuantityChange(
                            product.id,
                            event.target.value
                          )
                        }
                        onBlur={() =>
                          handleQuantityBlur(product.id)
                        }
                        aria-label={`${product.name} quantity`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(product.id)
                        }
                        aria-label={`Increase ${product.name}`}
                      >
                        +
                      </button>

                    </div>

                  </div>
                </article>
              );
            })}

            {errors.products && (
              <p className="products-error">
                {errors.products}
              </p>
            )}

            {/* Delivery Types */}
            <div className="order-delivery-types">

              <div>
                <span>⌂</span>
                <strong>Home</strong>
                <small>Delivery</small>
              </div>

              <div>
                <span>▦</span>
                <strong>Office</strong>
                <small>Supply</small>
              </div>

              <div>
                <span>▣</span>
                <strong>Shop</strong>
                <small>Supply</small>
              </div>

              <div>
                <span>▤</span>
                <strong>Event</strong>
                <small>Supply</small>
              </div>

            </div>
          </div>

          {/* Delivery Details */}
          <div className="customer-details">

            <div className="customer-details-heading">
              <p className="section-eyebrow">
                DELIVERY DETAILS
              </p>

              <h3>Where should we deliver?</h3>

              <p>
                Enter your details to confirm your order.
              </p>
            </div>

            <div className="customer-details-grid">

              {/* Name */}
              <div className="customer-field">
                <label htmlFor="customer-name">
                  Name <span>*</span>
                </label>

                <input
                  id="customer-name"
                  type="text"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleCustomerDetailsChange}
                  placeholder="Your name"
                  autoComplete="name"
                  className={errors.name ? "input-error" : ""}
                />

                {errors.name && (
                  <p className="field-error">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="customer-field">
                <label htmlFor="customer-phone">
                  Phone <span>*</span>
                </label>

                <input
                  id="customer-phone"
                  type="tel"
                  name="phone"
                  value={customerDetails.phone}
                  onChange={(event) => {
                    const value =
                      event.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      handleCustomerDetailsChange({
                        target: {
                          name: "phone",
                          value,
                        },
                      });
                    }
                  }}
                  placeholder="10-digit number"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  className={errors.phone ? "input-error" : ""}
                />

                {errors.phone && (
                  <p className="field-error">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Area */}
              <div className="customer-field">
                <label htmlFor="customer-area">
                  Area <span>*</span>
                </label>

                <input
                  id="customer-area"
                  type="text"
                  name="area"
                  value={customerDetails.area}
                  onChange={handleCustomerDetailsChange}
                  placeholder="Rajapakar Banghara"
                  autoComplete="address-level2"
                  className={errors.area ? "input-error" : ""}
                />

                {errors.area && (
                  <p className="field-error">
                    {errors.area}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="customer-field customer-field-full">
                <label htmlFor="customer-address">
                  Delivery Address <span>*</span>
                </label>

                <textarea
                  id="customer-address"
                  name="address"
                  value={customerDetails.address}
                  onChange={handleCustomerDetailsChange}
                  placeholder="Complete delivery address"
                  rows="2"
                  autoComplete="street-address"
                  className={
                    errors.address ? "input-error" : ""
                  }
                />

                {errors.address && (
                  <p className="field-error">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Note */}
              <div className="customer-field customer-field-full">
                <label htmlFor="customer-note">
                  Note <span>(Optional)</span>
                </label>

                <textarea
                  id="customer-note"
                  name="note"
                  value={customerDetails.note}
                  onChange={handleCustomerDetailsChange}
                  placeholder="Delivery note"
                  rows="2"
                />
              </div>

            </div>

            {/* Order Summary */}
            {selectedProducts.length > 0 && (
              <div className="order-summary">

                <div className="order-summary-header">
                  <div>
                    <p className="section-eyebrow">
                      YOUR ORDER
                    </p>

                    <h3>Order Summary</h3>
                  </div>

                  <span className="order-item-count">
                    {selectedProducts.length} item
                    {selectedProducts.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="order-summary-items">

                  {selectedProducts.map((product) => {
                    const quantity = Number(
                      quantities[product.id] || 0
                    );

                    const itemTotal =
                      product.price * quantity;

                    return (
                      <div
                        className="order-summary-item"
                        key={product.id}
                      >
                        <div className="order-summary-product">

                          <span className="order-summary-icon">
                            {product.icon}
                          </span>

                          <div>
                            <h4>{product.name}</h4>

                            <p>
                              {quantity} × ₹{product.price}
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

                <div className="order-summary-total">
                  <span>Grand Total</span>
                  <strong>₹{grandTotal}</strong>
                </div>

                <button
                  type="button"
                  className="order-whatsapp-button"
                  onClick={orderOnWhatsApp}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Opening WhatsApp..."
                    : "🛒 Place Order"}
                </button>

                {orderSubmitted && (
                  <div className="order-success">

                    <div className="order-success-icon">
                      ✓
                    </div>

                    <div className="order-success-content">
                      <h4>Order ready!</h4>

                      <p>
                        Send the WhatsApp message to confirm.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="new-order-button"
                      onClick={startNewOrder}
                    >
                      New Order
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

        

      </div>
    </section>
  );
}

export default Order;