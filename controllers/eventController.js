const EventModel = require('../models/eventModel');
const ObjectID = require("mongoose").Types.ObjectId;


/*module.exports.create= async (req, res) => {
    console.log(req.body);
    const {title, date, time, place, description, picture, cat} = req.body

    try {
        const event = await EventModel.create({title, date, time, place, picture, description, cat});
        res.status(201).json({ event: event._id});
    }
    catch(err) {
        res.status(400).send({ err })
    }

}
*/
module.exports.create = (req, res, next) => {
  let event = new EventModel({
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    place: req.body.place,
    description: req.body.description,
    price: req.body.price, 
    cat: req.body.cat,
  })
  if(req.file){
    event.picture = req.file.path
  }
  event.save()
  .then(response => {
    res.json({
      message: "Event added"
    })
  })
  .catch(error => {
    res.json({
      message: 'An error'
    })
  })
}

module.exports.getAllEvents = async (req, res) => {
  const events = await EventModel.find();
  res.status(200).json(events);
};

module.exports.getEvent = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  EventModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select();
};

module.exports.getEventByCat = async (req, res) => {
  
  var query = {cat: req.params.id };
  const events = await EventModel.find(query);
    res.status(200).json(events);
  
};

module.exports.updateEvent = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await EventModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          date: req.body.date,
          time: req.body.time,
          place: req.body.place,
          picture: req.body.picture,
          description: req.body.description,
          cat: req.body.cat
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(400).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports.deleteEvent = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await EventModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};