import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useStudentsContext } from '../hooks/useStudentsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { IoIosAdd } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import 'react-toastify/dist/ReactToastify.css';

const AddStudents = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [payment, setPayment] = useState('')
    var [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useStudentsContext()
    const [toggle, setToggle] = useState(false)
    const { user } = useAuthContext()
    var json = ''

    const notify = () => {
    
        if(json.hasOwnProperty('error') === false) {
          toast.success('Student Added Successfully!')
        }
        else {
          toast.error(json.error)
        }
    }

    const handelClick = async (e) => {
        e.preventDefault()

        if(!user) {
          setError('You must be Logged in')
          return
        }

        const student = { name, email, phone, payment, amount }

        setLoading(true)
        const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/', {

          method: 'POST',
          body: JSON.stringify(student),
          headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
      }
    })

    setLoading(false)
    json = await response.json()
    notify()

    if(!response) {
      try {
        setError(json.error)
        console.log(error)
      } catch(e) {
        throw new Error(e)
      }
    }

    if(response.ok) {
      try {
        setError(null)
        setName('')
        setEmail('')
        setPhone('')
        setPayment('')
        setAmount('')
        console.log("New Student Added!")
        dispatch({type: 'CREATE_STUDENT', payload: json})
    } catch(error) {
        console.log(error)
    }
}
}

  return (
    <div>
      <div className="w-[297px] h-[60px] bg-zinc-800 rounded-[10px] border border-zinc-100 sm:hidden flex flex-row align-center mb-6">
        <p className="text-white text-base font-semibold font-['Poppins'] capitalize flex p-4 ml-4">add student</p>
        <button  className='ml-[6rem]' onClick={() => setToggle(!toggle)}>{!toggle ? <IoIosAdd size={30} color='white'/>:<RxCross1 size={20} color='white'/>}</button>
      </div>
      <div className={`${!toggle ? 'max-sm:hidden' : 'flex'} w-[386px] h-[533px] relative bg-zinc-900 rounded-[20px] border border-white flex justify-center max-sm:w-[300px] max-sm:h-[500px]'}`}>
        <div className='flex gap-8 flex-col items-center'>
            <p className="w-32 text-white text-xl font-semibold font-['Poppins'] mt-[2rem] max-sm:text-[15px] max-sm:ml-6">
                Add Student
            </p>
            <ul className='flex flex-col gap-8 max-sm:text-[10px]'>
                <li className='flex gap-4 items-center max-sm:gap-0'>
                    <label htmlFor="" className='max-sm:text-[10px]'>Name</label>
                    <input type="text" className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4 max-sm:w-[150px] max-sm:h-[30px]' value={name} onChange={(e) => setName(e.target.value)} autoFocus/>
                </li>
                <li className='flex gap-4 items-center max-sm:gap-0'>
                    <label htmlFor="" className='max-sm:text-[10px]'>Email</label>
                    <input type="email" className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4 max-sm:w-[150px] max-sm:h-[30px]' value={email} onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li className='flex gap-4 items-center max-sm:gap-0'>
                    <label htmlFor="" className='max-sm:text-[10px]'>Phone</label>
                    <input type="number" className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4 max-sm:w-[150px] max-sm:h-[30px]' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </li>
                <li className='flex gap-4 items-center max-sm:gap-0'>
                    <label htmlFor="" className='max-sm:text-[10px]'>Payment</label>
                    <select className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4 text-white max-sm:w-[150px] max-sm:h-[30px]' value={payment} onChange={(e) => setPayment(e.target.value)} style={{ color: payment ? "#fff" : "#696969" }}>
                        <option value="null">Select</option>
                        <option value="Paid">Paid</option>
                        {/* <option value="Pending">Pending</option>
                        <option value="Partial">Partial</option> */}
                    </select>
                </li>
                <li className='flex gap-4 items-center max-sm:gap-0'>
                    <label htmlFor="" className='max-sm:text-[10px]'>Amount</label>
                    <input type="number" className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4 max-sm:w-[150px] max-sm:h-[30px]' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </li>
            </ul>
            <ToastContainer theme="dark"/>
            <button className="w-[295px] h-[39px] bg-gradient-to-b from-violet-600 to-violet-950 rounded-[11px] text-white text-base font-semibold font-['Poppins'] -mt-[1.5rem]  max-sm:text-[10px] max-sm:w-[5rem] max-sm:p-0 mx-sm:rounded-md max-sm:h-8" onClick={handelClick} disabled={loading} >{loading ? <>Loading...</> : <>ADD</>}</button>
        </div>
    </div>
    </div>
  );
}

export default AddStudents;
