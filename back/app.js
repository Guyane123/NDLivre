import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import dotenv from "dotenv";

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

import connectDB from './db/db.js';

dotenv.config()

var app = express();

// view engine setup
app.set('views', join('views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// connect to MongoDB
connectDB()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

app.get('/proxy', (req, res) => {
  const imageUrl = req.query.url;
  request(
    { url: imageUrl, encoding: null }, // "encoding: null" to keep the image in binary format
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.set('Content-Type', response.headers['content-type']);
        res.set('Access-Control-Allow-Origin', '*'); // Add CORS header
        res.send(body);
      } else {
        res.status(500).send('Error fetching image');
      }
    }
  );
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
