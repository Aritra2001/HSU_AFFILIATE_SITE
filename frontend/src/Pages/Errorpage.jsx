import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {

  const navigator = useNavigate()
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className="relative text-white text-[180px] font-bold font-['Poppins'] max-sm:text-[90px] flex sm:mt-[12rem] mt-[16.5rem]">404!</div>
      <div className=" max-sm:text-sm text-white text-4xl font-normal font-['Poppins'] max-sm:w-[239px] text-center sm:mt-[-5vh] mt-[-3vh]">Looks Like You are Lost <span className="text-violet-600 text-4xl font-normal font-['Poppins'] max-sm:text-sm cursor-pointer" onClick={() => navigator(-1)}> <br/>Go Back</span></div>
    </div>
  );
}

export default ErrorPage;
