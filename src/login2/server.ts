import { JsonWebTokenError } from "jsonwebtoken";

// [LOAD PACKAGES]
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('dotenv').config();
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


