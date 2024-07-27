import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import StarRating from "../components/StarRating";
import { generateRating } from "../utils/rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowDown,
  faCircleArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { PORT } from "../utils/port";

const BookOverview = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [toggleDesc, setToggleDesc] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${PORT}/api/books/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-10 lmd:flex-row w-full mt-12 p-4">
        <div className="lmd:w-fit">
          <img
            className="w-[300px] h-[360px] lmd:min-w-[300px]"
            src={book.imageURL}
            alt={book.bookTitle}
          />
        </div>
        <div className="lmd:w-[60%]">
          <h1 className="text-3xl font-bold">{book.bookTitle}</h1>

          <i className="text-2xl">{book.authorName}</i>
          <br />
          <StarRating rating={generateRating()} />
          <br />
          <p className="text-primary pb-2">{book.category}</p>
          <p className={toggleDesc ? "line-clamp-4" : ""}>
            {book.bookDescription.split("\n").map((desc, index) => {
              return (
                <React.Fragment key={index}>
                  {desc}
                  <br />
                </React.Fragment>
              );
            })}
          </p>
          <p>
            Show
            {toggleDesc ? " More" : " Less"}
            <FontAwesomeIcon
              onClick={() => setToggleDesc(!toggleDesc)}
              className="text-main cursor-pointer pl-2"
              icon={toggleDesc ? faCircleArrowDown : faCircleArrowUp}
            ></FontAwesomeIcon>
          </p>

          <Link to={book.bookPDFURL} target="_blank">
            {/* <Link to={"/read-book"}> */}
            <button className="bg-main text-white px-3 py-2 rounded-md my-3">
              Read Book
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookOverview;
