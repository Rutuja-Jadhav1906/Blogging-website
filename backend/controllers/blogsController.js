const Blog = require("../models/blogsSchema.js");
const Review = require("../models/reviewSchema.js");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .populate({ path: "reviews", populate: { path: "author" } }); // Populating only the 'name' field from the User model
    res.json(blogs); // Send populated blogs data to frontend
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

exports.getAuthorBlogs = async (req, res) => {
  const { id } = req.params; // Extract the author ID from request parameters

  try {
    const blogs = await Blog.find({ author: id })
      .populate("author", "name email")
      .populate({ path: "reviews", populate: { path: "author" } });
    if (!blogs.length) {
      return res
        .status(404)
        .json({ message: "No blogs found for this author." });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs by author:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  // console.log(blog);
  res.json(blog);
};

exports.searchBlogs = async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ message: "Category is required." });
  }

  try {
    const blogs = await Blog.find({
      category: { $regex: category, $options: "i" },
    })
      .populate("author", "name")
      .populate({ path: "reviews", populate: { path: "author" } }); // Case-insensitive search
    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found for this category." });
    }
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error searching blogs:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.addBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const authorId = req.user.id; // Get the logged-in user's ID from the token

    const newBlog = new Blog({
      title,
      content,
      category,
      author: authorId, // Use the logged-in user's ID as the author
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id, data);
  updatedBlog.save();
  res.json({ message: "Blog updated successfully" });
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog and populate its reviews
    const blog = await Blog.findById(id).populate("reviews");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete all the reviews related to this blog
    await Review.deleteMany({ _id: { $in: blog.reviews } });

    // Now, delete the blog itself
    await Blog.findByIdAndDelete(id);

    res.json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.likeBlog = async (req, res) => {
  const { blogId } = req.params;
  const authorId = req.user.id;

  try {
    const blog = await Blog.findById(blogId)
      .populate("author", "name")
      .populate({ path: "reviews", populate: { path: "author" } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const alreadyLiked = blog.likedBy.includes(authorId);

    // Increment the likes count
    // blog.likes += 1;
    // await blog.save();

    if (alreadyLiked) {
      // Remove the user's like
      blog.likedBy = blog.likedBy.filter(
        (id) => id.toString() !== authorId.toString()
      );
      blog.likes -= 1;
    } else {
      // Add the user's like
      blog.likedBy.push(authorId);
      blog.likes += 1;
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while liking the blog" });
  }
};
