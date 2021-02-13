const mongoose = require("mongoose");
const { Schema } = mongoose;
const recepientScema = new Schema({
  email :String,
  responded : {type : Boolean, default : false}
});

module.exports = recepientScema;