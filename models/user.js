const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'asdasd';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
    history: 
        [{
            type: 'ObjectId',
            ref: 'tripModel'
        }]
    
    
});

userSchema.pre('save', function(next){
    bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(password, salt, function(err, hash){
            password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);