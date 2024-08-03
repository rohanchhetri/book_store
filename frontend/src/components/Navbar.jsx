import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import UserIcon from "./UserIcon";

const Navbar = (props) => {
  const { NavBarItems } = props;
  const authCtx = useSelector((state) => state.authReducer);
  const { isLogged } = authCtx;
  // const dispatch = useDispatch();
  const location = useLocation();

  // const handleLogout = () => {
  //   localStorage.removeItem("_token");
  //   localStorage.removeItem("_admin");
  //   dispatch({ type: "LOGOUT" });
  // };
  const loggedIconStyle = "text-2xl cursor-pointer ml-4";
  const btnStyle = "bg-white text-main px-3 py-1 rounded-lg";
  return (
    <nav>
      <ul className="flex items-center ">
        <div className="hidden lmd:flex">
          {NavBarItems.map((item, index) => (
            <li key={item.name + index} className="mr-6 hover:text-gray-300">
              <NavLink
                className={({ isActive }) => isActive && "text-yellow-500"}
                to={item.path}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </div>
        <div>
          {isLogged ? (
            <div className="flex">
              <UserIcon loggedIconStyle={loggedIconStyle} />
              {/* <Link to={"/user/dashboard"}>
                <FontAwesomeIcon
                  className={loggedIconStyle}
                  icon={faUserCircle}
                />
              </Link> */}
              {/* <FontAwesomeIcon
                onClick={handleLogout}
                className={loggedIconStyle}
                icon={faRightFromBracket}
              /> */}
            </div>
          ) : (
            <div className="flex gap-2">
              {location.pathname === "/login" ? (
                <button className={btnStyle}>
                  <Link to="/register">Register</Link>
                </button>
              ) : (
                <button className={btnStyle}>
                  <Link to="/login">Login</Link>
                </button>
              )}
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  NavBarItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
