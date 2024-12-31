import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useSnackbar } from "notistack";
import "./Blogs.css";

const Blogs = () => {
  const authToken = localStorage.getItem("authToken");
  const { id } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // console.log(authToken);

  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    comment: "",
  });
  const [showComments, setShowComments] = useState({});
  // const [showCommentForm, setShowCommentForm] = useState({});

  let handleInputChange = () => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3000/blogs");
        const data = await res.json();
        setBlogs(data);
        const initialToggleStates = data.reduce(
          (acc, blog) => ({
            ...acc,
            [blog._id]: false,
          }),
          {}
        );
        setShowComments(initialToggleStates);
        setShowCommentForm(initialToggleStates);
        // console.log(blogs);
      } catch (error) {
        // enqueueSnackbar("Error fetching blogs", { variant: "error" });
      }
    };
    fetchBlogs();
  }, []);

  const handleToggleComments = (blogId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [blogId]: !prevState[blogId],
    }));
  };

  // const handleToggleCommentForm = (blogId) => {
  //   setShowCommentForm((prevState) => ({
  //     ...prevState,
  //     [blogId]: !prevState[blogId],
  //   }));
  // };

  let handleSubmit = async (event, blogId) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/blogs/${blogId}/comments`,
        formData,
        {
          headers: {
            authorization: `Bearer ${authToken}`, // Send the token in the Authorization header
            "Content-Type": "application/json", // Optional, for JSON payloads
          },
        }
      );
      const newComment = res.data.comment;
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId
            ? { ...blog, reviews: [...blog.reviews, newComment] } // Append the new comment
            : blog
        )
      );
      enqueueSnackbar("Comment added successfully", { variant: "success" });
      // navigate("/");
    } catch (err) {
      enqueueSnackbar("Error adding comment", { variant: "error" });
      console.log(err);
    }
    // console.log(formData);
    setFormData({ comment: "" });
  };

  const handleLike = async (blogId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/blogs/${blogId}/like`,
        {},
        {
          headers: {
            authorization: `Bearer ${authToken}`, // Send the token in the Authorization header
            // "Content-Type": "application/json", // Optional, for JSON payloads
          },
        }
      );
      const updatedBlog = res.data;
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
    } catch (err) {
      console.error("Error liking the blog:", err);
    }
  };

  return (
    <div className="blog-container">
      <Container className="container">
        <Row>
          {blogs.map((blog) => (
            <Col xs={12} key={blog._id} className="col">
              <Card className="card">
                <Card.Body>
                  <Card.Title className="title">{blog.title}</Card.Title>
                  <Card.Text className="category">{blog.category}</Card.Text>
                  <Card.Text className="content">{blog.content}</Card.Text>
                  <Card.Text className="author">
                    <strong>Author:</strong> {blog.author.name}{" "}
                    {/* Display the author's name */}
                  </Card.Text>
                  <Card.Text>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </Card.Text>
                  {/* <Card.Text>
                  <strong>Likes:</strong> {blog.likes || 0}
                </Card.Text> */}

                  {/* Like Button */}
                  <div className="interactions">
                    <div className="like-section">
                      <p className="icon" onClick={() => handleLike(blog._id)}>
                        {blog.likedBy.includes(id) ? (
                          <FaHeart color="#f45d48" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </p>

                      <span className="likes">{blog.likes || 0} likes</span>
                    </div>

                    <p
                      className="icon"
                      onClick={() => handleToggleComments(blog._id)}
                    >
                      {showComments[blog._id] ? (
                        <FaComment color="#38b6ff" />
                      ) : (
                        <FaRegComment />
                      )}
                    </p>
                  </div>

                  {/* Display Comments*/}
                  {showComments[blog._id] && (
                    <div className="comments-section">
                      <h5 className="comments-title">Comments:</h5>
                      <div className="comments-list">
                        {blog.reviews.length > 0 ? (
                          blog.reviews.map((review, index) => (
                            <div key={index} className="comment-item">
                              <strong>{review.author.name}:</strong>{" "}
                              {review.comment}
                              <br />
                              <small>
                                <em>
                                  {new Date(
                                    blog.createdAt
                                  ).toLocaleDateString()}
                                </em>
                              </small>
                            </div>
                          ))
                        ) : (
                          <p className="no-comments">No comments yet.</p>
                        )}
                      </div>

                      {/* Add Comment Form */}
                      <Form
                        onSubmit={(event) => handleSubmit(event, blog._id)}
                        className="comment-form"
                      >
                        <Form.Group>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Add a comment..."
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            className="comment-textarea"
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="comment-submit"
                        >
                          Post
                        </Button>
                      </Form>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
