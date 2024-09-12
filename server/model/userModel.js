const mongoose = require('mongoose')

const userSchmea = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profile : {
        type: String,

    },
    ipAddress : [String],
    wallet_count : {
        type : Number,
        default : 0
    }
})


const User = new mongoose.model('User',userSchmea)

module.exports = User;