import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {

  const [students, setStudents] = useState(null)

  useEffect(() => {
    const fetchStudentData = async () => {

      const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/')

      const json = response.json()
      
      if (response.ok) {
        setStudents(json)
      }
    }

    fetchStudentData()

  },[])

  return (
    <div className='w-full h-screen flex flex-col'>
        <Navbar />
        <div className="text-white flex flex-col justify-center items-center text-white text-[46px] font-bold font-['Poppins'] mt-10 max-sm:text-[24px] max-sm:mt-[1.5rem]">
          Dashboard
        </div>
        <div className='text-white'>
          Data
        </div>
    </div>
  );
}

export default Home;
