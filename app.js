
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let restaurateurRouter = require('./routes/restaurateur');
let elementRouter = require('./routes/element');
let categorieRouter = require('./routes/categorie');
let cors = require('cors')
let menuRouter = require('./routes/menu')
let carteRouter = require('./routes/carte')
<<<<<<< HEAD
let restaurant = require ('./routes/restaurant');
=======
let commandeRouter = require('./routes/commande')
let restaurantRouter = require('./routes/restaurant')
>>>>>>> 6e5aa0e6cac18149302066c0f36948755a8c0abe

require('dotenv').config()

let app = express();

const {connect} = require('./db/mongodb')

const DB_URL = process.env.DB_URL
const DB_USER =  process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_PASS

connect(DB_URL,DB_USER,DB_PASS,DB_NAME);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: '*'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/element', elementRouter);
app.use('/categorie', categorieRouter);
app.use('/restaurateur', restaurateurRouter)
app.use('/restaurant', restaurantRouter)
app.use('/menu', menuRouter);
app.use('/carte', carteRouter);
app.use('/commande', commandeRouter);

module.exports = app;
