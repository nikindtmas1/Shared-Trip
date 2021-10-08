const User = require('../models/user');
const bcrypt = require('bcrypt');


function register(data){

    let user = new User(data);

    return user.save();

}

function login(data){

  return  User.findOne(data.name)
    .then(user => {
        if(!user) return Promise.reject({ message: 'No such user' })
    })
    .catch(err => {
        throw{ message: 'No such user', status: 404}
    })

}

module.exports = {
    register,
    login
}