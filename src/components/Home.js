// src/components/Home.js
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    navigate('/quiz');
  };

  return (
    <div className="p-5 flex flex-col justify-between items-center bg-gradient-to-b from-white to-purple h-screen" onClick={handleStart}>
        <div className='flex flex-row justify-center'>
            <img src='./Frame.svg' className='h-10'></img>
        </div>
        <div className='text-6xl text-upred font-Poppins font-bold bg-white rounded-full h-[30%] w-[70%] flex flex-col items-center justify-center'>
            Quiz
        </div>
        <button className='w-[85%] text-white font-Nunito font-bold bg-upred rounded-3xl py-2 text-2xl'>
            Start
        </button>
    </div>
  );
};

export default Home;
