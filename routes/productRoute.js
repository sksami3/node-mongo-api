// module.exports = (app) => {
//   const express = require("express");
//   const router = express.Router();
//   var pro = require("../controllers/productController");

//   app.post("/create", pro.create);
//   app.post("/bulk_create", pro.bulk_create);
//   app.get("/get/:id", pro.find);
//   app.get("/getall", pro.findAll);
//   app.put("/update/:id", pro.update);
//   app.delete("/delete", pro.delete);
// };
const express = require("express");
const router = express.Router();
var pro = require("../controllers/productController");

router.post("/create", pro.create);
router.post("/bulk_create", pro.bulk_create);
router.get("/get/:id", pro.find);
router.get("/getall", pro.findAll);
router.put("/update/:id", pro.update);
router.delete("/delete/:id", pro.delete);

module.exports = router;
