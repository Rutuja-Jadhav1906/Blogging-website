import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./Login.css";
import { useAuth } from "../AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();

  let handleInputChange = () => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );
      // console.log(res.data.token);
      // localStorage.setItem("authToken", res.data.token);
      // localStorage.setItem("username", res.data.user.name);
      // localStorage.setItem("userid", res.data.user.id);
      login(res.data.token, res.data.user.name, res.data.user.id);
      // console.log(res.data.user.name);

      enqueueSnackbar(`Welcome back ${res.data.user.name}`, {
        variant: "success",
      });
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
    <div className="login-page">
      <Container className="login-container">
        <h3 className="login-title">Login</h3>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column htmlFor="email">
              Email:
            </Form.Label>
            <Col sm="11">
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
            Login
          </Button>
          <div className="login-span">
            Create an account
            <a href="/register">Click Here</a>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
