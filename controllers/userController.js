const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;
const jwt = require ('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');


module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.getUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err){
      res.send(docs);
    }
    
    else console.log("ID unknown : " + err);
  }).select("-password");
};


module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id},
      {
        $set: {
          pseudo: req.body.pseudo,
          email: req.body.email,
          //password: req.body.password,
          institue: req.body.nstitue,
          phone: req.body.phone,
          numC: req.body.numC,
          role: req.body.role
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.userProfile = (req, res, next) =>{
  UserModel.findOne({ _id: req._id },
      (err, user) => {
          if (!user)
              return res.status(404).json({ status: false, message: 'User record not found.' });
          else
              return res.status(200).json({ status: true, user : _.pick(user,['_id','pseudo','email','role']) });
      }
  );
};

module.exports.getOrganizer = async (req, res) => {
  
  var query = {role: "1"};
  const organizer = await UserModel.find(query);
    res.status(200).json(organizer);
};

module.exports.getClient = async (req, res) => {
  var query = {role: "2"};
  const client = await UserModel.find(query);
    res.status(200).json(client);
  
};

module.exports.connect = (req, res, next) => {
  UserModel.findOne({ email: req.body.email }).then ( user => {
    if(!user) {
      return res.status(401).json({
        message: "Auth1 failed"
      });
    }
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth2 failed"
      });
    }
    const token = jwt.sign({email: user.email, userId: user._id}, "secret", {expiresIn:"1h"} );
    res.status(200).json({
      token: token
    });
  })
  .catch(err => {
    return res.status (401).json({
      message: "Auth failed3"
    });
  });
};

