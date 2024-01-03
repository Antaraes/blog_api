const getUserDetails = (req, res) => {
  res.json("Hello I'm a user");
};
const signup = (req, res) => {
  res.json(req.body);
};
const signin = (req, res) => {
  res.json(req.body);
};

module.exports = {
  getUserDetails,
  signup,
  signin,
};
