'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const debug = require('debug')('movie:server');
const listRouter = require('./route/list-route');
const movieRouter = require('./route/movie-route');
const errors = require('./lib/error-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/moviesdb';

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

app.use(listRouter);
app.use(movieRouter);

app.use(errors);

const server = module.exports = app.listen(PORT, () => {
  debug(`Server up on PORT ${PORT}`);
});

server.isRunning = true;
