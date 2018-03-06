const express = require('express');
const app = express();

/* === Data Base === */  

const dbConfig = require('./db.config');
      dbConfig.connect('employeesDB');

/* === End Data Base === */ 

/* === App === */

const appConfig = require('./app.config');
      appConfig.define(app);

/* === End App === */



      appConfig.listen(app, process.argv[2])