const mongoose = require("mongoose");
const Post = require("../models/post");

module.exports = () => {
  const controller = {};

  controller.addPost = async (req, res) => {
    try {
      const post = {
        content: req.body.content,
        user: req.body.user,
        likes: req.body.likes,
        saves: req.body.saves,
        creationDate: req.body.creationDate,
      };
      res.send(await Post.create(post));
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  controller.getPost = async (req, res) => {
    try {
      const { postId } = req.query;
      res.send(await Post.findById(postId));
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  controller.listPosts = async (req, res) => {
    try {
      const posts = await Post.aggregate([
        { $sort: { creationDate: -1 } },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ]);
      res.send(posts);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  controller.getPostsData = async (req, res) => {
    try {
      const posts = await Post.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.params.userId) } },
        {
          $project: {
            _id: 0,
            likes: 1,
            saves: 1,
            month: { $month: "$creationDate" },
          },
        },
      ]);

      const grouped = {};
      posts.forEach((post) => {
        if (`${post.month}` in grouped) {
          grouped[post.month].likes += post.likes;
          grouped[post.month].saves += post.saves;
        } else {
          grouped[post.month] = {};
          grouped[post.month].likes = post.likes;
          grouped[post.month].saves = post.saves;
        }
      });
      res.send(grouped);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  return controller;
};
