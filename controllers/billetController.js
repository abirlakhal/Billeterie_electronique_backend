const BilModel = require('../models/billetModel');
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.create= async (req, res) => {
    console.log(req.body);
    const {clas, qrCode} = req.body

    try {
        const bil = await CatModel.create({clas, qrCode});
        res.status(201).json({ bil: bil._id});
    }
    catch(err) {
        res.status(400).send({ err })
    }
}

module.exports.getAllBils = async (req, res) => {
  const bils = await BilModel.find();
  res.status(200).json(bils);
};

module.exports.getBil = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  BilModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select();
};

module.exports.updateBil = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await BilModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          clas: req.body.clas,
          qrCode: req.body.qrCode
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

module.exports.deleteBil = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await BilModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};