const express = require('express');
const router = express.Router();

const userService = require('../services/userService');
const authService = require('../services/authService');

router.get('/auth', (req, res) => {
    res.send('authController');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {

    let data = req.body;

    authService.register(data);

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


module.exports = router;