'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const debug = require('debug')('beer:server');
const mongoose = require('mongoose');
const beerRouter = require('./router/beer-routes.js');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/beerdb';
const app = express();

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(beerRouter);

app.listen(PORT, () => {
  debug(`Server listening on ${PORT}`);
});



