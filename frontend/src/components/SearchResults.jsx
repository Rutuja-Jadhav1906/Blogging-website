import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../pages/Blogs.css";

const SearchResults = ({ searchResults }) => {
  if (searchResults.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div className="blog-container">
      <Container className="container">
        <Row>
          {searchResults.map((result) => (
            <Col xs={12} key={result._id} className="col">
              <Card className="card">
                <Card.Body>
                  <Card.Title className="title">{result.title}</Card.Title>
                  <Card.Text className="category">{result.category}</Card.Text>
                  <Card.Text className="content">{result.content}</Card.Text>
                  <Card.Text className="author">
                    <strong>Author:</strong> {result.author.name}{" "}
                  </Card.Text>
                  <Card.Text>
                    {new Date(result.createdAt).toLocaleDateString()}
                  </Card.Text>
                  {/* <Card.Text>
                <strong>Likes:</strong> {blog.likes || 0}
              </Card.Text> */}
                </Card.Body>
              </Card>{" "}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SearchResults;
