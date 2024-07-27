import {
  faArrowRightFromBracket,
  faBook,
  faBookOpen,
  faDashboard,
  faHome,
  faStore,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ show, handleClose }) => {
  const isAdmin = useSelector((state) => state.authReducer.admin);
  const isLogged = useSelector((state) => state.authReducer.isLogged);
  const email = useSelector((state) => state.authReducer.email);
  const username = useSelector((state) => state.authReducer.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("_token");
    localStorage.removeItem("_admin");
    dispatch({ type: "LOGOUT" });
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const adminSideBar = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: faUserCircle,
    },

    {
      name: "Books",
      path: "/admin/manage-books",
      icon: faBookOpen,
    },

    {
      name: "Users",
      path: "/admin/manage-users",
      icon: faUserCircle,
    },
  ];
  const userSideBar = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: faDashboard,
    },
    {
      name: "Shop",
      path: "/shop",
      icon: faStore,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: faBook,
    },
  ];
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="flex gap-3">
              <div
                className="flex justify-center  items-center rounded-md bg-main text-white w-12 h-12 "
                // style={{ backgroundImage: `url(${bgImage})` }}
              >
                RC
              </div>
              <div className="m-0 text-sm flex text-main font-normal flex-col justify-center items-start">
                <p className="text-lg font-semibold"> Hello, {username}</p>
                <p className="text-black">{email}</p>
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold pb-2">
                {isAdmin ? "Admin" : "User"}
              </h3>
              <div className="flex flex-col gap-4 mb-56">
                {isAdmin ? (
                  <>
                    {adminSideBar.map((item, index) => (
                      <Link to={item.path} key={item.name + index}>
                        <div className="flex items-center gap-4">
                          <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>{" "}
                          <li className="list-none"> {item.name}</li>
                        </div>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    {userSideBar.map((item, index) => (
                      <Link to={item.path} key={item.name + index}>
                        <div className="flex items-center gap-4">
                          <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>{" "}
                          <li className="list-none"> {item.name}</li>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center cursor-pointer justify-between ">
              {isLogged ? (
                <>
                  <p onClick={handleLogout} className="text-xl">
                    Logout
                  </p>
                  <FontAwesomeIcon
                    onClick={handleLogout}
                    icon={faArrowRightFromBracket}
                    className="text-xl"
                  ></FontAwesomeIcon>
                </>
              ) : (
                <>
                  <p
                    onClick={handleLogin}
                    className="text-xl bg-main text-white px-2 py-1 rounded-lg"
                  >
                    Login
                  </p>
                  <FontAwesomeIcon
                    onClick={handleLogin}
                    icon={faArrowRightFromBracket}
                    className="rotate-180 text-xl text-main"
                  ></FontAwesomeIcon>
                </>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
SideBar.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SideBar;
