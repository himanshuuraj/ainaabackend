const express = require("express");

const mongoose = require("mongoose");
const connection = "mongodb://localhost:27017/ainaa";
const connectDb = () => {
 return mongoose.connect(connection);
};
module.exports = connectDb;

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is listening on ports: ${PORT}`);
});