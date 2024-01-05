import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Formpage1 = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [experience, setExperience] = useState('')

  const navigator = useNavigate()

  const handelSubmit = (e) => {
    e.preventDefault()

    localStorage.setItem('name', JSON.stringify(name))
    localStorage.setItem('email', JSON.stringify(email))
    localStorage.setItem('phone', JSON.stringify(phone))
    localStorage.setItem('experience', JSON.stringify(experience))
    navigator('/page2')
  }

  useEffect(() => {

    const saveName = JSON.parse(localStorage.getItem('name'))
    const saveEmail = JSON.parse(localStorage.getItem('email'))
    const savePhone = JSON.parse(localStorage.getItem('phone'))
    const saveExperience = JSON.parse(localStorage.getItem('experience'))

    setName(saveName)
    setEmail(saveEmail)
    setPhone(savePhone)
    setExperience(saveExperience)

  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <Navbar />
      <div className="text-white text-[46px] font-bold font-['Poppins'] mt-[13vh] max-sm:mt-[2rem] max-sm:text-[36px]">
        Form
      </div>
      <div className="w-[852px] h-[584.17px] rounded-2xl border border-white backdrop-blur-[22px] mt-[5vh] justify-center flex flex-col items-center max-sm:border-none max-sm:w-screen max-sm:backdrop-blur-0 max-sm:mt-[-5rem]">
        <input className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] max-sm:w-[280px] max-sm:h-[50px] max-sm:bg-zinc-900 max-sm:text-[15px]   max-sm:indent-[2rem] max-sm:mt-[5rem]" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name *' type='text' required></input>
        <input className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:h-[50px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:bg-zinc-900 max-sm:mt-[1.5rem]" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email *' type='email' required></input>
        <input className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:h-[50px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:mt-[1.5rem]" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Phone No *' type='number' required></input>
        <input className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:bg-zinc-900 max-sm:h-[50px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:mt-[1.5rem]" value={experience} onChange={(e)=>setExperience(e.target.value)} placeholder='Experience' type='text' required></input>
        <button className="w-[189px] h-[67px] bg-violet-600 rounded-[10px] border-white text-white text-3xl font-bold font-['Poppins'] mt-[8vh] mb-[10vh] max-sm:w-[280px] max-sm:h-[40px] max-sm:mt-[3rem] max-sm:text-[22px] sm:hidden" onClick={handelSubmit}>Next</button>
      </div>
      <button className="w-[189px] h-[67px] bg-violet-600 rounded-[10px] border-white text-white text-3xl font-bold font-['Poppins'] mt-[7vh] mb-[10vh] max-sm:w-[280px] max-sm:h-[40px] max-sm:mt-[-7rem] max-sm:text-[22px] max-sm:hidden" onClick={handelSubmit}>Next</button>
    </div>
  );
}

export default Formpage1;
