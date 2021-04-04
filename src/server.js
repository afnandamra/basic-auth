'use strict';

// Dependincies
const express = require('express');
const app = express();
const morgan = require('morgan');

// routes
const users = require('./auth/router');

// Error handlers
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Routes definitions
app.get('/', homeHandler);
app.get('/bad', errHandler);
app.use('/api/v1/', users);

// Error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

// Routes functions
function homeHandler(req, res) {
  res.send('Home Page');
}

function errHandler(req,res){
  throw new Error('Something went wrong');
}

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}/`);
    });
  },
};
