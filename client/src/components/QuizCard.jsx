import PropTypes from "prop-types";


const QuizCard = (props) => {
    const { quiz } = props;

    return (
        <div className="bg-gray-100 px-2 text-center py-3">
            <h2 className="text-lg text-red-600">{quiz.name}</h2>
            <div className="my-3">
                
                {quiz.questions && quiz.questions.map((question) => (
                    <div key={question.id} className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        <p className="text-3xl my-3 font-bold">
                            {question.text}
                        </p>
                       <div className="grid sm:grid-cols-2 gap-4">
                            <p className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-400 sm:w-auto">
                                {question.option1}
                            </p>

                            <p className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-400 sm:w-auto">
                                {question.option2}
                            </p>

                            <p className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-400 sm:w-auto">
                                {question.option3}
                            </p>

                            <p className="block bg-gray-200 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-400 sm:w-auto">
                                {question.option4}
                            </p>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

QuizCard.propTypes = {
    quiz: PropTypes.object.isRequired,
};

export default QuizCard;