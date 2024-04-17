import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/login/Login';
import Main from './pages/main/Main';
import Signup from './pages/signup/Signup';
import ForgotPassword from './pages/login/forgotpassword/Forgotpassword';
import Footer from './pages/component/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
    <Footer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
  </Router>
  );
}

export default App;
