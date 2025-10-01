import axios from "axios";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="text-center mt-5">
        <h2>Post not found</h2>
        <Button variant="primary" onClick={() => navigate("/posts")}>
          Back to Posts
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            {/* Hero Image */}
            <Card.Img
              variant="top"
              src={post.image}
              style={{ height: "400px", objectFit: "cover" }}
              alt={post.title}
            />

            <Card.Body className="p-4">
              {/* Category Badge */}
              <div className="mb-3">
                <Badge bg="primary" className="px-3 py-2">
                  {post.category}
                </Badge>
              </div>

              {/* Title */}
              <h1
                className="mb-4 fw-bold"
                style={{ fontSize: "2.5rem", lineHeight: "1.2" }}
              >
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="d-flex flex-wrap align-items-center text-muted mb-4">
                <div className="me-4 mb-2">
                  <i className="bi bi-person-fill me-2"></i>
                  <strong>By {post.author}</strong>
                </div>
                <div className="me-4 mb-2">
                  <i className="bi bi-calendar3 me-2"></i>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="me-4 mb-2">
                  <i className="bi bi-clock me-2"></i>
                  {post.readTime} min read
                </div>
              </div>

              {/* Excerpt */}
              <div className="mb-4 p-3 bg-light rounded">
                <h5 className="text-primary mb-2">Summary</h5>
                <p className="mb-0 fst-italic">{post.excerpt}</p>
              </div>

              {/* Content */}
              <div
                className="mb-4"
                style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
              >
                <p>{post.content}</p>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <h6 className="mb-3">Tags</h6>
                <div className="d-flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} bg="secondary" className="px-3 py-2">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded mb-4">
                <div className="d-flex gap-4">
                  <div className="text-center">
                    <div className="fw-bold text-primary">{post.likes}</div>
                    <small className="text-muted">Likes</small>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold text-primary">{post.comments}</div>
                    <small className="text-muted">Comments</small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm">
                    <i className="bi bi-heart me-1"></i>
                    Like
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <i className="bi bi-share me-1"></i>
                    Share
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="d-flex justify-content-between">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/")}
                  className="px-4"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Posts
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-4"
                >
                  <i className="bi bi-arrow-up me-2"></i>
                  Back to Top
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SinglePost;
