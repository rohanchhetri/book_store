import { faCalendarWeek, faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogCard = () => {
  return (
    <>
      <div className=" w-[] max-w-[320px] lmd:max-w-[400px] rounded-md overflow-hidden shadow-md">
        <div>
          <a href="">
            <img
              src="https://codeit.com.np/storage/01HNSFKH6HE2BRF71S9FP1F8AS.webp"
              alt=""
            />
          </a>
        </div>
        <div className="flex flex-col justify-start items-start gap-2 px-3">
          <h5 className="text-xl font-medium line-clamp-1">How to read book</h5>
          <p className="line-clamp-3 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            null Lorem ipsum dolor sit amet conseoerm lorem ur, adiicing elit.
            Illo, consecur?a commodi. Laudaium illo deleniti vitae impedit
            dolorem quas sunt ducimus.
          </p>
          <div>
            <a href="">Readmore</a>
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div className="bg-white px-5 py-2">
          {" "}
          <small>
            <FontAwesomeIcon icon={faMarker}></FontAwesomeIcon>Author: Rohan
            Chhetri
            <br />
            <FontAwesomeIcon icon={faCalendarWeek}></FontAwesomeIcon> Date:
            Jan-2002
          </small>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
