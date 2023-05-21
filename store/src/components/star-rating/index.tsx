import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ score }) => {
  const filledStars = Math.floor(score);
  const halfStars = score % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStars;

  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className="text-yellow-500"
        />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStarHalf}
          className="text-yellow-500"
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="text-gray-200" />
      ))}
    </div>
  );
};

export default StarRating;
