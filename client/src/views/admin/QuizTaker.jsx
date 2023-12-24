import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getQuizTakers,
  deleteQuizTaker,
} from "../../features/quizTaker/quizTakerSlice";
import Loader from "../../components/Loader";
import QuizResultAdmin from "../../components/QuizResultAdmin";
import AdminMenu from "../../components/AdminMenu";
import ConfirmModal from "../../components/ConfirmModal";

const AdminQuizTaker = () => {
  const { quizTakers, isLoading } = useSelector((state) => state.quizTaker);

  const dispatch = useDispatch();
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const deleteQuestionUtil = async () => {
    await dispatch(deleteQuizTaker(selectedQuestion.id));
    setIsConfirmModalOpened(false);
    dispatch(getQuizTakers());
  };

  const deleteQuizTakerHandler = async (quiz) => {
    setSelectedQuestion(quiz);
    setConfirmMessage("Are you sure you want to delete this quiz taker?");
    setIsConfirmModalOpened(true);
  };

  useEffect(() => {
    dispatch(getQuizTakers());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center bg-gray-100 px-4 py-3">
      <AdminMenu />
      <div className="w-4/5 bg-slate-300 px-3 py-5">
        <section aria-labelledby="cause-heading">
          <div className="relative bg-gray-800 py-4 px-6">
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
            <div className="relative max-w-6xl mx-auto text-center">
              <h2
                id="cause-heading"
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Quiz Takers
              </h2>

              <div className="grid grid-cols-1 px-2 gap-1 my-3">
                {quizTakers &&
                  quizTakers.map((quiz) => (
                    <QuizResultAdmin
                      key={quiz.id}
                      quizTaker={quiz}
                      deleteQuizTaker={deleteQuizTakerHandler}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpened}
        closeModal={() => setIsConfirmModalOpened(false)}
        message={confirmMessage}
        confirmAction={deleteQuestionUtil}
      />
    </div>
  );
};

export default AdminQuizTaker;
