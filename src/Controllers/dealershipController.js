const { getDatabase } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const faker = require("faker");

const createDealership = async function (req, res) {
  try {
    const dealership_email = faker.internet.email();
    const dealership_id = uuidv4();
    const dealership_name = faker.company.name();
    const dealership_location = faker.address.streetAddress();
    const password = faker.internet.password();
    const hash = bcrypt.hashSync(password, 10);

    const dealership_info = {
      country: faker.location.country(),
      city: faker.location.city(),
      buildingNumber: faker.location.buildingNumber(),
    };

    const data = {
      dealership_email,
      dealership_id,
      dealership_name,
      dealership_location,
      password:hash,
      dealership_info,
    };

    const db = getDatabase();
    const collection = db.collection("users");

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

module.exports = { createDealership };
