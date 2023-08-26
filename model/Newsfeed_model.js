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
    timestamp:{
        type:String,
        required:[true,'Must provide the timestamp'],
        trim:true,
    }
})

module.exports = Scheme