import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {

  const [students, setStudents] = useState(null)

  useEffect(() => {
    const fetchStudentData = async () => {

      const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/')

      const json = await response.json()

      if (response.ok) {
        setStudents(json)
      }
    }

    fetchStudentData()

  },[])

  return (
    <div className='w-full h-screen flex flex-col sm:gap-2 gap-4'>
      <Navbar />
      <div className="text-white text-[24px] font-bold font-['Poppins'] flex items-center justify-center sm:text-[46px]">
        Dashboard
      </div>
      <div className='text-white sm:text-[22px] font-regular font-["Poppins"] flex items-center justify-center'>
        {students && students.map((student) => (
          <p>{student.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Home;
