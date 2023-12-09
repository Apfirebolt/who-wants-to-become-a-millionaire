import { Link } from "react-router-dom";
import PropTypes from "prop-types";


const QuizCard = (props) => {
    const { quiz } = props;

    return (
        <div className="bg-gray-100 px-2 text-center py-3">
            <h2 className="text-lg text-red-600">{quiz.name}</h2>
            <div className="my-3">
                {quiz.questions && quiz.questions.map((question) => (
                    <div key={question.id} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {question.text}

                        <p>
                            {question.option1}
                        </p>

                        <p>
                            {question.option2}
                        </p>

                        <p>
                            {question.option3}
                        </p>

                        <p>
                            {question.option4}
                        </p>
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