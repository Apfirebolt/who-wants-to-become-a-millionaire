import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuizTakers, deleteQuizTaker } from "../features/quizTaker/quizTakerSlice";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";
import QuizResult from "../components/QuizResult";

const MyResults = () => {
  const { quizTakers, isLoading } = useSelector((state) => state.quizTaker);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [selectedQuizTaker, setSelectedQuizTaker] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizTakers());
  }, [dispatch]);

  const deleteQuizTakerHandler = (quiz) => {
    setSelectedQuizTaker(quiz);
    setConfirmMessage("Deleting quiz result..." + quiz.quiz.name);
    setIsConfirmModalOpen(true);
  }

  const deleteQuizUtil = async () => {  
    await dispatch(deleteQuizTaker(selectedQuizTaker.id));
    dispatch(getQuizTakers());
    setIsConfirmModalOpen(false);
  }

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
            <QuizResult key={quizTaker.id} quizTaker={quizTaker} deleteQuizTaker={deleteQuizTakerHandler} />
          ))}

        {quizTakers && quizTakers.length === 0 && (
          <div className="text-center">
            <p className="text-2xl font-extrabold tracking-tight text-gray-700 my-3">
              No quiz results found.
            </p>
          </div>
        )}
      </section>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
        message={confirmMessage}
        confirmAction={deleteQuizUtil}
      />
    </div>
  );
};

export default MyResults;
