exports.userRouteConst = {
  getUserById: "/",
  updateUserById: "/",
  updateUserStatus: "/change_status",
  getSelfDetails: "/me",
  getUserFilter: "/filter",
  deleteUser: "/",
  deleteUserById: "/delete",
};
exports.authRouteConst = {
  signup: "/signup",
  signin: "/signin",
  verification: "/verification/:token",
  logout: "/logout",
  getRefreshToken: "/refresh_token",
};
exports.blogRouteConst = {
  initialBlog: "/:blogId",
  getBlogFilter: "/blogs/filter",
  updatePostStatus: "/change_status",
  createBlog: "/create",
};

exports.categoryRouteConst = {
  initialRoute: "/",
};
