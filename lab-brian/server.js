'use strict';

const express= require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const debug = require('debug')('food:server');
const foodRouter = require('./route/food-route.js');
const app = express();
const errors = require('./lib/error-middleware.js');
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/fooddb';

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(foodRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});