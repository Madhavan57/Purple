const Jewellery = require("../model/Jewellery_model");
const asyncWrapper = require("../middlewares/async");
const connect = require("../db/db-connection");
const { createCustomError } = require("../error/custom-error");
const path = require("path");
const { log } = require("console");

// creating

const post_jewellery_details = asyncWrapper(async (req, res) => {
  let Jewellery_details = 0;
  //var db_name = req.session.Shopname
  const files = req.files;
  let img = [];
  let overlay;

  if (files.overlay) {
    for (const file of files.overlay) {
      let filepath = file.path.split("Desktop/");
      overlay = filepath[1];
    }
    if (files.image) {
      for (const file of files.image) {
        let filepath = file.path.split("Desktop/");
        img.push(String(filepath[1]));
      }
    }
  }

  let received_request_body = JSON.parse(req.body.data);
  let passing_request_body = { ...received_request_body };
  passing_request_body.image = img;
  passing_request_body.overlay = overlay;

  var db_name = "jiamazecom_shop";
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    if (!Object.keys(db.models).length) {
      let jewellery_model_values = db.model("Jewel", Jewellery);
      Jewellery_details = await jewellery_model_values.create(
        passing_request_body
      );
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ Jewellery_details });
  res.status(200).json("success");
});

//deleting

const delete_jewellery_details = asyncWrapper(async (req, res, next) => {
  let Jewellery_details;
  const { id: jewelId } = req.params;
  //var db_name = req.session.Shopname
  var db_name = "jiamazecom_shop";
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    if (!Object.keys(db.models).length) {
      let jewellery_model_values = db.model("Jewel", Jewellery);
      Jewellery_details = await jewellery_model_values.findOneAndDelete({
        _id: jewelId,
      });
      if (!Jewellery_details) {
        return next(createCustomError(`No jewel with id : ${jewelId}`, 404));
      }
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ Jewellery_details });
});

//getting all

const getall_jewellery_details = asyncWrapper(async (req, res) => {
  let Jewellery_details;
  //var db_name = req.session.Shopname
  var db_name = "jiamazecom_shop";
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    if (!Object.keys(db.models).length) {
      let jewellery_model_values = db.model("Jewel", Jewellery);
      Jewellery_details = await jewellery_model_values.find({});
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ Jewellery_details });
});

//getting one

const getid_jewellery_details = asyncWrapper(async (req, res, next) => {
  let Jewellery_details;
  const { id: jewelId } = req.params;
  //var db_name = req.session.Shopname
  var db_name = "jiamazecom_shop";
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    if (!Object.keys(db.models).length) {
      let jewellery_model_values = db.model("Jewel", Jewellery);
      Jewellery_details = await jewellery_model_values.findOne({
        _id: jewelId,
      });
      if (!Jewellery_details) {
        return next(createCustomError(`No jewel with id : ${jewelId}`, 404));
      }
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ Jewellery_details });
});

//updating

const update_jewellery_details = asyncWrapper(async (req, res, next) => {
  let Jewellery_details;
  const { id: jewelId } = req.params;
  //var db_name = req.session.Shopname
  var db_name = "jiamazecom_shop";
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    if (!Object.keys(db.models).length) {
      let jewellery_model_values = db.model("Jewel", Jewellery);
      Jewellery_details = await jewellery_model_values.findOneAndUpdate(
        { _id: jewelId },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!Jewellery_details) {
        return next(createCustomError(`No jewel with id : ${jewelId}`, 404));
      }
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ Jewellery_details });
});

module.exports = {
  post_jewellery_details,
  delete_jewellery_details,
  update_jewellery_details,
  getall_jewellery_details,
  getid_jewellery_details,
};
