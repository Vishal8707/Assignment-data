const { getDatabase } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const faker = require("faker");

const createDealership = async function (req, res) {
  try {
    const dealership_email = faker.internet.email();
    const dealership_id = uuidv4();
    const dealership_name = faker.vehicle.manufacturer();
    const dealership_location = faker.address.streetAddress();

    const password = faker.internet.password();
    const hash = bcrypt.hashSync(password, 10);

    const dealership_info = {
      address: faker.address.streetAddress(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    };

    const cars_id = req.body.cars_id;
    const deal_id = req.body.deal_id;
    const vehicles_id = req.body.vehicles_id;

    const data = {
      dealership_email,
      dealership_id,
      dealership_name,
      dealership_location,
      password: hash,
      dealership_info,
      cars: { cars_id: cars_id },
      deals: { deal_id: deal_id },
      sol_vehicles: { vehicles_id: vehicles_id },
    };

    const db = getDatabase();
    const collection = db.collection("dealership");

    // Define the email as the primary key
    collection.createIndex({ email: 1 }, { unique: true });

    // Perform the 'insertOne' operation to save the data in the 'users' collection
    const saveData = await collection.insertOne(data);

    return res
      .status(201)
      .send({
        status: true,
        msg: "successfully dealership created",
        data: data,
      });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const dealershipLogin = async function (req, res) {
  try {
    let email = req.body.email;

    if (!email || email === "")
      return res.status(400).send({ status: false, msg: "email is mandatory" });

    if (!validateEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid email" });

    const db = getDatabase();
    const collection = db.collection("users");

    let verifyUser = await collection.findOne({ email: email });

    if (!verifyUser)
      return res
        .status(400)
        .send({ status: false, message: "dealership not found" });

    let token = jwt.sign({ userId: verifyUser["_id"] }, "very-very-secret-key");

    res.setHeader("x-api-key", token);

    return res.status(200).send({
      status: true,
      message: "User login successful",
      data: { userId: verifyUser["_id"], token },
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createDealership, dealershipLogin };
