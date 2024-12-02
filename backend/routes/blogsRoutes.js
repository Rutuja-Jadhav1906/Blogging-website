const express = require("express");
const isAuthenticated = require("../middlewares/auth.js");

const {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getAuthorBlogs,
  likeBlog,
  searchBlogs,
} = require("../controllers/blogsController.js");

const router = express.Router();

router.get("/", getBlogs);
router.get("/author/:id", getAuthorBlogs);
router.get("/:id", getBlog);
router.post("/search", searchBlogs);
router.post("/add", isAuthenticated, addBlog);
router.post("/:blogId/like", isAuthenticated, likeBlog);
router.put("/:id", isAuthenticated, updateBlog);
router.delete("/:id", isAuthenticated, deleteBlog);

module.exports = router;
