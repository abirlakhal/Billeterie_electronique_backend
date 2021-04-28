const router = require('express').Router();
const bilCont = require('../controllers/billetController');

//crud
router.post("/create", bilCont.create);
router.get('/', bilCont.getAllBils);
router.get('/:id', bilCont.getBil);
router.put("/:id", bilCont.updateBil);
router.delete("/:id", bilCont.deleteBil);

module.exports = router;