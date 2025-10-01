import axios from "axios";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

const PostDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Fetch posts from API
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        const postsWithStatus = res.data.map((post) => ({
          ...post,
          status:
            Math.random() > 0.7
              ? "Draft"
              : Math.random() > 0.3
              ? "Published"
              : "Review",
        }));
        setPosts(postsWithStatus);
      })
      .catch((err) => console.log(err));
  }, []);

  const categories = [...new Set(posts.map((post) => post.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || post.category === filterCategory;
    const matchesStatus =
      filterStatus === "All" || post.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      Published: { bg: "success", icon: "bi-check-circle" },
      Draft: { bg: "secondary", icon: "bi-file-earmark" },
      Review: { bg: "warning", icon: "bi-clock-history" },
    };

    const config = statusConfig[status] || statusConfig["Draft"];
    return (
      <Badge
        bg={config.bg}
        className="px-2 py-1 d-flex align-items-center"
        style={{ width: "fit-content" }}
      >
        <i className={`${config.icon} me-1`}></i>
        {status}
      </Badge>
    );
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="posts-dashboard">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-dark mb-1">Posts Management</h1>
          <p className="text-muted mb-0">Manage and monitor all blog posts</p>
        </div>
        <Button variant="primary" className="px-4">
          <i className="bi bi-plus-lg me-2"></i>
          Create New Post
        </Button>
      </div>

      {/* Stats Row */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Posts</h6>
                  <h3 className="fw-bold text-primary">{posts.length}</h3>
                </div>
                <i className="bi bi-file-earmark-text fs-2 text-primary"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Published</h6>
                  <h3 className="fw-bold text-success">
                    {posts.filter((p) => p.status === "Published").length}
                  </h3>
                </div>
                <i className="bi bi-check-circle fs-2 text-success"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Drafts</h6>
                  <h3 className="fw-bold text-secondary">
                    {posts.filter((p) => p.status === "Draft").length}
                  </h3>
                </div>
                <i className="bi bi-file-earmark fs-2 text-secondary"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Views</h6>
                  <h3 className="fw-bold text-info">
                    {posts.reduce((sum, post) => sum + (post.likes || 0), 0)}
                  </h3>
                </div>
                <i className="bi bi-eye fs-2 text-info"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search posts by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0"
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <i className="bi bi-tag me-2"></i>
                  Category: {filterCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterCategory("All")}>
                    All Categories
                  </Dropdown.Item>
                  {categories.map((category) => (
                    <Dropdown.Item
                      key={category}
                      onClick={() => setFilterCategory(category)}
                    >
                      {category}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <i className="bi bi-funnel me-2"></i>
                  Status: {filterStatus}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterStatus("All")}>
                    All Statuses
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStatus("Published")}>
                    Published
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStatus("Draft")}>
                    Draft
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStatus("Review")}>
                    Review
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={2} className="text-end">
              <small className="text-muted">
                {filteredPosts.length} of {posts.length}
              </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Posts Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 py-3 px-4">Post</th>
                <th className="border-0 py-3">Category</th>
                <th className="border-0 py-3">Author</th>
                <th className="border-0 py-3">Status</th>
                <th className="border-0 py-3">Date</th>
                <th className="border-0 py-3">Engagement</th>
                <th className="border-0 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className="py-3 px-4">
                    <div className="d-flex align-items-center">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="rounded me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div className="fw-medium mb-1">{post.title}</div>
                        <div className="text-muted small">
                          {post.excerpt?.substring(0, 60)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge bg="primary" className="px-2 py-1">
                      {post.category}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="text-muted">{post.author}</div>
                  </td>
                  <td className="py-3">{getStatusBadge(post.status)}</td>
                  <td className="py-3">
                    <span className="text-muted">{formatDate(post.date)}</span>
                  </td>
                  <td className="py-3">
                    <div className="d-flex flex-column">
                      <small className="text-muted">
                        <i className="bi bi-heart text-danger me-1"></i>
                        {post.likes} likes
                      </small>
                      <small className="text-muted">
                        <i className="bi bi-chat text-primary me-1"></i>
                        {post.comments} comments
                      </small>
                    </div>
                  </td>
                  <td className="py-3">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        size="sm"
                        className="border-0"
                      >
                        <i className="bi bi-three-dots"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleViewPost(post)}>
                          <i className="bi bi-eye me-2"></i>
                          View Post
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <i className="bi bi-pencil me-2"></i>
                          Edit Post
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <i className="bi bi-share me-2"></i>
                          Share Post
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger">
                          <i className="bi bi-trash me-2"></i>
                          Delete Post
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Post Preview Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Post Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <div>
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-100 mb-3 rounded"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <h4 className="fw-bold mb-3">{selectedPost.title}</h4>
              <div className="d-flex align-items-center mb-3">
                <Badge bg="primary" className="me-2">
                  {selectedPost.category}
                </Badge>
                <span className="text-muted">By {selectedPost.author}</span>
                <span className="text-muted ms-2">
                  • {formatDate(selectedPost.date)}
                </span>
              </div>
              <p className="text-muted mb-3">{selectedPost.excerpt}</p>
              <p>{selectedPost.content}</p>
              <div className="d-flex gap-3 mt-3">
                <small className="text-muted">
                  <i className="bi bi-heart text-danger me-1"></i>
                  {selectedPost.likes} likes
                </small>
                <small className="text-muted">
                  <i className="bi bi-chat text-primary me-1"></i>
                  {selectedPost.comments} comments
                </small>
                <small className="text-muted">
                  <i className="bi bi-clock me-1"></i>
                  {selectedPost.readTime} min read
                </small>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary">Edit Post</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostDashboard;
