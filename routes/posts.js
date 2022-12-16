const express = require("express");
const router = express.Router();

  router.post('/posts', async (req, res) => {
    const {postId, user, password, title, content} = req.body;

    const posts = await Posts.find({postId});
    if (posts.length) {
        return res.status(400).json({errorMessage: "이미 존재하는 postId 입니다."})
    };
    try {
        await Posts.create({postId, user, password, title, content});
        res.status(200).json({Message: "게시글을 생성하였습니다."});
    } catch(err) {
        res.status(400).json({errorMessage: "데이터 형식이 올바르지 않습니다."})
    };
  });

  router.get('/posts', async (req,res) => {
    // const {postId, user, title, createdAt} = req.body;
    const posts = await Posts.find({});
    res.json({"data":posts});
  });

  router.get('/posts/:postId', async (req, res) => {
    const {postId} = req.params;
    const post = await Posts.findOne({postId});

    if (!post) {
        res.status(400).json({
            success : false,
            errorMessage: "게시글을 찾을 수 없습니다."
        });
    }
    res.json({post});
  });

  const Posts = require("../schemas/posts.js")
  router.put('/posts/:postId', async (req, res) => {
    const {postId} = req.params;
    const {title, content, password} = req.body;

    const existPosts = await Posts.find({postId, password});
    if (existPosts.length) {
        await Posts.updateOne(
            {postId},{$set: {title, content}}
        )
        res.status(200).json({Message:"수정이 완료되었습니다"})
    }
    else{
        res.status(400).json({errorMessage: "비밀번호가 틀렸습니다."})
    }
  });

  router.delete('/posts/:postId', async (req, res) => {
    const {postId} = req.params;
    const {password} = req.body;

    const existPosts = await Posts.find({postId, password});
    
    if (existPosts.length) {
        await Posts.deleteOne({postId})
        res.status(200).json({Message:"삭제가 완료되었습니다"})
    }
    else{
        res.status(400).json({errorMessage: "비밀번호가 틀렸습니다."})
    }
  });
  const createdBlogs = await Blogs.create({postId,user, password, title, content});

  res.json({blogs: createdBlogs});
module.exports = router;