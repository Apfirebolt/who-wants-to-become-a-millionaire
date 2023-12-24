import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const QuizCard = (props) => {
  const { quiz } = props;

  return (
    <div className="bg-gray-100 px-2 text-center py-3">
      <h2 className="text-lg text-red-600">{quiz.name}</h2>
      <h2 className="text-lg my-2">No of Questions : {quiz.questions.length}</h2>
      <div className="mx-auto flex justify-center mt-2 px-3 py-2">
        <Link
          to={`/take-quiz/${quiz.id}`}
          className="block mx-1 bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
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
