import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions } from "../features/question/questionSlice";
import Loader from "../components/Loader";
import QuestionCard from "../components/QuestionCard";

const Question = () => {
  const { questions, isLoading } = useSelector((state) => state.question);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Questions</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-7 px-2 gap-2 my-3">
        
      </div>
    </div>
  );
};

export default Question;