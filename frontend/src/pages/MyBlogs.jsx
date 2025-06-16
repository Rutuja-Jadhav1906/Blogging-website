import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
// import Form from "react-bootstrap/Form";
import "./MyBlog.css";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

const MyBlogs = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [showComments, setShowComments] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/blogs/author/${id}`);
        if (!res.ok) {
          enqueueSnackbar("You have not posted any blogs yet", {
            variant: "error",
          });
          navigate("/add");
        }
        const data = await res.json();
        setBlogs(data);
        const initialState = data.reduce((acc, blog) => {
          acc[blog._id] = false;
          return acc;
        }, {});
        setShowComments(initialState);
        console.log(blogs);
      } catch (error) {
        enqueueSnackbar("Error fetching blogs", { variant: "error" });
      }
    };
    fetchBlogs();
  }, [id, navigate]);

  const handleToggleComments = (blogId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [blogId]: !prevState[blogId],
    }));
  };

  const handleDelete = async (blogId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/blogs/${blogId}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      enqueueSnackbar("Blog deleted successfully", { variant: "success" });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      // console.log(blog);
    } catch (error) {
      enqueueSnackbar("Error deleting blog", { variant: "error" });
    }
  };

  return (
    <div className="blog-container">
      <Container className="myblogs-container">
        <Row>
          {blogs.length === 0 ? (
            <Col>
              <p className="no-blogs-text">
                You have not posted any blogs yet.
              </p>
            </Col>
          ) : (
            blogs.map((blog) => (
              <Col xs={12} className="blog-col" key={blog._id}>
                <Card className="blog-card">
                  <Card.Body>
                    <Card.Title className="blog-title">{blog.title}</Card.Title>
                    <Card.Text className="blog-category">
                      <strong>Category:</strong> {blog.category}
                    </Card.Text>
                    <Card.Text className="blog-content">
                      {blog.content}
                    </Card.Text>
                    <Card.Text className="blog-author">
                      <strong>Author:</strong> {blog.author.name}
                    </Card.Text>
                    <div className="blog-actions">
                      <div className="blog-links">
                        <Card.Link
                          href={`/edit/${blog._id}`}
                          className="edit-link"
                        >
                          <MdEdit />
                        </Card.Link>
                        <Card.Link
                          // href={`/delete/${blog._id}`}
                          className="delete-link"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <MdDelete />
                        </Card.Link>
                      </div>

                      <div className="blog-icons">
                        <span
                          className="icon"
                          onClick={() => handleToggleComments(blog._id)}
                        >
                          {showComments[blog._id] ? (
                            <FaComment color="#38b6ff" />
                          ) : (
                            <FaRegComment />
                          )}
                        </span>

                        <span>
                          <FaHeart color="#e81e1e" className="likes" />
                          {blog.likes}
                        </span>
                      </div>
                    </div>
                    {/* Toggle Comments Button */}

                    {/* Display Comments if toggled */}
                    {showComments[blog._id] && (
                      <div className="comments-section">
                        <h5>Comments:</h5>
                        {blog.reviews && blog.reviews.length > 0 ? (
                          blog.reviews.map((review, index) => (
                            <div key={index} className="comment-item">
                              <strong>{review.author.name}:</strong>{" "}
                              {review.comment}
                              <br />
                              <small>
                                <em>
                                  {new Date(review.createdAt).toLocaleString()}
                                </em>
                              </small>
                            </div>
                          ))
                        ) : (
                          <p className="no-comments-text">No comments yet.</p>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MyBlogs;
