'use strict';

const express         = require('express');
const bodyParser      = require('body-parser');
const mysql           = require('anytv-node-mysql');                
const dataManagement  = require('./routes/dataManagement');
const app             = express();
const logger          = require('./libraries/logger').LoggerMiddleware;
const path            = require('path');
const MASTER_DB       = require('./config/db_config');
const apidoc          = __dirname + '/doc';
const uploads         = __dirname + '/uploads/';

						            require('./global_functions');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: "50mb", extended: false, parameterLimit:50000,type:'*/x-www-form-urlencoded'}));
app.use(logger);

try {
	mysql.add('master',MASTER_DB);
}
catch(err){
	console.log(err.message);
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  next();
});

app.use('/v1',dataManagement);
app.use('/apidoc', express.static(apidoc));

app.use('/', (req,res)=>{
  return res.json({
    message : 'Route not found',
    context : 'Route does not exists'
  }).status(404);
});


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

function force200Responses(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
}

app.use(force200Responses)

app.disable('etag');

module.exports = app;