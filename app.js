
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let restaurateurRouter = require('./routes/restaurateur')

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurateur',restaurateurRouter)

module.exports = app;
