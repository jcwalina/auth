const jwt = require('jsonwebtoken') 


const verify = (req, res, next) => {
    // check if there is a token in header
    const token = req.header('auth-token')
    if(!token) return res.status(404).send('Access Denied')
    
    // verify the jwt that has been sent from postman
    try{
        const verified = jwt.verify(token, process.env.SECRET ) // verify the token & secret
        req.user = verified
        next()
    }
    catch(err){
        res.json(err)
    }

}

module.exports = verify