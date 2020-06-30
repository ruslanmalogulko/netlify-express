'use strict';
const express = require('express');
const path = require('path');
const exec = require('child_process').exec;
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const callback = () => {};

const router = express.Router();
router.get('/', (req, res) => {
  const child = exec(`curl https://tntsfeqzp4a.sandbox.verygoodproxy.com/post \
  -H "Content-type: application/json" \
  -d '{"account_number": "ACC00000000000000000"}'`, (error, result) => {
    // Resolve with result of process
    console.log(result);
    console.log(error);
    if (error) {
      res.send(error);
    } else {
      res.send(JSON.stringify(result, null, 2));
    }
  });
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.get('/', (req, res) => {
  res.redirect('/.netlify/functions/server');
})

module.exports = app;
module.exports.handler = serverless(app);
