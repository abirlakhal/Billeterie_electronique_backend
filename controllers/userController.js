const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

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
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};


module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body.pseudo,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          picture: req.body.picture,
          institue: req.body.nstitue,
          numC: req.body.numC
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
              return res.status(200).json({ status: true, user : _.pick(user,['pseudo','email']) });
      }
  );
};