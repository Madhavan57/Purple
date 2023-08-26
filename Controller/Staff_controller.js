const Staff = require('../model/Staff_model')
const asyncWrapper = require('../middlewares/async')
const connect = require('../db/db-connection')
const sessionsetter = require('../Session')
const { createCustomError } = require('../error/custom-error')


//creating

const post_staff_details = asyncWrapper(async(req,res) => {
    sessionsetter(req);
    let Staff_details;
    var db_name = req.session.db_name
    try {
      const mongoose  =  await connect()
        const db = mongoose.connection.useDb(db_name, { useCache:true })
        if (!Object.keys(db.models).length) {
            let Staff_model_values = db.model('staff',Staff)
            Staff_details =  await Staff_model_values.create(req.body)
        }
      mongoose.connection.close()
    } catch (error) {
        console.log(error);
    }
    res.status(200).json({Staff_details})
})

//updating

const update_staff_details = asyncWrapper(async(req,res,next) => {
  sessionsetter(req);
  let Staff_details;
  const {_id:staffId} = req.params
  var db_name = req.session.db_name
  try {
    const mongoose  =  await connect()
      const db = mongoose.connection.useDb(db_name, { useCache:true })
      if (!Object.keys(db.models).length) {
          let Staff_model_values = db.model('staff',Staff)
          Staff_details =  await Staff_model_values.findOneAndUpdate({_id : staffId},req.body,{
            new:true,
            runValidators:true,
          })
          if (!Staff_details) {
            return next(createCustomError(`No staff found on ${staffId}`,404))
          }
      }
    mongoose.connection.close()
  } catch (error) {
      console.log(error);
  }
  res.status(200).json({Staff_details})
})

//getbyparams

const getid_staff_details = asyncWrapper(async(req,res,next) => {
  sessionsetter(req);
  let Staff_details;
  const {email} = req.params.email
  const {password} = req.params.password
  var db_name = req.session.db_name
  try {
    const mongoose  =  await connect()
      const db = mongoose.connection.useDb(db_name, { useCache:true })
      if (!Object.keys(db.models).length) {
          let Staff_model_values = db.model('staff',Staff)
          Staff_details =  await Staff_model_values.find({email : email , password :password})
          if (!Staff_details) {
            return next(createCustomError(`No staff found on ${email}`,404))
          }
      }
    mongoose.connection.close()
  } catch (error) {
      console.log(error);
  }
  res.status(200).json({Staff_details})
})

module.exports = {
  post_staff_details,
  update_staff_details,
  getid_staff_details
}