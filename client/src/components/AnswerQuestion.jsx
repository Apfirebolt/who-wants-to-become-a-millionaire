import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const AnswerQuestion = (props) => {
  const { question, answers, currentIndex, nextQuestion, prevQuestion, handleAnswer } = props;
  const [selectedAnswer, setSelectedAnswer] = useState('')

  const handleAnswerUtil = (answer) => {
    setSelectedAnswer(answer)
    handleAnswer(answer, currentIndex)
  }

  useEffect(() => {
    if (answers[(currentIndex.toString())]) {
      setSelectedAnswer(answers[(currentIndex.toString())])
    }
  }, [currentIndex, answers])

  let appliedClasses = 'block cursor-pointer border bg-gray-200 text-gray-900 border-transparent rounded-md py-3 px-8 text-base font-medium hover:bg-gray-400 sm:w-auto'
  

  return (
    <div className="bg-gray-100 px-2 text-center container mx-auto py-3">
      <div className="my-3">
        <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <p className="text-3xl my-3 font-bold">{question.text}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            
            <p onClick={() => handleAnswerUtil(question.option1)}  className={selectedAnswer === question.option1 ? appliedClasses.replace("bg-gray-200 text-gray-900", "bg-green-700 text-gray-100") : appliedClasses.replace("bg-green-700 text-gray-100", "bg-gray-200 text-gray-900")}>
              {question.option1}
            </p>

            <p onClick={() => handleAnswerUtil(question.option2)} className={selectedAnswer === question.option2 ? appliedClasses.replace("bg-gray-200 text-gray-900", "bg-green-700 text-gray-100") : appliedClasses.replace("bg-green-700 text-gray-100", "bg-gray-200 text-gray-900")}>
              {question.option2}
            </p>

            <p onClick={() => handleAnswerUtil(question.option3)} className={selectedAnswer === question.option3 ? appliedClasses.replace("bg-gray-200 text-gray-900", "bg-green-700 text-gray-100") : appliedClasses.replace("bg-green-700 text-gray-100", "bg-gray-200 text-gray-900")}>
              {question.option3}
            </p>

            <p onClick={() => handleAnswerUtil(question.option4)} className={selectedAnswer === question.option4 ? appliedClasses.replace("bg-gray-200 text-gray-900", "bg-green-700 text-gray-100") : appliedClasses.replace("bg-green-700 text-gray-100", "bg-gray-200 text-gray-900")}>
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
  handleAnswer: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
  currentIndex: PropTypes.number.isRequired
};

export default AnswerQuestion;
