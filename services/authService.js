const User = require('../models/user');
const bcrypt = require('bcrypt');


function register(data){

    let user = new User(data);

    return user.save();

}

function login(data){

    User.findOne(data.name)
    .then(user => {

    })
    .catch(err => {
        throw{ message: 'No user', status: 404}
    })

}

module.exports = {
    register,
    login
}