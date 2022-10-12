const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcryptjs') // password hashing library
const jwt = require('jsonwebtoken') // JWT - is a structured security token format used to encode JSON data. The main reason to use JWT is to exchange JSON data in a way that can be cryptographically verified. 
const User = require('../models/User')

authRouter.post('/register', async (req, res) => {

    // checking if the email already exists
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists')


    // encrypt the password // encrypt - zaszyfrować
    const salt = await bcrypt.genSalt(10) // default is 10 rounds
    const hashPassword = await bcrypt.hash(req.body.password, salt) // adds salt to the end of the hashed password


    // create the user with the info provided by the user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    user.save()
    res.send(`Welcome to our website ${user.name}`)

})


authRouter.post('/login', async (req, res) => {
    // Email exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email not found, please register')

    // compare the password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Password is not valid, please try again !')

    // create a JWT token 
    const token = jwt.sign({ user: user }, process.env.SECRET) // create token
    res.header('auth-token', token) // put token into header 
    res.json(token) // change format to json
})

module.exports = authRouter