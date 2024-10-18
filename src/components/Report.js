// Report.js
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GaugeChart from './GaugeChart'; // Import the GaugeChart component

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [report, setReport] = useState({});

  useEffect(() => {
    const { answers } = location.state || { answers: [] };
    if (answers.length === 0) {
      navigate('/');
      return;
    }

    const correctAnswers = answers.filter(
      (answer) => answer.selectedOption === answer.correctAnswer
    ).length;

    const totalQuestions = answers.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100); // Calculate percentage score

    setReport({
      score,
      answers,
      correctAnswers,
      totalQuestions,
    });
  }, [location, navigate]);

  if (!report.answers) {
    return <div>Loading report...</div>;
  }

  return (
    <div className="bg-purple h-screen flex flex-col justify-between">
      <img src="./bg.svg" alt="Background" />
      <div className="bg-white h-[85%] rounded-t-3xl p-10 flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold font-Nunito">Your result</h1>

        <div className=''>
          <GaugeChart value={report.score} />
        </div>
        <div className="w-full bg-correct/20 rounded-xl py-4 px-4 flex flex-row gap-4 items-center">
          <div className="bg-correct rounded-full w-4 h-4 mb-1"></div>
          <span className="text-xl font-Nunito font-bold">{report.correctAnswers}</span>
          <span className="text-xl font-Nunito font-bold">Correct</span>
        </div>
        <div className="w-full bg-upred/20 rounded-xl py-4 px-4 flex flex-row gap-4 items-center">
          <div className="bg-upred rounded-full w-4 h-4 mb-1"></div>
          <span className="text-xl font-Nunito font-bold">
            {report.totalQuestions - report.correctAnswers}
          </span>
          <span className="text-xl font-Nunito font-bold">Wrong</span>
        </div>
      </div>
    </div>
  );
};

export default Report;
