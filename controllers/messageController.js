const MessageModel = require('../models/messageModel');
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.create= async (req, res) => {
    console.log(req.body);
    const {user,main} = req.body

    try {
        const message = await PaimentModel.create({user,main});
        res.status(201).json({ message: message._id });
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.getAllMessage = async (req, res) => {
  const messages = await MessageModel.find();
  res.status(200).json(messages);
};

module.exports.getMessage = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  MessageModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select();
};

module.exports.updateMessage = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await MessageModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          user: req.body.user,
          main: req.body.main
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

module.exports.deleteMessage = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await MessageModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};