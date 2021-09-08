const UserModel = require('../models/userModel');
const jwt = require ('jsonwebtoken');
require('dotenv').config({path: './config/.env'});
const bcrypt = require("bcryptjs");
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const passport = require('passport');
const _ = require('lodash');
const { models } = require('mongoose');
let tokenList={}

//inscription
module.exports.signUp= async (req, res) => {
    let body = req.body;
    if(body){
        const user = await UserModel.create(body);
        res.status(200).json({
            status: 200,
            state: "success ",
            message: "log Up succefully",
            user: user._id  
        })
    };
}

module.exports.signIn = function (req, res) {
    let data = req.body;
    
    if (!data.email || !data.password) {
        res.status(400).json({
            state: "failed",
            message: "verfy the body",
        });
    } else {
        UserModel.findOne({ email: data.email }).then(result=>{
        let User=result 
        //console.log('Useerx',User)

        if (User==null) { 
            res.status(409).json({
                state: "failed",
                message: "Auth failed incorrect email or password",
            });
        } else {

                let pwd=bcrypt.hash(data.password,10)
                bcrypt.compare(pwd, User.password, function (rslt, err) {
         
                if(rslt!=null) {
                    const token = jwt.sign({id: User._id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.JWT_EXP});
                    const refresh_token = jwt.sign({id: User._id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'10m'});
                    const user_info = {
                    token: token,
                    refresh_token: refresh_token,
                    user: {
                        pseudo: User.pseudo,
                        email: User.email,
                        id: User.id
                    }  
                };

                tokenList [refresh_token] = user_info;
                return res.status(200).json({
                    status: 200,
                    state: "success",
                    message: "log in succefully",
                    token: user_info.token,
                    refresh_token: user_info.refresh_token,
                    user: user_info.user
                });

            }else{
                return res.status(409).json({
                message: "Auth failed incorect Email or Password",
                state: "failed"
                });
            }
        });
        }

        })
               
    }       
}; 

module.exports.logout = (req, res) => {
    let refresh_token = req.body.refresh_token;
    if (refresh_token in tokenList) {
        delete tokenList[refresh_token];
        res.status(200).json({
            state: "success",
            message: 'refresh token removed'
        })
    } else {
        res.status(400).json({
            state: "failed",
            message: 'refresh token not removed'
        })
    }
};

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}



