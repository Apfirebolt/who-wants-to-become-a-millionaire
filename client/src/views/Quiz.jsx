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
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Quizes</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 px-2 gap-2 my-3">
        {quizes && quizes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
      
      {/* Featured section */}
      <section aria-labelledby="cause-heading">
          <div className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
            <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
              <h2 id="cause-heading" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Long-term thinking
              </h2>
              
              

              <a
                href="#"
                className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
              >
                Read our story
              </a>
            </div>
          </div>
        </section>
      
    </div>
  );
};

export default Quiz;