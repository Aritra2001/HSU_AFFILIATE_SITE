import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Formpage2 = () => {
  const [expectation, setExpectation] = useState('');
  const [institution, setInstitute] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let responseJson = {};

  const notify = () => {
    if (!responseJson.hasOwnProperty('error')) {
      toast.success('Email sent to your inbox!');
    } else {
      toast.error(responseJson.error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const name = JSON.parse(localStorage.getItem('name'));
    const email = JSON.parse(localStorage.getItem('email'));
    const phone = JSON.parse(localStorage.getItem('phone'));
    const experience = JSON.parse(localStorage.getItem('experience'));

    const affiliate = { name, email, phone, experience, expectation, institution, dob };

    setLoading(true);
    const response = await fetch(
      'https://hsu-affiliate-site-ph69.vercel.app/api/affiliate',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(affiliate),
      }
    );
    setLoading(false);

    responseJson = await response.json();
    notify();

    if (!response.ok) {
      setError(responseJson.error);
    } else {
      setError(null);
      setExpectation('');
      setInstitute('');
      setDob('');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('phone');
      localStorage.removeItem('experience');
      console.log('New Affiliate Added :)');
      setTimeout(() => navigate('/login'), 5000);
    }
  };

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center">
      <Navbar />
      <div className="text-white text-[46px] font-bold font-['Poppins'] mt-[13vh] max-sm:mt-[3rem] max-sm:text-[36px]">
        Form
      </div>
      <div className="w-[852px] h-[484.17px] rounded-2xl border border-white backdrop-blur-[22px] mt-[5vh] justify-center flex flex-col items-center max-sm:border-none max-sm:w-screen max-sm:backdrop-blur-0 max-sm:mt-[-2.8rem]">
        <input
          className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:h-[50px] max-sm:mt-[1.5rem]"
          placeholder='Expectations'
          type='text'
          value={expectation}
          onChange={(e) => setExpectation(e.target.value)}
          required
        />
        <input
          className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:h-[50px] max-sm:mt-[1.5rem] max-sm:bg-zinc-900"
          placeholder='Institution *'
          type='text'
          value={institution}
          onChange={(e) => setInstitute(e.target.value)}
          required
        />
        <input
          className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:h-[50px] max-sm:mt-[1.5rem] max-sm:bg-zinc-900"
          placeholder='DOB (DD-MM-YYYY)*'
          type='text'
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <button
          className="w-[189px] h-[67px] bg-violet-600 rounded-[10px] border-white text-white text-3xl font-bold font-['Poppins'] mt-[7vh] mb-[10vh] max-sm:w-[280px] max-sm:h-[40px] max-sm:mt-[3rem] max-sm:text-[22px] sm:hidden max-sm:mb-[5rem]"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      <ToastContainer theme="dark" />
      <button
        className="w-[189px] h-[67px] bg-violet-600 rounded-[10px] border-white text-white text-3xl font-bold font-['Poppins'] mt-[7vh] mb-[10vh] max-sm:w-[280px] max-sm:h-[40px] max-sm:text-[22px] max-sm:mt-[-4rem] max-sm:mb-[8rem] max-sm:hidden"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
};

export default Formpage2;
