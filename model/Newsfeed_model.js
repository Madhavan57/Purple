const mongoose = require('mongoose')

const Scheme =  new mongoose.Schema({
    img:{
        type:String,
        required:[true,'Must provide the img'],
    },
    title:{
        type:String,
        required:[true,'Must provide the Title'],
        trim:true,
    },
    description:{
        type:String,
        required:[true,'Must provide the Description'],
        trim:true,
    },
    likes:{
        type:String,
    },
    timestamp: {
        type: Date,
        default: Date.now, // This sets the timestamp to the current date/time
      },
})

module.exports = Scheme