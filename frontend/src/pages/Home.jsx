import React from "react";
import { useAuth } from "../AuthProvider";
import "./Home.css";
import hero from "../assets/hero.jpg";

const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="split">
          <div className="left">
            <h1 className="hero-title">Welcome to</h1>
            <h1 className="highlight">The Wandering Mind</h1>
            <p className="hero-subtitle">
              A home for creative thinkers, writers, and dreamers. Dive into a
              world of ideas, inspiration, and connection.
            </p>
            <a href="/blogs" className="cta-btn">
              Explore Blogs
            </a>
          </div>
          <div className="right">
            <img src={hero} alt="Creative Concept" className="hero-image" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="content">
          <h2 className="section-title">Who We Are</h2>
          <p className="about-text">
            At <b>The Wandering Mind</b>, we believe everyone has a story to
            tell. Whether you’re a seasoned writer or someone who simply loves
            to share ideas, this is your space. Write, read, connect, and let
            your creativity wander.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="feature">
            <i className="fas fa-pencil-alt feature-icon"></i>
            <h3>Express Yourself</h3>
            <p>Unleash your creativity with our intuitive blog editor.</p>
          </div>
          <div className="feature">
            <i className="fas fa-book-open feature-icon"></i>
            <h3>Discover Stories</h3>
            <p>Immerse yourself in content from brilliant minds.</p>
          </div>
          <div className="feature">
            <i className="fas fa-handshake feature-icon"></i>
            <h3>Build Connections</h3>
            <p>Find like-minded individuals and grow your network.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <h2 className="cta-title">Ready to Share Your Story?</h2>
        {isAuthenticated ? (
          <a href="/add" className="cta-btn-light">
            Post your story
          </a>
        ) : (
          <a href="/register" className="cta-btn-light">
            Join Us Today
          </a>
        )}
      </section>
    </div>
  );
};

export default Home;
