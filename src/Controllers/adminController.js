const { getDatabase } = require("../db");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const faker = require("faker");

const createAdmin = async function (req, res) {
  try {
    const admin_id = uuidv4();
    const password = faker.internet.password();
    const hash = bcrypt.hashSync(password, 10);

    const data = {
      admin_id,
      password: hash,
    };

    const db = getDatabase();
    const collection = db.collection("admin");

    // Define the email as the primary key
    collection.createIndex({ admin_id: 1 }, { unique: true });

    // Perform the 'insertOne' operation to save the data in the 'users' collection
    const saveData = await collection.insertOne(data);

    return res
      .status(201)
      .send({ status: true, msg: "Successfully admin created", data: data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const adminLogin = async function (req, res) {
  try {
    let admin_id = req.body.admin_id;

    if (!admin_id || admin_id === "")
      return res.status(400).send({ status: false, msg: "email is mandatory" });

    const db = getDatabase();
    const collection = db.collection("admin");

    let verifyUser = await collection.findOne({ admin_id: admin_id });

    if (!verifyUser)
      return res.status(400).send({ status: false, message: "Admin not found" });

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

module.exports = { createAdmin, adminLogin };
