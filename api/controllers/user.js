const User = require("../models/user");

module.exports = () => {
  const controller = {};

  controller.addUser = async (req, res) => {
    try {
      const user = {
        name: req.body.name,
        title: req.body.title,
        type: req.body.type,
      };
      res.send(await User.create(user));
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  controller.getUser = async (req, res) => {
    try {
      const { userId } = req.query;
      res.send(await User.findById(userId));
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  return controller;
};
