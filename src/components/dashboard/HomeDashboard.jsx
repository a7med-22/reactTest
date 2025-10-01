import { Badge, Card, Col, Row, Table } from "react-bootstrap";

const HomeDashboard = () => {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Posts",
      value: "127",
      change: "+12%",
      icon: "bi-file-earmark-text",
      color: "primary",
    },
    {
      title: "Total Users",
      value: "1,234",
      change: "+5%",
      icon: "bi-people",
      color: "success",
    },
    {
      title: "Total Views",
      value: "45.2K",
      change: "+18%",
      icon: "bi-eye",
      color: "info",
    },
    {
      title: "Comments",
      value: "892",
      change: "+8%",
      icon: "bi-chat",
      color: "warning",
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      author: "Ahmed Mohamed",
      status: "Published",
      views: 234,
    },
    {
      id: 2,
      title: "CSS Grid and Flexbox",
      author: "Sarah Johnson",
      status: "Draft",
      views: 123,
    },
    {
      id: 3,
      title: "JavaScript ES6+ Features",
      author: "Michael Chen",
      status: "Published",
      views: 456,
    },
    {
      id: 4,
      title: "Node.js and Express",
      author: "David Wilson",
      status: "Published",
      views: 321,
    },
    {
      id: 5,
      title: "Database Design",
      author: "Lisa Zhang",
      status: "Review",
      views: 189,
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joined: "2024-03-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joined: "2024-03-14",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      joined: "2024-03-13",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      joined: "2024-03-12",
      status: "Active",
    },
  ];

  return (
    <div className="dashboard-home">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-dark mb-1">Dashboard Overview</h1>
          <p className="text-muted mb-0">
            Welcome back! Here's what's happening with your blog.
          </p>
        </div>
        <div className="text-muted">
          <i className="bi bi-calendar3 me-2"></i>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col lg={3} md={6} key={index} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-2 fw-normal">{stat.title}</h6>
                    <h3 className="fw-bold mb-1">{stat.value}</h3>
                    <small className={`text-${stat.color} fw-medium`}>
                      <i className="bi bi-arrow-up me-1"></i>
                      {stat.change} from last month
                    </small>
                  </div>
                  <div className={`text-${stat.color} fs-2`}>
                    <i className={stat.icon}></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Recent Posts */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Recent Posts</h5>
                <Badge bg="primary" className="px-3 py-2">
                  {recentPosts.length} Posts
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 py-3 px-4">Title</th>
                    <th className="border-0 py-3">Author</th>
                    <th className="border-0 py-3">Status</th>
                    <th className="border-0 py-3">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="py-3 px-4">
                        <div className="fw-medium">{post.title}</div>
                      </td>
                      <td className="py-3">
                        <div className="text-muted">{post.author}</div>
                      </td>
                      <td className="py-3">
                        <Badge
                          bg={
                            post.status === "Published"
                              ? "success"
                              : post.status === "Draft"
                              ? "secondary"
                              : "warning"
                          }
                          className="px-2 py-1"
                        >
                          {post.status}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <span className="fw-medium">{post.views}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Users */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Recent Users</h5>
                <Badge bg="success" className="px-3 py-2">
                  {recentUsers.length} New
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="d-flex align-items-center mb-3 pb-3 border-bottom"
                >
                  <div
                    className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="bi bi-person text-white"></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-medium mb-1">{user.name}</div>
                    <div className="text-muted small">{user.email}</div>
                    <div className="text-muted small">Joined {user.joined}</div>
                  </div>
                  <Badge
                    bg={user.status === "Active" ? "success" : "secondary"}
                    className="px-2 py-1"
                  >
                    {user.status}
                  </Badge>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomeDashboard;
