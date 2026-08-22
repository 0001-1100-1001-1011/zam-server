const service = require("../services/registerService");

exports.createUser = async (req, res) => {
  service.createUser(req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ message: "User created" });
  });
};
