//import needed packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Import any necessary functions or middleware here

// Define routes
router.get('/', (req, res) => {
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    // Check if user is authenticated (e.g., user session exists)
    if (req.session.userId) {
        res.render('dashboard', { username: req.session.username });
    } else {
        res.redirect('/');
    }
});

// Implement login and signup routes here
// Example login route:
router.post('/login', (req, res) => {
    // Validate user input (use express-validator)
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        // Handle validation errors
        res.render('login', { errors });
    } else {
        // Check user credentials (e.g., against a database)
        const { username, password } = req.body;

        // Assuming you have a function to retrieve hashed password from the database
        const hashedPasswordFromDB = 'hash_goes_here';

        bcrypt.compare(password, hashedPasswordFromDB, (err, result) => {
            if (result) {
                // Create a session for the authenticated user
                req.session.userId = uuid();
                req.session.username = username;
                res.redirect('/dashboard');
            } else {
                // Handle invalid credentials
                res.render('login', { error: 'Invalid credentials' });
            }
        });
    }
});

// Implement signup route

// Implement logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

