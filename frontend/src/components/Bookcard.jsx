import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BookCard = ({ book, onClick, isButtonDisplayed = false }) => {
  return (
    // md:min-w-[300px] md:min-h-[350px]
    <div className="flex justify-center ">
      <div className=" bg-gray-200 flex flex-col items-center lmd:max-w-[20vw] md:min-w-[200px] w-[220px] overflow-hidden py-2 rounded-lg">
        <div className="w-full  pb-1 px-4">
          <img
            src={book.imageURL}
            alt={book.bookTitle}
            onClick={() => onClick(book._id)}
            className="h-[220px] w-full rounded-tr-3xl rounded-bl-3xl shadow-md cursor-pointer"
          />
        </div>
        <div className="w-full flex flex-wrap justify-center items-center px-1">
          <p className="text-[1.1rem] line-clamp-1">
            <i className="w-[200px] text-right font-medium ">
              {book.bookTitle}
            </i>
          </p>
          <div className="flex justify-center gap-2 w-full ">
            <p className="line-clamp-1 text-[0.9rem]">By: {book.authorName}</p>
            <Link to={book.bookPDFURL} target="_blank">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-xl text-main"
              />
            </Link>{" "}
          </div>{" "}
          <Link to={`/book/${book._id}`}>
            <button
              className={` ${
                isButtonDisplayed ? "block" : "hidden"
              } bg-main w-fit text-white py-1 px-1 mt-1 rounded-md`}
            >
              Overview
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    bookDescription: PropTypes.string.isRequired,
    bookTitle: PropTypes.string.isRequired,
    bookPDFURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isButtonDisplayed: PropTypes.bool,
};

export default BookCard;
