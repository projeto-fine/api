const controller = require("../controllers/post")();

module.exports = (app) => {
  app.route("/api/post").post(controller.addPost);
  app.route("/api/post").get(controller.getPost);
  app.route("/api/posts").get(controller.listPosts);
  app.route("/api/posts/:userId").get(controller.getPostsData);
};
