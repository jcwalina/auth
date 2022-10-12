const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    name : {
        type : String,
        required : true,    
    },
    email : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 25,
        unique : [true, 'Email already exist'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
          ] // to jest kod ktory upewni sie ze przy wpisywaniu emailu, wszystkie litery beda dozwolone
    },
    password : {
        type : String, 
        required : true,
        minlength : 5,
    }
})

module.exports = mongoose.model('User', User)