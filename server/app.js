const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookies = require("cookie-parser");

const app = express();

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 5000;

require('./mongo/dbCon');

app.use(cookies());

app.use(express.json());
app.use(require('./route/auth'));

app.listen(port,() =>{
  console.log(`connection succesful at port ${port}`);
})