const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide product title"],
    unique: [true, "title must be unique"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide product title"],
    unique: [true, "title must be unique"],
    trim: true,
  },
  price: {
    type: Number,
    min: [500, 'Price must be greater than 499'],
    max: [100000, "price must be less than 100000"],
    required: [true, "Please provide product price"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  product_image: {
    type: String,
    required: [true, "Please provide product image"]
  }
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
