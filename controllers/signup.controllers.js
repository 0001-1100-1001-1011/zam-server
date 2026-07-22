const service = require("../services/signup.services");

exports.createUsers = async (req, res) => {
  try {
    const user = await service.createUsers(req.body);
    // DEBUG
    console.log("User created");
    res.status(201).json(user);
  } catch (err) {
    // DEBUG
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
