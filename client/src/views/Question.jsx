import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions, createQuestion, updateQuestion, deleteQuestion } from "../features/question/questionSlice";
import Loader from "../components/Loader";
import QuestionCard from "../components/QuestionCard";
import AddQuestion from "../components/AddQuestion";
import ConfirmModal from "../components/ConfirmModal";


const Question = () => {
  const { questions, isLoading } = useSelector((state) => state.question);

  const dispatch = useDispatch();
  const [isOpen, setIsOpened] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  const closeModal = () => {
    setIsOpened(false);
  }

  const openModal = () => {
    setIsOpened(true);
  }

  const addQuestionUtil = async (data) => {
    await dispatch(createQuestion(data));
    dispatch(getQuestions());
    setIsOpened(false);
  }

  const updateQuestionUtil = async (data) => {
    await dispatch(updateQuestion(data));
    dispatch(getQuestions());
    setIsOpened(false);
  }

  const deleteQuestionUtil = async () => {
    await dispatch(deleteQuestion(selectedQuestion.id));
    setIsConfirmModalOpened(false);
    dispatch(getQuestions());
  }

  const deleteQuestionHandler = async (question) => {
    setSelectedQuestion(question);
    setConfirmMessage("Are you sure you want to delete this question?");
    setIsConfirmModalOpened(true);
  }

  const updateQuestionHandler = (question) => {
    setSelectedQuestion(question);
    setIsOpened(true);
  }

  useEffect(() => {
    dispatch(getQuestions());
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
              Questions
            </h2>

            <div className="grid grid-cols-1 px-2 gap-2 my-3">
              {questions &&
                questions.map((question) => <QuestionCard key={question.id} question={question} editQuestion={updateQuestionHandler} 
                deleteQuestion={deleteQuestionHandler} />)}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-2 w-1/5 px-3 py-2 text-center">
          <button
            onClick={openModal}
            className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
          >
            Upload Question
          </button>
        </div>
      </section>
      <AddQuestion 
        isOpen={isOpen} 
        question={selectedQuestion}
        closeModal={closeModal} 
        addQuestion={addQuestionUtil} 
       />
      <ConfirmModal
        isOpen={isConfirmModalOpened}
        closeModal={() => setIsConfirmModalOpened(false)}
        message={confirmMessage}
        confirmAction={deleteQuestionUtil}
      />
    </div>
  );
};

export default Question;
