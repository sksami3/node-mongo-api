const mongoose = require("mongoose");

/** Schema */
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    validate: {
      validator: function (v) {
        return v.length > 3;
      },
      message: (props) => `${props.value} is not a valid!`,
    },
    required: [true, "Title is mandatory"],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
/** end */
/** creating model */
const Product = new mongoose.model("Product", productSchema);
/** end */

module.exports = Product;