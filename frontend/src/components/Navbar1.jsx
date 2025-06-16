import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar1 = ({ setSearchResults }) => {
  const { isAuthenticated, username, id, logout } = useAuth();
  // const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
  });

  let handleInputChange = (event) => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    // if (!searchTerm) return;
    try {
      const res = await axios.post(
        "http://localhost:3000/api/blogs/search",
        formData
      );
      setSearchResults(res.data);
      navigate("/search-results");
      setFormData({
        category: "",
      });
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  useEffect(() => {
    console.log("Navbar state updated:", { isAuthenticated, username });
  }, [isAuthenticated, username]);

  return (
    <Navbar expand="lg" sticky="top" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="brand">
          The Wandering Mind
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" style={{ border: "none" }}>
          <GiHamburgerMenu style={{ color: "white", fontSize: "30px" }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="/blogs" className="nav-link">
              Blogs
            </Nav.Link>
            {!isAuthenticated ? (
              <Nav.Link href="/register" className="nav-link">
                Sign Up
              </Nav.Link>
            ) : (
              <Nav.Link href="/add" className="nav-link">
                Add Blog
              </Nav.Link>
            )}
          </Nav>
          <div className="d-flex nav-right">
            {isAuthenticated ? (
              <>
                <Navbar.Text className="username">{username}</Navbar.Text>
                <NavDropdown
                  title=""
                  id="user-dropdown"
                  className="user-dropdown"
                >
                  <NavDropdown.Item href={`/${id}`}>
                    See My Blogs
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : null}
            <Form className="d-flex search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search by category"
                className="search-input"
                value={formData.category}
                onChange={handleInputChange}
                name="category"
              />
              <Button
                variant="outline-light"
                type="submit"
                className="search-btn"
              >
                Search
              </Button>
            </Form>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
