const router = require('express').Router();
const calCont = require('../controllers/classController');

//crud
router.post("/create", calCont.create);
router.get('/', calCont.getAllClass);
router.get('/:id', calCont.getClass);
router.put("/:id", calCont.updateClass);
router.delete("/:id", calCont.deleteClass);

module.exports = router;