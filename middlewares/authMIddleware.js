const jwt = require('jsonwebtoken');
const { SICRET } = require('../config/config');

function verifyToken(token) {

    return new Promise((resolve, reject) => {
        jwt.verify(token, SICRET, (err, payload) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(payload);
        })
    })
};

function isAuth(req, res, next){
    if(!req.user){
        return res.status(401).redirect('/auth/login');
    }

    next();
}

module.exports = {
    verifyToken,
    isAuth
}