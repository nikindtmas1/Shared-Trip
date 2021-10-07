const User = require('../models/user');


function createUser(data){

    let user = new User(data);

    return user.save();

}

module.exports = {
    createUser
}