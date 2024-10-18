// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Report from './components/Report';
import './App.css';
import QuizProvider from './components/QuizProvider';
function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/report" element={<Report/>} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
