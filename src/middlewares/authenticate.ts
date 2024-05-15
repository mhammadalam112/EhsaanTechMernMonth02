import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
const { getChefByUsername } = require('../repositories/chef');
const { getFoodieByUsername } = require('../repositories/foodie');
import Boom from '@hapi/boom';
var userId: string = '';

interface customRequest extends Request {
    userId: string;
    userType: string;
}

interface globalErr extends Error {
    statusCode?: number;
  }

async function userLogin(req: customRequest, res: Response, next: NextFunction) {
    const userName = req.body.userName;

    const query1 = await getChefByUsername(userName);
    const query2 = await getFoodieByUsername(userName);

    if (query1.length < 1 && query2.length < 1) {
        const errorBoom: Error = Boom.badRequest('provided user does not exist. Please register');
        throw errorBoom;
    } else {
        if (query1.length > 0) {
            userId = query1[0].userId;
            req.userType="chef";
        } else {
            userId = query2[0].userId;
            req.userType="foodie";
        }
    }
    next();
};

function authenticateUser(access: string) {
    return async function (req: customRequest, res: Response, next: NextFunction) {

        if (!userId) {
            return res.json({ "error": "user not logged in. Please login again" });
        }

        if (access == "restrictAccess") {

            const token: string | undefined = req.headers.authorization;

            if (!token) {
                return res.json({ "error": "not authorized to perform this operation" });
            }
            const jwtSecretKey: string = process.env.JWT_SECREY_KEY as string;

            const validUser: string | JwtPayload = jwt.verify(token, jwtSecretKey);

            if (!validUser) {
                return res.json({ "error": "not authorized to perform this operation" });
            }
        }

        req.userId = userId;
        next();
    };
};

async function globalErrorHandler(err: globalErr, req: Request, res: Response, next: NextFunction) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    return res.status(err.statusCode).json({ message : err.message});
};


export { authenticateUser, userLogin, globalErrorHandler };