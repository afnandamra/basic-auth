'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server');
const request = supergoose(app);
let user={
  username: 'afnan',
  password: '123456',
};

describe('Signing test', () => {
  it('should create a new User on POST /signup', async () => {
    const response = await request.post('/api/v1/signup').send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('afnan');
  });

  it('should find user data when login on POST /signin', async () => {
    const response = await request
      .post('/api/v1/signin')
      .set(
        'Authorization',
        'basic ' + new Buffer.from(`${user.username}:${user.password}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual(user.username);
  });

  it('should send an error if the username is incorrect on POST /signin', async () => {
    const response = await request
      .post('/api/v1/signin')
      .set(
        'Authorization',
        'basic ' + new Buffer.from(`afna:${user.password}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(403);
    expect(response.text).toEqual('Invalid Username');
  });

  it('should send an error if the password is incorrect on POST /signin', async () => {
    const response = await request
      .post('/api/v1/signin')
      .set(
        'Authorization',
        'basic ' + new Buffer.from(`${user.username}:12345`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(403);
    expect(response.text).toEqual('Invalid Password');
  });
});
