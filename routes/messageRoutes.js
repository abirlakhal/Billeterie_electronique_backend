const router = require('express').Router();
const messCont = require('../controllers/messageController');

//crud
router.post("/create", messCont.create);
router.get('/', messCont.getAllMessage);
router.get('/:id', messCont.getMessage);
router.put("/:id", messCont.updateMessage);
router.delete("/:id", messCont.deleteMessage);

module.exports = router;