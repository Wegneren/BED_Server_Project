const auth = require('basic-auth');

const ADMIN_USER = process.env.AUTH_USERNAME;
const ADMIN_PASS = process.env.AUTH_PASSWORD;

module.exports = function (req, res, next) {
    console.log("ADMIN_USER:", ADMIN_USER);
    console.log("ADMIN_PASS:", ADMIN_PASS);

    const user = auth(req);
    console.log("Received auth:", user);


    if (!user || user.name !== ADMIN_USER || user.pass !== ADMIN_PASS) {
        res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
        return res.status(401).jsend.fail({ message: 'Authentication required' });
    }

    next();
};
