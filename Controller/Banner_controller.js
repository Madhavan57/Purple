const Banner = require('../model/Banner_model')
const asyncWrapper = require('../middlewares/async')
const connect = require('../db/db-connection')
const sessionsetter = require('../Session')
const { createCustomError } = require('../error/custom-error')

// creating
const post_banner_details = asyncWrapper(async(req,res) => {
    sessionsetter(req);
    let Banner_details;
    var db_name = req.session.db_name
    try {
      const mongoose  =  await connect()
        const db = mongoose.connection.useDb(db_name, { useCache:true })
        if (!Object.keys(db.models).length) {
            let Banner_model_values = db.model('Banner',Banner)
            Banner_details =  await Banner_model_values.create(req.body)
        }
      mongoose.connection.close()
    } catch (error) {
        console.log(error);
    }
    res.status(200).json({Banner_details})
})

//updating

const update_banner_details = asyncWrapper(async(req,res) => {
  sessionsetter(req);
  let Banner_details;
  const {id:bannerId} = req.params
  var db_name = req.session.db_name
  try {
    const mongoose  =  await connect()
      const db = mongoose.connection.useDb(db_name, { useCache:true })
      if (!Object.keys(db.models).length) {
          let Banner_model_values = db.model('Banner',Banner)
          Banner_details =  await Banner_model_values.findOneAndUpdate({_id : bannerId}, req.body,{
            new: true,
            runValidators: true,
          })
          if(!Banner_details){
            return next(createCustomError(`No task with id : ${taskID}`, 404))
          }
      }
    mongoose.connection.close()
  } catch (error) {
      console.log(error);
  }
  res.status(200).json({Banner_details})
})


//getall

const getall_banner_details = asyncWrapper(async(req,res) => {
  sessionsetter(req);
  let Banner_details;
  var db_name = req.session.db_name
  try {
    const mongoose  =  await connect()
      const db = mongoose.connection.useDb(db_name, { useCache:true })
      if (!Object.keys(db.models).length) {
          let Banner_model_values = db.model('Banner',Banner)
          Banner_details =  await Banner_model_values.find({})
      }
    mongoose.connection.close()
  } catch (error) {
      console.log(error);
  }
  res.status(200).json({Banner_details})
})


//delete

const delete_banner_details = asyncWrapper(async(req,res) => {
  sessionsetter(req);
  let Banner_details;
  const {id:bannerId} = req.params
  var db_name = req.session.db_name
  try {
    const mongoose  =  await connect()
      const db = mongoose.connection.useDb(db_name, { useCache:true })
      if (!Object.keys(db.models).length) {
          let Banner_model_values = db.model('Banner',Banner)
          Banner_details =  await Banner_model_values.findOneAndDelete({_id : bannerId})
          if(!Banner_details){
            return next(createCustomError(`No task with id : ${taskID}`, 404))
          }
      }
    mongoose.connection.close()
  } catch (error) {
      console.log(error);
  }
  res.status(200).json({Banner_details})
})


module.exports = {
  post_banner_details,
  update_banner_details,
  delete_banner_details,
  getall_banner_details
}