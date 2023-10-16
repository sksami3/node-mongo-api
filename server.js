const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testProdactDb");
    console.log("db connected");
  } catch (err) {
    console.log("error in connection" + err.message);
    process.exit(1);
  }
};

/** Schema */
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Hello from Node API");
});

app.post("/product", async (req, res, next) => {
  try {
    /** get values */
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    /** set values */
    const newProduct = new Product({
      title: title,
      price: price,
      description: description,
    });

    /** save */
    const productData = await newProduct.save();

    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.post("/product", async (req, res, next) => {
    try {
      /** get values */
      const title = req.body.title;
      const price = req.body.price;
      const description = req.body.description;
  
      /** set values */
      const newProduct = new Product({
        title: title,
        price: price,
        description: description,
      });
  
      /** save */
      const productData = await newProduct.save();
  
      res.status(201).send(productData);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  });

  app.post("/products", async (req, res, next) => {
    try {
      /** get an array of products from the request body */
      const products = req.body;
  
      if (!Array.isArray(products)) {
        return res.status(400).send({
          message: "Request body should be an array of products.",
        });
      }
  
      /** save all products */
      const productData = await Product.insertMany(products);
  
      res.status(201).send(productData);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  });

app.listen(3000, async () => {
  await connectDB();
  console.log("listening from 3000");
});
