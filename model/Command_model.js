const mongoose = require('mongoose')

const Scheme =  new mongoose.Schema({
    jewel_id:{
        type:String,
        unique:true,
        required:[true,'Must provide the jewel id'],
        trim:true,
    },
    commands:{
        type:String,
        required:[true,'Must provide the commands'],
        trim:true,
    },
    userid:{
        type:String,
        unique:true,
        required:[true,'Must provide the user id'],
        trim:true,
    }
})

module.exports = Scheme