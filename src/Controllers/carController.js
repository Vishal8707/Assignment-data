const { getDatabase } = require("../db");
const { v4: uuidv4 } = require("uuid");
const faker = require("faker");


const createCars = async function (req, res) {
  try {
    const car_id = uuidv4();
    const type = faker.vehicle.type();
    const bicycle =faker.vehicle.bicycle();
    const model=faker.vehicle.model();

    const vehicles_info = {
      color: faker.vehicle.color(),
      fuel: faker.vehicle.fuel(),
      manufacturer: faker.vehicle.manufacturer(),
      vin: faker.vehicle.vin(),
      vrm: faker.vehicle.vrm(),
    };

    const data = {
      car_id,
      type,
      bicycle,
      model,
      vehicles_info,
    };

    const db = getDatabase();
    const collection = db.collection("cars");

    // Define the email as the primary key
    collection.createIndex({ car_id: 1 }, { unique: true });

    // Perform the 'insertOne' operation to save the data in the 'users' collection
    const saveData = await collection.insertOne(data);

    return res
      .status(201)
      .send({ status: true, msg: "Successfully sold car created", data: data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};






const soldcarCreate = async function (req, res) {
  try {
    const vehicles_id = uuidv4();
    const car_id = uuidv4();

    const vehicles_info = {
      color: faker.vehicle.color(),
      fuel: faker.vehicle.fuel(),
      manufacturer: faker.vehicle.manufacturer(),
      vin: faker.vehicle.vin(),
      vrm: faker.vehicle.vrm(),
    };

    const data = {
      vehicles_id,
      car_id,
      vehicles_info,
    };

    const db = getDatabase();
    const collection = db.collection("Sold_vehicles");

    // Define the email as the primary key
    collection.createIndex({ vehicles_id: 1 }, { unique: true });

    // Perform the 'insertOne' operation to save the data in the 'users' collection
    const saveData = await collection.insertOne(data);

    return res
      .status(201)
      .send({ status: true, msg: "Successfully car created", data: data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { soldcarCreate, createCars};
