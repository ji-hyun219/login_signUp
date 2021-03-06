export {};  // 파일이 자체 범위를 가진 모듈임을 표시

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: String,
    user_name: String,
    user_pw: String,
    // token 추가해야 할 것 같다.
});

const User = mongoose.model('user', userSchema);

module.exports = User;
