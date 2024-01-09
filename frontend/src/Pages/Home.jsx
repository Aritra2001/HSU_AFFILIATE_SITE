import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useStudentsContext } from '../hooks/useStudentsContext';
import StudentDetails from '../components/StudentDetails';
import AddStudents from '../components/AddStudents';
import RemainingDaysCounter from '../components/RemainingDaysCounter';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { students, dispatch } = useStudentsContext()
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await fetch('http://localhost:9999/api/students/');
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_STUDENTS', payload: json})
      }

      setLoading(false); // Set loading to false after data is fetched
    };

    if(user) {
      fetchStudentData();
    }
  }, [dispatch, user]);

  return (
    <div className='w-full h-fit flex flex-col gap-8 justify-center items-center'>
      <Navbar />
      <div className="text-white text-[24px] font-bold font-['Poppins'] flex items-center justify-center sm:text-[46px] sm:mt-[2vh] mt-2">
        Dashboard
      </div>
      <div className='flex items-center justify-center gap-5'>
        <div className='w-[900px] h-[533px] bg-stone-900 rounded-[15px] border border-white backdrop-blur-[22px] overflow-auto overflow-x-hidden'>
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
      <div className='w-[87%] h-[150px] flex bg-violet-600 rounded-2xl mb-10'>
        <div>
          <div className="text-white text-xl font-semibold font-['Poppins'] justify-top p-8">
            Space Tech Training & Internship
          </div>
          <div className='flex flex-row gap-5'>
          <p className="text-zinc-300 text-base font-medium font-['Poppins'] ml-8">
            Starts In
          </p>
          <div className="w-[68px] h-[25px] bg-indigo-900 rounded-[5px] border border-zinc-300 items-center flex justify-center">
            {<RemainingDaysCounter targetDate="2024-01-29" />}
          </div>
          <div class="w-[85px] h-[24px] bg-zinc-200 rounded-md border-black text-black text-[10px] font-bold font-['Poppins'] items-center flex justify-center">
          <a href="https://hexstaruniverse.com/courses/space-tech-training-and-internship-program-2/">Visit the page</a>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
