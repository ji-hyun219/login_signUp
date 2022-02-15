import { NextFunction } from "express";

const mongoose = require('mongoose');

module.exports = () => {
  function connect() {
    mongoose.connect('mongodb://localhost:27017', function(err: Error) {
      if (err) {
        console.error('mongoDB connection error', err);
      }
      console.log('mongoDB connected');
    });
  }

  connect();
  mongoose.connection.on('disconnected', connect);
  // 윗 부분은 연결이 해제될 시에 다시 connect 함수를 실행하는 부분

  require('./models/index'); // 나중에 생성?
};