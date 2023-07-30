const { getDatabase } = require("../db");
const jwt = require("jsonwebtoken");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  validateVehicleId,
  validateEmail,
  validatePassword,
} = require("../validation/validator");

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
    if (!validateVehicleId(vehicles_id))
    return res
    .status(400)
    .send({ status: false, msg: "Please Enter valid vehicle ID." });
    if (!vehicles_id || vehicles_id === "")
    return res
    .status(400)
    .send({ status: false, msg: "Vehicle ID is mandatory." });

    const db = getDatabase();
    const vehiclesModel = db.collection("soldVehicles");
    const checkvehicles_id = await vehiclesModel.find({ vehicles_id: 1 }).toArray();
    if(!checkvehicles_id)return res.status(400).send({status:false, msg:"Please enter valid vehicle_Id."})
    const data = {
      email,
      user_id,
      country,
      user_info,
      password: hash,
      vehicles_info: vehicles_id,
    };

 
    const collection = db.collection("users");

    const checkvehicles = await collection.find({ vehicles_id: 1 }).toArray();
    if(checkvehicles) return res.status(400).send({status:false, msg:"This vehicle ID is already registered."})
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
    let data = req.body;
    let { email, password } = data;

    if (Object.keys(data).length === 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill all the details" });

    if (!email || email == "")
      return res.status(400).send({ status: false, msg: "email is mandatory" });

    if (!password || password == "")
      return res
        .status(400)
        .send({ status: false, msg: "password is mandatory" });

    if (!validateEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  email" });

    if (!validatePassword(password))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  password" });

    const db = getDatabase();
    const collection = db.collection("users");

    let verifyUser = await collection.find({
      email: email,
      password: password,
    });

    if (!verifyUser)
      return res.status(400).send({ status: false, message: "user not found" });

    let token = jwt.sign({ userId: verifyUser["_id"] }, "very-very-secret-key");

    res.setHeader("x-api-key", token);

    return res.status(200).send({
      status: true,
      message: "User login successfull",
      data: { userId: verifyUser["_id"], token },
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.msg });
  }
};

module.exports = { createUsers, userLogin };
