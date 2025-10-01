import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";

const UsersDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Mock users data
  const users = [
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      role: "Admin",
      status: "Active",
      joined: "2024-01-15",
      posts: 12,
      lastLogin: "2024-03-20",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Editor",
      status: "Active",
      joined: "2024-02-10",
      posts: 8,
      lastLogin: "2024-03-19",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Author",
      status: "Active",
      joined: "2024-01-20",
      posts: 15,
      lastLogin: "2024-03-18",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      role: "Author",
      status: "Inactive",
      joined: "2024-02-05",
      posts: 6,
      lastLogin: "2024-03-10",
    },
    {
      id: 5,
      name: "Lisa Zhang",
      email: "lisa@example.com",
      role: "Editor",
      status: "Active",
      joined: "2024-03-01",
      posts: 4,
      lastLogin: "2024-03-20",
    },
    {
      id: 6,
      name: "John Doe",
      email: "john@example.com",
      role: "Author",
      status: "Pending",
      joined: "2024-03-15",
      posts: 0,
      lastLogin: "Never",
    },
    {
      id: 7,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Author",
      status: "Active",
      joined: "2024-02-28",
      posts: 7,
      lastLogin: "2024-03-19",
    },
    {
      id: 8,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Author",
      status: "Suspended",
      joined: "2024-01-10",
      posts: 3,
      lastLogin: "2024-03-05",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getUserStatusBadge = (status) => {
    const statusConfig = {
      Active: { bg: "success", icon: "bi-check-circle" },
      Inactive: { bg: "secondary", icon: "bi-clock" },
      Pending: { bg: "warning", icon: "bi-hourglass-split" },
      Suspended: { bg: "danger", icon: "bi-x-circle" },
    };

    const config = statusConfig[status] || statusConfig["Active"];
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

  const getRoleBadge = (role) => {
    const roleColors = {
      Admin: "danger",
      Editor: "primary",
      Author: "info",
    };
    return <Badge bg={roleColors[role] || "secondary"}>{role}</Badge>;
  };

  return (
    <div className="users-dashboard">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-dark mb-1">Users Management</h1>
          <p className="text-muted mb-0">
            Manage and monitor all users in your system
          </p>
        </div>
        <Button variant="primary" className="px-4">
          <i className="bi bi-plus-lg me-2"></i>
          Add New User
        </Button>
      </div>

      {/* Stats Row */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Users</h6>
                  <h3 className="fw-bold text-primary">{users.length}</h3>
                </div>
                <i className="bi bi-people fs-2 text-primary"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Active Users</h6>
                  <h3 className="fw-bold text-success">
                    {users.filter((u) => u.status === "Active").length}
                  </h3>
                </div>
                <i className="bi bi-person-check fs-2 text-success"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Pending</h6>
                  <h3 className="fw-bold text-warning">
                    {users.filter((u) => u.status === "Pending").length}
                  </h3>
                </div>
                <i className="bi bi-hourglass-split fs-2 text-warning"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Posts</h6>
                  <h3 className="fw-bold text-info">
                    {users.reduce((sum, user) => sum + user.posts, 0)}
                  </h3>
                </div>
                <i className="bi bi-file-earmark-text fs-2 text-info"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0"
                />
              </InputGroup>
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
                  <Dropdown.Item onClick={() => setFilterStatus("Active")}>
                    Active
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStatus("Inactive")}>
                    Inactive
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStatus("Pending")}>
                    Pending
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStatus("Suspended")}>
                    Suspended
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3} className="text-end">
              <small className="text-muted">
                Showing {filteredUsers.length} of {users.length} users
              </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Users Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 py-3 px-4">User</th>
                <th className="border-0 py-3">Role</th>
                <th className="border-0 py-3">Status</th>
                <th className="border-0 py-3">Posts</th>
                <th className="border-0 py-3">Joined</th>
                <th className="border-0 py-3">Last Login</th>
                <th className="border-0 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 px-4">
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="bi bi-person text-white"></i>
                      </div>
                      <div>
                        <div className="fw-medium">{user.name}</div>
                        <div className="text-muted small">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{getRoleBadge(user.role)}</td>
                  <td className="py-3">{getUserStatusBadge(user.status)}</td>
                  <td className="py-3">
                    <span className="fw-medium">{user.posts}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-muted">{user.joined}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-muted">{user.lastLogin}</span>
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
                        <Dropdown.Item>
                          <i className="bi bi-eye me-2"></i>
                          View Profile
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <i className="bi bi-pencil me-2"></i>
                          Edit User
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger">
                          <i className="bi bi-trash me-2"></i>
                          Delete User
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
    </div>
  );
};

export default UsersDashboard;
