const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3002
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

app.use(express.json())
app.use(express.urlencoded({
    extended : false
}))

mongoose.connect(process.env.MONGO_DB)

app.get('/', (req, res) => {
    res.send('Welcome to our auth API')
})

app.use('/auth', authRouter)
app.use('/users', userRouter)




app.listen(PORT, console.log(`Server listening on port ${PORT}`))