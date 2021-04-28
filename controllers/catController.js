const CatModel = require('../models/catModel');
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.create= async (req, res) => {
    console.log(req.body);
    const {libelle} = req.body

    try {
        const cat = await CatModel.create({libelle});
        res.status(201).json({ cat: cat._id});
    }
    catch(err) {
      res.status(400).json({
        state: "failed",
        message: 'failed'
      });
    }
}

module.exports.getAllCats = async (req, res) => {
  const cats = await CatModel.find();
  res.status(200).json(cats);
};

module.exports.getCat = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  CatModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select();
};

module.exports.updateCat = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await CatModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          libelle: req.body.libelle
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

module.exports.deleteCat = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await CatModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};