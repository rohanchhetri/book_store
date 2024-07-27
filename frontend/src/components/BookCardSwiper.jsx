import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import BookCard from "./Bookcard";

const BookCardSwiper = ({ books, headline = "" }) => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getSlidesPerView = () => {
    if (windowWidth <= 720) {
      return 1;
    } else if (windowWidth <= 960) {
      return 2;
    } else if (windowWidth <= 1320) {
      return 3;
    } else if (windowWidth <= 1680) {
      return 4;
    } else if (windowWidth <= 1920) {
      return 5;
    } else {
      return 6;
    }
  };

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-800 text-center ">
        {headline}
      </h2>
      <div className="flex justify-center items-center py-5">
        <Swiper
          slidesPerView={getSlidesPerView()}
          spaceBetween={0}
          loop={getSlidesPerView >= 4 ? true : false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper pb-5"
        >
          {books.map((book) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book} onClick={handleBookClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

BookCardSwiper.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      authorName: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      bookDescription: PropTypes.string.isRequired,
      bookTitle: PropTypes.string.isRequired,
    })
  ).isRequired,
  headline: PropTypes.string.isRequired,
};

export default BookCardSwiper;
