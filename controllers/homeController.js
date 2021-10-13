const express = require('express');
const router = express.Router();

const homeService = require('../services/homeService');


router.get('/', (req, res) => {
    res.render('home');
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

router.post('/offer-trip', (req, res) => {

    let tripData = req.body;
    console.log(tripData);
    homeService.createTrip(tripData);

    res.redirect('/');
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