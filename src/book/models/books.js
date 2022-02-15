// schema는 document의 구조가 어떻게 생겼는지 알려주는 역할을 합니다.

// schema에서 사용되는 SchemaType은 총 8종류가 있습니다.

// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// Objectid
// Array

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

// model 은 데이터베이스에서 데이터를 읽고 생성하고 수정하는 프로그래밍 인터페이스를 정의한다.
// 첫번째 인자 book’ 은 해당 document가 사용 할 collection의 단수적 표현입니다. 
// 즉, 이 모델에서는 ‘books’ collection 을 사용하게 되겠죠. 
// 이렇게 자동으로 단수적 표현을 복수적(plural) 형태로 변환하여 그걸 collection 이름으로 사용합니다. 
// collection 이름을 plural 형태로 사용하는건 mongodb의 네이밍컨벤션 중 하나입니다.
// 만약에, collection 이름을 임의로 정하고 싶다면, schema 를 만들 때 따로 설정해야 합니다.

var Book = mongoose.model('book', bookSchema);

module.exports = Book;