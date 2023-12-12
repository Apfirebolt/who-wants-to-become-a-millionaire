import { Link } from "react-router-dom";
import PropTypes from "prop-types";


const QuestionCard = (props) => {
    const { question, addNewQuestion } = props;

    return (
        <div className="bg-gray-100 px-2 text-center py-3">
            <h2 className="text-lg text-red-600">{question.text}</h2>
            <div className="my-3">
                <Link
                    to={`/project/${question.id}`}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                    View
                </Link>
            </div>
        </div>
    );
};

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
    addNewQuestion: PropTypes.func.isRequired,
};

export default QuestionCard;