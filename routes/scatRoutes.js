const router = require('express').Router();
const scatCont = require('../controllers/scatController');

//crud
router.post("/create", scatCont.create);
router.get('/', scatCont.getAllScats);
router.get('/:id', scatCont.getScat);
router.put("/:id", scatCont.updateScat);
router.delete("/:id", scatCont.deleteScat);

module.exports = router;