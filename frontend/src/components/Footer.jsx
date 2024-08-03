import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
  const icons = [faFacebook, faInstagram, faXTwitter, faYoutube];
  const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Terms of Use", link: "/terms" },
    { name: "Privacy Policy", link: "/privacy" },
  ];
  return (
    <>
      <footer className="w-full bg-main mt-5">
        <div className="bg-gray-300 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-4">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className="bg-lime-50 w-12 h-12 rounded-full flex justify-center items-center ease-in-out duration-500 hover:text-white hover:bg-main"
                >
                  <FontAwesomeIcon icon={icon} size="2x" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-center gap-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className="text-lg hover:underline hover:text-main"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" text-white p-4 text-center">
          <p>&copy; 202 BookHub. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
