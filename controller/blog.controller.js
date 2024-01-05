const getBlogById = (req, res, next) => {
  const { id } = req.body;
  res.json(id);
};
const createBlog = (req, res, next) => {
  const data = req.body;
  res.json(data);
};

const updateBlogById = (req, res, next) => {
  const { id } = req.body;
  res.json({ message: `Updated ${id}` });
};

const deleteBlogById = (req, res, next) => {
  const { id } = req.body;
  res.json({ message: `Deleted ${id}` });
};

module.exports = {
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
};
