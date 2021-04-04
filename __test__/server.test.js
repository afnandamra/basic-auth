'use strict';

// require('dotenv').config();
// const supergoose = require('@code-fellows/supergoose');
// const { app } = require('../src/server');
// const request = supergoose(app);
require('dotenv').config();
const { app } = require('../src/server.js'); // => {server,start}
const superTest = require('supertest'); // const supergoose = require('@code-fellows/supergoose)

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const request = superTest(app);

describe('Server Test', () => {
  it('handle working routes', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Home Page');
  });
  it('handle server errors', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(500);
  });
  it('handle invalid routes', async () => {
    const response = await request.get('/whatever');
    expect(response.status).toEqual(404);
  });
  it('handle bad method', async () => {
    const response = await request.patch('/*');
    expect(response.status).toEqual(404);
  });
});
