
const cors    = require('cors');
const express = require('express'); 
const helmet  = require('helmet');
const bodyParser = require('body-parser');
const path = require('path'); 
var app = express();

// load middleware
app.options('*', cors()) // include before other routes
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', "*");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Content-Type,Authorization', 'Access-Control-Allow-Origin', 'Authenticate', 'username', 'password');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
var whitelist = ['*'];
const corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.indexOf(origin) !== -1) {
      console.log('origin->' + origin)
      callback(null, true)
    } else {
      console.log('origin->' + origin)
      callback(null, true)
      //callback(new Error('not allow not defined origin: '+origin),false)
    }
  },

  allowedHeaders: 'Content-Type,Authorization,Access-Control-Allow-Origin,Authenticate,username,password',
  preflightContinue: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

const hostname = "0.0.0.0";
const port = 3000;
const routes = require('./router');

app.use('/api', routes);

app.listen(port, () =>
  console.log(`Your port is ${hostname} ${port}`),
);




module.exports = app;
