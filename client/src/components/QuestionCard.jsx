import PropTypes from "prop-types";


const QuestionCard = (props) => {
    const { question, editQuestion, deleteQuestion } = props;

    const deleteQuestionHandler = () => {
        deleteQuestion(question);
    }

    const updateQuestionHandler = () => {
        editQuestion(question);
    }

    return (
        <div className="bg-gray-100 px-2 text-center py-3">
            <h2 className="text-lg text-red-600">{question.text}</h2>
            <div className="my-3">
                <button
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                    View
                </button>

                <button
                    onClick={updateQuestionHandler}
                    className="inline-block bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2"
                >
                    Edit
                </button>

                <button
                    onClick={deleteQuestionHandler}
                    className="inline-block bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
    editQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
};

export default QuestionCard;