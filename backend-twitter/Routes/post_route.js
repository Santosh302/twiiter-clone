const express = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");

// Import and define the Schema for the "PostModel"

const PostModel = require("../models/post_model");
const protectedRoute = require('../middleware/protectedResource')

// Get All Data

router.get("/allPosts",protectedRoute, (req, res) => {
  PostModel.find()
      .populate("author", "_id fullName image")
      .populate("comments.commentedBy", "_id fullName")
      .then((dbPosts) => {
          res.status(200).json({ posts: dbPosts })
      })   
      .catch((error) => {
          console.log(error);
      })
});

// Get all my posts data

router.get("/MyallPosts",protectedRoute, async (req, res) => {
  try {
    const dbPosts = await PostModel.find({ author: req.user._id })
      .populate("author", "_id fullName image")
      .populate("comments.commentedBy", "_id fullName");

    res.status(200).json({ posts: dbPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  
//Creating new entry in Database

router.post("/createpost",protectedRoute, (req, res) => {
  console.log(req.body);    
  const {description, image } = req.body;
  req.user.password=undefined;
  const postObj = new PostModel({
    description: description,
    image: image,
    author: req.user,
  });
  postObj
    .save()
    .then((newPost) => {
      res.status(201).json({ post: newPost });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Route to handle likes

router.put("/like", protectedRoute, async (req, res) => {
    try {
        const result = await PostModel.findByIdAndUpdate(
            req.body.postId,
            { $push: { likes: req.user._id } },
            { new: true }
        ).populate("author", "_id fullName");
        handleResponse(res, null, result);
    } catch (error) {
        handleResponse(res, error, null);
    }
});

// Route to handle Comments

router.put("/comment", protectedRoute, async (req, res) => {
    try {
        const comment = { commentText: req.body.commentText, commentedBy: req.user._id };
        const result = await PostModel.findByIdAndUpdate(
            req.body.postId,
            { $push: { comments: comment } },
            { new: true }
        ).populate("comments.commentedBy", "_id fullName").populate("author", "_id fullName");
        handleResponse(res, null, result);
    } catch (error) {
        handleResponse(res, error, null);
    }
});
  
module.exports = router;





