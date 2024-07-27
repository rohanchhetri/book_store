import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import img from "../assets/bg.jpg";
// import required modules
import { Pagination } from "swiper/modules";
import { generateRating } from "../utils/rating";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
const FeedBack = () => {
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
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, illo dicta numquam qui fugiat itaque dolorem sit debitis odio eos. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis temporibus repellendus consequuntur quisquam ad recusandae, eveniet tempora odit culpa ea, natus dolore error iusto et iure ipsum veniam illo quas!",
      img: "https://randomuser.me/api/portraits",
      name: "ram",
    },
    {
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, illo dicta numquam qui fugiat itaque dolorem sit debitis odio eos. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis temporibus repellendus consequuntur quisquam ad recusandae, eveniet tempora odit culpa ea, natus dolore error iusto et iure ipsum veniam illo quas!",
      img: "https://randomuser.me/api/portraits",
      name: "rohan",
    },
    {
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, illo dicta numquam qui fugiat itaque dolorem sit debitis odio eos. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis temporibus repellendus consequuntur quisquam ad recusandae, eveniet tempora odit culpa ea, natus dolore error iusto et iure ipsum veniam illo quas!",
      img: "https://randomuser.me/api/portraits",
      name: "har",
    },
  ];

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl text-center font-semibold py-5">Our Users</h1>
        <div>
          <Swiper
            slidesPerView={getSlidesPerView()}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {" "}
            {list.map((item, index) => (
              <SwiperSlide key={item.name + index}>
                <div className="flex justify-evenly">
                  <div className="flex flex-col gap-2 items-start p-3 max-w-[420px] shadow-md bg-gray-200 rounded-lg">
                    {<StarRating rating={generateRating()} />}
                    <p className="text-justify">{item.review}</p>
                    <img
                      src={img}
                      alt={item.img}
                      className="w-20 h-20 rounded-full object-fill"
                    />
                    <p className="text-xl font-medium">{item.name}</p>
                  </div>
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
