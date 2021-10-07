const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
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

module.exports = router;