const mongoose = require('mongoose')

const Scheme =  new mongoose.Schema({
    img:{
        type:String,
        required:[true,'Must provide the img'],
    },
    Banner_Heading:{
        type:String,
        required:[true,'Must provide the Banner Heading'],
        trim:true,
    },
    Banner_Description:{
        type:String,
        required:[true,'Must provide the Banner Description'],
        trim:true,
    }
})

module.exports = Scheme