const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const userService = require('../services/userService');
const authService = require('../services/authService');

router.get('/auth', (req, res) => {
    res.send('authController');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register',
    body('password').trim().isLength({ min: 5 }),
    (req, res) => {
        body('username').isEmail();

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let data = req.body;

        authService.register(data);

        res.redirect('/');
    });

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', 

    body('password').trim().isLength({ min: 5 }),
    (req, res, next) => {
        body('username').isEmail();

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    let data = req.body;
        console.log(data);
    authService.login(data)
    .then(user => {
        res.redirect('/');

    })
        .catch(next)

});


module.exports = router;