import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Formpage2 = () => {

  const [id_type, setIdtype] = useState('')
  const [id_proof, setIdno] = useState('')
  const [expectation, setExpectation] = useState('')
  const [institution, setInstitute] = useState('')
  const [dob, setDob] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  var json = ''

  const notify = () => {
    
    if(json.hasOwnProperty('error') === false) {
      toast.success('You will Receive an Email on Selection!')
    }
    else {
      toast.error(json.error)
    }
  }

  const handelClick = async (e) => {
    e.preventDefault()

    const name = JSON.parse(localStorage.getItem('name'))
    const email = JSON.parse(localStorage.getItem('email'))
    const phone = JSON.parse(localStorage.getItem('phone'))
    const experience = JSON.parse(localStorage.getItem('experience'))

    const affiliate = { name, email, phone, experience, id_type, id_proof, expectation, institution, dob }
    setLoading(true)
    const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/affiliate', {

    method: 'POST',
      body: JSON.stringify(affiliate),
      headers : {
        'Content-Type': 'application/json'
      }
    })

    setLoading(false)
    json = await response.json()
    notify()

    if(!response) {
      try {
        setError(json.error)
      } catch(e) {
        throw new Error(e)
      }
    }

    if(response.ok) {
      try {
        setError(null)
        setIdtype('')
        setIdno('')
        setExpectation('')
        setInstitute('')
        setDob('')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('phone')
        localStorage.removeItem('experience')
        console.log('New Affiliate Added :)')
      } catch(e) {
        throw new Error(e)
      }
    }

  }


  return (
    <div className='w-full h-fit flex flex-col justify-center items-center'>
    <Navbar />
    <div className="text-white text-[46px] font-bold font-['Poppins'] mt-[13vh] max-sm:mt-[2rem] max-sm:text-[36px]">
        Form
    </div>
    <div className="w-[852px] h-[584.17px] rounded-2xl border border-white backdrop-blur-[22px] mt-[5vh] justify-center flex flex-col items-center max-sm:border-none max-sm:w-screen max-sm:backdrop-blur-0 max-sm:mt-[-2.8rem]">
        <div className='custom-select'>
        <select aria-label="Select ID Type" className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300  text-[25px] font-normal font-['Montserrat'] indent-[3rem] max-sm:w-[280px] max-sm:text-[15px] max-sm:h-[50px] max-sm:mt-[5rem]"  style={{ color: id_type ? "#fff" : "#696969" }} value={id_type} onChange={(e) => setIdtype(e.target.value)} required>
        <option value="null">Select ID Type *</option>
        <option value="Addhar">Addhar Card</option>ss
        <option value="Voter">Voter Card</option>
        <option value="Pan">Pan Card</option>
        </select>
        </div>
        <input className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:h-[50px] max-sm:mt-[1.5rem]" placeholder={`${id_type} No *`} type='text' value={id_proof} onChange={(e) => setIdno(e.target.value)} required></input>
        <input className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:h-[50px] max-sm:mt-[1.5rem]" placeholder='Expectations' value={expectation} onChange={(e) => setExpectation(e.target.value)} type='text' required></input>
        <input className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:h-[50px] max-sm:mt-[1.5rem] max-sm:bg-zinc-900" placeholder='Institution *' type='text' value={institution} onChange={(e) => setInstitute(e.target.value)} required></input>
        <input className="w-[754.71px] h-[70.73px] bg-zinc-300 bg-opacity-0 rounded-[15px] border border-zinc-300 placeholder:text-neutral-500 text-[25px] font-normal font-['Montserrat'] indent-[3rem] mt-[2rem] max-sm:w-[280px] max-sm:text-[15px] max-sm:indent-[2rem] max-sm:h-[50px] max-sm:mt-[1.5rem] max-sm:bg-zinc-900" placeholder='DD-MM-YYYY *'type='text' value={dob} onChange={(e) => setDob(e.target.value)} required></input>
        <button className="w-[189px] h-[67px] bg-violet-600 rounded-[10px] border-white text-white text-3xl font-bold font-['Poppins'] mt-[7vh] mb-[10vh] max-sm:w-[280px] max-sm:h-[40px] max-sm:mt-[3rem] max-sm:text-[22px] sm:hidden max-sm:mb-[5rem]" onClick={handelClick} disabled={loading}>{loading ? <>Loading...</> : <>Submit</>}</button>
      </div>
      <ToastContainer theme="dark"/>
    <button className="w-[189px] h-[67px] bg-violet-600 rounded-[10px] border-white text-white text-3xl font-bold font-['Poppins'] mt-[7vh] mb-[10vh] max-sm:w-[280px] max-sm:h-[40px] max-sm:text-[22px] max-sm:mt-[-4rem] max-sm:mb-[8rem] max-sm:hidden" onClick={handelClick} disabled={loading}>{loading ? <>Loading...</> : <>Submit</>}</button>
    {error && <div className='error'>{error}</div>}
  </div>
  );
}

export default Formpage2;
