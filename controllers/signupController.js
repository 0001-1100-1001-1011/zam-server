const service = require("../services/signupService");

exports.createUsers = async (req, res) => {
  try {
    const user = await service.createUsers(req.body);
    // DEBUG
    console.log("User created");
    res.status(201).json(user);
  } catch (error) {
    // DEBUG
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
