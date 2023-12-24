import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const QuizCard = (props) => {
  const { quiz } = props;

  return (
    <div className="bg-gray-100 px-2 py-3 border-b-indigo-400">
      <h2 className="text-lg text-red-800">{quiz.name}</h2>
      <h2 className="text-lg my-2">No of Questions : {quiz.questions.length}</h2>
      <div className="mx-auto flex justify-left mt-2">
        <Link
          to={`/take-quiz/${quiz.id}`}
          className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-500 hover:text-white sm:w-auto"
        >
          Take Quiz
        </Link>
      </div>
    </div>
  );
};

QuizCard.propTypes = {
  quiz: PropTypes.object.isRequired,
};

export default QuizCard;
