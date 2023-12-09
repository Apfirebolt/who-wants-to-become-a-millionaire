import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./views/Home";
import Admin from "./views/Admin";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Question from "./views/Question";
import Quiz from "./views/Quiz";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/question" element={<Question />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
