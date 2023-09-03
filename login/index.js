//import the needed packages
const express = require('express');
const bodyParser = require('body-parser'); 
const expressValidator = require('express-validator');
const session = require('express-session'); 
const { v4: uuidv4 } = require('uuid'); // Use v4 for random UUIDs 
const router = require('./routes/router');

//create the server
const app = express();

//set the environment variables
const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3000;

//set the template's engine
app.set('view engine', 'ejs');

//set the folder to access the static assets
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use('/assets',express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator());

// parse application/json
app.use(bodyParser.json())

//configure the session
app.use(session({
    secret: uuidv4(), // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}));

// Serve static CSS files
app.use(express.static('public/css'));

// Use the router defined in router.js
app.use('/', router); // Mount the router at the root path

// Start the server
app.listen(port, () => {
    console.log(`The server is at http://${hostname}:${port}.`);
});


