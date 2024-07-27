import Logo from "../assets/book-logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { NavbarItems } from "../utils/NavbarItems";
import { useState } from "react";
import SideBar from "./SideBar";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const bgImage = "frontend/src/assets/bg.jpg";

  return (
    <>
      <header className="flex items-center justify-between fixed top-0 w-full z-20 h-fit px-6 bg-main text-white text-sm md:text-base xl:text-xl transition-all ease-in-out">
        <li className="lmd:hidden list-none">
          <FontAwesomeIcon
            onClick={handleShow}
            className="text-2xl"
            icon={faBars}
          />
        </li>
        <Link to="/">
          {" "}
          <div className="flex justify-center items-start overflow-hidden mix-blend-luminosity">
            <img
              className=" rounded-full ml-4 lmd:ml-0 w-36 md:w-36 scale-[150%]"
              src={Logo}
              alt=""
            />
          </div>
        </Link>
        <Navbar NavBarItems={NavbarItems} />
      </header>
      <SideBar show={show} handleClose={handleClose} />
    </>
  );
};

export default Header;
