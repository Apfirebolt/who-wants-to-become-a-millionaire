import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getQuizes,
  addQuiz,
  addRandomQuiz,
  deleteQuiz,
  updateQuiz,
} from "../../features/quiz/quizSlice";
import { createQuestion } from "../../features/question/questionSlice";
import Loader from "../../components/Loader";
import AdminQuizCard from "../../components/QuizAdminCard";
import AdminMenu from "../../components/AdminMenu";
import AddQuiz from "../../components/AddQuiz";
import AddQuestion from "../../components/AddQuestion";
import ConfirmModal from "../../components/ConfirmModal";

const AdminQuiz = () => {
  const { quizes, isLoading } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();
  const [isOpen, setIsOpened] = useState(false);
  const [randomQuiz, setRandomQuiz] = useState(false);
  const [isAddQuestionModalOpened, setIsAddQuestionModalOpened] =
    useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  const [message, setConfirmMessage] = useState("");

  useEffect(() => {
    dispatch(getQuizes());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  const closeModal = () => {
    setIsOpened(false);
  };

  const closeMessageModal = () => {
    setIsConfirmModalOpened(false);
  };

  const uploadQuiz = () => {
    setIsOpened(true);
    setRandomQuiz(false);
  };

  const createRandomQuiz = () => {
    setRandomQuiz(true);
    setIsOpened(true);
  }

  const closeQuestionModal = () => {
    setIsAddQuestionModalOpened(false);
  };

  const addQuestionUtil = async (data) => {
    const response = await dispatch(createQuestion(data));
    let existingQuestionIds = selectedQuiz.questions.map(
      (question) => question.id
    );
    let questions = [...existingQuestionIds, response.payload.id];
    await dispatch(updateQuiz({ id: selectedQuiz.id, questions: questions }));
    dispatch(getQuizes());
    setIsAddQuestionModalOpened(false);
  };

  const addQuestionHandler = (quiz) => {
    setSelectedQuiz(quiz);
    setIsAddQuestionModalOpened(true);
  };

  const addQuizUtil = async (data) => {
    await dispatch(addQuiz(data));
    dispatch(getQuizes());
    setIsOpened(false);
  };

  const addRandomQuizUtil = async (data) => {
    await dispatch(addRandomQuiz(data));
    dispatch(getQuizes());
    setIsOpened(false);
  }

  const deleteQuizUtil = async () => {
    await dispatch(deleteQuiz(selectedQuiz.id));
    setIsConfirmModalOpened(false);
    dispatch(getQuizes());
  };

  const deleteQuizHandler = (quiz) => {
    setSelectedQuiz(quiz);
    setConfirmMessage("Are you sure you want to delete this quiz?");
    setIsConfirmModalOpened(true);
  };

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
                Quiz
              </h2>

              <div className="grid grid-cols-1 px-2 gap-2 my-3">
                {quizes &&
                  quizes.map((quiz) => (
                    <AdminQuizCard
                      key={quiz.id}
                      quiz={quiz}
                      deleteQuiz={deleteQuizHandler}
                      addQuestion={addQuestionHandler}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="mx-auto flex justify-center mt-2 px-3 py-2">
            <button
              onClick={uploadQuiz}
              className="block mx-1 bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
              Upload Quiz
            </button>
            <button
              onClick={createRandomQuiz}
              className="block mx-1 bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
              Create Random Quiz
            </button>
          </div>
        </section>
      </div>
      <AddQuiz isOpen={isOpen} closeModal={closeModal} addQuiz={randomQuiz ? addRandomQuizUtil : addQuizUtil} />
      <AddQuestion
        isOpen={isAddQuestionModalOpened}
        closeModal={closeQuestionModal}
        addQuestion={addQuestionUtil}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpened}
        message={message}
        closeModal={closeMessageModal}
        confirmAction={deleteQuizUtil}
      />
    </div>
  );
};

export default AdminQuiz;
