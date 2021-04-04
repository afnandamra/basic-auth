'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const basicAuth = require('./middleware/basic');
const Users = require('./models/users-model');

router.post('/signup', signUpFunction);
router.post('/signin', basicAuth, signinFunction);

async function signUpFunction(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new Users(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
}

async function signinFunction(req, res) {
  res.status(200).json(req.user);
}

module.exports = router;
