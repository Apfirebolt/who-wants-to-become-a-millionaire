import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./views/Home";
import Admin from "./views/Admin";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Question from "./views/Question";
import Quiz from "./views/Quiz";
import TakeQuiz from "./views/TakeQuiz";
import MyResults from "./views/MyResults";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/question" element={<AdminRoute />}>
          <Route path="/question" element={<Question />} />
        </Route>
        <Route path="/quiz" element={<PrivateRoute />}>
          <Route path="/quiz" element={<Quiz />} />
        </Route>
        <Route path="/take-quiz/:id" element={<PrivateRoute />}>
          <Route path="/take-quiz/:id" element={<TakeQuiz />} />
        </Route>
        <Route path="/my-results" element={<PrivateRoute />}>
          <Route path="/my-results" element={<MyResults />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
