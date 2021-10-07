const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);