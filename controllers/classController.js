const ClassModel = require('../models/classModel');
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.create= async (req, res) => {
    console.log(req.body);
    const {price, event, nbPlace} = req.body

    try {
        const clas = await EvalModel.create({price, event, nbPlace});
        res.status(201).json({ clas: clas._id});
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.getAllClass = async (req, res) => {
  const clas = await ClassModel.find();
  res.status(200).json(clas);
};

module.exports.getClass = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  ClassModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select();
};

module.exports.updateClass = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await ClassModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          price: req.body.price,
          event: req.body.event,
          nbPlace: req.body.nbPlace
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

module.exports.deleteClass = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await ClassModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};