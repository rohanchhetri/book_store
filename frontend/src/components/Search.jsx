import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PORT } from "../utils/port";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch all books initially
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:${PORT}/api/books/`);
        setBooks(response.data); // Assuming response.data is an array of books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Filter books based on search term
    if (searchTerm === "") {
      setFilteredBooks([]); // Clear filtered books if search term is empty
    } else {
      const filtered = books.filter((book) =>
        book.bookTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowBook = (id) => {
    navigate(`/book/${id}`);
  };

  const isLogged = localStorage.getItem("_token");

  const handleBookOpen = (bookPDFURL) => {
    if (isLogged) {
      window.open(bookPDFURL, "_blank");
    } else {
      navigate("/login");
    }
  };

  const handleSearchClick = () => {
    if (filteredBooks.length > 0) {
      const firstBookId = filteredBooks[0]._id;
      navigate(`/book/${firstBookId}`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full mt-24">
        <div className="flex justify-center text-base text-black w-full">
          <input
            type="text"
            placeholder="Enter Book Name"
            className="rounded-md rounded-ee-none rounded-se-none border-1 border-black outline-none p-1 text-black w-[50%] max-w-[400px]"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={handleSearchClick}
            className="bg-main text-white rounded-se-lg rounded-ee-lg px-2"
          >
            Search
          </button>
        </div>
        {/* Displaying Filtered Books */}
        {filteredBooks.length > 0 && (
          <div className="flex flex-col justify-start py-2 rounded-lg w-[80%] max-w-[480px] max-h-[380px] absolute top-40 z-10 overflow-y-scroll bg-gray-50">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="flex gap-2 m-2 px-3 py-2 border border-gray-300 rounded-lg"
              >
                <img
                  onClick={() => handleShowBook(book._id)}
                  src={book.imageURL}
                  alt={book.bookTitle}
                  className="my-2 w-12 h-auto rounded-md cursor-pointer"
                />
                <div className="flex flex-col justify-center items-start">
                  <h2
                    onClick={() => handleShowBook(book._id)}
                    className="font-semibold line-clamp-1 cursor-pointer"
                  >
                    {book.bookTitle}
                  </h2>
                  <p
                    onClick={() => handleShowBook(book._id)}
                    className="text-sm text-gray-600 line-clamp-1 cursor-pointer"
                  >
                    {book.authorName}
                  </p>

                  <button
                    onClick={() => handleBookOpen(book.bookPDFURL)}
                    className="text-blue-500 hover:underline block mt-2"
                  >
                    Read Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
