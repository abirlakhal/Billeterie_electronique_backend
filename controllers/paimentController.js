const PaimentModel = require('../models/paimentModel');
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.create= async (req, res) => {
    console.log(req.body);
    const {billet} = req.body

    try {
        const paiment = await PaimentModel.create({Billet});
        res.status(201).json({ paiment: paiment._id });
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.getAllPaiment = async (req, res) => {
  const paiments = await PaimentModel.find();
  res.status(200).json(paiments);
};

module.exports.getPaiment = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PaimentModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select();
};

module.exports.updatePaiment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PaimentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          Billet: req.body.Billet
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

module.exports.deletePaiment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PaimentModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};