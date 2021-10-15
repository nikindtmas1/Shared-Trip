const express = require('express');
const router = express.Router();

const homeService = require('../services/homeService');
const { isOwnTrip } = require('../middlewares/tripCreator');


router.get('/', (req, res) => {
    res.render('home');
});


router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/shared-trips', async (req, res) => {

    homeService.getAll(req.query)
    .then(results => {
        res.render('shared-trips', {title: 'Welcome Sharetripers!', results});

    })
});

router.get('/offer-trip', (req, res) => {
    res.render('trip-create');
});

router.post('/offer-trip', (req, res) => {

    let tripData = req.body;

    let creator = req.user._id;
   
    homeService.createTrip(tripData, creator);

    res.redirect('/');
});

router.get('/trip-details/:carId',async (req, res) => {
    

    let result = await homeService.getOne(req.params.carId);
   
    let isOwn = result.creator == req.user._id
    let email = req.user.email;
    
    res.render('trip-details', { result, isOwn, email });
})

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