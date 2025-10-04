import {
  Nav as BootstrapNav,
  Button,
  Container,
  Navbar,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Don't show nav on login or register page
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="fw-bold text-primary"
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-newspaper me-2"></i>
          My Blog
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="me-auto">
            <BootstrapNav.Link
              onClick={() => navigate("/")}
              className={location.pathname === "/" ? "active fw-medium" : ""}
              style={{ cursor: "pointer" }}
            >
              Home
            </BootstrapNav.Link>
            <BootstrapNav.Link
              onClick={() => navigate("/posts")}
              className={
                location.pathname === "/posts" ? "active fw-medium" : ""
              }
              style={{ cursor: "pointer" }}
            >
              Posts
            </BootstrapNav.Link>
          </BootstrapNav>

          <BootstrapNav className="ms-auto">
            {isAuthenticated ? (
              <>
                <BootstrapNav.Link
                  onClick={() => navigate("/dashboard")}
                  className="me-2"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-speedometer2 me-1"></i>
                  Dashboard
                </BootstrapNav.Link>
                <BootstrapNav.Link className="me-2">
                  <i className="bi bi-person-circle me-1"></i>
                  {user.name || "User"}
                </BootstrapNav.Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/login")}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Login
              </Button>
            )}
          </BootstrapNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
