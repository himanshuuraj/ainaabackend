var express = require("express");
var router = express.Router();
var UserInfoDetails = require("../models/userInfo");
var utils = require("./../global/utils");
let responseObj = utils.responseObj;

// Require the controllers WHICH WE DID NOT CREATE YET!!
// var parentDetailController = require("./../controllers/parentController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.post("/create", (req, res) => {
    let obj = req.body;
    let userInfo = new UserInfoDetails(obj);
    console.log(userInfo, obj);
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
        responseObj.message = "Error in inserting userDetails";
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

module.exports = router;
