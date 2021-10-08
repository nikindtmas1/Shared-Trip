const User = require('../models/user');
const bcrypt = require('bcrypt');


function register(data){

    let user = new User(data);

    return user.save();

}

async function login(data){

  let user = await User.findOne(data.email)
   console.log(user);
        if(!user) return Promise.reject({ message: 'No such user' })

       let areEqual = await bcrypt.compare(data.password, user.password)
       
        if(!areEqual) return Promise.reject({ message: 'Invalid password', status: 404})
    
        return user
}

module.exports = {
    register,
    login
}