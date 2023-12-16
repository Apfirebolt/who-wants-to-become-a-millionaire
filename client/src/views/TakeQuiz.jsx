import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuiz } from "../features/quiz/quizSlice";
import Loader from "../components/Loader";
import AnswerQuestion from "../components/AnswerQuestion";

const TakeQuiz = () => {
  const { quiz, isLoading } = useSelector((state) => state.quiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getQuiz(params.id));
  }, [dispatch, params.id]);

  if (isLoading) {
    return <Loader />;
  }

  const toToNextQuestion = () => {
    if (currentQuestion === quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Take Quiz - {quiz.name}
          </h1>
        </div>
      </div>
      {quiz.questions && quiz.questions.length && (
        <AnswerQuestion question={quiz.questions[currentQuestion]} nextQuestion={toToNextQuestion} prevQuestion={goToPreviousQuestion} />
      )}
      {quiz.questions && quiz.questions.length === 0 && (
        <div className="mx-auto max-w-xl text-center py-3">
          <h1 className="text-2xl font-extrabold sm:text-1xl my-3 text-red-700">
            No Questions Found
          </h1>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
