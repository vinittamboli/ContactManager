//const express = require('express');
//const bodyparser = require('body-parser');
//const mongoose = require('mongoose');

import express from 'express'
import bodyParser from 'body-parser';
import router from './routes/userRoutes.js';
import contactRouter from './routes/contactRoutes.js';

import errorHandler from './middleware/errorHandler.js';
import connectDb from './db/connection.js';
import dotenv from 'dotenv';
  
dotenv.config({ debug: true });


connectDb();

const app = express();
app.use(bodyParser.json());
app.use("/users/", router);
app.use("/contacts/",contactRouter);

app.use(errorHandler);

app.listen(3000, ()=> console.log("Server running"))




