import { faCalendarWeek, faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const BlogCard = ({ title, img, description, author, date }) => {
  return (
    <div className="w-full max-w-[320px] lmd:max-w-[400px] rounded-md overflow-hidden shadow-md">
      <div>
        <a href="#">
          <img
            src={img}
            alt={`Cover image for ${title}`}
            className="w-full h-[250px] object-cover"
          />
        </a>
      </div>
      <div className="flex flex-col justify-start items-start gap-2 px-3 py-2">
        <h5 className="text-xl font-medium line-clamp-1">{title}</h5>
        <p className="line-clamp-3 text-justify">{description}</p>
        <div>
          <a href="#" className="text-blue-500 hover:underline">
            Read more
          </a>
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div className="bg-white px-5 py-2">
        <small>
          <FontAwesomeIcon icon={faMarker} className="mr-1" />
          Author: {author}
          <br />
          <FontAwesomeIcon icon={faCalendarWeek} className="mr-1" />
          Date: {date}
        </small>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default BlogCard;
