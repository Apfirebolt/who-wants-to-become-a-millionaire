import PropTypes from "prop-types";

const AnswerQuestion = (props) => {
  const { question, nextQuestion, prevQuestion } = props;

  return (
    <div className="bg-gray-100 px-2 text-center py-3">
      <div className="my-3">
        <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <p className="text-3xl my-3 font-bold">{question.text}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <p className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-400 sm:w-auto">
              {question.option1}
            </p>

            <p className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-400 sm:w-auto">
              {question.option2}
            </p>

            <p className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-400 sm:w-auto">
              {question.option3}
            </p>

            <p className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-400 sm:w-auto">
              {question.option4}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex justify-center mt-2 px-3 py-2">
        <button
          onClick={prevQuestion}
          className="block mx-1 bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
        >
          Previous Question
        </button>

        <button
          onClick={nextQuestion}
          className="block mx-1 bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

AnswerQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  prevQuestion: PropTypes.func.isRequired,
};

export default AnswerQuestion;
