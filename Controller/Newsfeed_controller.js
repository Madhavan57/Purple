const Newsfeed = require("../model/Newsfeed_model");
const asyncWrapper = require("../middlewares/async");
const connect = require("../db/db-connection");
const sessionsetter = require("../Session");
const { createCustomError } = require("../error/custom-error");
require("dotenv").config();

//creating

const post_newsfeed_details = asyncWrapper(async (req, res) => {
  sessionsetter(req);
  let newsfeed_details;
  const files = req.file;
  let filepath = files.path.split("uploads")[1];
  let received_request_body = req.body;
  let passing_request_body = { ...received_request_body, img: filepath };
  var db_name = req.session.db_name;
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    let newsfeed_model_values = db.model("newsfeed", Newsfeed);
    newsfeed_details = await newsfeed_model_values.create(passing_request_body);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ newsfeed_details });
});

//updating

const update_newsfeed_details = asyncWrapper(async (req, res, next) => {
  sessionsetter(req);
  let newsfeed_details;
  const { id: newsfeedId } = req.params;
  var db_name = req.session.db_name;
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    let newsfeed_model_values = db.model("newsfeed", Newsfeed);
    newsfeed_details = await newsfeed_model_values.findOneAndUpdate(
      { _id: newsfeedId },
      req.body,
      {
        new: true,
        runValidatores: true,
      }
    );
    if (!newsfeed_details) {
      return next(
        createCustomError(`No newsfeed with id : ${newsfeedId}`, 404)
      );
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ newsfeed_details });
});

//getall

const getall_newsfeed_details = asyncWrapper(async (req, res) => {
  sessionsetter(req);

  let newsfeed_details;
  var db_name = req.session.db_name;

  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    let newsfeed_model_values = db.model("newsfeed", Newsfeed);
    newsfeed_details = await newsfeed_model_values.find({});
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ newsfeed_details });
});

//deleting

const delete_newsfeed_details = asyncWrapper(async (req, res, next) => {
  sessionsetter(req);
  let newsfeed_details;
  const { id: newsfeedId } = req.params;
  var db_name = req.session.db_name;
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    let newsfeed_model_values = db.model("newsfeed", Newsfeed);
    newsfeed_details = await newsfeed_model_values.findOneAndDelete({
      _id: newsfeedId,
    });
    if (!newsfeed_details) {
      return next(
        createCustomError(`No newsfeed with id : ${newsfeedId}`, 404)
      );
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ newsfeed_details });
});

module.exports = {
  post_newsfeed_details,
  getall_newsfeed_details,
  update_newsfeed_details,
  delete_newsfeed_details,
};
