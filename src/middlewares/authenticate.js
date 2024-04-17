const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: './config/.env' });

async function checkIfUserLoggedIn(req, res, next) {
    try {
        const username = req.cookies.username;

        if (!username) {
            return res.json({ "error": "User Not Logged In. Please Login again" });
        }

        next();
    } catch (err) {
        return res.json({ "error": "User Not Logged In. Please Login again" });
    }
};

async function authenticateUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json({ "error": "Not authorized to perform this operation" });
        }

        const validUser = jwt.verify(token, process.env.JWT_SECREY_KEY);

        if (!validUser) {
            return res.json({ "error": "Not authorized to perform this operation" });
        }

        next();
    } catch (err) {
        return res.json({ "error": "Failed to verify user. Please Login again" });
    }
};


module.exports = { authenticateUser, checkIfUserLoggedIn};