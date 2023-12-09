import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./views/Home";
import Admin from "./views/Admin";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
