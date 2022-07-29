const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const restaurateurRouter = require('./routes/restaurateur');
const elementRouter = require('./routes/element');
const categorieRouter = require('./routes/categorie');
const cors = require('cors')
const menuRouter = require('./routes/menu')
const carteRouter = require('./routes/carte')

const commandeRouter = require('./routes/commande')
const restaurantRouter = require('./routes/restaurant')

require('dotenv').config()

const app = express();

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
