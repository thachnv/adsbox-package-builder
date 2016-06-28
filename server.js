require('dotenv').config({ silent: true });
const express = require('express');
const app = express();

const router = express.Router();

const configKeys = Object.keys(process.env);
var configs = {};

for (var i = 0; i< configKeys.length; i++) {
  var key = configKeys[i];
  configs[key] = process.env[key];
}

router.get('/env.js', (req, res) => {
  res.send('window.CONFIGS = ' + JSON.stringify(configs));
});

router.get('/health', (req, res) => {
  res.send('I\'m alive!');
});

app.use('/server', router);

app.use(express.static(__dirname + '/build'));

var port = process.env.PORT || 8080;
var host = process.env.HOST || '0.0.0.0';

app.listen(port, host, function () {
  console.log('Express server: ' + port);
});
