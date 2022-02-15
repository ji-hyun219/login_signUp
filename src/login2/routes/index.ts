export {};

const express = require('express');
const router = express.Router();
const usersCtrl = require('../controller/userController');

router.post('/signUp', usersCtrl.signUp);
router.post('/login', usersCtrl.login);

module.exports = router;