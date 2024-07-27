import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PORT } from "../utils/port";
import BookCard from "./Bookcard"; // Import the BookCard component
// import { propTypes } from "react-bootstrap/esm/Image";
// import { propTypes } from "react-bootstrap/esm/Image";
import PropTypes from "prop-types";

const BookList = ({ category }) => {
  BookList.propTypes = {
    category: PropTypes.string.isRequired,
  };
  // category = category.description;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(4);
  // console.log(category);
  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize > 1456) {
        setBooksPerPage(8);
      } else if (screenSize > 1095) {
        setBooksPerPage(6);
      } else {
        setBooksPerPage(4);
      }
    };

    // Call handleResize initially to set the books per page based on initial screen size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this useEffect runs once on mount and cleanup on unmount

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:${PORT}/api/books`)
      .then((response) => response.json())
      .then((data) => {
        if (category !== "all") {
          data = data.filter(
            (book) => book.category.toLowerCase() === category.toLowerCase()
          );
        }
        setBooks(data);

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [category]);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 w-full ">
      {currentBooks.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          isButtonDisplayed={true}
          onClick={() => handleBookClick(book._id)}
        />
      ))}
      <div className="flex justify-center w-full mt-5">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-main hover:opacity-80 text-white font-bold py-1 px-3 rounded-l-md"
        >
          Prev
        </button>
        <span className=" text-gray-800 font-bold py-2 px-4">
          {currentPage}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastBook >= books.length}
          className="bg-main hover:opacity-80 text-white font-bold py-1 px-3 rounded-r-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
