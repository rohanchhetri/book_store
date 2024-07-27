import { Link } from "react-router-dom";
import Header from "../components/Header";

const ReadBook = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-10 lmd:flex-row w-full mt-14 p-4">
        <div className="lmd:w-fit">
          <img
            className="w-[300px] h-[400px] md:min-w-[400px] lmd:h-[500px] rounded-lg shadow-lg"
            src="https://i.pinimg.com/736x/27/e9/6c/27e96c5c70e0884229247755b0671be2.jpg"
          />
        </div>
        <div className="lmd:w-[60%] text-center">
          <h1 className="text-3xl font-bold">Read Book</h1>
          <p className="mt-4">Please purchase the book in the nearest store.</p>
          <Link
            to="/"
            className="bg-main text-white px-3 py-2 rounded-md my-4 inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default ReadBook;
