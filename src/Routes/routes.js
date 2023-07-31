const express = require("express");

const {
  createUsers,
  userLogin,
  getAllCars
} = require("../Controllers/userController");
const { createCars, soldcarCreate } = require("../Controllers/carController");
const { createDeal } = require("../Controllers/dealController");
const {
  createDealership,
  dealershipLogin,
} = require("../Controllers/dealershipController");
const { createAdmin, adminLogin } = require("../Controllers/adminController");

const { isAuthenticated, authorization } = require("../middleware/Auth");

const router = express.Router();

router.get("/test-me", function (req, res) {
  res.send({ test: "Test-API" });
});

router.post("/createAdmin", createAdmin);
router.post("/adminLogin", adminLogin);

router.post("/register", createUsers);
router.post("/login", userLogin);

router.get("/getAllCars", isAuthenticated, getAllCars);

router.post("/createCars", createCars);
router.post("/soldcarCreate", soldcarCreate);

router.post("/createDeal", createDeal);

router.post("/createDealership", createDealership);
router.post("/dealershipLogin", dealershipLogin);

router.all("/*", function (req, res) {
  res.status(404).send({ status: false, msg: "Invalid HTTP request" });
});
module.exports = router;
