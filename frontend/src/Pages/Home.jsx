import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {

  return (
    <div className='w-full h-screen flex flex-col'>
        <Navbar />
        <div className='text-white flex flex-col justify-center items-center'>
            Home Page
        </div>
    </div>
  );
}

export default Home;
