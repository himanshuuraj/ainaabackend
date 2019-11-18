var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    text: String
}, {
    strict: false
});

// Export the model
module.exports = mongoose.model("Post", PostSchema); // UserInfodetails will be the collection naem in database

// student and homework are related through sectionId and subjectId
