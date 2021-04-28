const EvalModel = require('../models/evaluationModel');
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.create= async (req, res) => {
    console.log(req.body);
    const {event, rang} = req.body

    try {
        const eval = await EvalModel.create({event, rang});
        res.status(201).json({ eval: eval._id});
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.getAllEvals = async (req, res) => {
  const evals = await EvalModel.find();
  res.status(200).json(evals);
};

module.exports.getEval = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  EvalModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select();
};

module.exports.updateEval = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await EvalModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          event: req.body.event,
          rang: req.body.rang
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

module.exports.deleteEval = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await EvalModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};