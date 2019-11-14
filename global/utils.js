const uuid = function() {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  
  let responseObj = {
    body: null, //in case of success true,
    success: false, //true or false,
    param: null, // data send from the frontend - revert it back,
    error: null, // in case of success false,
    message: "", // this is message
    token: null // only in case of login
  };

  module.exports = {
      uuid,
      responseObj
  }
  