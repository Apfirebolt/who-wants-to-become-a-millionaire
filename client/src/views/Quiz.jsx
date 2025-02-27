import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuizes } from "../features/quiz/quizSlice";
import Loader from "../components/Loader";
import QuizCard from "../components/QuizCard";

const Quiz = () => {
  const { quizes, isLoading } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizes());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50">
      <section aria-labelledby="cause-heading">
        <div className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 bg-opacity-50"
          />
          <div className="relative max-w-5xl mx-auto">
            <h2
              id="cause-heading"
              className="text-3xl font-extrabold tracking-tight text-white text-center sm:text-4xl"
            >
              Quiz
            </h2>

            <div className="bg-gray-200 my-4 px-2">
              {quizes &&
                quizes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
