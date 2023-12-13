import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuizes, addQuiz } from "../features/quiz/quizSlice";
import Loader from "../components/Loader";
import QuizCard from "../components/QuizCard";
import AddQuiz from "../components/AddQuiz";


const Quiz = () => {
  const { quizes, isLoading } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();
  const [isOpen, setIsOpened] = useState(false);

  useEffect(() => {
    dispatch(getQuizes());
  }, [dispatch]);

  useEffect(() => {
    console.log(quizes);
  }, [quizes]);

  if (isLoading) {
    return <Loader />;
  }

  const closeModal = () => {
    setIsOpened(false);
  }

  const uploadQuiz = () => {
    setIsOpened(true);
  }

  const addQuizUtil = async (data) => {
    dispatch(addQuiz(data));
    dispatch(getQuizes());
    setIsOpened(false);
  } 

  return (
    <div className="bg-gray-50">
      <section aria-labelledby="cause-heading">
        <div className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 bg-opacity-50"
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <h2
              id="cause-heading"
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Quiz
            </h2>

            <div className="grid grid-cols-1 px-2 gap-2 my-3">
              {quizes &&
                quizes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
            </div>
          </div>
        </div>

        <div className="mx-auto flex justify-center mt-2 px-3 py-2">
          <a
            href="#"
            className="block mx-1 bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
          >
            Take Quiz
          </a>
          <button
            onClick={uploadQuiz}
            className="block mx-1 bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
          >
            Upload Quiz
          </button>
        </div>
      </section>

      <AddQuiz isOpen={isOpen} closeModal={closeModal} addQuiz={addQuizUtil} />

      {/* Featured section */}
    </div>
  );
};

export default Quiz;
