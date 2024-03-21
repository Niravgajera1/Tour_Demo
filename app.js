const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globlErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRotues');
const userRouter = require('./routes/userRotues');
const reviewRotuer = require('./routes/reviewRotues');
const viewRouter = require('./routes/viewRotues');
const bookingRouter = require('./routes/bookingRotues');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//seding static files
app.use(express.static(path.join(__dirname, 'public')));
//header middlerware
app.use(helmet());
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limiting middleware
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP , try after some time',
});
app.use('/api', limiter);

app.use((req, res, next) => {
  console.log('hello from the middle-ware');
  // console.log(req.headers);
  next();
});

//body parser middleware
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

//mongo santizi data
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRotuer);
app.use('/api/v1/bookings', bookingRouter);
app.all('*', (req, res, next) => {
  // const err = new Error(`can not Find ${req.originalUrl} on this server`);
  // (err.status = 'fail'), (err.statusCode = 404), next(err);

  next(new AppError(`can not Find ${req.originalUrl} on this server`, 404));
});

app.use(globlErrorHandler);

module.exports = app;
