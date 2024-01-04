// import express from 'express'
const express = require('express')

// import path from 'path'
const path = require('path')

// import morgan from 'morgan'
const morgan = require('morgan')

// import cookieParser from 'cookie-parser'
const cookieParser = require('cookie-parser')

// import session from 'express-session'
const session = require('express-session')

// import dotenv from 'dotenv'
const dotenv = require('dotenv')

dotenv.config();

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port' , process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));



app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req,  res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없음`);
  error.status = 404;
  next(error);
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production ' ? err : {} ;
    res.render('error')
})

app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')} 번 포트에서 대기중`);
})

console.log(__dirname);