'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('weed:server');
const listRouter = require('./route/list-route.js');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = 'mongodb://localhost/weeddb'; //uppercase bc were looking at a process env variable. this one is set for us in heroku with this name. thats why were using this naming convention
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(listRouter);

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});



