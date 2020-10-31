const controller = require('../controllers/user')();

module.exports = (app) => {
  app.route('/api/addUser').post(controller.addUser);
  app.route('/api/getUser/:userId').get(controller.getUser);
};
