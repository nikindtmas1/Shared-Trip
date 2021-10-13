const jwt = require('jsonwebtoken');
const { SICRET } = require('../config/config');



  function  createToken(user) {
        //return jwt.sign({ _id }, SICRET, { expiresIn: '1h' })

        let payload = {
            _id: user.get('_id'),
            email: user.get('email')
        }
        let options = {
            expiresIn: '2d'
        }
        let token = jwt.sign(payload, SICRET, options);
    
        
        return token;
    };

  

    module.exports = {

        createToken
    };