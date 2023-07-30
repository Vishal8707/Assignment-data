const { getDatabase } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const faker = require("faker");

const createAdmin = async function (req, res) {
  try {
    const admin_id = uuidv4();
    const password = faker.internet.password();
    const hash = bcrypt.hashSync(password, 10);

    const data = {
      admin_id,
      password:hash,
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

module.exports = { createAdmin };
