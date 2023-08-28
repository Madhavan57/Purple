const Newsfeed = require("../model/Newsfeed_model");
const asyncWrapper = require("../middlewares/async");
const connect = require("../db/db-connection");
const sessionsetter = require("../Session");
const { createCustomError } = require("../error/custom-error");
require("dotenv").config();
const mongoose = require("mongoose");

//creating

// const post_newsfeed_details = asyncWrapper(async (req, res) => {
//   sessionsetter(req);
//   let newsfeed_details;
//   const files = req.file;
// let filepath = files.path.split("Desktop/");
//   let img = filepath[1];
//   let received_request_body = JSON.parse(req.body.data);
//   let passing_request_body = { ...received_request_body };
//   passing_request_body.img = img;
//   var db_name = req.session.db_name;
//   try {
//     const mongoose = await connect();
//     // console.log(passing_request_body);
//     const db = mongoose.connection.useDb(db_name, { useCache: true });
//     if (!Object.keys(db.models).length) {
//       let newsfeed_model_values = db.model("newsfeed", Newsfeed);
//       newsfeed_details = await newsfeed_model_values.create(
//         passing_request_body
//       );
//     }
//     mongoose.connection.close();
//     console.log("runned");
//   } catch (error) {
//     console.log(error);
//   }
//   res.status(200).json({ newsfeed_details });
// });

const settingthefiledetais = (file, body) => {
  const obj = file;
  const img = obj.path.split("Desktop/")[1];
  const received_request_body = JSON.parse(body.data);
  return { ...received_request_body, img };
};
const post_newsfeed_details = asyncWrapper(async (req, res) => {
  try {
    sessionsetter(req);
    let newsfeed_details;
    const { file, body, session } = req;
    const values = settingthefiledetais(file, body);
    const db_name = session.db_name;
    newsfeed_details = dbhandlerMiddleware(values, db_name);
    console.log("runned");
    res.status(200).json({ newsfeed_details });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

const dbhandlerMiddleware = async (values, db_name) => {
  let newsfeed_details;
  console.log("inside the dbware");
  const mongoURL = process.env.MONGO_URI;
  const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const mongoose1 = await mongoose
    .connect(mongoURL, mongoOptions)
    .then((conn) => {
      console.log(conn);
      resolve(conn);
    })
    .catch((error) => console.log(error));
  const db = mongoose1.connection.useDb(db_name, { useCache: true });
  if (!Object.keys(db.models).length) {
    const newsfeed_model_values = db.model("newsfeed", Newsfeed);
    newsfeed_details = await newsfeed_model_values.create(values);
  }
  mongoose1.connection.close();
  return newsfeed_details;
};

//updating

const update_newsfeed_details = asyncWrapper(async (req, res, next) => {
  sessionsetter(req);
  let newsfeed_details;
  const { id: newsfeedId } = req.params;
  var db_name = req.session.db_name;
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    if (!Object.keys(db.models).length) {
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
    if (!Object.keys(db.models).length) {
      let newsfeed_model_values = db.model("newsfeed", Newsfeed);
      newsfeed_details = await newsfeed_model_values.find({});
    }
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
    if (!Object.keys(db.models).length) {
      let newsfeed_model_values = db.model("newsfeed", Newsfeed);
      newsfeed_details = await newsfeed_model_values.findOneAndDelete({
        _id: newsfeedId,
      });
      if (!newsfeed_details) {
        return next(
          createCustomError(`No newsfeed with id : ${newsfeedId}`, 404)
        );
      }
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
