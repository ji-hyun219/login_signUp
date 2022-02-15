// 서비스 레이어
// bcrypt 사용 -> 패스워드를 암호화
// jwt 이용해서 토큰 생성

import { NextFunction } from "express";
import bcrypt from "bcrypt-nodejs";
import { serviceReturnForm } from "../modules/service-modules";

const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
let next : NextFunction;

require('dotenv').config();
const YOUR_SECRET_KEY = process.env.SECRET_KEY;


export interface UserType {
    user_id: string;
    user_name: string;
    user_pw: string;
    token: string;
}



const signUpService = async (
    id: string,
    name: string,
    pw: string
) => {
    const returnForm: serviceReturnForm = {
        status: 500,
        message: "server error",
        responseData: {},
    };

    // Validate if Id already exists
    let isIdExist = false;
    await User.findOne({ where: { id : id } })
        .then((data:UserType) => {
            if (data) {
                isIdExist = true;
                returnForm.status = 400;
                returnForm.message = "Id already exist";
            }
        })
        .catch((e:Error) => {
            console.log(e);
            returnForm.status = 500;
            returnForm.message = "Server Error";
            return;
        });
     

// * Create User only when Id not exists
if (!isIdExist) {
    // * Encrypt user password
    let encryptedPassword;  
    bcrypt.genSalt(10, (err:Error, salt:string)=> { 
        if(err) return next(err);
        
        bcrypt.hash(pw, salt, (err:Error, hash:string)=>{
            if(err) return next(err);
            encryptedPassword = hash;
            next();
        });
    })
    // Create Token
    const token = jwt.sign({ id }, YOUR_SECRET_KEY, {
        expiresIn: "20h",
    });

    await new User({
        id: id || "",
        name: name || "",
        pw: encryptedPassword || "",
        token: token || "",
    })
        .save()
        .then((data:UserType) => {
            returnForm.status = 200;
            returnForm.message = "SignUp Success";
            returnForm.responseData = { token: data.token };
        })
        .catch((e:Error) => {
            console.log(e);
            returnForm.status = 500;
            returnForm.message = "Server Error";
        });
}
return returnForm;
};



const loginService = async (id: string, password: string) => {
    const returnForm: serviceReturnForm = {
        status: 500,
        message: "server error",
        responseData: {},
    };

    await User.findOne({
        where: {
            id: id,
        },
        attributes: ["name", "pw", "token"],
    })
        .then(
            async (data:UserType) => {
                // * Validate if email already exists
                if (data) {
                    let isPasswordCorrect;   // PW 검사
                     await bcrypt.compare(
                        password,
                        data.user_pw,
                        (err:Error, same:boolean)=>{
                            if(err) return next(err);
                            isPasswordCorrect = same;
                        },
                    );
                    // * Validate if password is correct
                    if (isPasswordCorrect) {
                        returnForm.status = 200;
                        returnForm.message = "Login Success";
                        returnForm.responseData = { token: data.token };
                    } else {
                        returnForm.status = 400;
                        returnForm.message = "Wrong password";
                    }
                } else {
                    returnForm.status = 400;
                    returnForm.message = "Wrong Id";
                }
            },
            (e:Error) => {
                throw e;
            }
        )
        .catch((e:Error) => {
            console.log(e);
            returnForm.status = 500;
            returnForm.message = "Server Error";
        });
    return returnForm;
};

export { signUpService, loginService };