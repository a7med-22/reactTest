import { Route, Routes } from "react-router";
import Blog from "./components/Blog.jsx";
import HomeDashboard from "./components/dashboard/HomeDashboard.jsx";
import Layout from "./components/dashboard/Layout.jsx";
import PostDashboard from "./components/dashboard/PostDashboard.jsx";
import UsersDashboard from "./components/dashboard/UsersDashboard.jsx";
import Login from "./components/Login.jsx";
import Nav from "./components/Nav.jsx";
import NotFound from "./components/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./components/Register.jsx";
import SinglePost from "./components/SinglePost.jsx";

function App() {
  return (
    <>
      <Nav />
      {/* <MyComponent name="Ahmed" />
      <MyComponent name="mohamed" />
      <MyComponent>
        <h1>Hello world , this is children</h1>
      </MyComponent> */}

      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/posts" element={<Blog />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomeDashboard />} />
          <Route path="users" element={<UsersDashboard />} />
          <Route path="posts" element={<PostDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <MyForm /> */}
    </>
  );
}

export default App;
