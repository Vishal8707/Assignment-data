const { getDatabase } = require("../db");
const jwt = require("jsonwebtoken");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
const { validateVehicleId, validateEmail } = require("../validation/validator");

const createUsers = async function (req, res) {
  try {
    const email = faker.internet.email();
    const user_id = uuidv4();

    const country = faker.address.country();

    const user_info = {
      address: faker.address.streetAddress(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
    };
    const password = faker.internet.password();
    const hash = bcrypt.hashSync(password, 10);

    const vehicles_id = req.body.vehicles_id;

    if (!vehicles_id || vehicles_id === "")
      return res
        .status(400)
        .send({ status: false, msg: "Vehicle ID is mandatory." });
    if (!validateVehicleId(vehicles_id))
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter valid vehicle ID." });

    const db = getDatabase();
    const vehiclesModel = db.collection("soldVehicles");
    const checkvehicles_id = await vehiclesModel.findOne({
      vehicles_id: vehicles_id,
    });

    if (!checkvehicles_id)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter valid vehicle_Id." });
    const data = {
      email,
      user_id,
      country,
      user_info,
      password: hash,
      vehicles_info: { vehicles_id: vehicles_id },
    };

    const collection = db.collection("users");

    const checkvehicles = await collection.findOne({
      "vehicles_info.vehicles_id": data.vehicles_info.vehicles_id,
    });
  
    if (checkvehicles)
      return res
        .status(400)
        .send({ status: false, msg: "This vehicle ID is already registered." });

    // Define the email as the primary key
    collection.createIndex({ email: 1 }, { unique: true });

    // Perform the 'insertOne' operation to save the data in the 'users' collection
    const saveData = await collection.insertOne(data);

    return res
      .status(201)
      .send({ status: true, msg: "successfully user created", data: data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const userLogin = async function (req, res) {
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
      return res.status(400).send({ status: false, message: "User not found" });

    let token = jwt.sign({ userId: verifyUser["_id"] }, "very-very-secret-key");

    res.setHeader("x-api-key", token);

    return res.status(200).send({
      status: true,
      message: "User login successful",
      data: { _id: verifyUser["_id"], token },
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createUsers, userLogin };
