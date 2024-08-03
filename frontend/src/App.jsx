import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Error404 from "./pages/Error404";
import { AuthWrapper } from "./wrapper/authwrapper";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/Admin/UserDashboard";
import BookOverview from "./pages/BookOverview";
import ReadBook from "./pages/ReadBook";
import Users from "./pages/Admin/Users";
import UploadBook from "./pages/Admin/UploadBook";
import Books from "./pages/Admin/Books";
import Forgot from "./pages/Auth/Forgot";
// import AuthWrapper from "./wrapper/authwrapper";
const App = () => {
  const rotueItems = [
    { name: "Home", path: "/", element: <Home /> },
    { name: "Shop", path: "/shop", element: <Shop /> },
    { name: "About", path: "/about", element: <About /> },
    { name: "Blog", path: "/blog", element: <Blog /> },
    { name: "Contact", path: "/contact", element: <Contact /> },
    { name: "Login", path: "/login", element: <Login /> },
    { name: "Register", path: "/register", element: <Register /> },
    {
      name: "ForgotPassword",
      path: "/forgot-password",
      element: <Forgot />,
    },
    { name: "Error404", path: "/*", element: <Error404 /> },
    { name: "Overview", path: "/book/:id", element: <BookOverview /> },
    { name: "ReadBook", path: "/read-book", element: <ReadBook /> },
  ];
  const adminItems = [
    {
      name: "AdminDashboard",
      path: "/",
      element: <AdminDashboard />,
      requiredRole: "admin",
    },
    {
      name: "AdminDashboard",
      path: "/dashboard",
      element: <AdminDashboard />,
      requiredRole: "admin",
    },
    {
      name: "Upload Book",
      path: "/upload-book",
      element: <UploadBook />,
      requiredRole: "admin",
    },
    {
      name: "Books",
      path: "/manage-books",
      element: <Books />,
      requiredRole: "admin",
    },
    {
      name: "Users",
      path: "/manage-users",
      element: <Users />,
      requiredRole: "admin",
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {rotueItems.map((item, index) => {
          return (
            <Route
              key={index + item.name}
              path={item.path}
              element={item.element}
            />
          );
        })}

        <Route
          path={"/user/dashboard"}
          element={
            <AuthWrapper requiredRole={"admin"}>
              <UserDashboard />
            </AuthWrapper>
          }
        />
        {adminItems.map((item, index) => {
          return (
            <Route
              key={item.name + index}
              path={`admin${item.path}`}
              element={
                <AuthWrapper requiredRole={item.requiredRole}>
                  {item.element}
                </AuthWrapper>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
