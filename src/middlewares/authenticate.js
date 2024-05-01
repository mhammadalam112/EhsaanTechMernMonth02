const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: './config/.env' });
const { getChefByUsername } = require('../repositories/chef');
const { getFoodieByUsername } = require('../repositories/foodie');
const Boom = require('@hapi/boom');
var userId = '';

async function userLogin(req, res, next) {
    const userName = req.body.userName;

    const query1 = await getChefByUsername(userName);
    const query2 = await getFoodieByUsername(userName);

    if (query1.length < 1 && query2.length < 1) {
        const errorBoom = Boom.badRequest('provided user does not exist. Please register');
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

function authenticateUser(access) {
    return async function (req, res, next) {

        if (!userId) {
            return res.json({ "error": "user not logged in. Please login again" });
        }

        if (access == "restrictAccess") {

            const token = req.headers.authorization;

            if (!token) {
                return res.json({ "error": "not authorized to perform this operation" });
            }

            const validUser = jwt.verify(token, process.env.JWT_SECREY_KEY);

            if (!validUser) {
                return res.json({ "error": "not authorized to perform this operation" });
            }
        }

        req.userId = userId;
        next();
    };
};

async function globalErrorHandler(err, req, res, next) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    return res.status(err.statusCode).json({ message : err.message});
};


module.exports = { authenticateUser, userLogin, globalErrorHandler };