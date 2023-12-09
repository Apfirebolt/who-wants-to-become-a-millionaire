import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import HomeScreen from "../views/Home";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} exact />
      </Routes>
    </AnimatePresence>
  );
};


export default AnimatedRoutes;