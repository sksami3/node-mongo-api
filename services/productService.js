var Product = require("../models/productModel");

const ProductService = {
  FindAll: (req) => {
    return Product.find();
  },

  Find: (id) => {
    return Product.findOne({ _id: id });
  },

  Create: async (req) => {
    var product = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
    });
    return await product.save();
  },

  Bulk_Create: async (req) => {
    const products = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).send({
        message: "Request body should be an array of products.",
      });
    }

    /** save all products */
    return await Product.insertMany(products);
  },

  Update: async (req) => {
    return await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
        },
      },
      {
        new: true,
      }
    );
  },

  Delete: async (id) => {
    return await Product.findOneAndDelete({ _id: id });
  },
};

module.exports = ProductService;
