const router = require('express').Router();
const eventCont = require('../controllers/eventController');


//crud
router.post("/create", eventCont.create);
router.get('/', eventCont.getAllEvents);
router.get('/:id', eventCont.getEvent);
router.put("/:id", eventCont.updateEvent);
router.delete("/:id", eventCont.deleteEvent);

module.exports = router;