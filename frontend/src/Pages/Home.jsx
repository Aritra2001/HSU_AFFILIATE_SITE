import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useStudentsContext } from '../hooks/useStudentsContext';
import StudentDetails from '../components/StudentDetails';
import AddStudents from '../components/AddStudents';
import RemainingDaysCounter from '../components/RemainingDaysCounter';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from '../assets/Group.svg'
import { IoSearch } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";




const Home = () => {

  const affiliate = JSON.parse(localStorage.getItem('user'))
  const { students, dispatch } = useStudentsContext()
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true)
  const [reset, setReset] = useState(false)
  const [name, setName] = useState('')
  var [payment, setPayment] = useState('')
  const [calculatedRupee, setCalculatedRupee] = useState(null);
  const { user } = useAuthContext()

  const handleShare = async () => {
      const shareData = {
        title: 'Check this out!',
        text: 'Here is a link I wanted to share with you.',
        url: 'https://hexstaruniverse.com/all-courses/ai-for-space-application/', // Replace with the URL you want to share
      };
  
      try {
        if (navigator.share) {
          await navigator.share(shareData);
          console.log('Link shared successfully');
        } else {
          console.log('Web Share API is not supported in this browser');
        }
      } catch (error) {
        console.error('Error sharing the link:', error);
      }
    };

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

    const handelSearch = async() => {

      const search = { name }

      setReset(true)
        const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/name', {
          method: 'POST',
          body: JSON.stringify(search),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          }
        });
        setReset(false)
        const json = await response.json()

        if(response.ok) {
          dispatch({type: 'SET_STUDENTS', payload: json})
        }

      }
      if (toggle && user) {
        fetchStudentData();
      }
    
      // Fetch data when search icon is clicked
      if (name && !toggle) {
        handelSearch()
      }

  }, [dispatch, user, toggle, name]);

  useEffect(() => {
    const handelCount = async () => {
  
      const money = { payment }
  
      try {
        const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/money', {
          method: 'GET',
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
          setCalculatedRupee(rupeeLength * 50);
        } else {
          // Handle the case where the response is not okay
          console.error('Error:', rupeeData.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  
    }

    handelCount()
  
  })

  const handelReset = () => {

    if(toggle === false) {
      setToggle(!toggle)
      setName('')
    }

  }
  


  return (
    <div className='flex w-full h-full flex flex-col gap-8 justify-center items-center'>
      <Navbar />
      <div className="text-white text-[24px] font-bold font-['Poppins'] flex items-center justify-center sm:text-[46px] sm:mt-[2vh] mt-2">
        Dashboard
      </div>
      <div className='flex items-center justify-center gap-5 max-sm:flex-col'>
        <div className='w-[900px] h-[533px] bg-stone-900 rounded-[15px] border border-white backdrop-blur-[22px] overflow-auto max-sm:w-[300px] max-sm:h-[480px] sm:overflow-x '>
   
          <div className='flex flex-row'>
            <div className="text-white text-xl font-semibold font-['Poppins'] mt-[5vh] ml-[4rem] max-sm:text-[15px] max-sm:ml-6 flex capitalize">Student details</div>
            <input type="text" className='flex flex-end w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4 max-sm:w-[100px] max-sm:h-[25px] mt-7 ml-[20rem] max-sm:ml-[8.2rem] text-white max-sm:text-[10px] max-sm:indent-3 max-sm:placeholder:text-[10px] max-sm:mt-9' value={name} onChange={(e) => setName(e.target.value)} placeholder='Search Name'></input>
            <IoSearch className='absolute flex mt-[5.3vh] ml-[44rem] cursor-pointer max-sm:ml-[18.5rem] max-sm:w-[12px] max-sm:mt-[5.4vh]' size={20} color='8B8B8B' onClick={() => setToggle(!toggle)}/>
            <button 
            className='px-3 capitalize text-xs bg-[#6637ED] h-6 rounded-md md:text-base text-white font-["Poppins"] mt-[1.7rem] ml-4 sm:w-[5rem] sm:h-[5.5vh] max-sm:text-[10px] max-sm:mt-9 flex justify-center items-center' 
            onClick={handelReset}>reset</button>
            </div>
            {reset && (
              <div className='flex items-center justify-center h-full text-white font-["Poppins"]'>
                <p>Loading...</p>
              </div>
            )}

          {loading ? (
            // Show loading screen
            <div className="flex items-center justify-center h-full">
              <p className='text-white text-[15px] font-["Poppins"]'>Loading...</p>
            </div>
          ) : (
            // Show student details table
            <>
              <table className="text-violet-600 text-[15px] font-medium font-['Poppins'] ml-[4rem] mt-[5vh] flex max-sm:text-[10px] max-sm:ml-6 max-sm:mt-5">
                <thead>
                  <tr className='gap-40 flex max-sm:gap-7'>
                    <th className=''>Name</th>
                    <th className='max-sm:ml-[1.2rem]'>Email</th>
                    <th className='max-sm:ml-[3.2rem] max-sm:w-[4rem]'>Phone No</th>
                    <th className=''>Payment</th>
                  </tr>
                </thead>
              </table>
              <div className="w-[770px] h-[0px] border border-violet-600 ml-[4rem] flex mt-1 max-sm:w-[360px] max-sm:ml-6"></div>
              {students && students.map((student, index, array) => (
                <StudentDetails key={student._id} student={student} isLastStudent={index === array.length - 1} students={students} />
              ))}
            </>
          )}
        </div>
        <AddStudents />
      </div>
      <div className='w-[87%] h-[237px] flex bg-violet-600 rounded-2xl mb-10 max-sm:w-[300px] max-sm:h-[112px] max-sm:mb-[18rem] max-sm:-mt-4'>
        <div>
          <div className="text-white text-2xl font-semibold font-['Poppins'] justify-top p-1 mt-20 ml-7 max-sm:text-sm max-sm:mt-[1rem] max-sm:w-[280px]">
            Space Tech Training & Internship
          </div>
          <div className='flex flex-row gap-5 mt-[2vh] max-sm:flex-col'>
          <p className="text-zinc-300 text-base font-medium font-['Poppins'] ml-8 max-sm:text-[10px] max-sm:mt-[-1rem]">
            Starts In
          </p>
          <div className='flex flex-row text-[8px]'>
          <div className="w-[68px] h-[25px] bg-indigo-900 rounded-[5px] border border-zinc-300 items-center flex justify-center max-sm:ml-8 max-sm:h-[21px] max-sm:text-[8px] max-sm:w-[55px] max-sm:mt-[-1rem] relative">
            {<RemainingDaysCounter targetDate="2024-07-13" />}
          </div>
          <div class=" relative w-[100px] h-[24px] bg-zinc-200 rounded-md border-black text-black text-[10px] font-bold font-['Poppins'] items-center flex justify-center max-sm:w-[90px] max-sm:h-[20px] max-sm:text-[8px] max-sm:mt-[-1rem] ml-8" onClick={handleShare}>
          <p className='flex justify-center items-center gap-2 cursor-pointer'>Share Course<FaShare color='#6637ED'/></p>
          </div>
          </div>
          </div>
        </div>
        <div className='absolute flex flex-col items-center ml-[61.8rem] bg-stone-900 w-[20rem] h-[30vh] mt-[2vh] justify-center rounded-2xl border border-white text-white text-[15px] font-medium font-["Poppins"] overflow max-sm:mx-auto max-sm:w-[300px] max-sm:h-[120px] max-sm:mt-[8rem] max-sm:'>
         <div className='flex mr-[5rem] flex-col '>
          <img src={Avatar} alt="avatar" className='mb-3 mr-20' width={60}/>
          <p className='text-violet-600 -mb-1'>Payment</p>
         </div>
         <div className='absolute'>
         <p className='flex ml-[10rem] mb-[3rem]'>{affiliate.name}</p>
         <div className='flex ml-[10.5rem]'>
         <p className='flex ml-4' value={payment = 'Paid'} onChange={(e) => setPayment(e.target.value)}>₹{calculatedRupee !== null ? calculatedRupee : 0}</p>
         </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
