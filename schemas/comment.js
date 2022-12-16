const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true
  },
  user:{
    type: String,
    require: true,
  },
  password:{
    type: String,
    require: true,
    unique : true,
  },
  content:{
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);