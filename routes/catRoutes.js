const router = require('express').Router();
const catCont = require('../controllers/catController');

//crud
router.post("/create", catCont.create);
router.get('/', catCont.getAllCats);
router.get('/:id', catCont.getCat);
router.put("/:id", catCont.updateCat);
router.delete("/:id", catCont.deleteCat);

module.exports = router;