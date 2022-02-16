import { Response, Request, NextFunction } from "express";
import {loginService, signUpService } from "../services/authorization";
import { serviceReturnForm } from "../modules/service-modules";

const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');


require('dotenv').config();  
const YOUR_SECRET_KEY = process.env.SECRET_KEY;


const signUp = async (req: Request, res: Response) => {
    // * Validate user input
    if (!req.body.id || !req.body.name || !req.body.pw) {
        res.status(400).send({ status: 400, message: "Fail SignUp" });
        return;
    }
    const { id, name, pw } = req.body;

    const returnData: serviceReturnForm = await signUpService(
        id,
        name,
        pw
    );
    if (returnData.status == 200) {
        // when successed
        const { status, message, responseData } = returnData;
        res.status(status).send({
            status,
            message,
            responseData,   // 토큰
        });
    } else {
        // when failed
        const { status, message } = returnData;
        res.status(status).send({
            status,
            message,
        });
    }
};


const login = async (req: Request, res: Response) => {
    // * Validate user input
    if (!req.body.id || !req.body.pw) {
        res.status(400).send({
            status: 400,
            message: "Id and Password is both required",
        });
        return;
    }
    const { id, pw } = req.body;
    const returnData: serviceReturnForm = await loginService(id, pw);
    if (returnData.status == 200) {
        // when successed
        const { status, message, responseData } = returnData;
        res.cookie('user', responseData);    // 토큰을 쿠키에 저장
        res.status(status).send({        
            status,
            message,
            responseData,
        });
    } else {
        // when failed
        const { status, message } = returnData;
        res.status(status).send({
            status,
            message,
        });
    }
};

export { signUp, login };




 