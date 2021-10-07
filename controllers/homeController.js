const express = require('express');
const router = express.Router();

const userService = require('../services/userService');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {

    let data = req.body;

    userService.createUser(data);

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {

    let data = req.body;

    userService.createUser(data);

    res.redirect('/');

    res.redirect('/');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/shared-trips', (req, res) => {
    res.render('shared-trips');
});

router.get('/offer-trip', (req, res) => {
    res.render('trip-create');
});


function letValide(req, res, next){
    let isValid = true;

    if(req.body.email.trim().length < 2){
        isValid = false;
    }else if(!req.body.password){
        isValid = false;
    }

    if(isValid){
        next();
    }

}

module.exports = router;