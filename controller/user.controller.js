const getUserDetails = (req, res) => {
  res.status(200).json("Hello I'm a user");
};

const signup = (req, res) => {
  res.status(200).json(req.body);
};

const signin = (req, res) => {
  res.status(200).json(req.body);
};

const logout = (req, res) => {
  res.status(200).json("Logout");
};

const getUserById = (req, res) => {
  const { id } = req.params;
  res.status(200).json(id);
};
const getUserFilter = (req, res) => {
  res.status(200).json(req.query);
};

const changeUserStatus = (req, res) => {
  const { id } = req.body;
  res.status(200).json(`Change User Status: ${id}`);
};

const updateUserById = (req, res) => {
  const { id } = req.body;
  res.status(200).json(`Update User Status: ${id}`);
};

module.exports = {
  getUserFilter,
  updateUserById,
  changeUserStatus,
  getUserDetails,
  logout,
  signup,
  getUserById,
  signin,
};
