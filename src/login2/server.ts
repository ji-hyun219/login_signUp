import { JsonWebTokenError } from "jsonwebtoken";

// [LOAD PACKAGES]
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// bodyParser 모듈 없이는 post, put 요청 메소드의 
// request.body를 읽어올 수 없다


// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('dotenv').config();
// console.log(process.env.PORT)
const PORT = process.env.PORT;


// [CONFIGURE ROUTER]
const router = require('./routes/index')   // router 모듈을 불러옴


// [ CONFIGURE mongoose ]
/// CONNECT TO MONGODB SERVER
const db = require('./db.ts');  // db 불러오기
db();

// DEFINE MODEL
app.use('/', router);




app.listen(PORT, ()=>{
    console.log(`Express App on port ${PORT}!`);
})


