const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: false
    },
     profileImage: {
        type: String,
        required: false
    },
     bgImage: {
        type: String,
        required: false
    },
     bio: {
        type: String,
        required: false
    },
    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
})

module.exports =  mongoose.model('UserModel', userSchema);