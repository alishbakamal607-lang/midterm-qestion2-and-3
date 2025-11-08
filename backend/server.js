const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const MenuItem = require("./models/MenuItem");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB local connection
mongoose.connect("mongodb://127.0.0.1:27017/coffee_shop_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection failed:", err));

// Routes
app.get("/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

app.get("/menu/random", async (req, res) => {
  try {
    const items = await MenuItem.find({ inStock: true });
    const random = items[Math.floor(Math.random() * items.length)];
    res.json(random);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch random item" });
  }
});

app.listen(3000, () => {
  console.log("Coffee shop server running on port 3000");
});
