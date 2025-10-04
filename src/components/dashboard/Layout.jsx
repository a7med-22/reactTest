import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isActiveLink = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    // Show logout toast
    toast.success("Logged out successfully!");

    // Redirect to login
    navigate("/login");
  };

  return (
    <div
      className="dashboard-layout"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold">
            <i className="bi bi-speedometer2 me-2"></i>
            Admin Dashboard
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#" className="text-light">
              <i className="bi bi-person-circle me-1"></i>
              {user.name || "Admin User"}
            </Nav.Link>
            <Nav.Link
              onClick={handleLogout}
              className="text-light"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Sidebar */}
          <Col
            md={3}
            lg={2}
            className="bg-white shadow-sm p-0"
            style={{ minHeight: "calc(100vh - 56px)" }}
          >
            <div className="sidebar-nav p-3">
              <Nav className="flex-column">
                <NavLink
                  to="/dashboard"
                  className={`nav-link d-flex align-items-center py-3 px-3 rounded mb-2 text-decoration-none ${
                    isActiveLink("/dashboard")
                      ? "bg-primary text-white"
                      : "text-dark"
                  }`}
                  style={{
                    transition: "all 0.3s ease",
                    backgroundColor: isActiveLink("/dashboard")
                      ? "#0d6efd"
                      : "transparent",
                  }}
                >
                  <i className="bi bi-house-door me-3"></i>
                  <span className="fw-medium">Dashboard</span>
                </NavLink>

                <NavLink
                  to="/dashboard/users"
                  className={`nav-link d-flex align-items-center py-3 px-3 rounded mb-2 text-decoration-none ${
                    isActiveLink("/dashboard/users")
                      ? "bg-primary text-white"
                      : "text-dark"
                  }`}
                  style={{
                    transition: "all 0.3s ease",
                    backgroundColor: isActiveLink("/dashboard/users")
                      ? "#0d6efd"
                      : "transparent",
                  }}
                >
                  <i className="bi bi-people me-3"></i>
                  <span className="fw-medium">Users</span>
                </NavLink>

                <NavLink
                  to="/dashboard/posts"
                  className={`nav-link d-flex align-items-center py-3 px-3 rounded mb-2 text-decoration-none ${
                    isActiveLink("/dashboard/posts")
                      ? "bg-primary text-white"
                      : "text-dark"
                  }`}
                  style={{
                    transition: "all 0.3s ease",
                    backgroundColor: isActiveLink("/dashboard/posts")
                      ? "#0d6efd"
                      : "transparent",
                  }}
                >
                  <i className="bi bi-file-earmark-text me-3"></i>
                  <span className="fw-medium">Posts</span>
                </NavLink>

                <hr className="my-4" />

                <NavLink
                  to="/posts"
                  className="nav-link d-flex align-items-center py-3 px-3 rounded mb-2 text-decoration-none text-dark"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <i className="bi bi-arrow-left-circle me-3"></i>
                  <span className="fw-medium">Back to Blog</span>
                </NavLink>
              </Nav>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className="p-4">
            <div className="main-content">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
