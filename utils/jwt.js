const jwt = require('jsonwebtoken');
const { SICRET } = require('../config/config');

module.exports = {

    createToken(_id) {
        return jwt.sign({ _id }, SICRET, { expiresIn: '1h' })
    },

    verifyToken(token) {

        return new Promise((resolve, reject) => {
            jwt.verify(token, SICRET, (err, payload) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(payload);
            })
        })
    }
};
