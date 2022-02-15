export {};

const express = require('express');
const router = express.Router();
const usersCtrl = require('../controller/userController');

router.post('/signUp', usersCtrl.signUp);
router.post('/login', usersCtrl.login);


// user 정보와 관련된 요청들은 모두 POST 요청들이다.
// login을 할 때 token을 새로 생성하는 것도 POST 요청이고,
// 새로운 user 정보를 db에 저장하는 것도 POST 요청이다.

module.exports = router;