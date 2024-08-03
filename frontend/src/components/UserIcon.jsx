import {
  faBookOpen,
  faHome,
  faRightFromBracket,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function UserIcon({ loggedIconStyle }) {
  let isAdmin = localStorage.getItem("_admin");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const dispatch = useDispatch();
  // const divStyle = `bg-black absolute mt-3 p-3 ${show ? "block" : "hidden"}`;
  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Manage Books",
      path: "/admin/manage-books",
    },
    {
      name: "Users Details",
      path: "/admin/manage-users",
    },
  ];
  const userLinks = [
    { name: "Home", path: "/", icon: faHome },
    {
      name: "Books",
      path: "/shop",
      icon: faBookOpen,
    },
    { name: "Profile", path: "/user/dashboard", icon: faUser },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("_token");
      localStorage.removeItem("_admin");
      dispatch({ type: "LOGOUT" });
      window.location.reload();
    }
  };
  const popupStyle = `hover:underline text-main hover:text-black flex items-center gap-3`;
  // alert(isAdmin);
  return (
    <>
      <div>
        {" "}
        <FontAwesomeIcon
          className={loggedIconStyle}
          icon={faUserCircle}
          onClick={handleShow}
        />
        <div
          className={`bg-gray-100 text-black absolute right-24 p-3 px-8 w-fit flex flex-col rounded-lg gap-2 ${
            show ? "block" : "hidden"
          }`}
        >
          {" "}
          {isAdmin
            ? adminLinks.map((link, index) => (
                <Link key={index} to={link.path} className={popupStyle}>
                  {link.name}
                </Link>
              ))
            : userLinks.map((link, index) => (
                <Link key={index} to={link.path} className={popupStyle}>
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="text-black"
                  ></FontAwesomeIcon>
                  {link.name}
                </Link>
              ))}
          <hr />
          <div className={popupStyle} onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-black"
            ></FontAwesomeIcon>{" "}
            <p className="hover:cursor-pointer">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}
UserIcon.propTypes = {
  loggedIconStyle: propTypes.string,
};

export default UserIcon;
