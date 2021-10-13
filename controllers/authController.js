const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createToken } = require('../utils/jwt');
//const { cookie } = require('../config/expressConfig');

const userService = require('../services/userService');
const authService = require('../services/authService');

// router.get('/auth', (req, res) => {
//     res.send('authController');
// });

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
    async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let data = req.body;
        
        let user = await userService.loginUser(data);
        

      let token = await createToken(user);

       res.cookie('cookieToken', token, {
        httpOnly: true
    })
        res.redirect('/')
    
        
});

router.get('/logout', (req, res) => {
    res.clearCookie('cookieToken');
    res.redirect('/')
});


module.exports = router;