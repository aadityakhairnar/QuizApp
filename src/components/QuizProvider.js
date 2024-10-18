import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext();

export const useQuiz = () => {
  return useContext(QuizContext);
};

const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quiz data
  const fetchData = async (retryCount = 0) => {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium';

    try {
      const response = await fetch(apiUrl);
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || 5;
        if (retryCount < 5) {
          setTimeout(() => fetchData(retryCount + 1), retryAfter * 1000);
        } else {
          throw new Error('Max retries reached.');
        }
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        const data = await response.json();
        setQuestions(data.results); // Set questions
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <QuizContext.Provider value={{ questions, loading, error }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
