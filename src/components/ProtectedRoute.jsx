import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated from localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  //   const isAuthenticated = true;

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
