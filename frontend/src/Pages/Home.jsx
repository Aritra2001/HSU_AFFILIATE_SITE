import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useStudentsContext } from '../hooks/useStudentsContext';
import StudentDetails from '../components/StudentDetails';
import AddStudents from '../components/AddStudents';
import RemainingDaysCounter from '../components/RemainingDaysCounter';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from '../assets/Group.svg'

const Home = () => {

  const name = JSON.parse(localStorage.getItem('user'))
  const { students, dispatch } = useStudentsContext()
  const [loading, setLoading] = useState(true);
  var [payment, setPayment] = useState('')
  const [calculatedRupee, setCalculatedRupee] = useState(null);
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
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

  const handelCount = async (e) => {
    e.preventDefault()

    const money = { payment }

    try {
      const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/money', {
        method: 'POST',
        body: JSON.stringify(money),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const rupeeData = await response.json();

      if (response.ok) {
        setPayment('');

        // Assuming rupeeData is an array, you can calculate the length
        const rupeeLength = rupeeData.length;

        // Multiply 500 with the length and update the state
        setCalculatedRupee(rupeeLength * 500);
      } else {
        // Handle the case where the response is not okay
        console.error('Error:', rupeeData.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

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
      <div className='w-[87%] h-[237px] flex bg-violet-600 rounded-2xl mb-10'>
        <div>
          <div className="text-white text-2xl font-semibold font-['Poppins'] justify-top p-1 mt-20 ml-7">
            Space Tech Training & Internship
          </div>
          <div className='flex flex-row gap-5 mt-[2vh]'>
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
        <div className='flex flex-col items-center ml-[34rem] bg-stone-900 w-[20rem] h-[30vh] mt-[2vh] justify-center rounded-2xl border border-white text-white text-[15px] font-medium font-["Poppins"] overflow-hidden'>
         <div className='flex mr-[5rem] flex-col'>
          <img src={Avatar} alt="avatar" className='mb-3 mr-20' width={60}/>
          <p className='text-violet-600 -mb-1'>Payment</p>
         </div>
         <div className='absolute'>
         <p className='flex ml-[10rem] mb-[3rem]'>{name.name}</p>
         <div className='flex ml-[10.5rem]'>
         <input type="checkbox" value={payment = 'Paid'} onClick={handelCount} onChange={(e) => setPayment(e.target.value)}></input>
         <p className='flex ml-2'>₹{calculatedRupee !== null ? calculatedRupee : 0}</p>
         </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
