const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SICRET, SETL_ROUNDS } = require('../config/config');


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
        bcrypt.genSalt(SETL_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        });
    
    });

    userSchema.static('findByEmail', function(email){
        return this.findOne({email});
    })

module.exports = mongoose.model('User', userSchema);