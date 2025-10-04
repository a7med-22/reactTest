import axios from "axios";
import { useRef, useState } from "react";
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
import { toast } from "react-toastify";

const Register = () => {
  // Use useRef for form inputs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = () => {
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Get values from refs
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading("Checking user availability...");

      // Check if user already exists
      const existingUsersResponse = await axios.get(
        "http://localhost:3000/users"
      );
      const existingUsers = existingUsersResponse.data;

      const userExists = existingUsers.find((user) => user.email === email);

      if (userExists) {
        toast.dismiss(loadingToast);
        toast.error("User with this email already exists!");
        setIsLoading(false);
        return;
      }

      // Update loading message
      toast.update(loadingToast, { render: "Creating your account..." });

      // Generate user ID
      const newUserId =
        existingUsers.length > 0
          ? Math.max(...existingUsers.map((u) => u.id)) + 1
          : 1;

      // Create new user object
      const newUser = {
        id: newUserId,
        name: name,
        email: email,
        password: password, // In real apps, hash the password before storing
        role: "Author", // Default role for new users
        status: "Active",
        joined: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        posts: 0,
        lastLogin: "Never",
        avatar: `https://via.placeholder.com/100x100/007bff/ffffff?text=${name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()}`,
        bio: "New user",
        location: "Not specified",
        phone: "Not specified",
      };

      // Add user to database
      await axios.post("http://localhost:3000/users", newUser);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Registration successful! Redirecting to login...");

      // Clear form
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";

      // Redirect to login after a delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
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
                    <i className="bi bi-person-plus text-white fs-3"></i>
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Create Account</h2>
                  <p className="text-muted">Sign up to access your dashboard</p>
                </div>

                {/* Success Alert */}
                {success && (
                  <Alert variant="success" className="mb-4">
                    <i className="bi bi-check-circle me-2"></i>
                    {success}
                  </Alert>
                )}
                {/* Error Alert */}
                {error && (
                  <Alert variant="danger" className="mb-4">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}

                {/* Register Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Full Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <i className="bi bi-person text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        ref={nameRef}
                        onChange={handleInputChange}
                        className="border-start-0"
                        style={{ boxShadow: "none" }}
                      />
                    </InputGroup>
                  </Form.Group>
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
                        ref={emailRef}
                        onChange={handleInputChange}
                        className="border-start-0"
                        style={{ boxShadow: "none" }}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <i className="bi bi-lock text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        ref={passwordRef}
                        onChange={handleInputChange}
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
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">
                      Confirm Password
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <i className="bi bi-lock-fill text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        ref={confirmPasswordRef}
                        onChange={handleInputChange}
                        className="border-start-0"
                        style={{ boxShadow: "none" }}
                      />
                    </InputGroup>
                  </Form.Group>
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
                        Creating account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Register
                      </>
                    )}
                  </Button>
                </Form>
                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0 ms-1 text-decoration-none"
                      onClick={() => navigate("/login")}
                    >
                      Login here
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

export default Register;
