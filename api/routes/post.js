const controller = require('../controllers/post')();

module.exports = (app) => {
  app.route('/api/post').post(controller.addPost);
  app.route('/api/post').get(controller.listPosts);
  app.route('/api/post/latest').get(controller.getLatestPosts);
  app.route('/api/post/:postId').get(controller.getPost);
  app.route('/api/post/:userId/data').get(controller.getPostsData);
};
