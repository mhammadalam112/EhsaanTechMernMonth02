const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: './config/.env' });
var username = '';

async function userLogin(req, res, next) {
    try {
        username = req.body.userName;
        next();
    } catch (err) {
        return res.json({ "error": "something went wrong" });
    }
};

function authenticateUser(access) {
    try {

        return async function (req, res, next) {

            if (!username) {
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
            
            next();
        };
    } catch (err) {
        return res.json({ "error": "failed to verify user. Please login again" });
    }
};

async function setFoodieUsername(req, res, next) {
    try {
        req.username = username;
        next();
    } catch (err) {
        return res.json({ "error": "something went wrong" });
    }
};

module.exports = { authenticateUser, userLogin, setFoodieUsername };