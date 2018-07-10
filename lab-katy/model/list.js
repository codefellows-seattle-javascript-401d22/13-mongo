'use strict';

//can also be called schema file 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//dont need new in front of Schema bc its a pseudo construtor
const listSchema = Schema({ 
  name: { type: String, required: true },
  timestamp: { type: Date, required: true },
});  

module.exports = mongoose.model('list', listSchema);