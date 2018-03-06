'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const debug = require('debug')('doggo:server');
const doggoRouter = require('./route/doggo-route.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/doggodb';

mongoose.connect(MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());
app.use(doggoRouter);

app.listen(PORT, () => {
  debug(`listening on ${PORT}`);
});