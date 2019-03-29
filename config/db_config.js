'use strict';
require('./config').config;

const MASTER_DB = {
  host : MYSQL_HOST || 'localhost',
  user : MYSQL_USER || 'root',
  password : MYSQL_PASSWORD || 'secretPassword123',
  database : MYSQL_DATABASE || 'agri_thesis',
  retryable_errors: ['ER_LOCK_DEADLOCK', 'PROTOCOL_SEQUENCE_TIMEOUT']
};
module.exports = MASTER_DB;