const Command = require("../model/Command_model");
const asyncWrapper = require("../middlewares/async");
const connect = require("../db/db-connection");
const sessionsetter = require("../Session");
const { createCustomError } = require("../error/custom-error");

//create

const post_command_details = asyncWrapper(async (req, res) => {
  sessionsetter(req);
  let Command_details;
  var db_name = req.session.db_name;
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    let Command_model_values = db.model("Command", Command);
    Command_details = await Command_model_values.create(req.body);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ Command_details });
});

//get all by jewel id  - jewel_id

const getall_command_details = asyncWrapper(async (req, res, next) => {
  sessionsetter(req);
  let Command_details;
  const { id: Jewel_id } = req.params;
  var db_name = req.session.db_name;
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    let Command_model_values = db.model("Command", Command);
    Command_details = await Command_model_values.find({ jewel_id: Jewel_id });
    if (!Command_details) {
      return next(createCustomError(`No jewel with id : ${Jewel_id}`, 404));
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ Command_details });
});

module.exports = { post_command_details, getall_command_details };
