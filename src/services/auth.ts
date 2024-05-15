import { Response } from 'express';
import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface customResponse extends Response {
    token: string;
}

interface user {
    userId: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    createdts: Date;
}

async function login(user: user[], userName: string, password: string, res: customResponse, userType: string) {
    var userPassword = user[0].password;

    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) {
        const errorBoom = Boom.badRequest('provided username or password is incorrect');
        throw errorBoom;
    }


    if (userType == 'chef') {
        const jwtSecretKey: string = process.env.JWT_SECREY_KEY as string;
        const token = jwt.sign({ username: userName }, jwtSecretKey, { expiresIn: '1h' });
        res.token = token;
    }
};


export {
    login
};