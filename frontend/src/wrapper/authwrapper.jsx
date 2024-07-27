import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children, requiredRole }) => {
  const authCtx = useSelector((state) => state.authReducer);
  const { isLogged, admin } = authCtx; // Assuming 'admin' is a boolean indicating admin status
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    } else if (requiredRole === "user" && admin) {
      navigate("/admin/dashboard");
    } else if (requiredRole === "admin" && !admin) {
      navigate("/user/dashboard"); // Redirect admin users trying to access user routes
    }
  }, [isLogged, admin, requiredRole, navigate]);

  return <>{children}</>;
};

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired, // 'admin' or 'user'
};

export { AuthWrapper };
