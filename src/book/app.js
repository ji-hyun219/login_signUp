// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
var router = require('./routes/index.js')   // router 모듈을 불러옴

// [ CONFIGURE mongoose ]

/// CONNECT TO MONGODB SERVER
mongoose.connect(mongodbKey)
.then(()=>console.log('connection successful'))
.catch((err)=>console.error(err)); 
// mongoose.connect() 메서드로 서버에 접속 

// DEFINE MODEL
app.use('/', router);




// app이 변수로 express 를 받아서 사용할수 있게 하는거거든여
// app. 하면 express에 있는 함수들을 사용할수 있는거에ㅛ
// app.use 하면 뭘 사용한다는건대
// // [CONFIGURE ROUTER]
// var router = require('./routes/index')
// 저희가 만든 api들 있죠
// 걔내를 서버 오픈할때 사용할 수 있도록 연결시켜주는 거라고 생각하며ㅑ대요
// 함수 써서 타고타고 불러오는거에요




// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});