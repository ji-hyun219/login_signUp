var book = require('./books')

module.exports = {
    book
}



// 이해하기로는 models/books.js 에서 Book 을 export 해서
// models/index.js 에서 그걸 다시 book 으로 받아옴
// book 을 다시 export 함
// controller 파일에서
// book을 db 라는 이름으로 가져옴



// 마자요
// 그니까 원래 굳이 model 폴더에 index파일이 필요없는데
// 나중에 데이터베이스 테이블이 book말고 더 생길꺼자나요?
// 그럼 book, user, reservation 
// 뭐 이런테이블이 더생기면 각각 하나씩 불러와야되거든요
// 그 귀찮음을 덜기위해 index 하나를 부르면 
// 다 따라오도록 한거에요





// 12:28
// model 들 묶음 = index
