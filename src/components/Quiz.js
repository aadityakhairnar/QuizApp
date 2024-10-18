import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizProvider';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Quiz = () => {
  const { questions, loading, error } = useQuiz(); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // Timeout for each question (in seconds)
  const navigate = useNavigate();

  const staticQuestions = [
    { question: "What is the capital of France?", correct_answer: "Paris", incorrect_answers: ["London", "Berlin", "Madrid"] },
    { question: "What is 2 + 2?", correct_answer: "4", incorrect_answers: ["3", "5", "6"] },
  ];

  const currentQuestions = questions.length > 0 ? questions : staticQuestions;

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId); // Clean up timeout on component unmount or change
    } else {
      handleNext(); // Move to next question when time runs out
    }
  }, [timeLeft]);

  // Handle next question
  const handleNext = () => {
    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestions[currentIndex].question,
        selectedOption,
        correctAnswer: currentQuestions[currentIndex].correct_answer,
      },
    ];

    setAnswers(updatedAnswers);

    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption('');
      setTimeLeft(30); // Reset the timer for the next question
    } else {
      navigate('/report', { state: { answers: updatedAnswers } });
    }
  };

  // Handle option selection
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (currentQuestions.length === 0) {
    return <div>No questions available</div>;
  }

  const currentQuestion = currentQuestions[currentIndex];
  const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  return (
    <div className='bg-purple h-screen flex flex-col justify-between'>
      <img src='./bg.svg' alt="Background" />
      <div className='bg-white mt-10 h-full rounded-t-3xl p-10 flex flex-col items-center relative'>
        {/* Circular progress bar for question timer */}
        <div id='circularprogress' className='absolute bg-white h-36 w-36 p-2 rounded-full top-0 -translate-y-1/2 flex flex-col items-center justify-center'>
          <CircularProgressbarWithChildren
            value={(timeLeft / 30) * 100} // Convert time left to percentage
            styles={buildStyles({
              pathColor: timeLeft <= 3 ? '#FF3B3F' : '#44B77B', // Red color for the last 3 seconds
              textColor: 'black',
            })}
          >
            <div className='flex flex-row items-end'>
            <h2 className='font-Nunito font-bold text-5xl'>{currentIndex + 1}</h2>
            <h2  className='font-Nunito font-bold text-xl text-gray'>/{currentQuestions.length}</h2>
            </div>
          </CircularProgressbarWithChildren>
        </div>

        <div className='relative mt-16 flex flex-col justify-between gap-4'>
          <h3 className='font-Nunito font-bold text-2xl'>{currentQuestion.question}</h3>
          <div className='flex flex-col gap-4 mt-4'>
            {allOptions.map((option, index) => (
              <div key={index} className={`bg-cardbg border w-full h-16 rounded-xl flex flex-row items-center gap-4 px-6 text-xl font-Nunito font-semibold ${selectedOption === option ? 'border-correct bg-white' : 'border-transparent'}`}>
                <input 
                  type="radio" 
                  id={`radio-${index}`} 
                  name="option" 
                  value={option} 
                  checked={selectedOption === option} 
                  onChange={() => handleOptionChange(option)} 
                  className="hidden" // Hide the default radio button
                />
                <label htmlFor={`radio-${index}`} className={`flex items-center cursor-pointer`}>
                  <span className={`w-5 h-5 mr-2 rounded-full border-2 
                    ${selectedOption === option ? 'bg-correct border-transparent' : 'border-gray-400'} 
                    flex items-center justify-center`}>
                    {selectedOption === option && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 w-5 h-5 text-white absolute" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M10 15l-5-5 1.41-1.41L10 12.17l7.59-7.59L19 6l-9 9z"/>
                      </svg>
                    )}
                  </span>
                  {option}
                </label>
              </div>
            ))}
          </div>

          <button className='fixed bottom-0 w-[80%] mt-4 text-white font-Nunito font-bold bg-upred rounded-full py-4 text-xl mb-4' onClick={handleNext} disabled={!selectedOption}>Next</button>

          </div>
      </div>
    </div>
  );
};

export default Quiz;
