const User = require('../model/Users_model')
const asyncWrapper = require('../middlewares/async')
const connect = require('../db/db-connection')
const sessionsetter = require('../Session')
const { createCustomError } = require('../error/custom-error')

//creating

const post_user_details = asyncWrapper(async(req,res) => {
    sessionsetter(req);
    let User_details;
    var db_name = req.session.db_name
    try {
      const mongoose  =  await connect()
        const db = mongoose.connection.useDb(db_name, { useCache:true })
        if (!Object.keys(db.models).length) {
            let User_model_values = db.model('user',User)
            User_details =  await User_model_values.create(req.body)
        }
      mongoose.connection.close()
    } catch (error) {
        console.log(error);
    }
    res.status(200).json({User_details})
})

//updating

const update_user_details = asyncWrapper(async(req,res,next) => {
  sessionsetter(req);
  let User_details;
  const {id:userId} = req.params
  var db_name = req.session.db_name
  try {
    const mongoose  =  await connect()
      const db = mongoose.connection.useDb(db_name, { useCache:true })
      if (!Object.keys(db.models).length) {
          let User_model_values = db.model('user',User)
          User_details =  await User_model_values.findOneAndUpdate({_id : userId},req.body,{
            new:true,
            runValidators: true,
          })
          if (!User_details) {
            return next(createCustomError(`No user found with user id : ${userId}`,404))
          }
      }
    mongoose.connection.close()
  } catch (error) {
      console.log(error);
  }
  res.status(200).json({User_details}) 
})


//getbyid

const getbyid_user_details = asyncWrapper(async(req,res,next) => {
  sessionsetter(req);
  let User_details;
  const {email} = req.params.email
  const {password} = req.params.password
  var db_name = req.session.db_name
  try {
    const mongoose  =  await connect()
      const db = mongoose.connection.useDb(db_name, { useCache:true })
      if (!Object.keys(db.models).length) {
          let User_model_values = db.model('user',User)
          User_details =  await User_model_values.find({email : email , password :password})
          if (!User_details) {
            return next(createCustomError(`No user found with user eamil : ${email}`,404))
          }
      }
    mongoose.connection.close()
  } catch (error) {
      console.log(error);
  }
  res.status(200).json({User_details}) 
})

module.exports = {
  post_user_details,
  getbyid_user_details,
  update_user_details
}