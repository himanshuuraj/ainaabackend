const express = require("express");
var userInfo = require("./routes/userInfo");
var postDetail = require("./routes/post");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const connection = "mongodb://192.168.1.107:27017/ainaa";
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/userInfo", userInfo);

app.use("/post", postDetail);

app.listen(PORT, () => {
  console.log(`Server is listening on ports: ${PORT}`);
}); 