import PropTypes from "prop-types";
import moment from "moment";


const QuizResult = (props) => {
  const { quizTaker } = props;


  return (
    <div className="bg-gray-100 px-2 text-center py-3">
      <h2 className="text-lg text-red-600">

      </h2>
      <div className="my-3">
        <p>
            {quizTaker.quiz.name}
        </p>

        <p>
            Quiz Attempted at {moment(quizTaker.createdAt).format("LLL")}
        </p>

        <p>
            Score : {quizTaker.score}
        </p>
      </div>
    </div>
  );
};

QuizResult.propTypes = {
  quizTaker: PropTypes.object.isRequired,
};

export default QuizResult;
