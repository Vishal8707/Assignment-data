const { getDatabase } = require("../db");
const { v4: uuidv4 } = require("uuid");

const createDeal = async function (req, res) {
  try {
    const car_id = req.body.car_id;
    let deal_info_str = req.body.deal_info;

    if (!car_id)
      return res
        .status(400)
        .send({ status: false, msg: "CarId is mandatory." });

    // Clean up the string if needed (e.g., remove escape characters)
    // For example, if the string contains extra escape backslashes, remove them:
    deal_info_str = deal_info_str.replace(/\\/g, "");

    const deal_info = JSON.parse(deal_info_str);

    const deal_id = uuidv4();

    const data = {
      deal_id,
      car_id,
      deal_info,
    };

    const db = getDatabase();
    const collection = db.collection("deals");

    const saveData = await collection.insertOne(data);

    return res
      .status(201)
      .send({ status: true, msg: "Successfully deal created", data: data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createDeal };
