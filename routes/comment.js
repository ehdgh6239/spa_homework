const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment.js");
const Blogs = require("../schemas/blogs.js");
const comment = require("../schemas/comment.js");

router.get("/comments", async(req,res)=>{
  const comments = await Comment.find({});
  const blogsIds = comments.map((comment) =>{
    return comment.blogsId;
  })

  const blogs = await blogsIds.find({blogsId: blogdsIds});

  const results = comments.map((comment) =>{
    return {
      "user": comment.user,
      "password": comment.password,
      "content": blogs.find((item) => item.blogsId === comment.blogsId),
    }
  })
  res.json({
    "comments" : results,
  })
});

module.exports = router;