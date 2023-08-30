const User = require("../model/Users_model");
const connect = require("../db/db-connection");
var fs = require("fs");
const path = require("path");

const getbyid_user_details_helper = async (id, req) => {
  let User_details;
  var db_name = req.session.db_name;
  try {
    const mongoose = await connect();
    const db = mongoose.connection.useDb(db_name, { useCache: true });
    let User_model_values = db.model("user", User);
    User_details = await User_model_values.find({
      _id: id,
    });
    if (!User_details) {
      //return `No user found with user id : ${userid}`;
    }
    mongoose.connection.close();

    filedeletion(User_details);
  } catch (error) {
    console.log(error);
  }
};

const filedeletion = async (User_details) => {
  if (User_details[0].profileimg != null) {
    fs.unlink(
      path.join(__dirname, "../uploads") + User_details[0].profileimg,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }
};

module.exports = getbyid_user_details_helper;
