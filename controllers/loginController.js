const service = require("../services/loginService");

exports.userLogin = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const token = await service.login(username, password);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
};
