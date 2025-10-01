import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router";

function PostCard({ post }) {
  return (
    <Card
      className="h-100 shadow-sm border-0 mb-4"
      style={{ transition: "transform 0.2s" }}
    >
      <Card.Img
        variant="top"
        src={post.image}
        style={{ height: "200px", objectFit: "cover" }}
        alt={post.title}
      />
      <Card.Body className="d-flex flex-column">
        {/* Category Badge */}
        <div className="mb-2">
          <Badge bg="primary" className="px-2 py-1">
            {post.category}
          </Badge>
        </div>

        {/* Title */}
        <Card.Title
          className="fw-bold mb-3"
          style={{ fontSize: "1.25rem", lineHeight: "1.4" }}
        >
          {post.title}
        </Card.Title>

        {/* Excerpt */}
        <Card.Text className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
          {post.excerpt}
        </Card.Text>

        {/* Meta Info */}
        <div
          className="d-flex justify-content-between align-items-center text-muted mb-3"
          style={{ fontSize: "0.85rem" }}
        >
          <div>
            <i className="bi bi-person-fill me-1"></i>
            {post.author}
          </div>
          <div>
            <i className="bi bi-clock me-1"></i>
            {post.readTime} min
          </div>
        </div>

        {/* Engagement Stats */}
        <div
          className="d-flex justify-content-between align-items-center mb-3"
          style={{ fontSize: "0.85rem" }}
        >
          <div className="text-muted">
            <i className="bi bi-heart text-danger me-1"></i>
            {post.likes} likes
          </div>
          <div className="text-muted">
            <i className="bi bi-chat text-primary me-1"></i>
            {post.comments} comments
          </div>
        </div>

        {/* Button */}
        <div className="mt-auto">
          <NavLink to={`/posts/${post.id}`} className="text-decoration-none">
            <Button variant="primary" className="w-100">
              Read More
              <i className="bi bi-arrow-right ms-2"></i>
            </Button>
          </NavLink>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
