import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import { generateRating } from "../utils/rating";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
const FeedBack = ({ element }) => {
  FeedBack.propTypes = {
    element: PropTypes.element,
  };
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
    if (windowWidth <= 840) {
      return 1;
    } else if (windowWidth <= 1260) {
      return 2;
    } else if (windowWidth <= 1680) {
      return 3;
    } else {
      return 4;
    }
  };
  const list = [
    {
      review:
        "Lorem ipsum dolodae,  ea, natus dolore evenie num consectetur adipisicingor sit llo numquam qui fugia num elit. Consequatur fugiat placeat quasi earum atque sequi velit, cot tempora odit culpaerror iueveniet tempora odit culpasto et iure ipsum veniam illo quas!",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRelVK9xEj_QrOvVKAFfBypo3p-NoFVgU5U3w&s",
      name: "John Doe",
    },
    {
      review:
        "Lorem ipsum dolor sit amet or sit llo numquam qui fugia num consectetur adipisicingor sit llo numquam qui fugia num elit. Consequatur fugiat placeat quasi earum atque sequi velit, consectetur voluptates autem cum?",
      img: "https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg",
      name: "Bill Gates",
    },
    {
      review:
        "Lorem ipsum dolquam qui fugiadicta numquam qui fugiat itaque dolorem sit debitis odio eos. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis temporibus repellendus consequuntur quisquam ad recusandae, eveniet tempora odit culpa ea, natus dolore error iusto et iure ipsum veniam illo quas!",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtB6jk36Kr6mHEtbSH9D59I5y7n3xY9p5HRA&s",
      name: "Elon Musks",
    },
  ];

  return (
    <>
      <div className="w-full">
        {element}
        {/* <h1 className="text-3xl text-center font-semibold py-5"></h1> */}
        <div>
          <Swiper
            slidesPerView={getSlidesPerView()}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper "
          >
            {" "}
            {list.map((item, index) => (
              <SwiperSlide key={item.name + index}>
                <div className="flex justify-evenly">
                  <div className="flex flex-col gap-4 items-starjt justify-center p-3 px-4 min-w-[25vw] max-w-[420px]  shadow-md bg-gray-200 rounded-lg mb-5">
                    {<StarRating rating={generateRating()} />}
                    <p className="text-justify line-clamp-5">{item.review}</p>
                    <img
                      src={item.img}
                      alt={item.img}
                      className="w-16 h-16 rounded-full"
                    />
                    <p className="text-lg font-medium">{item.name}</p>
                  </div>
                  <p></p>
                </div>
              </SwiperSlide>
            ))}{" "}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FeedBack;
