import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const QuizResultAdmin = (props) => {
  const { quizTaker, deleteQuizTaker } = props;
  const [responses, setResponses] = useState({});

  const correctAnswerClasses = 'text-green-600 font-semibold text-lg';
  const wrongAnswerClasses = 'text-red-600 font-semibold text-lg';

  useEffect(() => {
    if (quizTaker && quizTaker.responses) {
      setResponses(JSON.parse(quizTaker.responses));
    }
  }, [quizTaker]);

  return (
    <div className="bg-gray-100 px-2 text-center py-3">
      <div className="my-3">
        <div className="bg-gray-200 py-3 px-2">
          <p className="text-blue-600 font-semibold text-lg">
            {quizTaker.quiz.name}
          </p>

          <p className="text-blue-600">
            Quiz Attempted at {moment(quizTaker.createdAt).format("LLL")}
          </p>

          <p className="text-blue-600">
            Quiz Attempted By <span className="text-blue-800 font-serif font-semibold">{quizTaker.username}</span>
          </p>

          <p className="text-blue-600 font-semibold text-lg">
            Score : {quizTaker.score}
          </p>
        </div>

        <div className="grid grid-cols-3 bg-purple-900 mt-4 px-4 py-3 text-gray-100 gap-4">
          <div>
            <p>Questions</p>
          </div>
          <div>
            <p>Your Answer</p>
          </div>
          <div>
            <p>Correct Answer</p>
          </div>
        </div>
        {Object.keys(responses).map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 bg-gray-900 px-4 py-3 text-gray-100 gap-4"
          >
            <div>
              <p>Question : {item}</p>
            </div>
            <div>
              <p className={responses[item][0] === responses[item][1] ? correctAnswerClasses : wrongAnswerClasses}>Your Answer : {responses[item][0]}</p>
            </div>
            <div>
              <p>Correct Answer : {responses[item][1]}</p>
            </div>
          </div>
        ))}
        <button
          onClick={() => deleteQuizTaker(quizTaker)}
          className="block mx-auto my-2 bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
        >
          Delete Quiz Taker
        </button>
      </div>
    </div>
  );
};

QuizResultAdmin.propTypes = {
  quizTaker: PropTypes.object.isRequired,
  deleteQuizTaker: PropTypes.func.isRequired,
};

export default QuizResultAdmin;
