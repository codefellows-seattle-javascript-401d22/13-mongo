'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const debug = require('debug')('strains:sever');
const listRouter = require('./routers/list-router.js');
const errors = require('./lib/error-middleware.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/strainsdb';

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(listRouter);

app.use(function (req, res, next) {
  res.status(404).send('Sorry can\'t find that!');
  next();
});

app.use(errors);

app.listen(PORT, () => {
  debug(`Server up: ${PORT}`);
});