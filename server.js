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

app.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(201).send(products);
    } else {
      res.status(201).send({ message: "products not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.get("/product/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ _id: id });
    if (product) {
      res.status(201).send(product);
    } else {
      res.status(400).send({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.delete("/product/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    if (product) {
      res.status(201).send({
        success: true,
        message: "Product deleted",
        object: product,
      });
    } else {
      res.status(400).send({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.put("/product/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
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
    if (product) {
      res.status(201).send({
        success: true,
        message: "Product UPDATED",
        object: product,
      });
    } else {
      res.status(400).send({ message: "product not found" });
    }
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
