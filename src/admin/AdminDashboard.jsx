import { useEffect, useMemo, useState } from "react";
import logo from "../assets/gro.png";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const statusOptions = [
  "New",
  "Confirmed",
  "Delivered",
  "Cancelled",
];

function AdminDashboard({ token, onLogout }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        onLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      setError(
        error.message || "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      setError("");

      const response = await fetch(
        `${API_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.status === 401) {
        onLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update order."
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: data.order.status }
            : order
        )
      );

      setSelectedOrder((currentOrder) =>
        currentOrder && currentOrder._id === orderId
          ? {
              ...currentOrder,
              status: data.order.status,
            }
          : currentOrder
      );
    } catch (error) {
      setError(
        error.message || "Failed to update order."
      );
    } finally {
      setUpdatingId("");
    }
  };

  const copyOrderId = async (orderId) => {
    try {
      await navigator.clipboard.writeText(orderId);

      setCopiedId(orderId);

      setTimeout(() => {
        setCopiedId("");
      }, 1500);
    } catch (error) {
      setError("Could not copy Order ID.");
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(orderId);
      setError("");

      const response = await fetch(
        `${API_URL}/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Server returned an unexpected response (${response.status}). Please restart the backend.`
        );
      }

      const data = await response.json();

      if (response.status === 401) {
        onLogout();
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete order."
        );
      }

      setOrders((currentOrders) =>
        currentOrders.filter(
          (order) => order._id !== orderId
        )
      );

      setSelectedOrder((currentOrder) =>
        currentOrder && currentOrder._id === orderId
          ? null
          : currentOrder
      );
    } catch (error) {
      setError(
        error.message || "Failed to delete order."
      );
    } finally {
      setDeletingId("");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusClass = (status) => {
    return `admin-status admin-status-${status.toLowerCase()}`;
  };

  const whatsappLink = (phone, name) => {
    const cleanPhone = String(phone).replace(/\D/g, "");

    return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
      `Hello ${name}, this is Gandhi RO Water Enterprises regarding your water order.`
    )}`;
  };

  const filteredOrders = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!search) {
        return true;
      }

      const searchableText = [
        order._id,
        order.customer?.name,
        order.customer?.phone,
        order.customer?.area,
        order.customer?.address,
        order.customer?.note,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(search);
    });
  }, [orders, searchTerm, statusFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    statusFilter !== "All";

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <header className="admin-header">
        <div className="admin-brand">
          <img
            src={logo}
            alt="Gandhi RO Water"
            className="admin-brand-logo"
          />

          <div>
            <p className="admin-header-eyebrow">
              GANDHI RO WATER
            </p>

            <h1>Order Management</h1>
          </div>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-refresh"
            onClick={fetchOrders}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>

          <button
            type="button"
            className="admin-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="admin-main">

        {/* SUMMARY */}
        <div className="admin-summary">

          <div className="admin-summary-card">
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
          </div>

          <div className="admin-summary-card">
            <span>New</span>
            <strong>
              {
                orders.filter(
                  (order) => order.status === "New"
                ).length
              }
            </strong>
          </div>

          <div className="admin-summary-card">
            <span>Confirmed</span>
            <strong>
              {
                orders.filter(
                  (order) => order.status === "Confirmed"
                ).length
              }
            </strong>
          </div>

          <div className="admin-summary-card">
            <span>Delivered</span>
            <strong>
              {
                orders.filter(
                  (order) => order.status === "Delivered"
                ).length
              }
            </strong>
          </div>

        </div>

        {/* SEARCH + FILTER */}
        <div className="admin-filters">

          <div className="admin-search">
            <span className="admin-search-icon">
              ⌕
            </span>

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search customer, phone, area or order ID"
              aria-label="Search orders"
            />

            {searchTerm && (
              <button
                type="button"
                className="admin-search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="admin-filter-status">
            <label htmlFor="status-filter">
              Status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">
                All Orders
              </option>

              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="admin-clear-filters"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}

        </div>

        {/* RESULTS COUNT */}
        {!loading && orders.length > 0 && (
          <div className="admin-results-count">
            Showing{" "}
            <strong>{filteredOrders.length}</strong>{" "}
            of{" "}
            <strong>{orders.length}</strong> orders
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        {/* ORDERS */}
        {loading ? (
          <div className="admin-empty">
            <strong>Loading orders...</strong>
          </div>
        ) : filteredOrders.length === 0 ? (

          <div className="admin-empty">

            {orders.length === 0 ? (
              <>
                <strong>No orders found.</strong>

                <span>
                  New customer orders will appear here.
                </span>
              </>
            ) : (
              <>
                <strong>
                  No matching orders.
                </strong>

                <span>
                  Try changing your search or status filter.
                </span>

                <button
                  type="button"
                  className="admin-empty-clear"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </>
            )}

          </div>

        ) : (

          <div className="admin-orders">

            {filteredOrders.map((order) => (

              <article
                className="admin-order-card"
                key={order._id}
              >

                {/* ORDER TOP */}
                <div className="admin-order-top">

                  <div className="admin-order-id-block">
                    <span className="admin-order-label">
                      Order ID
                    </span>

                    <div className="admin-order-id-row">
                      <strong className="admin-order-id">
                        #{order._id.slice(-6).toUpperCase()}
                      </strong>

                      <button
                        type="button"
                        className="admin-copy-id"
                        onClick={() =>
                          copyOrderId(order._id)
                        }
                      >
                        {copiedId === order._id
                          ? "Copied"
                          : "Copy"}
                      </button>
                    </div>
                  </div>

                  <span
                    className={getStatusClass(
                      order.status
                    )}
                  >
                    {order.status}
                  </span>

                </div>

                {/* CUSTOMER */}
                <div className="admin-customer">

                  <h2>
                    {order.customer.name}
                  </h2>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.customer.phone}
                  </p>

                  <p>
                    <strong>Area:</strong>{" "}
                    {order.customer.area}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {order.customer.address}
                  </p>

                  {order.customer.note && (
                    <p>
                      <strong>Note:</strong>{" "}
                      {order.customer.note}
                    </p>
                  )}

                </div>

                {/* ITEMS */}
                <div className="admin-items">

                  <h3>Order Items</h3>

                  {order.items.map((item) => (

                    <div
                      className="admin-item"
                      key={item.productId}
                    >
                      <span>
                        {item.productName} ×{" "}
                        {item.quantity}
                      </span>

                      <strong>
                        ₹{item.total}
                      </strong>
                    </div>

                  ))}

                </div>

                {/* TOTAL */}
                <div className="admin-order-total">

                  <span>
                    {order.totalItems} item
                    {order.totalItems !== 1
                      ? "s"
                      : ""}
                  </span>

                  <strong>
                    ₹{order.grandTotal}
                  </strong>

                </div>

                {/* DATE */}
                <div className="admin-order-meta">
                  <span>
                    {formatDate(order.createdAt)}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="admin-order-actions">

                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateStatus(
                        order._id,
                        event.target.value
                      )
                    }
                    disabled={
                      updatingId === order._id
                    }
                  >
                    {statusOptions.map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="admin-view-details"
                    onClick={() =>
                      setSelectedOrder(order)
                    }
                  >
                    View Details
                  </button>

                  <a
                    href={`tel:${order.customer.phone}`}
                    className="admin-call"
                  >
                    Call
                  </a>

                  <a
                    href={whatsappLink(
                      order.customer.phone,
                      order.customer.name
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-whatsapp"
                  >
                    WhatsApp
                  </a>

                  <button
                    type="button"
                    className="admin-delete"
                    onClick={() =>
                      deleteOrder(order._id)
                    }
                    disabled={
                      deletingId === order._id
                    }
                  >
                    {deletingId === order._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div
          className="admin-modal-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >
          <div
            className="admin-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div>
                <span className="admin-order-label">
                  Order Details
                </span>

                <h2>
                  #
                  {selectedOrder._id
                    .slice(-6)
                    .toUpperCase()}
                </h2>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={() =>
                  setSelectedOrder(null)
                }
                aria-label="Close order details"
              >
                ×
              </button>

            </div>

            <div className="admin-modal-status">
              <span
                className={getStatusClass(
                  selectedOrder.status
                )}
              >
                {selectedOrder.status}
              </span>
            </div>

            {/* CUSTOMER DETAILS */}
            <div className="admin-detail-section">

              <h3>Customer</h3>

              <div className="admin-detail-grid">

                <div>
                  <span>Name</span>
                  <strong>
                    {selectedOrder.customer.name}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedOrder.customer.phone}
                  </strong>
                </div>

                <div>
                  <span>Area</span>
                  <strong>
                    {selectedOrder.customer.area}
                  </strong>
                </div>

                <div className="admin-detail-full">
                  <span>Address</span>
                  <strong>
                    {selectedOrder.customer.address}
                  </strong>
                </div>

                {selectedOrder.customer.note && (
                  <div className="admin-detail-full">
                    <span>Note</span>
                    <strong>
                      {selectedOrder.customer.note}
                    </strong>
                  </div>
                )}

              </div>

            </div>

            {/* PRODUCTS */}
            <div className="admin-detail-section">

              <h3>Products</h3>

              <div className="admin-detail-items">

                {selectedOrder.items.map((item) => (

                  <div
                    className="admin-detail-item"
                    key={item.productId}
                  >
                    <div>
                      <strong>
                        {item.productName}
                      </strong>

                      <span>
                        {item.quantity} × ₹
                        {item.price}{" "}
                        {item.unit}
                      </span>
                    </div>

                    <strong>
                      ₹{item.total}
                    </strong>
                  </div>

                ))}

              </div>

            </div>

            {/* TOTAL */}
            <div className="admin-detail-total">

              <span>
                {selectedOrder.totalItems} item
                {selectedOrder.totalItems !== 1
                  ? "s"
                  : ""}
              </span>

              <strong>
                ₹{selectedOrder.grandTotal}
              </strong>

            </div>

            {/* DATE */}
            <div className="admin-detail-date">
              Ordered:{" "}
              {formatDate(
                selectedOrder.createdAt
              )}
            </div>

            {/* MODAL ACTIONS */}
            <div className="admin-modal-actions">

              <a
                href={`tel:${selectedOrder.customer.phone}`}
                className="admin-call"
              >
                Call Customer
              </a>

              <a
                href={whatsappLink(
                  selectedOrder.customer.phone,
                  selectedOrder.customer.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-whatsapp"
              >
                WhatsApp
              </a>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;