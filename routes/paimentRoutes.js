const router = require('express').Router();
const paiCont = require('../controllers/paimentController');

//crud
router.post("/create", paiCont.create);
router.get('/', paiCont.getAllPaiment);
router.get('/:id', paiCont.getPaiment);
router.put("/:id", paiCont.updatePaiment);
router.delete("/:id", paiCont.deletePaiment);

module.exports = router;