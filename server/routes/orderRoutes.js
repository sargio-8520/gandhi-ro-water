const express = require("express");
const Order = require("../models/Order");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

const products = {
  "20l-jar": {
    name: "20L RO Water Jar",
    price: 20,
    unit: "per jar",
  },

  "1l-bottle": {
    name: "1L Water Bottle",
    price: 15,
    unit: "per bottle",
  },

  "500ml-bottle": {
    name: "500ml Water Bottle",
    price: 8,
    unit: "per bottle",
  },

  "500l-event": {
    name: "500L Small Event Water",
    price: 450,
    unit: "per 500L",
  },

  "1000l-event": {
    name: "1000L Event Water",
    price: 800,
    unit: "per 1000L",
  },
};

router.post("/", async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer details are required.",
      });
    }

    if (
      !customer.name ||
      !customer.phone ||
      !customer.area ||
      !customer.address
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, area and address are required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product is required.",
      });
    }

    const orderItems = [];

    for (const item of items) {
      const product = products[item.productId];

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Invalid product: ${item.productId}`,
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for ${product.name}.`,
        });
      }

      const total = quantity * product.price;

      orderItems.push({
        productId: item.productId,
        productName: product.name,
        quantity,
        price: product.price,
        unit: product.unit,
        total,
      });
    }

    const totalItems = orderItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const grandTotal = orderItems.reduce(
      (total, item) => total + item.total,
      0
    );

    const order = await Order.create({
      customer: {
        name: customer.name,
        phone: customer.phone,
        area: customer.area,
        address: customer.address,
        note: customer.note || "",
      },

      items: orderItems,

      totalItems,
      grandTotal,

      status: "New",
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      orderId: order._id,
      totalItems: order.totalItems,
      grandTotal: order.grandTotal,
    });
  } catch (error) {
    console.error("Order creation failed:");
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
});

router.get("/", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:");
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
});

router.patch("/:id/status", adminAuth, async (req, res) => {
  try {
    const allowedStatuses = [
      "New",
      "Confirmed",
      "Delivered",
      "Cancelled",
    ];

    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Failed to update order status:");
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update order status.",
    });
  }
});
module.exports = router;