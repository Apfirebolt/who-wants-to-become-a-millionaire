import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuizes } from "../features/quiz/quizSlice";
import Loader from "../components/Loader";
import QuizCard from "../components/QuizCard";

const Project = () => {
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
    </div>
  );
};

export default Project;