import { Response, Request, NextFunction } from "express";

const jwt = require('jsonwebtoken');
require('dotenv').config();
const YOUR_SECRET_KEY = process.env.SECRET_KEY;


const verifyToken = (req: Request, res:Response, next:NextFunction) => {
try {
    const clientToken = req.cookies.user;
    const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);

    if (decoded) {
        res.locals.userId = decoded.user_id;
        next();
    } else {
        res.status(401).json({ error: 'unauthorized' });
    }
} catch (err) {
    res.status(401).json({ error: 'token expired' });
    }
};


exports.verifyToken = verifyToken;




// jwt가 유효한지 확인할 때는 jwt.verify() 메소드를 사용한다.
// 만약에 jwt가 유효하다면 jwt가 디코딩되어 사용자 정보가 담긴 객체가 반환될 것이고
// jwt가 유효하지 않거나 expired 되었다면 에러가 발생할 것이다.
// 만약에 jwt가 유효하여 사용자 정보가 담긴 객체를 반환받았다면
// 객체에 든 내용은 res.locals에 저장하여 다음에 호출될 함수에 값을 전달한다.


