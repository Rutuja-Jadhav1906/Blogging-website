import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";
import "./AddBlog.css";

const AddBlog = () => {
  const authToken = localStorage.getItem("authToken");
  // console.log(authToken);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  let handleInputChange = () => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/blogs/add",
        formData,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      enqueueSnackbar("Blog posted successfully", { variant: "success" });
      navigate("/blogs");
    } catch (err) {
      enqueueSnackbar("Error posting blog", { variant: "error" });
      console.log(err);
    }
    console.log(formData);
    setFormData({
      title: "",
      content: "",
      category: "",
    });
  };
  return (
    <div className="add-blog-page">
      <Container className="add-blog-container">
        <h3 className="add-blog-title">Post your blog</h3>
        <Form onSubmit={handleSubmit} className="add-blog-form">
          <Form.Group as={Row} className="mb-3 mt-3">
            <Form.Label column htmlFor="title">
              Title:
            </Form.Label>
            <Col sm="11">
              <Form.Control
                id="title"
                placeholder="Enter title of blog"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                name="title"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-3">
            <Form.Label column htmlFor="category">
              Category:
            </Form.Label>
            <Col sm="11">
              <Form.Control
                id="category"
                placeholder="Enter category of blog"
                type="text"
                value={formData.category}
                onChange={handleInputChange}
                name="category"
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
                placeholder="Enter your content"
                as="textarea"
                rows={5}
                value={formData.content}
                onChange={handleInputChange}
                name="content"
                // className="form-control"
              />
            </Col>
          </Form.Group>
          <Button variant="dark" className="submit-btn" type="submit">
            Post Blog
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddBlog;
