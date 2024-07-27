// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// Import required modules
import { EffectCards } from "swiper/modules";
import fetchBooks from "../utils/fetchBooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StackCard() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AthleticHub | Home";

    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error loading books:", error);
      }
    };

    loadBooks();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper w-52 lmd:scale-110"
    >
      {books.map((book) => (
        <SwiperSlide key={book._id} onClick={() => handleClick(book._id)}>
          <div className="bg-gray-300 rounded-md h-60 lmd:h-">
            <img
              src={book.imageURL}
              alt={book.bookTitle}
              className="rounded-md h-full w-full object-fill"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
