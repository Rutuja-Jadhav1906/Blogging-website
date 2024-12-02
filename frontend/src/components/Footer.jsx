import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="footer-col">
            <h5>Contact Me</h5>
            <p>
              Have questions, feedback, or a story to share? Reach out to me
              anytime!
            </p>
            <p>
              <FaEnvelope />{" "}
              <a href="mailto:rutujajadhav1906@gmail.com">
                contact@thewanderingmind.com
              </a>
            </p>
          </Col>
          <Col xs={12} md={4} className="footer-col">
            <h5>Stay Connected</h5>
            <p>Follow me on social media for updates and more insights:</p>
            <div className="social-icons">
              <a
                href="https://github.com/Rutuja-Jadhav1906"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={30} />
              </a>
              <a
                href="https://www.linkedin.com/in/rutujajadhav1906/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href="https://leetcode.com/u/rutu_jadhav/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiLeetcode size={30} />
              </a>
            </div>
          </Col>
          <Col xs={12} md={4} className="footer-col">
            <h5>About Us </h5>
            <p>
              Welcome to The Wandering Mind, a space where ideas, stories, and
              inspirations come to life. Explore thought-provoking articles and
              join the conversation.
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p>
              &copy; {new Date().getFullYear()} The Wandering Mind. Designed
              with passion. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
