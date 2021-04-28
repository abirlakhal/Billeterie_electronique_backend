const ScatModel = require('../models/scatModel');
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.create= async (req, res) => {
    console.log(req.body);
    const {libelle, categorie} = req.body

    try {
        const scat = await CatModel.create({libelle, categorie});
        res.status(201).json({ scat: scat._id});
    }
    catch(err) {
      res.status(400).json({
        state: "failed",
        message: 'failed'
      });
    }
}

module.exports.getAllScats = async (req, res) => {
  const scats = await SCatModel.find();
  res.status(200).json(scats);
};

module.exports.getScat = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  ScatModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select();
};

module.exports.updateScat = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await ScatModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          libelle: req.body.libelle,
          categorie: req.body.categorie
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

module.exports.deleteScat = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await ScatModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};