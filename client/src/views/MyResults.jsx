import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuizTakers } from "../features/quizTaker/quizTakerSlice";
import Loader from "../components/Loader";
import QuizResult from "../components/QuizResult";

const MyResults = () => {
  const { quizTakers, isLoading } = useSelector((state) => state.quizTaker);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizTakers());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
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
              Quiz Results
            </h2>
          </div>
        </div>
        {quizTakers &&
          quizTakers.length > 0 &&
          quizTakers.map((quizTaker) => (
            <QuizResult key={quizTaker.id} quizTaker={quizTaker} />
          ))}

        {quizTakers && quizTakers.length === 0 && (
          <div className="text-center">
            <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              No quiz results found.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyResults;
