const controller = require('../controllers/user')();

module.exports = (app) => {
  app.route('/api/user').post(controller.addUser);
  app.route('/api/user/:userId').get(controller.getUser);
};
