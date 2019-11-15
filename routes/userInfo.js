var express = require("express");
var router = express.Router();
var UserInfoDetails = require("../models/userInfo");
var utils = require("./../global/utils");
const {ObjectId} = require('mongodb');
let responseObj = utils.responseObj;

// Require the controllers WHICH WE DID NOT CREATE YET!!
// var parentDetailController = require("./../controllers/parentController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.post("/create", async (req, res) => {
    let obj = req.body;
    let userInfo = new UserInfoDetails(obj);
    let user = await UserInfoDetails.find({
      "email" : obj.email,
      "password" : obj.password
    });
    if(user && user.length > 0){
      responseObj.success = false;
      responseObj.error = null;
      responseObj.param = null;
      responseObj.message = "User with emailId already exists";
      return res.json(responseObj);
    }
    userInfo
        .save()
        .then(userInfo => {
          responseObj.success = true;
          responseObj.body = userInfo;
          responseObj.param = req.body;
          responseObj.message = "UserInfo Inserted Successfully";
        return res.json(responseObj);
        })
        .catch(err => {
          responseObj.success = false;
          responseObj.error = err;
          responseObj.param = req.body;
          responseObj.message = "Error in registering user";
          return res.json(responseObj);
        });
});

router.get("/:id", (req, res) => {
  UserInfoDetails.findById(req.params.id, function(err, user) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in getting user data";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = user;
      responseObj.param = req.params;
      responseObj.message = "User Data";
      return res.json(responseObj);
    }
  });
});

router.put("/:id/update", (req, res) => {
  let obj = req.body;
  UserInfoDetails.findByIdAndUpdate(
    req.params.id,
    { $set: obj },
    function(err, user) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = req.params;
        responseObj.message = "Error in updating user";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = obj;
        responseObj.param = req.params;
        responseObj.message = "User updated successfully";
        return res.json(responseObj);
      }
    }
  );
});

router.delete("/:id/delete", (req, res) => {
  UserInfoDetails.findByIdAndRemove(req.params.userId, function(
    err,
    user
  ) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in deleting user";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = user;
      responseObj.param = req.params;
      responseObj.message = "User deleted successfully";
      return res.json(responseObj);
    }
  });
});

router.post("/login", (req, res) => {
  let obj = req.body;
  UserInfoDetails.find({
    "email" : obj.email,
    "password" : obj.password
  }, function(err, user) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in login in";
      return res.json(responseObj);
    } else {
      if(user.length > 0){
        var tempObj = user[0];
        tempObj = JSON.parse(JSON.stringify(tempObj));
        tempObj["token"] = obj.firebaseToken;
        responseObj.success = true;
        responseObj.body = tempObj;
        responseObj.param = req.params;
        responseObj.message = "User Data";
        UserInfoDetails.findByIdAndUpdate(
          ObjectId(tempObj._id),
          { $set: tempObj },
          function(err, user){
        });
      }
      else{
        responseObj.success = false;
        responseObj.body = null;
        responseObj.param = req.params;
        responseObj.message = "user not found";
      }
      return res.json(responseObj);
    }
  });
});


module.exports = router;
