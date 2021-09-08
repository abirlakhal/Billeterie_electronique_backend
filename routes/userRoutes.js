const router = require('express').Router();
const authCont = require('../controllers/authController');
const userCont = require('../controllers/userController');
//const checkUser = require('../middleware/auth.middleware');
const jwtHelper = require('../config/jwtHelper');
// auth
router.post("/register", authCont.signUp);
router.post('/login', authCont.signIn);
router.get('/logout', authCont.logout);
//crud
router.get('/', userCont.getAllUsers);
router.get('/org', userCont.getOrganizer);
router.get('/cli', userCont.getClient);
router.get('/user/:id', userCont.getUser);
router.put("/:id",  userCont.updateUser);
router.delete("/:id", userCont.deleteUser);
router.get('/userProfil', jwtHelper.verifyJwtToken ,userCont.userProfile);
router.post('/authenticate',authCont.authenticate);

module.exports = router;