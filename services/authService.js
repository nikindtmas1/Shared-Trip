const User = require('../models/user');


function register(data){

    let user = new User(data);

    return user.save();

}

module.exports = {
    register
}