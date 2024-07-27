import PropTypes from "prop-types";
// import { propTypes } from "react-bootstrap/esm/Image";

const StarRating = ({ rating = 0 }) => {
  StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
  };
  // Create an array with 5 elements representing the stars
  const stars = Array(5).fill(0);

  return (
    <div className="flex space-x-1">
      {stars.map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={`w-6 h-6 ${
            index < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03z"
          />
        </svg>
      ))}
    </div>
  );
};
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
