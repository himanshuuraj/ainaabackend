var express = require("express");
var router = express.Router();
var PostDetails = require("../models/post");
var utils = require("./../global/utils");
var UserInfoDetails = require("../models/userInfo");
const {ObjectId} = require('mongodb');
// var request = require('request');
// var fetch = require('node-fetch');
var http = require('https');
var responseObj = utils.responseObj;

// Require the controllers WHICH WE DID NOT CREATE YET!!
// var parentDetailController = require("./../controllers/parentController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.post("/create", async (req, res) => {
    let obj = req.body;
    obj["createdAt"] = new Date().getTime();
    let postDetails = new PostDetails(obj);
    postDetails
        .save()
        .then(post => {
          responseObj.success = true;
          responseObj.body = post;
          responseObj.param = req.body;
          responseObj.message = "Post Inserted Successfully";
          res.json(responseObj);
          sendNotification(post);
          return;
        })
        .catch(err => {
          responseObj.success = false;
          responseObj.error = err;
          responseObj.param = req.body;
          responseObj.message = "Error in registering post";
          return res.json(responseObj);
        });
});

router.get("/:id", (req, res) => {
    PostDetails.findById(req.params.id, function(err, post) {
        if (err) {
            responseObj.success = false;
            responseObj.error = err;
            responseObj.param = req.params;
            responseObj.message = "Error in getting post";
        return res.json(responseObj);
        } else {
            responseObj.success = true;
            responseObj.body = post;
            responseObj.param = req.params;
            responseObj.message = "Post Data";
        return res.json(responseObj);
        }
    });
});

router.put("/:id/update", (req, res) => {
  let obj = req.body;
  PostDetails.findByIdAndUpdate(
    req.params.id,
    { $set: obj },
    function(err, post) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = req.params;
        responseObj.message = "Error in updating post";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = obj;
        responseObj.param = req.params;
        responseObj.message = "Post updated successfully";
        return res.json(responseObj);
      }
    }
  );
});

router.delete("/:id/delete", (req, res) => {
    PostDetails.findByIdAndRemove(req.params.userId, function(
    err,
    user
  ) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in deleting post";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = user;
      responseObj.param = req.params;
      responseObj.message = "Post deleted successfully";
      return res.json(responseObj);
    }
  });
});

router.get("/start/:start/count/:count", (req, res) => {
    let start = req.params.start || 0;
    start = parseInt(req.params.start);
    let count = req.params.count || 100; 
    count = parseInt(req.params.count);
    PostDetails.find()
        .limit(count)
        .skip(start)
        .exec(function(err, events) {
            if (err) {
                responseObj.success = false;
                responseObj.error = err;
                responseObj.param = req.params;
                responseObj.message = "Error in getting post";
                return res.json(responseObj);
            } else {
                responseObj.success = true;
                responseObj.body = events;
                responseObj.param = req.params;
                responseObj.message = "Post Data";
                return res.json(responseObj);
            }
    });
});

sendNotification = post => {
  UserInfoDetails.find({}, function(err, user) {
      if (!err) {
        user = user.map(item => {
          let obj = JSON.parse(JSON.stringify(item));
          return obj.token;
        });
        let url = "https://exp.host/--/api/v2/push/send";
        let bodyObj = {
          "to": user,
          "title": post.firstName + " " + post.lastName,
          "body": post.text
        };
        request.post(url, {
          json: bodyObj
        }, (error, res, body) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log(`statusCode: ${res.statusCode}`);
          console.log(body);
        });
        // fetch(url, {
        //   method: 'POST',
        //   headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(bodyObj),
        //   }).then((response) => response.json(), 
        //   err => {
        //       console.log("ERR", err);
        //       // alert(err.message);
        //       return err;
        //   })
        //   .then((responseJson) => {
        //       return responseJson;
        //   })
        //   .catch((error) => {
        //       console.error("ERROR",error);
        //       return error;
        //   });
      }
    }
  );
}

module.exports = router;
