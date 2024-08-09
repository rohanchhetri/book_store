import { useEffect, useState } from "react";
import Header from "../components/Header";
// import BookList from "../components/BookList";
// import Slider from "../components/Carousel";
import Search from "../components/Search";
import BookCardSwiper from "../components/BookCardSwiper";
// import fetchBooks from "../utils/fetchBooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StackCard from "../components/StackCard";
import fetchBooks from "../utils/fetchBooks";
import FeedBack from "../components/FeedBack";
import Footer from "../components/Footer";
// import StackCard from "../components/StackCard";

// import Gym from "../assets/gym.jpg";

const Home = () => {
  const [books, setBooks] = useState([]);
  // const books;
  // let books = [];
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AthleticHub | Home";
    // console.log(renderCount.current);
    const loadBooks = async () => {
      try {
        const response = await fetchBooks();
        setBooks(response);
      } catch (error) {
        console.error("Error loading books:", error);
      }
    };

    loadBooks();
  }, []);
  useEffect(() => {
    console.log("Books State Updated:", books); // Log state updates
  }, [books]);

  const isLogged = useSelector((state) => state.authReducer.isLogged);

  const handleButtonClick = () => {
    isLogged ? navigate("/shop") : navigate("/register");
  };
  // console.log(books);

  // let books = [];
  // Function to shuffle an array

  // let featuredBooks = [];
  // let uniqueIndices = new Set();
  // while (uniqueIndices.size < 10) {
  //   const randomIndex = Math.floor(Math.random() * books.length);
  //   if (!uniqueIndices.has(randomIndex)) {
  //     uniqueIndices.add(randomIndex);
  //     //   continue;
  //   }
  // }
  // if (books.length > 0) {
  //   featuredBooks = [...uniqueIndices].map((index) => books[index]);
  // }
  // featuredBooks = [...uniqueIndices].map((index) => books[index]);
  // console.log(randomIndex);
  // if (!uniqueIndices.has(randomIndex)) {
  //   uniqueIndices.add(randomIndex);
  //    }
  // }
  // console.log(uniqueIndices);

  return (
    <>
      <div>
        <Header />
        <Search />

        {/* Hero Section */}
        <div className=" flex flex-col lmd:flex-row justify-around items-center w-full lmd:min-h-[40vh] h-auto: gap-4 lmd:p-4 py-5 px-5 bg">
          <div className=" flex flex-row justify-start">
            <StackCard />
          </div>
          <div className="lmd:w-1/2 flex flex-col gap-4 items-center lmd:items-start justify-evenly text-gray-700">
            <h1 className="  text-xl md:text-3xl lmd:text-4xl break-all">
              Unleash the Power of Books
            </h1>
            <p className="break-words text-sm lmd:text-xl hidden lmd:flex">
              Explore a vast collection of books, from timeless classics to
              modern bestsellers. <br /> Dive into new worlds and find your next
              favorite book.
            </p>
            <button
              onClick={handleButtonClick}
              className="bg-main text-white px-4 py-2 rounded-lg"
            >
              Explore
            </button>
          </div>
        </div>
      </div>
      <BookCardSwiper books={books} headline="Best Selling Books" />
      <div className="flex justify-center  flex-col lmd:flex-row items-center gap-4 px-4 m-0 w-full">
        {books.length > 0 && (
          <div className="flex justify-center gap-2 bg-[#edc71e] flex-col w-[100%] rounded-md lmd:max-w-[400px] max-w-[480px]  max-h-[400px] overflow-hidden  ">
            <div className="flex flex-row justify-around w-full ">
              <div className="flex flex-row justify-center gap-2 w-1/2">
                <img src={books[0].imageURL} alt="" className="w-[1/2] " />
                <img
                  src={books[1].imageURL}
                  alt=""
                  className="w-[1/2] h-full"
                />
              </div>
              <img src={books[2].imageURL} alt="" className="w-1/2" />
            </div>
            <div className="flex justify-evenly gap-1 w-full ">
              <img src={books[3].imageURL} alt="" className="w-[23%]" />
              <img src={books[4].imageURL} alt="" className="w-[23%]" />
              <img src={books[5].imageURL} alt="" className="w-[23%]" />
              <img src={books[6].imageURL} alt="" className="w-[23%]" />
            </div>
            <div className="flex flex-row h-1/3">
              {" "}
              <div className="flex flex-row w-full gap-2">
                {" "}
                <img src={books[7].imageURL} alt="" className="w-1/2" />
                <img src={books[8].imageURL} alt="" className="w-1/2" />
              </div>{" "}
              <img src={books[9].imageURL} alt="" className="w-1/2" />
            </div>
          </div>
        )}
        <div className="flex flex-col  items-start gap-3 text-xl w-full px-4 lmd:w-[50%]">
          <h1 className="text-4xl font-semibold">Find You Favourite</h1>
          <h1 className="text-4xl font-serif text-main">Book Here!</h1>
          <p className="py-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            ratione placeat consequuntur velit repudiandae veniam nihil,
            eligendi earum dolorem molestiae.
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:gap-5 w-full justify-between pb-1">
            <div className="flex- flex-col">
              <h1 className="text-2xl font-semibold">800+</h1>
              <p>Books</p>
            </div>
            <div className="flex- flex-col">
              <h1 className="text-2xl font-semibold">500+</h1>
              <p>Users</p>
            </div>
            <div className="flex- flex-col">
              <h1 className="text-2xl font-semibold">6000+</h1>
              <p>PDF Downloaded</p>
            </div>
          </div>
          <button className="bg-main text-white py-1 px-4 rounded-lg ">
            Explore
          </button>
        </div>
      </div>

      <FeedBack
        element={
          <h1 className="text-3xl text-center font-semibold py-5">Our Users</h1>
        }
      />
      <Footer />
    </>
  );
};

export default Home;
