const express = require('express')
const userRouter = express.Router()
const User = require('../models/User')
const verify = require('../middleware/verify')

// userRouter.get('/', (req, res) => { // don't use this block
//     User
//     .find()
//     .then(users => res.json(users))
//     .catch(err => console.log(err))
// } )

userRouter.get('/', verify,  async (req, res) => { // use this block instead
    try{
        res.json(req.user)
    }
    catch(err){
        res.json(err)
    }
})

module.exports = userRouter