import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const QuizResult = (props) => {
  const { quizTaker, deleteQuizTaker } = props;
  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (quizTaker && quizTaker.responses) {
      setResponses(JSON.parse(quizTaker.responses));
    }
  }, [quizTaker]);

  return (
    <div className="bg-gray-100 px-2 text-center py-3">
      <div className="my-3">
        <p>{quizTaker.quiz.name}</p>

        <p>Quiz Attempted at {moment(quizTaker.createdAt).format("LLL")}</p>

        <p>Score : {quizTaker.score}</p>

        <button onClick={() => deleteQuizTaker(quizTaker)} className="block mx-auto my-2 bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto">
          Delete Quiz Taker
        </button>

        {Object.keys(responses).map((item, index) => (
          <p key={index}>{item} - {responses[item]}</p>
        ))}
      </div>
    </div>
  );
};

QuizResult.propTypes = {
  quizTaker: PropTypes.object.isRequired,
  deleteQuizTaker: PropTypes.func.isRequired,
};

export default QuizResult;
