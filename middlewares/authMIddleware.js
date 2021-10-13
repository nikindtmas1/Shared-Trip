const jwt = require('jsonwebtoken');
const { SICRET } = require('../config/config');

// function verifyToken(token) {

//     return new Promise((resolve, reject) => {
//         jwt.verify(token, SICRET, (err, payload) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(payload);
//         })
//     })
// };

function auth(req, res, next){
    let token = req.cookies.cookieToken;
  

    if(!token){
        return next();
    }

    jwt.verify(token, SICRET, function(err, decodedToken){
        if(err) {
            return res.status(401).redirect('/auth/login');
        }

        //let email = req.body.email;
        req.user = decodedToken;
        res.locals.user = decodedToken;
        //res.locals.email = req.body.email;
        next();
    });

}

function isAuth(req, res, next){
    if(!req.user){
        return res.status(401).redirect('/auth/login');
    }

    next();
}

module.exports = {
    //verifyToken,
    auth,
    isAuth
}