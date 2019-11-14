var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserInfoSchema = new Schema({}, {
    strict: false
});

// Export the model
module.exports = mongoose.model("UserInfoDetails", UserInfoSchema); // UserInfodetails will be the collection naem in database

// student and homework are related through sectionId and subjectId
