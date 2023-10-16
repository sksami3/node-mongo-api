const express = require("express");
const app = express();
var router = express.Router();
const mongoose = require("mongoose");
var productRouter = require('./routes/productRoute');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testProdactDb");
    console.log("db connected");
  } catch (err) {
    console.log("error in connection" + err.message);
    process.exit(1);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//require('./routes/productRoute')(app);
app.use('/products', productRouter);

// app.get("/", (req, res, next) => {
//   res.send("Hello from Node API");
// });
const port = process.env.port || 3000;
app.listen(port, async () => {
  await connectDB();
  console.log("listening from " + port);
});

module.exports = app;
