import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const QuestionModal = (props) => {
  
  const { isOpen, addQuestion, closeModal, question } = props;
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: selectedQuestion ? selectedQuestion.text : "",
      option1: selectedQuestion ? selectedQuestion.option1 : "",
      option2: selectedQuestion ? selectedQuestion.option2 : "",
      option3: selectedQuestion ? selectedQuestion.option3 : "",
      option4: selectedQuestion ? selectedQuestion.option4 : "",
      level: selectedQuestion ? selectedQuestion.level : "",
      answer: selectedQuestion ? selectedQuestion.answer : "",
      hint: selectedQuestion ? selectedQuestion.hint : "",
    },
  });

  useEffect(() => {
    selectedQuestion && setSelectedQuestion(question);
  }, [question, selectedQuestion]);

  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Question
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit((data) => addQuestion(data))}
                    className="mx-auto my-3"
                  >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="option1"
                      >
                        Question Text
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="text"
                        rows="3"
                        cols="30"
                        placeholder="Question Text"
                        {...register("text", { required: true })}
                      />
                      {errors.option1 && (
                        <p className="text-red-500 mt-2">
                          Text is required.
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="option1"
                        >
                          Option One
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="option1"
                          type="text"
                          placeholder="Option One"
                          {...register("option1", { required: true })}
                        />
                        {errors.option1 && (
                          <p className="text-red-500 mt-2">
                            Option One is required.
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="option2"
                        >
                          Option Two
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="option2"
                          type="text"
                          placeholder="Option Two"
                          {...register("option2", { required: true })}
                        />
                        {errors.option2 && (
                          <p className="text-red-500 mt-2">
                            Option Two is required.
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="option3"
                        >
                          Option Three
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="option3"
                          type="text"
                          placeholder="Option Three"
                          {...register("option3", { required: true })}
                        />
                        {errors.option3 && (
                          <p className="text-red-500 mt-2">
                            Option Three is required.
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="option4"
                        >
                          Option Four
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="option4"
                          type="text"
                          placeholder="Option Four"
                          {...register("option4", { required: true })}
                        />
                        {errors.option4 && (
                          <p className="text-red-500 mt-2">
                            Option Four is required.
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="level"
                        >
                          Level
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="level"
                          type="number"
                          placeholder="Level"
                          {...register("level", { required: false })}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="answer"
                      >
                        Answer
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="text"
                        rows="2"
                        cols="30"
                        placeholder="Answer Text"
                        {...register("answer", { required: true })}
                      />
                      {errors.option1 && (
                        <p className="text-red-500 mt-2">
                          Answer is required.
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="hint"
                      >
                        Hint
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="hint"
                        rows="2"
                        cols="30"
                        placeholder="Hint"
                        {...register("hint", { required: false })}
                      />
                    </div>

                    <input
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                      value="Add Question"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

QuestionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  question: PropTypes.object,
};

export default QuestionModal;
