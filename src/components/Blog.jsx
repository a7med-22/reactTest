import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PostCard from "./PostCard.jsx";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1
          className="fw-bold mb-3"
          style={{ fontSize: "3rem", color: "#2c3e50" }}
        >
          Latest Posts
        </h1>
        <p className="lead text-muted">
          Discover insightful articles on web development, programming, and
          technology
        </p>
      </div>
      <Row className="g-4">
        {posts.map((post) => (
          <Col key={post.id} lg={4} md={6} sm={12}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;
