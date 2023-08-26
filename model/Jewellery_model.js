const mongoose = require("mongoose");

const Scheme = new mongoose.Schema({
  jewel_type: {
    type: String,
    required: [true, "jewel type is Required"],
    trim: true,
  },
  jewel_like: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [100, "description can not be more than 100 characters"],
  },
  image: [String],
  price: {
    type: String,
    required: [true, "price is Required"],
    trim: true,
  },
  karat: {
    type: String,
    required: [true, "karat is Required"],
    trim: true,
  },
  weight: {
    type: String,
    trim: true,
  },
  faceType: [String],
  occasion: [String],
  overlay: {
    type: String,
    trim: true,
  },
});

module.exports = Scheme;
