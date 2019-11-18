var express = require("express");
var router = express.Router();
var PostDetails = require("../models/post");
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
    let postDetails = new PostDetails(obj);
    postDetails
        .save()
        .then(post => {
          responseObj.success = true;
          responseObj.body = post;
          responseObj.param = req.body;
          responseObj.message = "Post Inserted Successfully";
        return res.json(responseObj);
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
    let start = parseInt(req.params.start);
    let count = parseInt(req.params.count);
    PostDetails.find()
        .limit(start)
        .skip(count)
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
})

module.exports = router;
