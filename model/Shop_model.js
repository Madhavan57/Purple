const mongoose = require('mongoose')

// _id
// 64e0d60dfb0d316c94d40760
// user_name
// "karthikeyan_ts"
// password
// "karthi@2002"
// db_name
// "svasfv234234"
// shop_name
// "Aarthi jewellry"
// domain_name
// "aarthi.techsnapie.com"
// session_id
// "45ffhdofg343i493"

const Scheme =  new mongoose.Schema({
    user_name: {
        type : String,
        required:[true,'Must provide the user name'],
        trim:true,
        maxlength :[100,'name can not be more than 35 characters']
    },
    password: {
        type : String,
        required:[true,'Must provide the Password'],
        trim:true
    },
    db_name:{
        type:String,
        unique: true,
        trim:true,
    },
    domain_name:{
        type:String,
        unique:true,
        required:[true,'Must provide the Domain Name'],
        trim:true,
    },
    session_id:{
        type:String,
        trim:true
    },
})

module.exports = Scheme

