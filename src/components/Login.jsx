import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication - In a real app, you'd validate against a backend
      if (
        formData.email === "admin@example.com" &&
        formData.password === "admin123"
      ) {
        // Store authentication status
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            name: "Admin User",
            role: "Admin",
          })
        );

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Try admin@example.com / admin123");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "admin@example.com",
      password: "admin123",
    });
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <Card
              className="shadow-lg border-0"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body className="p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div
                    className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="bi bi-person-lock text-white fs-3"></i>
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Welcome Back</h2>
                  <p className="text-muted">Sign in to access your dashboard</p>
                </div>

                {/* Demo Credentials Banner */}
                <Alert variant="info" className="text-center mb-4">
                  <small>
                    <strong>Demo Credentials:</strong>
                    <br />
                    Email: admin@example.com
                    <br />
                    Password: admin123
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 ms-2"
                      onClick={handleDemoLogin}
                    >
                      Use Demo
                    </Button>
                  </small>
                </Alert>

                {/* Error Alert */}
                {error && (
                  <Alert variant="danger" className="mb-4">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}

                {/* Login Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Email Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <i className="bi bi-envelope text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-start-0"
                        style={{ boxShadow: "none" }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <i className="bi bi-lock text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-start-0 border-end-0"
                        style={{ boxShadow: "none" }}
                      />
                      <InputGroup.Text
                        className="bg-light border-start-0"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`bi ${
                            showPassword ? "bi-eye-slash" : "bi-eye"
                          } text-muted`}
                        ></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="text-muted"
                    />
                    <Button variant="link" className="p-0 text-decoration-none">
                      Forgot password?
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-3 fw-medium"
                    disabled={isLoading}
                    style={{ borderRadius: "8px" }}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Sign In
                      </>
                    )}
                  </Button>
                </Form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Don't have an account?
                    <Button
                      variant="link"
                      className="p-0 ms-1 text-decoration-none"
                    >
                      Sign up here
                    </Button>
                  </p>
                </div>

                {/* Back to Blog Link */}
                <div className="text-center mt-3">
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/")}
                    className="px-4"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Blog
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Additional Info */}
            <div className="text-center mt-4">
              <small className="text-white">
                <i className="bi bi-shield-check me-2"></i>
                Your data is protected with enterprise-grade security
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
