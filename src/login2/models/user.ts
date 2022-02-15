export {};  // 파일이 자체 범위를 가진 모듈임을 표시

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: String,
    user_name: String,
    user_pw: String
});

// 코드를 보면 Schema라는 것을 사용하는데요. 스키마는 테이블의 구조를 뜻합니다. 
// SQL에서는 처음에 테이블을 만들 때 구조를 미리 정하는데요. 
// 몽구스를 사용하면 SQL처럼 컬렉션의 구조를 정할 수 있습니다. 
// 만약 이 구조에 어긋나는 행동을 하면 에러를 일으킵니다.



const User = mongoose.model('user', userSchema);
// model로 User라는 것을 만들어 exports 하면 이제 다른 파일에서 User 모델을 사용할 수 있습니다.
// 그리고 몽고디비에는 users라는 컬렉션이 생긴 것을 볼 수 있습니다. 
// 몽구스에서 User라는 모델을 만들면 몽고디비에는 users 컬렉션이 생깁니다. 
// 만약 Monster 모델을 만들면, monsters로 생기고요. 
// 자동으로 소문자화 + 복수형으로 바꿔줍니다.




module.exports = User;
