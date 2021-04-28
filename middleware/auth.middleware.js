
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

module.exports.checkUser = (req, res, next) => {

    try{
        console.log( 'headers', req.headers);
        let token = req.headers['authorization'];
        console.log( 'token ', token);
        if(!token) 
        return res.status(403).send({
            auth:"failed",
            message: 'No token provided'
        });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) 
                return res.status(401).send({
                    auth:"failed",
                    message: 'expired token'
                });
                req.user_data = decoded;
                next();
        });
    }catch (err) {
          return res.status(401).json({
          auth:"failed",
          message: 'Auth failed'
        })      
    }
};

