const router = require('express').Router();
const evlCont = require('../controllers/evaluationController');

//crud
router.post("/create", evlCont.create);
router.get('/', evlCont.getAllEvals);
router.get('/:id', evlCont.getEval);
router.put("/:id", evlCont.updateEval);
router.delete("/:id", evlCont.deleteEval);

module.exports = router;