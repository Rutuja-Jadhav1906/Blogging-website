import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./Register.css";
import { useAuth } from "../AuthProvider";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { register } = useAuth();

  let handleInputChange = () => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(`${API_BASE_URL}/users/register`, formData);
      // console.log(res.data.token);
      // localStorage.setItem("authToken", res.data.token);
      // localStorage.setItem("username", res.data.user.name);
      // localStorage.setItem("userid", res.data.user.id);
      register(res.data.token, res.data.user.name, res.data.user.id);
      enqueueSnackbar(`Welcome ${res.data.user.name}`, { variant: "success" });
      navigate("/");
    } catch (err) {
      enqueueSnackbar("Enter valid credentials", { variant: "error" });
      console.log(err);
    }

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="register-page">
      <Container className="register-container">
        <h3 className="register-title">Sign Up</h3>
        <Form onSubmit={handleSubmit} className="register-form">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column htmlFor="name">
              Username:
            </Form.Label>
            <Col sm="11">
              <Form.Control
                id="name"
                placeholder="Enter username"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-3">
            <Form.Label column htmlFor="email">
              Email:
            </Form.Label>
            <Col sm="11">
              {/* <Form.Control
              id="content"
              placeholder="Enter your content"
              as="textarea"
              rows={5}
              value={formData.fullName}
              onChange={handleInputChange}
              name="content"
            /> */}
              <Form.Control
                type="email"
                placeholder="name@example.com"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column htmlFor="password">
              Password:
            </Form.Label>
            <Col sm="11">
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                name="password"
              />
            </Col>
          </Form.Group>

          <Button variant="dark" type="submit" className="submit-btn">
            Sign Up
          </Button>
          <div className="login-span">
            Already have an account ? login instead{" "}
            <a href="/login">Click Here</a>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
