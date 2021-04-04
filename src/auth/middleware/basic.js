'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const Users = require('../models/users-model');

module.exports = async (req, res, next) => {
  // let basicHeaderParts = req.headers.authorization.split(' ');
  // let encodedString = basicHeaderParts.pop();
  // let decodedString = base64.decode(encodedString);
  // let [username, password] = decodedString.split(':');
  let encodedString = req.headers.authorization.split(' ')[1]; // ['Basic', 'sdkjdsljd=']
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  try {
    const user = await Users.findOne({ username });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        req.user = user;
        next();
      } else {
        //   next('Invalid User');
        // throw new Error('Invalid Password');
        res.status(403).send('Invalid Password');
      }
    } else {
      res.status(403).send('Invalid Username');
    }
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
};
