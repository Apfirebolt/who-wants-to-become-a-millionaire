import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const QuizResult = (props) => {
  const { quizTaker } = props;
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

        {Object.keys(responses).map((item, index) => (
          <p key={index}>{item} - {responses[item]}</p>
        ))}
      </div>
    </div>
  );
};

QuizResult.propTypes = {
  quizTaker: PropTypes.object.isRequired,
};

export default QuizResult;
