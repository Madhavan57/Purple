const mongoose = require('mongoose')

const Scheme =  new mongoose.Schema({
    username: {
        type : String,
        required:[true,'Must provide the user name'],
        trim:true,
        maxlength :[100,'name can not be more than 40 characters']
    },
    email:{
        type:String,
        unique: true,
        required:[true,'Must provide the email'],
        trim:true,
    },
    password: {
        type : String,
        required:[true,'Must provide the Password'],
        trim:true,
    },
    profileimg:{
        type:String,
        trim:true,
    },
    phone:{
        type:String,
        unique:true,
        required:[true,'Must provide the Contact Number'],
        trim:true,
    }

})

module.exports = Scheme