const router = require('express').Router();
const eventCont = require('../controllers/eventController');
const upload = require ('../middleware/upload')
//crud
router.post("/create", upload.single('picture'), eventCont.create);
router.get('/', eventCont.getAllEvents);
router.get('/:id', eventCont.getEvent);
router.put("/:id", eventCont.updateEvent);
router.delete("/:id", eventCont.deleteEvent);


module.exports = router;