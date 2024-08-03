import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, color: "#0866ff", link: "https://www.facebook.com" },
  {
    icon: <FaInstagram />,
    color: "#e4405f",
    link: "https://www.instagram.com",
  },
  { icon: <FaTwitter />, color: "#00acee", link: "https://www.twitter.com" },
  { icon: <FaWhatsapp />, color: "#25d366", link: "https://www.whatsapp.com" },
  { icon: <FaTiktok />, color: "#000000", link: "https://www.tiktok.com" },
  { icon: <FaYoutube />, color: "#ff0000", link: "https://www.youtube.com" },
];

const SocialIcons = () => {
  return (
    <div className="flex gap-4 mt-10">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-opacity-100 transition duration-300"
          style={{ color: social.color }}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
