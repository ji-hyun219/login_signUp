const express = require('express');
const router = express.Router();
const usersCtrl = require('../controller/userController');
// const todosController = require('../controllers/todos.controllers');
const { verifyToken } = require('./middlewares/verifyToken');



router.post('/signUp', usersCtrl.signUp);
router.post('/login', usersCtrl.login);
// router.get('/', verifyToken, 'todosController.getAll');

// verifyToken 라는 미들웨어를 거쳐서
// token이 유효한지 확인한다.
// token이 유효하다면 todosController.getAll을 호출한다


module.exports = router;

