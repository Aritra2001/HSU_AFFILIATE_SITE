import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useStudentsContext } from '../hooks/useStudentsContext';
import StudentDetails from '../components/StudentDetails';
import AddStudents from '../components/AddStudents';

const Home = () => {
  const { students, dispatch } = useStudentsContext()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/');
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_STUDENTS', payload: json})
      }

      setLoading(false); // Set loading to false after data is fetched
    };

    fetchStudentData();
  }, [dispatch]);

  return (
    <div className='w-full h-screen flex flex-col gap-10'>
      <Navbar />
      <div className="text-white text-[24px] font-bold font-['Poppins'] flex items-center justify-center sm:text-[46px] sm:mt-[5vh] mt-5">
        Dashboard
      </div>
      <div className='flex items-center justify-center gap-10'>
        <div className='w-[900px] h-[533px] bg-stone-900 rounded-[15px] border border-white backdrop-blur-[22px] mt-[2rem] overflow-auto overflow-x-hidden'>
          <div className="text-white text-xl font-semibold font-['Poppins'] mt-[5vh] ml-[4rem]">Student details</div>
          {loading ? (
            // Show loading screen
            <div className="flex items-center justify-center h-full">
              <p className='text-white text-[15px] font-["Poppins"]'>Loading...</p>
            </div>
          ) : (
            // Show student details table
            <>
              <table className="text-violet-600 text-[15px] font-medium font-['Poppins'] ml-[4rem] mt-[3vh] flex">
                <thead>
                  <tr className='gap-40 flex'>
                    <th className=''>Name</th>
                    <th className=''>Email</th>
                    <th className=''>Phone No</th>
                    <th className=''>Payment</th>
                  </tr>
                </thead>
              </table>
              <div className="w-[770px] h-[0px] border border-violet-600 ml-[4rem] flex mt-1"></div>
              {students && students.map((student) => (
                <StudentDetails key={student._id} student={student} />
              ))}
            </>
          )}
        </div>
        <AddStudents />
      </div>
    </div>
  );
};

export default Home;
