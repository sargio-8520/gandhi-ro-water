import { useState } from "react";
import "./Order.css";

const products = [
  {
    id: "20l-jar",
    icon: "🫙",
    name: "20L RO Water Jar",
    price: 20,
    unit: "per jar",
    description:
      "RO purified drinking water for homes, shops and offices.",
  },
  {
    id: "1l-bottle",
    icon: "💧",
    name: "1L Water Bottle",
    price: 15,
    unit: "per bottle",
    description:
      "Convenient drinking water for everyday use and travel.",
  },
  {
    id: "500ml-bottle",
    icon: "💧",
    name: "500ml Water Bottle",
    price: 8,
    unit: "per bottle",
    description:
      "A convenient option for individuals, shops and gatherings.",
  },
  {
    id: "500l-event",
    icon: "🎉",
    name: "500L Small Event Water",
    price: 450,
    unit: "per 500L",
    description:
      "RO water supply for small events and functions in Rajapakar.",
  },
  {
    id: "1000l-event",
    icon: "🎉",
    name: "1000L Event & Function Water",
    price: 800,
    unit: "per 1000L",
    description:
      "Bulk RO water supply for parties and functions in Rajapakar.",
  },
];

function Order() {
    const [quantities, setQuantities] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSubmitted, setOrderSubmitted] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({
      name: "",
      phone: "",
      area:"",
      address: "",
      note: "",
    });

  const [errors, setErrors] = useState({});

  /* =====================================================
     CUSTOMER DETAILS
     ===================================================== */

  const handleCustomerDetailsChange = (event) => {
    const { name, value } = event.target;

    setCustomerDetails((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear error when user edits the field
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /* =====================================================
     INCREASE QUANTITY
     ===================================================== */

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

  /* =====================================================
     DECREASE QUANTITY
     ===================================================== */

  const decreaseQuantity = (productId) => {
    setQuantities((previous) => {
      const currentQuantity = Number(previous[productId] || 0);

      return {
        ...previous,
        [productId]: Math.max(0, currentQuantity - 1),
      };
    });
  };

  /* =====================================================
     MANUAL QUANTITY CHANGE
     ===================================================== */

  const handleQuantityChange = (productId, value) => {
    // Allow input to temporarily be empty
    if (value === "") {
      setQuantities((previous) => ({
        ...previous,
        [productId]: "",
      }));

      return;
    }

    // Only allow whole numbers
    if (!/^\d+$/.test(value)) {
      return;
    }

    const numericValue = Number(value);

    setQuantities((previous) => ({
      ...previous,
      [productId]: numericValue,
    }));

    // Clear product error
    setErrors((previous) => ({
      ...previous,
      products: "",
    }));
  };

  /* =====================================================
     QUANTITY BLUR
     ===================================================== */

  const handleQuantityBlur = (productId) => {
    setQuantities((previous) => {
      const quantity = previous[productId];

      if (quantity === "" || quantity === undefined) {
        return {
          ...previous,
          [productId]: 0,
        };
      }

      return previous;
    });
  };

  /* =====================================================
     SELECTED PRODUCTS
     ===================================================== */

  const selectedProducts = products.filter(
    (product) => Number(quantities[product.id] || 0) > 0
  );

  /* =====================================================
     GRAND TOTAL
     ===================================================== */

  const grandTotal = selectedProducts.reduce(
    (total, product) =>
      total +
      product.price * Number(quantities[product.id] || 0),
    0
  );

  /* =====================================================
     VALIDATE ORDER
     ===================================================== */

  const validateOrder = () => {
    const newErrors = {};

    const name = customerDetails.name.trim();
    const phone = customerDetails.phone.trim();
    const area = customerDetails.area.trim();
    const address = customerDetails.address.trim();

    if (selectedProducts.length === 0) {
      newErrors.products =
        "Please select at least one product.";
    }

    if (!name) {
      newErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name =
        "Name must be at least 2 characters.";
    }

    if (!phone) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit phone number.";
    }

    if (!area) {
      newErrors.area = "Please enter your area or locality.";
    } else if (area.length < 2) {
      newErrors.area = "Please enter a valid area.";
    }

    if (!address) {
      newErrors.address =
        "Please enter your delivery address.";
    } else if (address.length < 5) {
      newErrors.address =
        "Please enter a complete delivery address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     WHATSAPP ORDER
     ===================================================== */

    const orderOnWhatsApp = () => {
      if (!validateOrder()) {
        return;
      }

      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      let message =
        "Hello Gandhi RO Water Enterprises,\n\n" +
        "I would like to place an order:\n\n";

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

      message += "\nPlease confirm my order and delivery details.";

      const whatsappUrl =
        "https://wa.me/918521836703?text=" +
        encodeURIComponent(message);

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      setOrderSubmitted(true);
      setIsSubmitting(false);
    };

    const startNewOrder = () => {
      setQuantities({});
      setCustomerDetails({
        name: "",
        phone: "",
        address: "",
        area: "",
        note: "",
      });
      setErrors({});
      setOrderSubmitted(false);
    };

  /* =====================================================
     JSX
     ===================================================== */

  return (
    <section className="order-section" id="order">
      <div className="order-container">

        {/* Heading */}

        <div className="order-heading">
          <p className="section-eyebrow">
            ORDER WATER
          </p>

          <h2>
            Choose your
            <span> water requirement.</span>
          </h2>

          <p>
            Select the products and quantities you need.
            You can order drinking water for your home,
            shop, office, or event.
          </p>
        </div>

        {/* Products */}

        <div className="order-products">
          {products.map((product) => {
            const quantity =
              quantities[product.id] ?? 0;

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
                    <strong>
                      ₹{product.price}
                    </strong>

                    <span>
                      {product.unit}
                    </span>
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
                      aria-label={`Increase ${product.name} quantity`}
                    >
                      +
                    </button>

                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Product Error */}

        {errors.products && (
          <p className="products-error">
            {errors.products}
          </p>
        )}

        {/* Customer Details */}

        <div className="customer-details">

          <div className="customer-details-heading">
            <p className="section-eyebrow">
              DELIVERY DETAILS
            </p>

            <h3>
              Where should we deliver?
            </h3>

            <p>
              Enter your details so we can confirm
              your water order.
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
                placeholder="Enter your name"
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
                Phone Number <span>*</span>
              </label>

              <input
                id="customer-phone"
                type="tel"
                name="phone"
                value={customerDetails.phone}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");

                  if (value.length <= 10) {
                    handleCustomerDetailsChange({
                      target: {
                        name: "phone",
                        value,
                      },
                    });
                  }
                }}
                placeholder="Enter 10-digit phone number"
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

            <div className="customer-field">
              <label htmlFor="customer-area">
                Area / Locality <span>*</span>
              </label>

              <input
                id="customer-area"
                type="text"
                name="area"
                value={customerDetails.area}
                onChange={handleCustomerDetailsChange}
                placeholder="Example: Rajapakar Banghara"
                autoComplete="address-level2"
                className={errors.area ? "input-error" : ""}
              />

              {errors.area && (
                <p className="field-error">{errors.area}</p>
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
                placeholder="Enter your complete delivery address"
                rows="3"
                autoComplete="street-address"
                className={errors.address ? "input-error" : ""}
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
                Additional Note{" "}
                <span>(Optional)</span>
              </label>

              <textarea
                id="customer-note"
                name="note"
                value={customerDetails.note}
                onChange={handleCustomerDetailsChange}
                placeholder="Example: Please deliver in the evening"
                rows="2"
              />
            </div>

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

                <h3>
                  Order Summary
                </h3>
              </div>

              <span className="order-item-count">
                {selectedProducts.length} item
                {selectedProducts.length > 1
                  ? "s"
                  : ""}
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

            <div className="order-summary-total">
              <span> Grand Total </span>
              <strong>₹{grandTotal}</strong>
            </div>

            <button
                type="button"
                className="order-whatsapp-button"
                onClick={orderOnWhatsApp}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Opening WhatsApp..." : "💬 Order on WhatsApp"}
            </button>

            {orderSubmitted && (
              <div className="order-success">
                <div className="order-success-icon">✓</div>

                <div className="order-success-content">
                  <h4>Order details prepared!</h4>

                  <p>
                    WhatsApp should have opened with your order message.
                    Please send the message to confirm your order.
                  </p>
                </div>

                <button
                  type="button"
                  className="new-order-button"
                  onClick={startNewOrder}
                >
                  Start New Order
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}

export default Order;