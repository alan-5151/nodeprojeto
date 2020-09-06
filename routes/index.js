const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');



router.get('/', homeController.index);

router.get('/users/login', userController.login);


module.exports = router;   