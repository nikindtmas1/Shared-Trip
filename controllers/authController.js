const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createToken } = require('../utils/jwt');
//const { cookie } = require('../config/expressConfig');

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
    async (req, res, next) => {
        //body('username').isEmail();

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
    // User
    // .findOne({ email })
    // .then((user) => {
    //     return Promise.all([
    //         user.comparePasswords(password),
    //         user,
    //     ])
    // })
    // .then(([isPasswordsMatched, user]) => {
    //     if (!isPasswordsMatched) {
    //         throw new Error('The provided password does not matched.');
    //     }

    //     const token = jwt.createToken(user._id);

    //     res
    //         .status(200)
    //         .cookie(cookie, token, { maxAge: 3600000 })
    //         .redirect('/');

    // })
    // .catch((e,) => {
    //     console.log(e);
    // })

       
    // authService.login(data)
    // .then(user => {
    //     res.redirect('/');

    // })
    //     .catch(next)

        /**
            login(req, res, next) {

            const { email, password } = req.body;

            User
                .findOne({ email })
                .then((user) => {
                    return Promise.all([
                        user.comparePasswords(password),
                        user,
                    ])
                })
                .then(([isPasswordsMatched, user]) => {
                    if (!isPasswordsMatched) {
                        throw new Error('The provided password does not matched.');
                    }

                    const token = jwt.createToken(user._id);

                    res
                        .status(200)
                        .cookie(cookie, token, { maxAge: 3600000 })
                        .redirect('/shoes/all');

                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
         */
        
        
});

router.get('/logout', (req, res) => {
    res.clearCookie('cookieToken');
    res.redirect('/')
});


module.exports = router;