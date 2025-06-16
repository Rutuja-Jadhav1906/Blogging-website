import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import "./EditBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const authToken = localStorage.getItem("authToken");
  console.log(authToken);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
        // console.log(blog);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBlog();
  }, [id]);

  let handleInputChange = (event) => {
    setBlog((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    // console.log();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/blogs/${id}`,
        blog,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      enqueueSnackbar("Blog updated successfully", { variant: "success" });
      navigate("/blogs");
    } catch (err) {
      enqueueSnackbar("Error in updating blog", { variant: "error" });
      console.log(err);
    }
  };

  return (
    <div className="edit-blog-page">
      <Container className="edit-blog-container">
        <h3 className="edit-blog-title">Edit your blog</h3>
        <Form onSubmit={handleSubmit} className="edit-blog-form">
          <Form.Group as={Row} className="mb-3 mt-3">
            <Form.Label column htmlFor="title">
              Title:
            </Form.Label>
            <Col sm="11">
              <Form.Control
                id="title"
                type="text"
                value={blog.title}
                onChange={handleInputChange}
                name="title"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column htmlFor="content">
              Content:
            </Form.Label>
            <Col sm="11">
              <Form.Control
                id="content"
                as="textarea"
                rows={5}
                value={blog.content}
                onChange={handleInputChange}
                name="content"
              />
            </Col>
          </Form.Group>
          <Button variant="dark" className="submit-btn" type="submit">
            Edit Blog
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditBlog;
