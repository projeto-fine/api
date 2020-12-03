const mongoose = require('mongoose');
const Post = require('../models/post');
const Enum = require('../helpers/enum');

module.exports = () => {
  const controller = {};

  controller.addPost = async (req, res) => {
    try {
      const post = {
        content: req.body.content,
        user: new mongoose.Types.ObjectId(req.body.user),
        likes: req.body.likes || 0,
        saves: req.body.saves || 0,
        creationDate: req.body.creationDate || new Date(),
      };
      res.send(await Post.create(post));
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  controller.getPost = async (req, res) => {
    try {
      const { postId } = req.params;
      res.send(await Post.findById(postId));
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  controller.getLatestPosts = async (req, res) => {
    try {
      const { from } = req.query;
      res.send(await Post.find({ creationDate: { $gt: new Date(from) } }));
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  controller.listPosts = async (req, res) => {
    try {
      const perPage = parseInt(req.query.perPage) || 9;
      const page = parseInt(req.query.page) || 1;

      const posts = await Post.aggregate([
        { $sort: { creationDate: -1 } },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: 'userId',
            as: 'user',
          },
        },
        { $unwind: '$user' },
      ])
        .skip(perPage * page - perPage)
        .limit(perPage);
      res.send({
        posts,
        nextPage: page + 1,
      });
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
            month: { $month: '$creationDate' },
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

  controller.updatePostData = async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId, type, interaction } = req.query;
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  return controller;
};
