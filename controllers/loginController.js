const loginService = require("../services/loginService");

exports.userLogin = async (req, res) => {
  console.log(req.body);
    try {
    const { username, password } = req.body;
    const token = await loginService.login(username, password);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Fehler beim Login:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
