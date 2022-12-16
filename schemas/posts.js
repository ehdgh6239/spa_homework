const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true
  },
  user:{
    type: String,
    require: true,
  },
  name : {
    type : String,
    require : true,
    unique : true
  },
  password:{
    type: String,
    require: true,
    unique : true,
  },
  title:{
    type : String,
    require : true
  },
  content:{
    type: String,
  },
  createdAt: {
    type: Number,
    require: true,
  }
});

module.exports = mongoose.model("Posts", postsSchema);