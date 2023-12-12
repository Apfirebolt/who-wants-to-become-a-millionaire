import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const QuestionModal = (props) => {
  
  const { isOpen, closeModal } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
                    onSubmit={handleSubmit((data) => dispatch(login(data)))}
                    className="mx-auto my-3"
                  >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="option1"
                      >
                        Question Text
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="text"
                        type="text"
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
                    </div>

                    <input
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                      value="Sign In"
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
};

export default QuestionModal;
