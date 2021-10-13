const User = require('../models/user');
const bcrypt = require('bcrypt');


function createUser(data){

    let user = new User(data);

    return user.save();

}

function loginUser(data){
    let email = data.email;
    let pass = data.password;
    
    return User.findByEmail(email)
    .then(user => {
      return Promise.all([bcrypt.compare(pass, user.password), user])
       
    })
    .then(([isValid, user]) => {
        if(isValid){
            return user
        }else {
            //throw { message: 'Username or password are invalid'}
            return null;
        }
    })
    
}

module.exports = {
    createUser,
    loginUser
}