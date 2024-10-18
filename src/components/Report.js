import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [report, setReport] = useState({});

  useEffect(() => {
    const { answers } = location.state || { answers: [] };
    if (answers.length === 0) {
      // If no answers were provided, redirect back to the quiz
      navigate('/');
      return;
    }

    // Calculate score
    const correctAnswers = answers.filter(
      (answer) => answer.selectedOption === answer.correctAnswer
    ).length;
    
    const totalQuestions = answers.length;
    const score = `${correctAnswers} / ${totalQuestions}`;

    // Set report data
    setReport({
      score,
      answers,
    });
  }, [location, navigate]);

  if (!report.answers) {
    return <div>Loading report...</div>;
  }

  return (
    <div>
      <h2>Quiz Report</h2>
      <p>Your Score: {report.score}</p>

      <h3>Question Breakdown:</h3>
      <ul>
        {report.answers.map((answer, index) => (
          <li key={index}>
            <strong>Question {index + 1}:</strong> {answer.question}
            <br />
            <strong>Your Answer:</strong> {answer.selectedOption}
            <br />
            <strong>Correct Answer:</strong> {answer.correctAnswer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
