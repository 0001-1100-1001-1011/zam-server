const service = require("../services/loginService");

exports.userLogin = async (req, res) => {
  try {
    const token = await service.login(req.body);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
};
