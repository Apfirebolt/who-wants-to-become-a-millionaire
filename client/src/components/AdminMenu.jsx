import { Link } from "react-router-dom"; // Add router link

const AdminMenu = () => {

  return (
    <div className="bg-gray-100 w-1/5 mr-4">
      <div className="lg:flex lg:flex-1 lg:items-center bg-violet-100 hover:bg-violet-200 text-white p-4 lg:space-x-6">
        <Link
          to="/admin/quiz"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Admin Quiz
        </Link>
        
      </div>

      <div className="lg:flex lg:flex-1 lg:items-center bg-violet-100 hover:bg-violet-200 text-white p-4 lg:space-x-6">
        <Link
          to="/admin/quiz-taker"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Admin Quiz Taker
        </Link>
        
      </div>

      <div className="lg:flex lg:flex-1 lg:items-center bg-violet-100 hover:bg-violet-200 text-white p-4 lg:space-x-6">
        <Link
          to="/admin/question"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Admin Question
        </Link>
        
      </div>
    </div>
  );
};

export default AdminMenu;
