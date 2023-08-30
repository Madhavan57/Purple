const Shop_model = require("../model/Shop_model");
const asyncWrapper = require("../middlewares/async");
const connect = require("../db/db-connection");

const createShop = asyncWrapper(async (req, res) => {
  let Shop_details;
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb("Registry", { useCache: true });
    let request_object = req.body;
    let Domain_name = request_object.domain_name;
    let passing_object = { ...request_object };
    passing_object.db_name = passing_object.domain_name + "_" + "shop";
    sessionidsetter(req);
    passing_object.session_id = req.session.session_id;
    let Shop_model_values = db.model(Domain_name || "Shop_details", Shop_model);
    console.log("Passsing Object " + passing_object);
    Shop_details = await Shop_model_values.create(passing_object);
    sessionsetter(passing_object, req);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ Shop_details });
});

function sessionsetter(passing_object, req) {
  var session = req.session;
  session.db_name = passing_object.db_name;
  console.log("session name : " + session.db_name);
}

function sessionidsetter(req) {
  var session = req.session;
  session.session_id = "2390dugjhfut6r48900056";
  console.log("session name : " + session.session_id);
}

module.exports = createShop;
