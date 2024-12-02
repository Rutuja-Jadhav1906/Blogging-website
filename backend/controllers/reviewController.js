const Review = require("../models/reviewSchema.js");
const Blog = require("../models/blogsSchema.js");

exports.postReview = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    const { comment } = req.body;
    const authorId = req.user.id;
    let newReview = new Review({ comment, author: authorId });
    await newReview.save();

    blog.reviews.push(newReview);
    await blog.save();

    await newReview.populate("author", "name");

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};
